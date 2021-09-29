<template>
    <v-app-bar
      color="#011F4E"
      height="64"
      absolute
      class="user-app-bar"
      flat
    >
        <v-progress-linear
            absolute
            top
            v-if="loading"
            color="primary"
            indeterminate
        />
        <v-app-bar-nav-icon @click.stop="openDrawer" v-if="$vuetify.breakpoint.mdAndDown">
        </v-app-bar-nav-icon>
        <v-toolbar-title>
            <img 
                class="logo header" 
                src="@/assets/foxconn_logo.svg" 
            />
        </v-toolbar-title>
        <p 
            v-show="!$vuetify.breakpoint.mobile"
            class="first-item-text my-0"
        >{{company_name}}</p>
        <v-spacer/>
        <v-btn
            v-if="!user"
            x-large 
            text
            color="#ffffff"
            @click="login"
            :loading="!user && logining"
        >
            登入
            <v-icon>mdi-account-circle-outline </v-icon>
        </v-btn>
        <v-menu
            v-else
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="250"
            bottom
            offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    large 
                    depressed 
                    color="#ffffff"
                    v-bind="attrs"
                    v-on="on"
                >
                    {{user.Name}}
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
            </template>

            <v-card class="pa-5">
                <v-card-title>
                    <v-row>
                        <v-chip dark :color="userColor()" dense>{{userAuthText()}}</v-chip>
                        <v-spacer/>
                        <v-btn text color="primary" @click="logout">登出</v-btn>
                    </v-row>
                </v-card-title>
                <!-- <v-card-text> -->
                    <v-list>
                        <v-list-item class="px-0">
                            <v-list-item-avatar>
                            <v-icon x-large>mdi-account-circle</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{user.Name}}</v-list-item-title>
                                <v-list-item-subtitle class="">{{user.Email}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                <!-- </v-card-text> -->
            </v-card>
        </v-menu>
        
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar',
    data() {
        return{
            menu:false,
        }
    },
    props: {
      UserInfo:{
        type:Object
      }
    },
    computed:{
        company_name:{
            get(){
                return process.env.VUE_APP_COMPANY_NAME
            },
        },
        user:{
            get(){
                return this.UserInfo;
            },
            set(){

            }
        },
        loading:{
            get(){
                return this.$store.state.loading;
            },
            set(){
            }
        },
        logining:{
            get(){
                return this.$store.state.logining;
            },
            set(){
            }
        },
    },
    mounted(){
        // console.log(process.env.VUE_APP_COMPANY_NAME)
        // this.$root.$on("loading", val=>{
        //     this.loading = val;
        // })
    },
    watch:{
        user:{
            immediate: true,
            deep:true,
            handler:function (val){
                if(val){
                    // this.logining
                }
            }
        }
    },
    methods:{
        
        openDrawer(){
            this.$root.$emit("openDrawer", true);
        },
        login(){
            this.$router.push({path:'/login'})
        },
        showAccountInfo(){

        },
        userColor(){
            switch(this.user.Identity){
                case "Developer":
                    return "primary"
                case "Installer":
                    return "primary";
                case "Manager":
                    return "primary";
                case "Operator":
                    return "primary";
                default:
                    return "#383838";
            }
        },
        userAuthText(){
            switch(this.user.Identity){
                case "Developer":
                    return "開發人員"
                case "Installer":
                    return "安裝人員";
                case "Manager":
                    return "管理人員";
                case "Operator":
                    return "操作人員";
                default:
                    return "無登入人員";
            }
        },
        logout(){
            // this.user = JSON.parse(localStorage.getItem('UserInfo'));
            this.StartPageLoading();
            this.$api.Users.Signout(this.user.Passcode)
            .then(()=>{
                this.user=null;
                this.ForceInitial();
                this.Info("登出成功！");
            })
            
            
        },
    },

}
</script>
<style scoped>
.logo.header{
  width: 200px;
  margin-top: 8px;
  padding: 0 0 0 25px;
}
.first-item-text{
  letter-spacing: 0.2rem;
  color: #a7a7a7;
}
.user-app-bar{
    color: #011F4E;
    /* border-bottom: 2px solid #e2e2e2 !important; */
    
    box-shadow: rgba(0, 0, 0, 0.3) 1.95px 4.95px 2.6px !important;
}
.user-app-bar >>> .v-btn{
    text-transform:none;
}
.user-app-bar >>> .v-toolbar__extension{
    background-color: #011F4E;
}
</style>