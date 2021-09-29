<template>
    <v-dialog
        v-model="openDialog"
        persistent
        width="380px"
    >
        <v-card class="pa-2" v-if="openDialog">
            <v-card-title><v-icon class="mr-3" color="success">mdi-check-circle</v-icon>新增人員成功</v-card-title>
            <v-card-text class="mt-5">
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">ID</p>
                    </v-col>
                    <v-col cols="9">
                        <p class="my-0">{{newUserInfo.Id}}</p>
                    </v-col>
                </v-row>
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">名稱</p>
                    </v-col>
                    <v-col cols="9">
                        <p class="my-0">{{newUserInfo.Name}}</p>
                    </v-col>
                </v-row>
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">權限</p>
                    </v-col>
                    <v-col cols="9">
                        <p class="my-0">{{$t(`UserInfo.${newUserInfo.Identity}`)}}</p>
                    </v-col>
                </v-row>
                <v-row class="align-start">
                    <v-col cols="3">
                        <p class="font-weight-bold my-0">密碼</p>
                    </v-col>
                    <v-col cols="9">
                        <p class="font-weight-bold my-0">{{newUserInfo.Password}}</p>
                    </v-col>
                </v-row>
                
            </v-card-text>
            <v-divider class="my-2"/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="openDialog=false"
                >
                    完成
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'NewUserInfo',
  components: {
      
  },
  data() {
    return{
        
    }
  },
  props:{
      showNewUserInfo: Boolean,
      newUserInfo:Object,
  },
    computed:{
        openDialog:{
            get(){
                return this.showNewUserInfo
            },
            set(dialog){
                if(!dialog){
                    this.newUser={
                        Name:"",
                        Id:"",
                        Identity:null,
                    }
                }
                this.$emit("update:showNewUserInfo", dialog)
            }
        }
    },
  mounted(){
    
  },
  methods:{
      
  },
}
</script>

<style>

</style>
