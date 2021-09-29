<template>
    <div class="main-container">
        <v-row class="px-3 mb-2 align-center">
            <p class="text-h6 font-weight-bold my-0">溫濕度</p>
        </v-row>
        <div class="img-area pa-5">
            <v-img
                class="room-img"
                src="@/assets/powerlayout.png"
            />
            <template>
                <div v-for="(device, index) in items" :key="index">
                    <div 
                    :class="
                    `powerMeter pa-3 px-5 th-`
                    +index 
                    + ' '
                    + checkSide(index) 
                    + ' '
                    + alarmingDevice(device)"
                    >
                        <p class="powerMeterName mb-0">{{device.Name}}</p>
                        <p 
                        :class="`temperature mb-0 `+alarmingValue(device.Data.Temperature)"
                        @click="GoSearch(device.Id,'Temperature')"
                        >溫度：{{device.Data.Temperature.Value}} °C</p>
                        <p 
                        :class="`humidity mb-0 `+ alarmingValue(device.Data.Humidity)"
                        @click="GoSearch(device.Id,'Humidity')"
                        >濕度：{{device.Data.Humidity.Value}} %</p>
                    </div>
                </div>
            </template>
            <DoubleCheckDialog
                :dialog.sync="alertDialog"
                :message="alertMessage"
                :alertFunc="currentAction"
                :action="alertAction"
                :danger="true"
                @Comfirm="Comfirm()"
            />
        </div>
    </div>
</template>

<script>
import DoubleCheckDialog from "@/components/Dialogs/DoubleCheckDialog.vue"
export default {
    name: 'thermometers',
    components: { 
        DoubleCheckDialog
    },
    data() {
        return{
            items:[],
            Passcode:null,
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

    },
    created(){
    },
    mounted(){
        this.$api.Devices.start();
        this.GetDecices();
        
    },
    methods:{
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
        
        GetDecices(){
            // this.getDevicesInterval = setInterval(() => {
            this.$api.Devices.GetDevices2()
            .then(res=>{
                Object.keys(res.data).forEach(type=>{
                    if(type==="THMeters"){
                        this.items = res.data[`${type}`]
                    }
                })
            })
            .catch(err=>{
                // console.log(err)
                if(err.message==='cancelled'){

                }else{
                    // this.Initial(err);
                }
            })
            .finally(()=>{
                this.$store.state.loading = false;
                // setTimeout(() => {
                    // this.GetDecices();
                // }, 1000);
                
                // clearInterval(this.getDevicesInterval);
            })
            // }, 1000);
            
        },
        checkSide(index){
            switch(index){
                case 0:
                    return "right top"
                case 1:
                case 4:
                    return "right bottom"
                case 7:
                    return "left bottom";
                default:
                    return "right top";
            }
        },
        alarmingDevice(data){
            let hasAlarm = 0;
            Object.values(data.Data).forEach(data=>{
            
            if(
                data.IsLowerLimitAlarm 
                || data.IsUpperLimitAlarm
                || data.IsAlarm
            ){
                hasAlarm+=1;
            }
            })
            return hasAlarm>0 ? "alarm" : "";
        },
        alarmingValue(data){
            if(
            data.IsLowerLimitAlarm 
            || data.IsUpperLimitAlarm
            || data.IsAlarm
            ){
                return "alarm";
            }else{
                return "";
            }
        },
        GoSearch(deviceId, valueId){
            this.$router.push({name:'history', params: { deviceId: deviceId, valueId: valueId }})
        },
    },
}
</script>

<style scoped>
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
    padding: 25px;
    height: 100vh;
    max-height: calc(100vh - 90px);
    position: relative;
    /* height: 100vh; */
    /* max-height: calc(100vh - 24px); */
    /* max-height: calc(100vh - 60px) !important; */
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
    /* overflow: auto;
    max-width: calc(100vw - 305px);
    min-width: 1200px;
    max-height: 100vh;
    min-height: 1200px; */
}
.room-img{
    max-width: 1200px;
    position: relative;
}
.powerMeter{
    top: 0px;
    position: absolute;
    /* width:max-content; */
    width: 160px;
    height:max-content;
    background-color: rgba(0, 0, 0, 0.5);
    /* border: solid 0.5px #00ade2; */
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    text-align: left;
}
.humidity, .temperature{
    cursor: pointer;
}
.humidity.alarm, .temperature.alarm{
    color: #ff720b !important;
    font-weight: 700;
}
.powerMeter::before{
    content: '';
    display: inline-block;
    position: absolute;
    left: 100%;
    top: -7.5px;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    background-color: rgb(0 0 0 / 60%);
    
}
.powerMeter.alarm::before{
    background-color: #ff710bd3;
    animation: heartbeat 1s infinite;
}
.powerMeter.right.top::before{
    left: 100%;
}
.powerMeter.right.bottom::before{
    left: 100%;
    top: calc(100% - 7.5px);
}
.powerMeter.left.top::before{
    left: -15px;
}
.powerMeter.left.bottom::before{
    left: -15px;
    top: calc(100% - 7.5px);
}
.powerMeterName{
    color: #ffeb3b;
    font-weight: 700;
}
.powerMeter .temperature, .powerMeter .humidity{
    color: #f1f1f1;
    font-size: 0.9rem;
}
.powerMeter.th-0{
    /* ba501 */
    left: 41%;
    top: 86%;
}
.powerMeter.th-1{
    /* ba501-1 */
    left: 48%;
    top: 72%;
}
.powerMeter.th-2{
    /* ba510 */
    left: 60%;
    top: 81%;
}
.powerMeter.th-3{
    /* ba504 */
    left: 79%;
    top: 77%;
}
.powerMeter.th-4{
    /* ba507 */
    left: 78%;
    top: 61%;
}
.powerMeter.th-5{
    /* ba511 */
    left: 63%;
    top: 70%;
}
.powerMeter.th-6{
    /* ba513 */
    left: 65%;
    top: 40%;
}
.powerMeter.th-7{
    /* ba509 */
    left: 84%;
    top: 36%;
}
.powerMeter.th-8{
    /* ba503-1 */
    left: 30%;
    top: 38%;
}
.powerMeter.th-9{
    /* ba503-2 */
    left: 20%;
    top: 13%;
}

@keyframes heartbeat
{
  0%
  {
    transform: scale( 1 );
  }
  20%
  {
    transform: scale( 2 );
  }
  40%
  {
    transform: scale( 1 );
  }
  60%
  {
    transform: scale( 2 );
  }
  80%
  {
    transform: scale( 2 );
  }
  100%
  {
    transform: scale( 1 );
  }
}
</style>