<template>
        <div class="main-container">
            
            <v-row class="px-3 align-center">
                <p class="text-h6 font-weight-bold my-0">啟用設備設定</p>
                <v-spacer/>
                <v-btn 
                    dark 
                    color="primary" 
                    :loading="loading"
                    @click="Save">
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
            <div class="data-container" v-show="!firstLoading">
                <template v-for="(item, i) in items">
                    <div :key="i" class="mb-10">
                        <p class="font-weight-bold text-left my-3" :key="i+'title'">{{item.title}}</p>
                        <div :key="i" class="d-flex flex-wrap justify-start">
                            <template v-for="(data, index) in item.data">
                                <EquipSetupCard 
                                    :key="index" 
                                    :index="index"
                                    :type="item.id"
                                    :item="data"
                                    @openDetail="openDetail($event)"
                                />
                            </template>
                        </div>
                    </div>
                </template>
            </div>
            <EquipSetupDetail 
                :index="index"
                :type="type"
                :item="selectedItem" 
                :dialog.sync="dialog"
                @SaveEdit="ChangeItem($event)"
            />
        </div>
</template>

<script>
import EquipSetupCard from '@/components/SetUp/EquipmentSetUp/EquipSetupCard.vue'
import EquipSetupDetail from '@/components/SetUp/EquipmentSetUp/EquipSetupDetail.vue'
// import data from '@/Data/equip.json'
// import thedata from "@/Data/alarm.json"

export default {
    name: 'EquipmentSetup',
    components: { 
        EquipSetupDetail, EquipSetupCard
    },
    data() {
        return{
            dialog:false,
            selectedItem:null,
            bread:[
                {
                    text: '設定',
                    disabled: false,
                    href: '',
                },
                {
                    text: '啟用設備設定',
                    disabled: false,
                    href: 'breadcrumbs_dashboard',
                }
            ],
            items:[],
            index:0,
            type:null,
            loading:false,
            firstLoading:false,
            items:[
                {
                    title:"數位輸入",
                    id:"DigitalInputs",
                    data:[],
                }, 
                {
                    title:"數位輸出",
                    id:"DigitalOutputs",
                    data:[],
                }, 
                {
                    title:"類比輸入",
                    id:"AnalogInputs",
                    data:[],
                }, 
                {
                    title:"不斷電系統",
                    id:"UPSs",
                    data:[],
                }, 
                {
                    title:"集合式電表",
                    id:"PowerMeters",
                    data:[],
                }, 
                {
                    title:"溫溼度",
                    id:"THMeters",
                    data:[],
                }, 
                {
                    title:"電力插座",
                    id:"PDUs",
                    data:[],
                }
            ],
        }
    },
    mounted(){
        // this.$root.$emit("loading", true);
        this.$store.state.loading = true;
        this.firstLoading = true;
        let getPasscode = setInterval(()=>{
            let passcode = this.$store.getters.GetUserInfo ? 
                this.$store.getters.GetUserInfo.Passcode : null;

            if(passcode){
                this.getDevices(passcode);
                clearInterval(getPasscode);
            }else{
                return;
            }
        })
        
    },
    methods:{
        async getDevices(){
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.DevSettings.GetDeviceSettings(passcode)
            .then(res=>{
                Object.keys(res.data).forEach(e=>{
                    let target = this.items.find(k=>k.id===e);
                    target.data = Object.values(res.data[e])
                    // let item={
                    //     title: e,
                    //     data: 
                    // }
                    // this.items.push(item)
                })
                this.$store.state.loading = false;
                this.firstLoading = false;
            })
            .catch((error)=>{
                this.Initial(error);
            })
            
            
        },
        openDetail(event){
            this.selectedItem = event.data;
            this.index = event.index;
            this.type = event.type;
            this.dialog=true;
        },
        ChangeItem(newItem){
            console.log(newItem)
            this.selectedItem = newItem;
            let group = this.items.find(e=>e.id===this.type).data;
            group[this.index] = this.selectedItem;

        },
        async Save(){
            
            let data = {};
            this.items.forEach(e=>{
                data[e.id] = e.data;
            })
            
            this.$store.state.loading = true;
            this.loading=true;

            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            this.$api.DevSettings.SaveDeviceSettings(passcode, data)
            .then(res=>{
                console.log(res)
            })
            .catch(error=>{
                console.log(error)
                this.Initial(error);
            })
            .finally(()=>{
                this.$store.state.loading = false;
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
    max-height: calc(100vh - 50px);
}
.v-tabs >>> .v-tabs-items{
    overflow: auto !important;
    max-height: calc(100vh - 260px) !important;
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