<template>
        <div class="main-container">
            <v-row class="px-3 align-center">
                <p class="text-h6 font-weight-bold my-0">網路設定</p>
                <v-spacer/>
                <v-btn 
                    color="primary" 
                    dark
                    :loading="loading"
                    @click="Save"
                    ><v-icon class="mr-1">mdi-content-save</v-icon>
                    儲存
                </v-btn>
            </v-row>
            <v-breadcrumbs 
                class="pl-0"
                large 
                :items="bread"
            >
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <div :class="$vuetify.breakpoint.smAndDown ? 'full' : 'notfull'">
                <v-row class="mx-0 my-1">
                    <v-btn 
                        v-if="!editing"
                        small
                        :loading="loading"
                        color="primary"
                        @click="goEditing"
                        ><v-icon class="mr-1">mdi-pencil</v-icon>
                        編輯
                    </v-btn>
                    <v-btn 
                        v-else
                        small
                        :loading="loading"
                        color="grey"
                        dark
                        @click="cancelEditing"
                        >
                        取消編輯
                    </v-btn>
                </v-row>
                <v-row class="mt-5 mb-8" v-show="!this.$store.state.loading">
                    <v-col cols="12" sm="3">
                        <p class="font-weight-bold text-left my-0">DHCP</p>
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-row class="mx-0 my-0">
                            <v-switch
                                :disabled="!editing"
                                v-model="Internet.IsDHCPEnable"
                                class="mt-0"
                                inset
                                dark
                            ></v-switch>
                            <p class='my-0 mr-2 font-weight-bold subtitle-1'>{{Internet.IsDHCPEnable ? '啟用' : '停用' }}</p>
                        </v-row>
                    </v-col>
                </v-row>
                <v-form v-model="isFormValid" v-show="!this.$store.state.loading">
                    <v-row>
                        <v-col cols="12" sm="3">
                            <p class="font-weight-bold text-left my-0">IP位址</p>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-text-field
                                :disabled="!editing"
                                v-model="Internet.IPAddress"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="" justify="start">
                        <v-col cols="12" sm="3">
                            <p class="font-weight-bold text-left my-0">子網路遮罩</p>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-text-field
                                :disabled="!editing"
                                v-model="Internet.Mask"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="justify-start" justify="start">
                        <v-col cols="12" sm="3">
                            <p class="font-weight-bold text-left my-0">預設閘道</p>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-text-field
                                v-model="Internet.GatewayAddress"
                                solo
                                :disabled="!editing"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="text-align-start">
                        <v-col cols="12" sm="3">
                            <p class="font-weight-bold text-left my-0">DNS 伺服器位址</p>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-btn 
                                v-if="editing"
                                color="primary"
                                icon
                                @click="addDNSAddress"
                            >
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <template v-if="Internet.DNSAddress">
                        <v-row class="" justify="start" v-for="(item, index) in Internet.DNSAddress" :key="index">
                            <v-col cols="12" sm="3">
                                <p class="font-weight-bold text-left my-0">DNS 伺服器位址-{{index+1}}</p>
                            </v-col>
                            <v-col cols="11" sm="7">
                                <v-text-field
                                    v-model="Internet.DNSAddress[index]"
                                    solo
                                    :disabled="!editing"
                                ></v-text-field>
                                
                            </v-col>
                            <v-col cols="1" sm="2">
                                <v-btn 
                                    v-if="editing"
                                    color="grey"
                                    icon
                                    @click="removeDNSAddress(index)"
                                >
                                    <v-icon>mdi-close-circle</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </v-form>
            </div>
        </div>
</template>

<script>
var validateIP = require('validate-ip-node');
export default {
    name: 'InternetSetup',
    components: { 
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
                    text: '網路設定',
                    disabled: false,
                    href: 'breadcrumbs_dashboard',
                }
            ],
            Internet:{
                "IsDHCPEnable": false,
            },
            rules: {
                required: value => !!value || 'Required.',
                isIp: address => validateIP(address) || '格式錯誤',
            },
            isFormValid:null,
            loading:false,
            editing:false,
        }
    },
    mounted(){
        this.$store.state.loading = true;
        let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
        this.$api.NetSettings.NetworkStatus(passcode)
        .then(res=>{
            this.Internet = res.data;
            this.$store.state.loading = false;
        })
        .catch((error)=>{
            this.Initial(error);
        })
    },
    watch:{
        Internet:{
            deep:true,
            handler:function(val){
                if(!val.IsDHCPEnable){
                    this.Internet.GatewayAddress = this.Internet.GatewayAddress ? this.Internet.GatewayAddress : "";
                    this.Internet.IPAddress = this.Internet.IPAddress ? this.Internet.IPAddress : "";
                    this.Internet.Mask = this.Internet.Mask ? this.Internet.Mask : "";
                    this.Internet.DNSAddress = this.Internet.DNSAddress ? this.Internet.DNSAddress : [];
                }
            },
        },
    },
    methods:{
        removeDNSAddress(index){
            this.Internet.DNSAddress.splice(index,1);
            this.$forceUpdate();
        },
        addDNSAddress(){
            this.Internet.DNSAddress.push("");
            this.$forceUpdate();
            let ele = document.getElementsByClassName("main-container")[0];
            setTimeout(() => {
                ele.scroll({
                    top: ele.scrollHeight, 
                    left: 0, 
                    behavior: 'smooth' 
                });
            });
            
            
        },
        cancelEditing(){
            this.$store.state.loading = true;
            this.editing = false;
            this.loading = true;
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.NetSettings.NetworkStatus(passcode)
            .then(res=>{
                console.log(res);
                this.Internet = res.data;
                this.loading = false;
                this.$store.state.loading = false;
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        goEditing(){
            this.editing = true;
            this.loading = true;
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.NetSettings.NetworkSettings(passcode)
            .then(res=>{
                this.Internet = res.data;
                this.loading = false;
            })
            .catch((error)=>{
                this.Initial(error);
            });
        },
        Save(){
            this.loading=true; 
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.NetSettings.SetNetworkStatus(passcode, this.Internet)
            .then(res=>{
                console.log(res);
                this.ForceInitial();
                this.Alarm("系統整理中，請稍後重新登入");
            })
            .catch(error=>{
                console.log(error);
                this.Initial(error);
            })
            .finally(()=>{
                this.loading=false;
            })
        },
        
    },
}
</script>

<style scoped>
.main-container{
    overflow-y:auto;
    /* margin-top: 64px; */
    padding: 25px;
    height: 100vh;
    max-height: calc(100vh - 90px);

}
.full{
    width: 100%;
}
.notfull{
    width: 50%;
}
.v-tabs >>> .v-tabs-items{
    overflow: auto !important;
    max-height: calc(100vh - 260px) !important;
}
.text-align-start{
    text-align: start;
}
p, .v-breadcrumbs >>> .v-breadcrumbs__item{
    color: white;
}
.v-breadcrumbs >>> a{
    color: #1976d2 !important;
}
.v-breadcrumbs >>> .v-breadcrumbs__divider i{
    color: white;
}
</style>