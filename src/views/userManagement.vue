<template>
    
    <div class="main-container">
        <v-row class="mb-5 px-3 align-center">
            <p class="text-h6 font-weight-bold my-0 mr-5">人員管理</p>
            <v-spacer/>
            <v-btn c
                color="primary"
                :disabled="CheckValid()"
                @click="AddNewUser">
                <v-icon class="mr-1">mdi-account-plus</v-icon>
                新增人員
            </v-btn>
        </v-row>
        <v-card>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
            ></v-progress-linear>
            <v-data-table
                :headers="tableHeaders"
                :items="users"
                :items-per-page="10"
                class="elevation-1"
            >
                
                <template v-slot:item.Status="{ item }">
                    <v-chip
                        small
                        :color="getStatusColor(item.Status)"
                        dark
                        label
                    >
                        {{ item.Status }}
                    </v-chip>
                </template>
                <template v-slot:item.Identity="{ item }">
                    <v-chip
                        small
                        :color="getIdentityColor(item.Identity)"
                        dark
                        :outlined="checkIdentityOutlined(item.Identity)"
                    >
                        {{ getIdentityText(item.Identity) }}
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div >
                        <v-btn
                            color="primary"
                            small
                            class="mr-2"
                            @click="EditUser(item)"
                        >
                            編輯
                        </v-btn>
                        <v-btn
                            small
                            class="mr-2"
                            @click="EditIdentity(item)"
                            :disabled="CheckValid()"
                        >
                            權限
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </v-card>
        <AddNewUserDialog 
            :showAddNewUserDialog.sync="showAddNewUserDialog"
            @reload="reload($event)"
            @AddNewUserSuccess="AddNewUserSuccess($event)"
        ></AddNewUserDialog>
        <EditUserDialog 
            :showEditUserDialog.sync="showEditUserDialog"
            :SelectedItem="SelectedItem"
            @reload="reload($event)"
        ></EditUserDialog>
        <IdentityDialog 
            :showIdentityDialog.sync="showIdentityDialog"
            :SelectedItem="SelectedItem"
            @reload="reload($event)"
        ></IdentityDialog>
        <NewUserInfoDialog
            :showNewUserInfo.sync="showNewUserInfo"
            :newUserInfo="newUserInfo"
        ></NewUserInfoDialog>
    </div>
</template>

<script>
import moment from "moment/src/moment"
import "moment/src/locale/zh-tw";
import AddNewUserDialog from "@/components/Users/AddNewUserDialog.vue"
import EditUserDialog from "@/components/Users/EditUserDialog.vue"
import IdentityDialog from "@/components/Users/IdentityDialog.vue"
import NewUserInfoDialog from "@/components/Users/NewUserInfo.vue"

export default {
    name: 'UserManagement',
    components: {AddNewUserDialog, EditUserDialog, IdentityDialog, NewUserInfoDialog},
    data() {
        return{
            
            tableHeaders:[
                {
                    text: '狀態',
                    align: 'start',
                    sortable: false,
                    value: 'Status',
                },
                {
                    text: 'Id',
                    align: 'start',
                    sortable: true,
                    value: 'Id',
                },
                {
                    text: '名稱',
                    align: 'start',
                    sortable: true,
                    value: 'Name',
                },
                {
                    text: '權限',
                    align: 'start',
                    sortable: true,
                    value: 'Identity',
                },
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'actions',
                },
                
            ],
            loading:false,
            user:null,
            users:[],
            newUserInfo:null,
            SelectedItem:null,
            showAddNewUserDialog:false,
            showEditUserDialog:false,
            showIdentityDialog:false,
            showNewUserInfo:false,
            getUsersInterval:null,
        }
    },
    computed:{
        
    },
    watch:{

    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem("UserInfo"));
        this.loading=true;
        this.getUsers();
        this.getUsersInterval = setInterval(()=>{
            this.getUsers();
        }, 5000);
        
    },
    beforeDestroy(){
        clearInterval(this.getUsersInterval);
    },
    methods:{
        AddNewUserSuccess(data){
            this.showNewUserInfo=true;
            this.newUserInfo = data;
        },
        reload(data){
            this.getUsers();
            if(!data) return;
            let beforeData = JSON.parse(localStorage.getItem("UserInfo"));
            if(beforeData.Id === data.Id){
                alert("請重新登入");
            }
            
        },
        getUsers(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.Users.GetUsers(passcode)
            .then(res=>{
                let users = res.data.map(e=>(
                    {
                        Id:e.Id,
                        Name:e.Name,
                        Identity:e.Identity,
                        LastOnlineTime: e.LastOnlineTime,
                        Status: this.checkStatus(e.LastOnlineTime)
                    }
                ));
                this.users=users;
                this.loading=false;
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        AddNewUser(){
            this.showAddNewUserDialog = true;
        },
        EditUser(e){
            this.SelectedItem = e;
            this.showEditUserDialog = true;
        },
        EditIdentity(e){
            this.SelectedItem = e;
            this.showIdentityDialog = true;
        },

        CheckEditValid(){
            let user = this.$store.getters.GetUserInfo;
            if(!user) return true;
            return user.Id === this.SelectedItem.Id ? true : false;
        },
        CheckEditIdentityValid(item){
            let user = this.$store.getters.GetUserInfo;
            if(!user) return true;
            let userIdentity = this.CheckIdentity(user);
            let itemIdentity = this.CheckIdentity(item);
            return userIdentity > itemIdentity ? false : true;
        },
        CheckValid(){
            let user = this.$store.getters.GetUserInfo;
            if(!user) return true;
            switch(user.Identity){
                case "Manager":
                case "Developer":
                case "Installer":
                    return false;
                default:
                    return true;
            }
        },
        checkStatus(e){
            let time = moment().diff(moment(e))/1000;
            if(time<300){
                return "登入"
            }else{
                return "離線"
            }
        },
        getStatusColor(e){
            switch(e){
                case "登入":
                    return "#0BC669";
                case "離線":
                    return "#939393";
            }
        },
        getIdentityColor(e){
            switch(e){
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
        getIdentityText(e){
            switch(e){
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
        CheckIdentity(e){
            switch(e){
                case "Developer":
                    return 0;
                case "Installer":
                    return 1;
                case "Manager":
                    return 2;
                case "Operator":
                    return 3;
                default:
                    return -1;
            }
        },
        checkIdentityOutlined(e){
            switch(e){
                case "Developer":
                    return false;
                default:
                    return true;
            }
        },

    },
}
</script>

<style scoped>
.main-container{
    overflow-y:auto;
    margin-top: 64px;
    padding: 25px;
    height: 100vh;
    max-height: calc(100vh - 90px);
}
#chart{
    width: auto;
    height: calc(100vh - 300px);
}
p{
    color:white;
}
</style>