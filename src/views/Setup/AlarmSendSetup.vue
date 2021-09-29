<template>
        <div class="main-container">
            <v-row class="px-3 align-center">
                <p class="text-h6 font-weight-bold my-0">警報發送設定</p>
                <v-spacer/>
                <v-btn 
                    dark 
                    color="primary" 
                    :loading="saveLoading"
                    @click="Save"
                >
                    <v-icon class="mr-1">mdi-content-save</v-icon>
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
            <v-tabs
                color="primary"
                background-color="transparent"
                v-model="tabIndex"
                v-if="!loading"
            >
                <v-tab>簡訊</v-tab>
                <v-tab>Email</v-tab>
                <v-tab>Line</v-tab>
                
                    <v-tab-item>
                        <AlarmSetupText 
                            :alarms="alarms" 
                            @ChangeEdit="ChangeEdit($event)"
                        />
                    </v-tab-item>
                    <v-tab-item>
                        <AlarmSetupEmail 
                            :alarms="alarms"
                            @ChangeEdit="ChangeEdit($event)"
                        />
                    </v-tab-item>
                    <v-tab-item>
                        <AlarmSetupLine 
                            :alarms="alarms" 
                            @ChangeEdit="ChangeEdit($event)"
                        />
                    </v-tab-item>
                
            </v-tabs>
        </div>
</template>

<script>

import AlarmSetupText from "@/components/SetUp/AlarmSetup/Text.vue"
import AlarmSetupEmail from "@/components/SetUp/AlarmSetup/Email.vue"
import AlarmSetupLine from "@/components/SetUp/AlarmSetup/Line.vue"
export default {
    name: 'AlarmSendSetup',
    components: { 
        AlarmSetupText, AlarmSetupEmail, AlarmSetupLine
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
                    text: '警報發送設定',
                    disabled: false,
                    href: 'breadcrumbs_dashboard',
                }
            ],
            
            selectedEmailIndex:null,
            selectedEmailItem:null,
            selectedLineIndex:null,
            selectedLineItem:null,
            editItemIndex:null,
            editing:false,
            tabIndex:null,
            actions:[
                {title:"刪除", func:(group, index)=>{this.deleteGroup(group, index)}}
            ],
            alarms: null,
            loading:false,
            saveLoading:false,
        }
    },
    watch:{
        
    },
    mounted(){
        this.$store.state.loading = true;
        this.loading = true;
        let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
        this.$api.AlaSettings.GetAlarmSettings(passcode)
        .then(res=>{
            console.log(res);
            this.alarms = res.data;
            this.loading = false;
            this.$store.state.loading = false;
        })
        .catch(()=>{
            this.Initial(error);
        })
    },
    methods:{
        async Save(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.saveLoading=true;
            this.$api.AlaSettings.SaveText(this.alarms.Text, passcode)
            .then(()=>{
                this.$api.AlaSettings.SaveEmail(this.alarms.Email, passcode)
                .then(()=>{
                    this.$api.AlaSettings.SaveLine(this.alarms.Line, passcode)
                    .then(()=>{
                    })
                    .catch((error)=>{
                        this.Initial(error);
                    });
                })
                .catch((error)=>{
                    this.Initial(error);
                });
            })
            .catch((error)=>{
                this.Initial(error);
            });
            this.saveLoading=false;
        },
        ChangeEdit(event){
            switch(event.type){
                case "Text":
                    this.alarms.Text = event.data;
                    break;
                case "Line":
                    this.alarms.Line = event.data;
                    break;
                case "Email":
                    this.alarms.Email = event.data;
                    break;
            }
            console.log(this.alarms)
            this.$forceUpdate();
        },
    },
}
</script>

<style scoped>
.main-container >>> .theme--light.v-tabs-items {
    background-color: transparent;
}

.v-tabs >>> .v-tabs-items{
    overflow: auto !important;
    max-height: calc(100vh - 240px) !important;
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
.v-tab.v-tab--active{
    color: white !important;
}
.v-tab{
    color: rgb(129, 129, 129) !important;
}
.v-card >>> p{
    color: black !important;
}
</style>