<template>
<div>
    <v-dialog
        v-model="openDialog"
        persistent
        :width="$vuetify.breakpoint.mdAndUp ? '35%' : '90%'"
    >
        <v-card class="pa-2" v-if="SelectedItem">
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
            ></v-progress-linear>
            <v-card-title>
                    <span v-if="!userNameEditing">{{rawData.Name}}</span>
                    <v-text-field
                        v-else
                        v-model="newData.Name"
                        placeholder="請輸入使用者名稱"
                        dense
                        hide-details
                    >
                    </v-text-field>
                    <v-btn v-if="!userNameEditing && CheckEditValid()" icon @click="userNameEditing=true">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <div v-if="userNameEditing && CheckEditValid()">
                        <v-btn icon @click="cancelEditName">
                            取消
                        </v-btn>
                        <v-btn icon @click="comfirmEditName">
                            <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                    </div>
                    
                    <v-spacer/>
                    <v-chip
                        v-if="SelectedItem"
                        :color="getStatusColor(SelectedItem.Status)"
                        dark
                        label
                    >
                        {{SelectedItem.Status }}
                    </v-chip>
                
            </v-card-title>
            <v-card-text>
                
                <v-row class="mx-0 mb-5">
                    <p class="font-weight-bold my-0">ID: {{SelectedItem.Id}}</p>
                </v-row>
                <div v-show="CheckEditValid()">
                    <p class="font-weight-bold py-0 mt-5">密碼管理</p>
                    <v-text-field
                        class="my-2"
                        v-model="newData.oldPassword"
                        placeholder="請輸入舊密碼"
                        outlined
                        dense
                        hide-details
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="newData.password"
                        placeholder="請輸入新密碼"
                        outlined
                        dense
                        hide-details
                    >
                    </v-text-field>
                </div>
                <div>
                    <v-btn
                        v-if="!CheckEditValid()"
                        class="my-3"
                        @click="resetPassword()"
                        depressed
                        outlined
                    >
                        重置密碼
                    </v-btn>
                    <p v-if="resetPasswordDone">新密碼：{{newPassword}}</p>
                </div>
                <v-row class="my-0 justify-center">
                    <p v-if="error" class="red--text">{{errorMessage}}</p>
                </v-row>
                
            </v-card-text>
            <v-divider class="my-2"/>
            <v-card-actions>
                <v-btn 
                    v-if="!CheckEditValid()"
                    icon 
                    @click="deleteUser"
                >
                    <v-icon color="#FF3B3B">mdi-delete</v-icon>
                </v-btn>
                <v-spacer/>
                <v-btn
                    text
                    color="primary"
                    v-if="CheckEditValid()"
                    @click="cancelEditUser()"
                >
                    取消
                </v-btn>
                <v-btn
                    color="primary"
                    @click="saveEditUser()"
                >
                    {{ CheckEditValid() ? '儲存' : '完成'}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <DeleteDialog 
            :showDeleteDialog.sync="showDeleteDialog"
            :SelectedItem="SelectedItem"
            @deleteDone="deleteDone"
    ></DeleteDialog>
    </div>
</template>

<script>

import DeleteDialog from "@/components/Users/DeleteDialog.vue"
export default {
  name: 'EditUserDialog',
  components: {
      DeleteDialog
  },
  data() {
    return{
        rawData:null,
        newData:{
            id:"",
            name:"",
            identity:"",
            oldPassword:"",
            password:"",
            lastOnlineTime:"",
        },
        resetPasswordDone:false,
        newPassword:null,
        loading:false,
        userNameEditing:false,
        error:false,
        errorMessage:null,
        showDeleteDialog:false,
    }
  },
  props:{
      showEditUserDialog: Boolean,
      SelectedItem:Object,
  },
  watch:{
      SelectedItem(val){
          
          this.rawData = JSON.parse(JSON.stringify(val));
          this.newData = JSON.parse(JSON.stringify(this.rawData))
      },
      
      userNameEditing(val){
          if(val){
              this.newData = JSON.parse(JSON.stringify(this.rawData))
          }
      }
  },
    computed:{
        openDialog:{
            get(){
                return this.showEditUserDialog
            },
            set(dialog){
                this.resetPasswordDone = false;
                this.$emit("update:showEditUserDialog", dialog)
            }
        }
    },
  mounted(){

  },
  methods:{
      resetPassword(){
        this.loading = true;
        let passcode = this.$store.getters.GetUserInfo.Passcode;
        let data = this.SelectedItem.Id;
        this.$api.Users.ResetPassword(passcode, data)
          .then(res=>{
              this.loading = false;
              console.log("res : " ,res);
              this.resetPasswordDone=true;
              this.newPassword = res.data.Password;
              // this.openDialog=false;
          })
      },
      deleteDone(){
          this.openDialog=false;
          this.$emit("reload", this.SelectedItem);
      },
      deleteUser(){
          this.showDeleteDialog=true;
      },
      comfirmEditName(){
          this.rawData.Name = this.newData.Name;
          this.userNameEditing=false;
      },
      cancelEditName(){
          this.newData.name=this.rawData.Name;
          this.userNameEditing=false;
      },
      cancelEditUser(){
          this.error=false;
          this.errorMessage = null;
          this.openDialog=false;
      },
      saveEditUser(){
            if(!this.CheckEditValid()){
                this.openDialog=false;
                return;
            }
            this.loading = true;
            let data = {
                ...this.newData
            }
            console.log(data)
            if(!data.password) delete data.password;
            delete data.Status;
            let passcode = this.$store.getters.GetUserInfo.Passcode;
            let isNowUser = this.$store.getters.GetUserInfo.Id === this.SelectedItem.Id;
            if(isNowUser){
                this.$api.Users.UpdateInfo(passcode, data)
                .then(res=>{
                    console.log(res);
                    this.loading = false;
                    this.$emit("reload", res.data);
                    this.error=false;
                    this.errorMessage = null;
                    this.openDialog=false;
                })
                .catch(error=>{
                    this.error=true;
                    this.errorMessage = error;
                })
            }
      },
      CheckEditValid(){
            let user = this.$store.getters.GetUserInfo;
            if(!user) return true;
            return user.Id === this.SelectedItem.Id ? true : false;
        },
      getStatusColor(e){
            switch(e){
                case "登入":
                    return "#0BC669";
                case "離線":
                    return "#939393";
            }
        },
  },
}
</script>

<style>

</style>
