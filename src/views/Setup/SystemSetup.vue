<template>
        <div class="main-container">
            <v-row class="px-3 align-center">
                <p class="text-h6 font-weight-bold my-0">系統設定</p>
                <v-spacer/>
                <v-btn 
                    dark 
                    color="error" 
                    @click="Reset()"
                ><v-icon class="mr-1">mdi-lock-reset</v-icon>
                系統重置
                </v-btn>
            </v-row>
            <v-breadcrumbs 
                dark
                class="pl-0"
                large 
                :items="bread"
            >
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <div 
                v-if="!this.$store.state.loading"
                :class="$vuetify.breakpoint.smAndDown ? 'full' : 'notfull'">
                <v-form>
                    <v-row class="my-5" align="center">
                        <v-col cols="12" sm="2">
                            <p class="font-weight-bold text-left my-0">主機名稱</p>
                        </v-col>
                        <v-col cols="12" sm="10">
                            <v-row class="mx-0 my-0" align="center">
                                <p v-if="!editing" class='my-0 mr-2 font-weight-bold title'>{{Hostname}}</p>
                                <v-text-field
                                    v-else
                                    v-model="Hostname"
                                    hide-details
                                    solo
                                ></v-text-field>
                                <v-btn
                                    v-if="!editing"
                                    dark
                                    class="mr-2"
                                    icon
                                    @click="goEditing()"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                    v-else
                                    class="mr-2"
                                    text
                                    @click="cancelEditing()"
                                >
                                    取消
                                </v-btn>
                                <v-btn 
                                    v-if="editing"
                                    @click="saveEditing()"
                                    color="primary"
                                    :loading="loading"
                                >
                                儲存
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="my-5" align="start">
                        <v-col cols="12" sm="2">
                            <p class="font-weight-bold text-left my-0">匯出</p>
                        </v-col>
                        <v-col cols="12" sm="10" class="text-left">
                            <v-btn 
                                color="primary"
                                @click="ExportSettings()"
                            >
                                <v-icon class="mr-1">mdi-export</v-icon>
                                匯出
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="my-5" align="start">
                        <v-col cols="12" sm="2">
                            <p class="font-weight-bold text-left my-0">匯入</p>
                        </v-col>
                        <v-col cols="12" sm="10" class="text-left">
                            <input type="file" id="file" ref="file" class="mb-2"  v-on:change="selectFile()"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                        </v-col>
                        <v-col cols="12" sm="10" class="text-left">
                            <v-btn dark color="#5CA3CC" @click="ImportSettings()">
                                <v-icon class="mr-1">mdi-application-import</v-icon>
                                匯入
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="my-5" align="center">
                        <v-col cols="12" sm="2">
                            <p class="font-weight-bold text-left my-0">系統更新</p>
                        </v-col>
                        <v-col cols="12" sm="10" class="text-left">
                            <v-btn 
                                color="primary"
                                @click="Update()"
                            >
                                <v-icon class="mr-1">mdi-update</v-icon>
                                更新
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="my-5" align="center">
                        <v-col cols="12" sm="2">
                            <p class="font-weight-bold text-left my-0">重啟系統</p>
                        </v-col>
                        <v-col cols="12" sm="10" class="text-left">
                            <v-btn 
                                color="primary"
                                @click="Reboot()"
                            >
                                <v-icon class="mr-1">mdi-restart</v-icon>
                                重啟
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
            <DoubleCheckDialog
                :dialog.sync="alertDialog"
                :message="alertMessage"
                :type="alertType"
                :alertFunc="currentAction"
                :action="alertAction"
                :danger="alertDanger"
                @ExecuteUpdate="ExecuteUpdate()"
                @ExecuteReset="ExecuteReset()"
                @ExecuteReboot="ExecuteReboot()"
            />
        </div>

</template>

<script>
import DoubleCheckDialog from "@/components/Dialogs/DoubleCheckDialog.vue"
export default {
    name: 'SystemSetup',
    components: { 
        DoubleCheckDialog
    },
    data() {
        return{
            bread:[
                {
                    text: '設定',
                    disabled: false,
                    href: '',
                },
                {
                    text: '系統設定',
                    disabled: false,
                    href: 'breadcrumbs_dashboard',
                }
            ],
            Hostname:"",
            rawData:null,
            editing:false,
            currentFile:null,
            loading:false,
            currentAction: null,
            alertDialog:false,
            alertMessage:null,
            alertType:null,
            alertAction:null,
            alertDanger:false,
        }
    },
    mounted(){
        this.$store.state.loading = true;
        let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
        this.$api.SysSettings.GetSysSettings(passcode)
        .then(res=>{
            console.log(res);
            this.Hostname = res.data.Hostname;
            this.$store.state.loading = false;
        })
        .catch((error)=>{
            this.Initial(error);
        })
    },
    methods:{
        goEditing(){
            this.rawData = JSON.parse(JSON.stringify(this.Hostname));
            this.editing = true;
        },
        cancelEditing(){
            this.editing = false;
            this.Hostname = JSON.parse(JSON.stringify(this.rawData));
        },
        saveEditing(){
            this.loading = true;
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.ChangeHostname(passcode, this.Hostname)
            .then(res=>{
                console.log(res);
                this.loading = false;
                this.editing = false;
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        selectFile() {
            this.currentFile = this.$refs.file.files[0];
        },
        ImportSettings(){
            let formData = new FormData();
            formData.append('file', this.currentFile);
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.ImportSysSettings(passcode, formData)
            .then(res=>{
                console.log(res);
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        ExportSettings(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.ExportSysSettings(passcode)
            .then(res=>{
                console.log(res);
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'System-Settings.bin'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        ActionComfirm(){
            this[this.currentAction];
        },
        Update(){
            this.currentAction = "ExecuteUpdate";
            this.alertDialog = true;
            this.alertMessage = "確定要進行系統更新?"
            this.alertType = null;
            this.alertDanger = false;
            this.alertAction = "更新";
        },
        Reset(){
            this.currentAction = "ExecuteReset";
            this.alertDialog = true;
            this.alertMessage = "重新啟動系統會導致系統停止運作幾分鐘，確定要重置系統?"
            this.alertDanger = true;
            this.alertAction = "重置";
        },
        Reboot(){
            this.currentAction = "ExecuteReboot";
            this.alertDialog = true;
            this.alertMessage = "重新啟動系統會導致系統停止運作幾分鐘，確定要重新啟動系統?"
            this.alertType = null;
            this.alertDanger = false;
            this.alertAction = "重新啟動";
        },
        ExecuteUpdate(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.SysUpdate(passcode)
            .then(res=>{
                console.log(res);
            })
            .catch((error)=>{
                this.Initial(error);
            })
        },
        ExecuteReset(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.SysReset(passcode)
            .then(res=>{
                console.log(res);
            })
            .catch((error)=>{
                this.Initial(error);
            })
        },
        ExecuteReboot(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.SysSettings.SysReboot(passcode)
            .then(res=>{
                console.log(res);
                // this.loading = false;
                // this.editing = false;
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
    },
}
</script>

<style>

.full{
    width: 100%;
}
.notfull{
    width: 60%;
}
.v-tabs >>> .v-tabs-items{
    overflow: auto !important;
    max-height: calc(100vh - 260px) !important;
}
p{
    color: white;
}
.v-breadcrumbs .v-breadcrumbs__item{
    color: white;
}
.v-breadcrumbs a{
    color: #1976d2 !important;
}
input, select, textarea{
    color: #7e7e7e;
}
.v-divider{
    border-color: rgb(199 199 199 / 12%) !important;
}
</style>