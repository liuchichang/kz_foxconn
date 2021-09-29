<template>
    <v-dialog
        v-model="openDialog"
        persistent
        width="380px"
    >
        <v-card class="pa-2" v-if="openDialog">
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
            ></v-progress-linear>
            <v-card-title>新增人員</v-card-title>
            <v-card-text class="mt-5">
              <v-form
                  ref="form"
                  v-model="valid"

                  lazy-validation
              >
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">名稱</p>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            v-model="newUser.Name"
                            placeholder="請輸入名稱"
                            outlined
                            dense
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">ID</p>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            v-model="newUser.Id"
                            placeholder="請輸入ID"
                            outlined
                            dense
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
              </v-form>
                <v-row class="mt-5 align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">權限</p>
                    </v-col>
                    <v-col cols="9">
                        <v-radio-group class="mt-0" v-model="newUser.Identity">
                            <v-radio
                                v-for="(item,index) in IdentityList"
                                :key="index"
                                :label="`${item.label}`"
                                :value="item.value"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row class="justify-center">
                    <p v-if="error" class="red--text">{{errorMessage}}</p>
                </v-row>
                
            </v-card-text>
            <v-divider class="my-2"/>
            <v-card-actions>
                
                <v-spacer/>
                <v-btn
                    text
                    color="primary"
                    @click="cancelNewUser()"
                >
                    取消
                </v-btn>
                <v-btn
                    color="primary"
                    :disabled="!valid"
                    @click="saveNewUser()"
                >
                    儲存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'AddNewUserDialog',
  components: {

  },
  data() {
    return{
        loading:false,
        valid:false,
        error:false,
        errorMessage:null,
        newUser:{
            Name:"",
            Id:"",
            Identity:null
        },
        IdentityList:[
            {label:"開發人員", value:"Developer"},
            {label:"安裝人員", value:"Installer"},
            {label:"管理人員", value:"Manager"},
            {label:"操作人員", value:"Operator"},
        ],
        rules: {
          required: value => !!value || 'Required.',
        },
    }
  },
  props:{
      showAddNewUserDialog: Boolean,
  },
    computed:{
        openDialog:{
            get(){
                return this.showAddNewUserDialog
            },
            set(dialog){
                if(!dialog){
                    this.newUser={
                        Name:"",
                        Id:"",
                        Identity:null,
                    }
                }
                this.$emit("update:showAddNewUserDialog", dialog)
            }
        }
    },
  mounted(){
    
  },
  methods:{
      cancelNewUser(){
          this.error=false;
          this.errorMessage = null;
          this.newUser={
              Name:"",
              Id:"",
              Identity:null,
          },
          this.openDialog=false;
          this.loading = false;
      },
      saveNewUser(){
          this.loading = true;
          let valid = this.$refs.form.validate();
          if(!valid) return;
          let data = this.newUser;
          let passcode = this.$store.getters.GetUserInfo.Passcode;
          this.$api.Users.AddUser(passcode, data)
          .then(res=>{
            this.error=false;
            this.errorMessage = null;
            this.$emit("reload")
            this.$emit("AddNewUserSuccess", res.data);
            this.openDialog=false;
            this.loading = false;
          })
          .catch(error=>{
            this.error=true;
            this.errorMessage = error;
          })
          
      },
  },
}
</script>

<style>

</style>
