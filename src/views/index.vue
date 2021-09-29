<template>
        <div class="main-container">
            <v-row class="px-3 mb-2 align-center">
                <p class="text-h6 font-weight-bold my-0">電力</p>
            </v-row>
            <v-tabs
                color="primary"
                background-color="transparent"
                v-model="tabIndex"
                v-if="!loading"
                next-icon="mdi-arrow-right"
                prev-icon="mdi-arrow-left"
                show-arrows
            >
                <template v-for="(item, index) in tabs">
                    <v-tab 
                        :key="index"
                    >
                        {{item.title}}
                        <transition name="bounce">
                            <v-badge
                                v-if="item.alarms>0"
                                class="ml-2"
                                color="#FF3B3B"
                                :content="item.alarms"
                            ></v-badge>
                        </transition>
                    </v-tab>
                </template>
                <v-tabs-items 
                    v-model="tabIndex"
                    :touchless="true"
                >
                    <v-tab-item :key="'ac_system'">
                        <ACSystem/>
                    </v-tab-item>
                    <template v-for="(group, i) in items">
                        <v-tab-item :key="i">
                            <div class="d-flex flex-wrap justify-start">
                                <template v-for="(item, index) in group">
                                    
                                    <EquipmentCard 
                                        :key="index" 
                                        :item="item" 
                                        :type="tabs[tabIndex].id" 
                                        @openDetail="openDetail($event)"
                                    />
                                </template>
                            </div>
                            
                        </v-tab-item>
                    </template>
                    
                </v-tabs-items>
            </v-tabs>
            <EquipmentDetail 
                :item="selectedItem"
                :type="tabs[tabIndex].id"
                :dialog.sync="dialog"
                @ChangeData="ChangeData($event)"
                @CancelChange="CancelChange($event)"
            />
        </div>
</template>

<script>
import EquipmentCard from '@/components/Index/EquipmentCard.vue'
import EquipmentDetail from '@/components/Index/EquipmentDetail.vue'
// import devices from "@/Data/devices.json"
import PowerStatus from "@/components/PowerStatus.vue"
// import testdata from "@/Data/datatest.json"
import ACSystem from "@/components/ACSystem"
export default {
    name: 'Index',
    components: { 
        EquipmentCard, EquipmentDetail, PowerStatus, ACSystem
    },
    data() {
        return{
            tab:null,
            dialog:false,
            loading:this.$store.state.loading,
            tabIndex:0,
            tabs:[
                {
                    title:"空調系統",
                    id:"ACSystem",
                    alarms:0
                }, 
                {
                    title:"UPS",
                    id:"UPSs",
                    alarms:0
                }, 
                {
                    title:"電表",
                    id:"PowerMeters",
                    alarms:0
                },
                {
                    title:"溫濕度",
                    id:"THMeters",
                    alarms:0
                },
                
                {
                    title:"消防門檢",
                    id:"fireCheck",
                    alarms:0
                },
                {
                    title:"PDU",
                    id:"pdu",
                    alarms:0
                },
            ],
            selectedItem:null,
            bread:[
                {
                text: '已啟用設備資訊',
                disabled: false,
                href: 'breadcrumbs_dashboard',
                }
            ],
            items:[],
            getDevicesInterval:null,
            itemsCondition:["UPSs", "PowerMeters", "THMeters"]
        }
    },
    created(){
        
    },
    mounted(){
        this.$api.Devices.start();
        this.StartPageLoading();
        this.GetDecices();
    },
    beforeDestroy(){
        // clearInterval(this.getDevicesInterval);
        this.$api.Devices.cancel();
    },
    methods:{
        onScroll(){
            
        },
        openDetail(event){
            this.dialog=event.show;
            this.selectedItem = {item: event.item, data:event.datas};
        },
        GetDecices(){
            // this.getDevicesInterval = setInterval(() => {
            this.$api.Devices.GetDevices2()
            .then(res=>{
                // this.items = res.data;
                console.log(res.data)
                Object.keys(res.data).forEach(type=>{
                    if(this.itemsCondition.find(e=>e===type)){
                        this.items.push(res.data[`${type}`])
                        let group = this.tabs.find(e=>e.id===type);
                        group.alarms =0;
                        res.data[type].forEach(device=>{
                            Object.values(device.Data).forEach((val)=>{
                                if(val.IsLowerLimitAlarm || val.IsUpperLimitAlarm || val.IsAlarm){
                                    group.alarms+=1;
                                }
                            })
                        })
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
        CancelChange(event){
            let type = this.tabs[this.tabIndex].id;
            let item = this.items[type].find(e=>e.Id===event.item.Id);
            let data = {};
            event.data.forEach(e=>{
                data[e.name] = e.value;
            })
            item.Data = data;
            this.selectedItem.data = event.data;
        },
        ChangeData(event){
            let SetData = [{
                id:event.item.Id,
                type: this.tabs[this.tabIndex].id,
                data:[]
            }];
            event.data.forEach(e=>{
                let item = {
                    name: e.name,
                    index: e.value.Index,
                    isVisible: e.value.IsVisible
                }
                SetData[0].data.push(item)
            })
            

            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.LaySettings.LayoutSettings(passcode,SetData)
            .then(res=>{
                console.log(res)
                // this.GetDecices();
            })
        }
    },
}
</script>

<style scoped>
.main-container{
    overflow-y:auto;
    padding: 25px;
    height: 100vh;
    max-height: calc(100vh - 90px);
}
.v-tabs >>> .v-tabs-items{
    overflow: auto !important;
    /* min-height: calc(100vh - 220px) !important;
    max-height: calc(100vh - 220px) !important; */
    background-color: transparent;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
p, .v-tab.v-tab--active{
    color: white !important;
}
.v-tab{
    color: rgb(180, 180, 180) !important;
}
</style>