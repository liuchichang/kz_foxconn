<template>
    <v-dialog
        v-model="openDialog"
        persistent
        :width="$vuetify.breakpoint.mdAndUp ? '40%' : '90%'"
    >
        <v-card class="pa-2" v-if="SelectedItem">
            <v-card-title>
                    <span>{{SelectedItem.Name}}</span>
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
                <div>
                    <p class="font-weight-bold py-0 mt-5">權限</p>
                    <v-radio-group v-model="SelectedItem.Identity">
                        <v-radio
                            v-for="(item,index) in IdentityList"
                            :key="index"
                            :label="`${item.label}`"
                            :value="item.value"
                        ></v-radio>
                    </v-radio-group>
                </div>
                <div>
                    
                </div>
            </v-card-text>
            <v-divider class="my-2"/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    text
                    color="primary"
                    @click="cancelIdentityEdit"
                >
                    取消
                </v-btn>
                <v-btn
                    color="primary"
                    @click="saveIdentityEdit()"
                >
                    儲存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'EditUserDialog',
  components: {

  },
  data() {
    return{
        IdentityList:[
            {label:"開發人員", value:"Developer"},
            {label:"安裝人員", value:"Installer"},
            {label:"管理人員", value:"Manager"},
            {label:"操作人員", value:"Operator"},
        ],
    }
  },
  props:{
      showIdentityDialog: Boolean,
      SelectedItem:Object,
  },
    computed:{
        openDialog:{
            get(){
                return this.showIdentityDialog
            },
            set(dialog){
                this.$emit("update:showIdentityDialog", dialog)
            }
        }
    },
  mounted(){
    
  },
  methods:{
      
      cancelIdentityEdit(){
          this.openDialog=false;
      },
      saveIdentityEdit(){
          let passcode = this.$store.getters.GetUserInfo.Passcode;
          let identityData={
              "Id": this.SelectedItem.Id,
              "Identity": this.SelectedItem.Identity
          }
          this.$api.Users.EditUser(passcode, identityData)
          .then(res=>{
              console.log("res : " ,res);
              this.openDialog=false;
          })
          
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
