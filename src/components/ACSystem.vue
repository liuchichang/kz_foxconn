<template>
    <div class="img-area-parent pa-10">
            <v-row v-if="ACStatus">
                <v-col class="img-area-parent" :cols="$vuetify.breakpoint.lgAndDown ? 12 : 8">
                    <div class="img-area">
                        <v-img
                            class="room-img"
                            src="@/assets/room.png"
                        />
                        <div class="ac-container">
                            <div 
                                id="ac-a" 
                                class="ac"
                                :class="{
                                    on: ACStatus.A.Status==='Run', 
                                    error:ACStatus.A.Status==='Error',
                                    off: ACStatus.A.Status==='Stop',
                                    local:ACStatus.A.Status==='Local'
                                }"
                            >
                                <p class="my-0">空調A</p>
                            </div>
                            <div 
                                id="ac-b" 
                                class="ac"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    error:ACStatus.B.Status==='Error',
                                    off: ACStatus.B.Status==='Stop',
                                    local:ACStatus.B.Status==='Local'
                                }"
                            >
                                
                                <p class="my-0">空調B</p>
                            </div>
                            <div 
                                id="ac-c" 
                                class="ac"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    error:ACStatus.B.Status==='Error',
                                    off: ACStatus.B.Status==='Stop',
                                    local:ACStatus.B.Status==='Local'
                                }"
                            >
                                
                                <p class="my-0">空調C</p>
                            </div>
                            <div 
                                id="ac-d" 
                                class="ac"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    error:ACStatus.B.Status==='Error',
                                    off: ACStatus.B.Status==='Stop',
                                    local:ACStatus.B.Status==='Local'
                                }"
                            >
                                
                                <p class="my-0">空調D</p>
                            </div>
                            <div 
                                id="fan-a" 
                                class="ceiling-container"
                                :class="{
                                    on: ACStatus.A.Status==='Run', 
                                    off: ACStatus.A.Status==='Stop'||ACStatus.A.Status==='Local'||ACStatus.A.Status==='Error'
                                }"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                            <div 
                                id="fan-b" 
                                class="ceiling-container"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    off: ACStatus.B.Status==='Stop'||ACStatus.B.Status==='Local'||ACStatus.B.Status==='Error'
                                }"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                            <div 
                                id="fan-c" 
                                class="ceiling-container"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    off: ACStatus.B.Status==='Stop'||ACStatus.B.Status==='Local'||ACStatus.B.Status==='Error'
                                }"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                            <div 
                                id="fan-d" 
                                class="ceiling-container"
                                :class="{
                                    on: ACStatus.B.Status==='Run', 
                                    off: ACStatus.B.Status==='Stop'||ACStatus.B.Status==='Local'||ACStatus.B.Status==='Error'
                                }"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.lgAndDown ? 12 : 4">
                    <div class="control-area">
                        
                        <v-row class="mt-0 mx-auto no-flex" align="center">
                            <p class="font-weight-bold my-0 mr-5">空調箱A</p>
                            <v-chip 
                                label 
                                outlined 
                                class="mr-5"
                                dark
                            >
                                {{ACStatus.A.Status==='Local'  ? '近端控制' : '遠端控制'}}
                            </v-chip>
                            <v-chip 
                                label 
                                class="mr-5 white--text"
                                dark
                                :color="ACStatus.A.Status==='Run' ? '#0BC669':'#394153'"
                            >
                                {{ACStatus.A.Status==='Run' ? '啟動' : '停止'}}
                            </v-chip>
                            <v-chip 
                                label 
                                class="mr-5"
                                dark
                            >
                                {{ACStatus.A.Status==='Error' ? '故障' : '正常'}}
                            </v-chip>
                            <!-- <div v-if="ACSetting">
                                <v-switch
                                    v-if="ACSetting.IsManual && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                                    v-model="ACStatus.A.Status"
                                    :label="ACStatus.A.Status==='Run' ? '停止' : '啟動'"
                                    :value="CheckManualStartorStop(ACStatus.A.Status)"
                                    inset
                                    hide-details
                                    class="mt-0 pt-0"
                                    @change="ManualStartorStop('A')"
                                ></v-switch>
                            </div> -->
                        </v-row>
                        <v-row class="mt-5 mx-auto no-flex" align="center">
                            <p class="font-weight-bold my-0 mr-5">空調箱B</p>
                            <v-chip 
                                label 
                                outlined 
                                class="mr-5"
                                dark
                            >
                                {{ACStatus.B.Status==='Local'  ? '近端控制' : '遠端控制'}}
                            </v-chip>
                            <v-chip 
                                label 
                                class="mr-5 white--text"
                                :color="ACStatus.B.Status==='Run' ? '#0BC669':'#394153'"
                            >
                                {{ACStatus.B.Status==='Run' ? '啟動' : '停止'}}
                            </v-chip>
                            <v-chip label class="mr-5">
                                {{ACStatus.B.Status==='Error' ? '故障' : '正常'}}
                            </v-chip>
                        </v-row>
                        <v-row class="mt-5 mx-auto no-flex" align="center">
                            <p class="font-weight-bold my-0 mr-5">空調箱C</p>
                            <v-chip 
                                label 
                                outlined 
                                class="mr-5"
                                dark
                            >
                                {{ACStatus.B.Status==='Local'  ? '近端控制' : '遠端控制'}}
                            </v-chip>
                            <v-chip 
                                label 
                                class="mr-5 white--text"
                                :color="ACStatus.B.Status==='Run' ? '#0BC669':'#394153'"
                            >
                                {{ACStatus.B.Status==='Run' ? '啟動' : '停止'}}
                            </v-chip>
                            <v-chip label class="mr-5">
                                {{ACStatus.B.Status==='Error' ? '故障' : '正常'}}
                            </v-chip>
                        </v-row>
                        <v-row class="mt-5 mx-auto no-flex" align="center">
                            <p class="font-weight-bold my-0 mr-5">空調箱D</p>
                            <v-chip 
                                label 
                                outlined 
                                class="mr-5"
                                dark
                            >
                                {{ACStatus.B.Status==='Local'  ? '近端控制' : '遠端控制'}}
                            </v-chip>
                            <v-chip 
                                label 
                                class="mr-5 white--text"
                                :color="ACStatus.B.Status==='Run' ? '#0BC669':'#394153'"
                            >
                                {{ACStatus.B.Status==='Run' ? '啟動' : '停止'}}
                            </v-chip>
                            <v-chip label class="mr-5">
                                {{ACStatus.B.Status==='Error' ? '故障' : '正常'}}
                            </v-chip>
                        </v-row>
                        <v-row class="my-5 mx-auto no-flex" align="center">
                            <p class="font-weight-bold my-0 mr-5">運轉時間</p>
                            <v-chip 
                                label 
                                outlined 
                                class="mr-5"
                                dark
                            >
                                {{LongestRunningAC}}
                            </v-chip>
                            <p class="my-0 mr-2">{{LongestRunningTime.Days}}</p>
                            <p class="my-0 mr-2">天</p>
                            <p class="my-0 mr-2">{{LongestRunningTime.Hours}}</p>
                            <p class="my-0 mr-2">時</p>
                            <p class="my-0 mr-2">{{LongestRunningTime.Minutes}}</p>
                            <p class="my-0 mr-2">分</p>
                            <p class="my-0 mr-2">{{LongestRunningTime.Seconds}}</p>
                            <p class="my-0 mr-2">妙</p>
                            
                        </v-row>
                        
                        <v-divider v-if="CheckIdentity(['Installer','Developer'])"/>
                        <v-row class="my-3 mx-auto no-flex" align="center" 
                            v-if="hasUser && ACSetting && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                        >
                            <v-radio-group class="mt-0" row v-model="ACSetting.IsManual" hide-details>
                                <v-radio
                                    v-for="n in mode"
                                    :key="n.id"
                                    :label="n.label"
                                    :value="n.value"
                                    
                                ></v-radio>
                            </v-radio-group>
                        </v-row>
                        <v-row class="my-1 mx-auto item no-flex" align="center" v-if="hasUser && ACSetting && CheckIdentity(['Installer','Developer'])">
                            <p class="font-weight-bold my-0 mr-5">交替延遲時間</p>
                            <v-text-field 
                                class="my-0"
                                type="number" 
                                v-model.number="ACSetting.ChangeDelaySeconds"
                                style="max-width:150px;"
                            >
                            </v-text-field>
                            <p class="my-0 mr-5">秒</p>
                        </v-row>
                        <div v-if="ACSetting">
                            <v-row class="my-3 mx-auto no-flex" align="center" v-if="!ACSetting.IsManual && CheckIdentity(['Installer','Developer'])">
                                <v-select
                                    item-text="label"
                                    item-value="value"
                                    class="mr-2"
                                    v-model="ACSetting.IsTimePeriodMode"
                                    label="運轉模式"
                                    :items="OperationModeOptions"
                                    solo
                                    :loading="false"
                                    style="max-width:300px; margin-top:10px"
                                ></v-select>
                            </v-row>
                            <v-row 
                                class="mt-0 mb-5 mx-auto no-flex" 
                                align="center" 
                                v-if="!ACSetting.IsManual && !ACSetting.IsTimePeriodMode  && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                            >
                                <p class="font-weight-bold my-0 mr-5">時間</p>
                                <v-text-field 
                                    type="number" 
                                    v-model.number="ACSetting.TimekeepingModeSettings.Time"
                                >
                                </v-text-field>
                                <v-select
                                    style="max-width:80px;"
                                    item-text="label"
                                    item-value="id"
                                    v-model="ACSetting.TimekeepingModeSettings.Unit"
                                    :items="TimeUnits"
                                    :loading="false"
                                ></v-select>
                            </v-row>
                            <v-row 
                                class="mb-5 mx-auto no-flex" 
                                align="center" 
                                v-if="!ACSetting.IsManual && ACSetting.IsTimePeriodMode  && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                            >
                                <v-text-field 
                                    class="mr-5"
                                    type="number" 
                                    label="啟動時間" 
                                    suffix="時" 
                                    v-model.number="ACSetting.TimePeriodModeSettings.RunTime"
                                ></v-text-field>
                                <v-text-field 
                                    type="number" 
                                    label="停止時間" 
                                    suffix="時" 
                                    v-model.number="ACSetting.TimePeriodModeSettings.StopTime"
                                ></v-text-field>
                            </v-row>
                        </div>
                        <div 
                            class="mt-0 mx-auto py-2 item actions-area" 
                            align="center" 
                            v-if="hasUser && ACSetting && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                        >
                            <v-row class="ma-2" v-if="CheckIdentity(['Manager','Installer','Developer'])">
                                <v-btn 
                                    class="ma-2"
                                    @click="AlarmActions('ForceAllRun')"
                                    :color="ActionsStatus[0].value ? 'red' : 'FF3B3B'"
                                    :dark="ActionsStatus[0].value ? true : false"
                                >
                                    強制全部啟動
                                </v-btn>
                                <v-btn 
                                    class="ma-2"
                                    @click="AlarmActions('ForceAllStop')"
                                    :color="ActionsStatus[1].value ? 'red' : 'FF3B3B'"
                                    :dark="ActionsStatus[1].value ? true : false"
                                >
                                    強制全部停止
                                </v-btn>
                            </v-row>
                            <v-row class="ma-2" v-if="CheckIdentity(['Operator','Manager','Installer','Developer'])">
                                <v-btn 
                                    v-if="ACSetting.IsManual && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                                    class="ma-2"
                                    :class="ActionsStatus[2].value ? 'white--text':''"
                                    @click="ManualStartorStop('ARunStop')"
                                    :color="ActionsStatus[2].value ? 'grey' : 'FF3B3B'"
                                >
                                    {{ActionsStatus[2].value ? '停止空調箱A':'啟動空調箱A'}}
                                </v-btn>
                                <v-btn 
                                    v-if="ACSetting.IsManual && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                                    class="ma-2"
                                    :class="ActionsStatus[3].value ? 'white--text':''"
                                    @click="ManualStartorStop('BRunStop')"
                                    :color="ActionsStatus[3].value ?  'grey' : 'FF3B3B'"
                                >
                                    {{ActionsStatus[3].value ? '停止空調箱B':'啟動空調箱B'}}
                                </v-btn>
                                <v-btn
                                    class="ma-2"
                                    color="primary"
                                    v-if="!ACSetting.IsManual && !ACSetting.IsTimePeriodMode && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                                    @click="Actions('ForceChange',true)"
                                >
                                    強制切換主機
                                </v-btn>
                                <v-btn
                                    v-if="hasUser && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                                    class="ma-2"
                                    @click="AlarmActions('ResetRunningTime',true)"
                                >
                                    運轉時間歸零
                                </v-btn>
                            </v-row>
                        </div>
                        <v-btn
                            v-if="hasUser && CheckIdentity(['Operator','Manager','Installer','Developer'])"
                            class="ma-2 mt-10"
                            color="primary"
                            @click="Save"
                            :loading="loading"
                        >
                            套用
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
    <DoubleCheckDialog
        :dialog.sync="alertDialog"
        :message="alertMessage"
        :alertFunc="currentAction"
        :action="alertAction"
        :danger="true"
        @Comfirm="Comfirm()"
    />
    </div>
</template>

<script>
import DoubleCheckDialog from "@/components/Dialogs/DoubleCheckDialog.vue"
import axios from "axios"
import Vue from "vue"
export default {
    name: 'ACdemo',
    components: { 
        DoubleCheckDialog
    },
    data() {
        return{
            
            Passcode:null,
            ACStatus:null,
            ACSetting:null,
            LongestRunningAC:null,
            LongestRunningTime:null,
            CurrentMode:null,
            mode:[
                {
                    id:"manual",
                    label:"遠端手動",
                    value:true,
                },
                {
                    id:"auto",
                    label:"遠端自動",
                    value:false,
                }
            ],
            CurrentOperationMode:null,
            OperationModeOptions:[
                {
                    id:"period",
                    label:"時段模式",
                    value:true,
                },
                {
                    id:"timing",
                    label:"計時模式",
                    value:false,
                },
            ],
            TimeUnits:[
                {
                    id:"Day",
                    label:"天"
                },
                {
                    id:"Hour",
                    label:"時"
                },
            ],
            getDataInterval:null,
            ActionsStatus:[
                {
                    id:"ForceAllRun",
                    value:null
                },
                {
                    id:"ForceAllStop",
                    value:null
                },
                {
                    id:"ARunStop",
                    value:null
                },
                {
                    id:"BRunStop",
                    value:true
                }
            ],
            alertDialog:false,
            alertMessage:"",
            currentAction:null,
            currentActionName:null,
            currentActionValue:null,
            alertAction:"",
            alertDanger:true,
            loading:false,
            previousRequest:null,
        }
    },
    computed:{
       hasUser:{
           get(){
               let User = localStorage.getItem("UserInfo");
                if(User){
                    return true;
                }else{
                    return false;
                }
           },
            
        },
    },
    watch:{

    },
    beforeDestroy(){
        this.$api.AirCon.cancel();
    },
    mounted(){
        console.log(this.$vuetify.breakpoint)
        this.$api.AirCon.start();
        if(this.hasUser){
            this.GetSettings();
        }
        this.GetDisplay();
        this.GetActionsStatus();
    },
    methods:{
        Actions(name,value){
            clearInterval(this.getDataInterval);
            this.StartPageLoading();
            this.Passcode = this.GetPasscode();
            this.$api.AirCon.GetOperateNameValue(name, value, this.Passcode)
            .then(res=>{
                console.log(res)
                this.Info("執行成功")
            })
            .catch(err=>{
                console.log(err)
                this.Initial(err);
            })
            .finally(()=>{
                // this.GetDisplay()
                // .then(()=>{
                //     this.GetSettings()
                //     .then(()=>{
                //         this.GetActionsStatus();
                        
                //     })
                // });
            })
        },
        GetDisplay(){
            this.$api.AirCon.GetDisplay()
            .then(res=>{
                // console.log(res)
                this.ACStatus = res.data;
                let ARunningTime = this.CalculateRunningTime(this.ACStatus.A.RunningTime);
                let BRunningTime = this.CalculateRunningTime(this.ACStatus.B.RunningTime);
                this.LongestRunningTime = (ARunningTime > BRunningTime) ? this.ACStatus.A.RunningTime : this.ACStatus.B.RunningTime;
                this.LongestRunningAC = (ARunningTime > BRunningTime) ? "空調箱A" : "空調箱B";
                
                
                
            })
            .catch(err=>{
                // console.log(err)
                // this.Initial(err);
            })
            .finally(()=>{
                setTimeout(() => {
                    this.GetDisplay();
                },1000);
                // this.$store.state.loading = false;
                
            })
        },
        GetSettings(){
            this.Passcode = this.GetPasscode();
            this.$api.AirCon.GetSettings(this.Passcode)
            .then(res=>{
                // console.log(res)
                this.ACSetting = res.data;
                
            })
            .catch(err=>{
                // console.log(err)
                // this.Initial(err);
            })
            .finally(()=>{
                
                // this.StopPageLoading();
                
            })
        },
        GetActionsStatus(){
            this.Passcode = this.GetPasscode();
            this.ActionsStatus.forEach((e,i)=>{
                this.$api.AirCon.GetOperateName(e.id, this.Passcode)
                .then(res=>{
                    // console.log(res)
                    // this.StopPageLoading();
                    this.ActionsStatus[i].value = res.data;
                    // this.GetActionsStatus();
                    
                })
                .catch(err=>{
                    // this.$api.AirCon.cancel();
                })
                .finally(()=>{
                    if(!this.hasUser) return;
                    if(i===this.ActionsStatus.length-1){
                        setTimeout(() => {
                            this.GetActionsStatus();
                            this.$forceUpdate();
                        },1000);
                    }
                    
                })
            })
        },
        Comfirm(){
            this.Actions(this.currentActionName,this.currentActionValue)
        },
        AlarmActions(id){
            this.currentActionName = id;
            let target = this.ActionsStatus.find(e=>e.id===id)
            if(target){
                if(target.value){
                    this.currentActionValue = false;
                }else{
                    this.currentActionValue = true;
                }
            }

            this.alertDialog = true;
            let action;
            switch(id){
                case "ForceAllRun":
                    action = "強制全部啟動？"
                    break;
                case "ForceAllStop":
                    action = "強制全部停止？"
                    break;
                case "ResetRunningTime":
                    action = "將運轉時間歸零？"
                    this.currentActionValue = true;
                    break;
            }
            let sureText = this.currentActionValue ? "啟動" : "關閉";
            this.alertMessage=`確定要${sureText} ${action}`;
            this.alertAction="確定";
        },
        CheckIdentity(identitys){
            let Identity = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")).Identity : null;
            let hasIdentity = identitys.find(e=>e===Identity);
            if(hasIdentity){
                return true;
            }else{
                false;
            }
            
        },
        GetPasscode(){
            return localStorage.getItem("UserInfo") ? 
            JSON.parse(localStorage.getItem("UserInfo")).Passcode : null;
        },
        
        hasIdentity(){

        },
        ManualStartorStop(id){
            let target = this.ActionsStatus.find(e=>e.id===id)
            if(target.value){
                // this.ACStatus[id].Status = "Run"
                this.Actions(id, false);
            }else{
                // this.ACStatus[id].Status = "Stop"
                this.Actions(id, true);
            }
            this.$forceUpdate();
        },
        CheckManualStartorStop(val){
            switch(val){
                case "Run":
                    return false;
                default:
                    return true;
            }
        },
        CalculateRunningTime(val){
            let time = (val.Days*60*60*24)+(val.Hours*60*60)+(val.Minutes*60)+(val.Seconds);
            return time;
        },
        Save(){
            // clearInterval(this.getDataInterval);
            // this.StartPageLoading();
            this.loading=true;
            this.Passcode = this.GetPasscode();
            this.$api.AirCon.UpdateSettings(this.ACSetting, this.Passcode)
            .then(res=>{
                // console.log(res)
            })
            .catch(err=>{
                console.log(err)
                this.Initial(err);
            })
            .finally(()=>{
                this.Info("套用成功")
                this.loading=false;
                // this.StopPageLoading();
            })
        },
    },
}
</script>

<style scoped>
p{
    color: white;
}
.actions-area{
    border: 1px solid #f1f1f1;
    border-radius: 5px;
}
.v-text-field{
    max-width: 150px;
}
.no-flex{
    min-width: max-content;
}
.main-container{
    overflow-y:auto;
    margin-top: 64px;
    padding: 25px;
    /* height: 100vh; */
    /* max-height: calc(100vh - 24px); */
    max-height: calc(100vh - 60px) !important;
}
.container {
  /* background-image:url("../assets/background.png") */
  overflow: auto;
  background-color: #f1f1f1;
  height: calc(100vh - 24px);
}
.v-application{
  background: unset !important;
}
.img-area{
    /* margin-top: 50px; */
    /* max-height: 430px; */
    position: absolute;
}
.img-area-parent{
    min-width: 600px;
    min-height: 900px;
}
.room-img{
    max-width: 1000px;
    /* position: absolute; */
}







@keyframes spin{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.ac-container{
    top: -580px;
    position: relative;

}
.ac{
    position: absolute;
    padding: 0px 14px 0px 14px;
    max-width: 71px;
}
.ac.on{
    background-color: #0BC669 ;
}
.ac.off{
    background-color: #394153;
}
.ac p{
    color:white;
}
#fan-a{
    top: -5px;
    left: 500px;
}
#ac-a{
    top: 40px;
    left: 480px;
}
#fan-b{
    top: -5px;
    left: 600px;
}
#ac-b{
    top: 40px;
    left: 580px;
}
#fan-c{
    top: -5px;
    left: 700px;
}
#ac-c{
    top: 40px;
    left: 680px;
}
#fan-d{
    top: 160px;
    left: 770px;
}
#ac-d{
    top: 200px;
    left: 750px;
}
.ceiling-container.on{
    animation: spin 1000ms linear infinite;
}
.ceiling-container.off{
    animation: none;
}
.ceiling-container{
    width: 34px;
    height: 34px;
  border-radius: 50%;
  position: absolute;
  display: inline-block;
}
.ceiling-container:after{
    content:"";
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;
    background: #444;
    box-shadow: inset 0 0px 0px 8px #444444, inset 0 1px 5px 22px #383838;
  }
.ceiling-fan{
  display: block;
  background: #ccc;
  border-radius: 5px;
  position: absolute;
  box-shadow: inset 1px 1px 40px #555;
}
.ceiling-fan:after{
content: "";
position: absolute;
background: #666;
display: block;
}
.ceiling-fan.horizontal{
    width: auto;
    height: 7px;
    top: 50%;
    margin-top: -4px;
    transform: skewX(20deg);
}
.ceiling-fan.horizontal:after{
    top: 41%;
      width: 15px;
      height: 15%;
}



.ceiling-fan.vertical{
    width: 7px;
    height: auto;
    left: 50%;
    margin-left: -4px;
    transform: skewY(20deg);
}
.ceiling-fan.vertical:after{
    height: 15px;
    width: 15%;
    margin-left: 25%;
}
.ceiling-fan.left{
    left: 0;
    right: 50%;
    margin-right: 5px;
    border-radius: 50% 15px 15px 50%;
}
.ceiling-fan.left:after{
    left: 100%;
}

.ceiling-fan.right{
    right: 0;
    left: 50%;
    margin-left: 5px;
    border-radius: 15px 50% 50% 15px;
}
.ceiling-fan.right:after{
    right: 100%;
}

.ceiling-fan.top{
    top: 0;
    bottom: 50%;
    margin-bottom: 5px;
    border-radius: 50% 50% 15px 15px;
}
.ceiling-fan.top:after{
    top: 100%;
}

.ceiling-fan.bottom{
    top: 50%;
    bottom: 0;
    margin-top: 5px;
     border-radius: 15px 15px 50% 50%;
}
.ceiling-fan.bottom:after{
    bottom: 100%;
}
</style>