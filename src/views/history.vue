<template>
    
    <div class="main-container">
        <v-row class="px-3 align-center">
            <p class="text-h6 font-weight-bold my-0 mr-5">歷史資料</p>
            <!-- <Combobox 
                :items="searchOptions"
                @change="selected($event)"
                style="max-width:300px; margin-top:10px"
            /> -->
            
        </v-row>
         <v-row class="mt-5 px-3 align-center">
             <v-select
                item-text="DeviceName"
                item-value="DeviceId"
                class="mr-2"
                hide-details
                v-model="selectedDeviceOption"
                label="查詢裝置"
                :items="searchDeviceOptions"
                solo
                :loading="optionLoading"
                style="max-width:300px; margin-top:10px"
                @change="GetSearchValueOptions($event)"
            ></v-select>
            <v-select
                item-text="ValueName"
                item-value="ValueId"
                hide-details
                v-model="selectedValueOption"
                label="查詢數值"
                :items="searchValueOptions"
                solo
                style="max-width:300px; margin-top:10px"
            ></v-select>
         </v-row>
        <v-row class="mb-2 px-3 align-center">
            <v-radio-group
                v-model="dateType"
                row
                class="time_range"
            >
            <v-radio
                label="今天"
                value="currentDay"
            ></v-radio>
            <v-radio
                label="近七天"
                value="currentWeek"
            ></v-radio>
            <v-radio
                label="近一個月"
                value="currentMonth"
            ></v-radio>
            <v-radio
                label="自訂"
                value="custom"
            ></v-radio>
            </v-radio-group>
            <v-row class="mx-0 align-center" v-if="dateType==='custom'">
                <v-text-field
                    v-model="startDate"
                    :rules="[rules.format]"
                    label="開始"
                    prepend-icon="mdi-calendar"
                    @click="showCalendar=true"
                    @input="dateChange($event,'start')"
                    style="max-width:300px;"
                >
                </v-text-field>
                <v-text-field
                    class="mr-3"
                    v-model="endDate"
                    :rules="[rules.format]"
                    label="結束"
                    prepend-icon="mdi-calendar"
                    @click="showCalendar=true"
                    @input="dateChange($event,'end')"
                    style="max-width:300px;"
                >
                </v-text-field>
                
            </v-row>
            <v-btn 
                :loading="loading"
                color='primary' 
                @click="Search()"
            >
            查詢
            </v-btn>
        </v-row>
        <v-row 
            v-if="dateType!=='custom'"
            class="mx-0 my-0 mb-2"
        >
            <p class="my-0 caption">查詢範圍：{{this.endTime}} — {{this.endDate}}</p>
        </v-row>
        <v-tabs
            color="primary"
            background-color="transparent"
            @change="changeTab"
        >
        <v-tab>圖像資料</v-tab>
        <v-tab>表格資料</v-tab>
        <v-tab-item>
            <div id="chart" ref="myChart"></div>
        </v-tab-item>
        <v-tab-item>
            <v-card>
                <v-card-title>
                查詢結果
                <v-spacer></v-spacer>
                    <v-text-field
                        class="mr-5"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <vue-json-to-csv
                        :json-data="historyData"
                        :csv-title="fileName"
                    >
                        <v-btn 
                            color="green" 
                            :disabled="CheckValid()"
                            class="mt-3 white--text"
                            @click="exportFile">
                            <v-icon class="mr-1">mdi-file-excel-box</v-icon>
                            匯出
                        </v-btn>
                    </vue-json-to-csv>
                </v-card-title>
                <v-data-table
                    :loading="loading"
                    :headers="tableHeaders"
                    :items="historyData"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1"
                ></v-data-table>
            </v-card>
            
        </v-tab-item>
        
        </v-tabs>
        <v-dialog
            ref="dialog"
            v-model="showCalendar"
            persistent
            width="290px"
        >
            <v-date-picker
                v-model="dates"
                ref="datepicker"
                :range="range"
                color="primary"
                no-title
                reactive
                scrollable
                @input="pickerDatesChange($event)"
            >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="showCalendar=false"
            >
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="showCalendar=false"
            >
                OK
            </v-btn>
            </v-date-picker>
        </v-dialog>
        <v-snackbar
            v-model="snackbar"
            color="#FF3B3B"
        >
        {{ snackText }}
        <template v-slot:action="{ attrs }">
            <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
    </div>
</template>

<script>
import moment from "moment/src/moment"
import "moment/src/locale/zh-tw";
import * as echarts from 'echarts';
import VueJsonToCsv from 'vue-json-to-csv'
// import Combobox from '@/components/Combobox.vue'

export default {
    name: 'History',
    components: { VueJsonToCsv},
    data() {
        return{
            dateType:null,
            loading:false,
            optionLoading:false,
            snackbar:false,
            snackText:"",
            // searchOptions: [],
            searchDeviceOptions:[],
            selectedDeviceOption:null,
            searchValueOptions:[],
            selectedValueOption:null,
            searchItems:[],
            startDate: moment().format("YYYY-MM-01"),
            endDate: moment().format("YYYY-MM-DD"),
            endTime: moment().format("YYYY-MM-DD"),
            dates:[ moment().format("YYYY-MM-01"), moment().format("YYYY-MM-DD")],
            rules: {
                required: value => !!value || 'Required.',
                format: date => moment(date, 'YYYY-MM-DD', true).isValid() || '日期格式錯誤，範例：2000-12-01',
            },
            range:true,
            showCalendar:false,
            dialog:false,
            history:null,
            historyData:null,
            tableHeaders:[
                {
                    text: '項次',
                    align: 'start',
                    sortable: false,
                    value: 'Index',
                },
                {
                    text: '類型',
                    align: 'start',
                    sortable: false,
                    value: 'Item',
                },
                {
                    text: '時間',
                    align: 'start',
                    sortable: true,
                    value: 'Time',
                },
                {
                    text: '數值',
                    align: 'start',
                    sortable: true,
                    value: 'Value',
                },
            ],
            search:'',
            fileName:'',

            myChart:null,
            option:{
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {show: false, type: ['line','bar'],title: {
                            line: 'line',
                            bar: 'bar',
                        },},
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: "",
                        min: 0,
                        max: 100,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [],
            }
        }
    },
    watch:{
        dateType(val){
            this.GetTimePeriod();
            if(val!=='custom'){
                this.endDate = moment().format("YYYY-MM-DD");
            }
            
        }
    },
    mounted(){
        console.log(this.$route.params)
        this.selectedDeviceOption = this.$route.params.deviceId ? this.$route.params.deviceId : "";
        this.selectedValueOption = this.$route.params.valueId ? this.$route.params.valueId : "";
        // this.$store.state.loading = true;
        this.dateType = 'currentDay';
        this.optionLoading = true;
        this.GetQueryOptions();
        this.InitHistory();

        //resize EventListener
        window.addEventListener('resize', ()=>{
            if(this.myChart){
                this.myChart.resize();
            }
        })
    },
    methods:{
        GetQueryOptions(){
            this.$api.Logs.GetQueryOptions()
            .then(res=>{
                this.searchDeviceOptions = res.data;
                let deviceId = this.$route.params.deviceId;
                let valueId = this.$route.params.valueId;
                let selectedDeviceOption = this.searchDeviceOptions.find(e=>e.DeviceId === deviceId);
                if(selectedDeviceOption){
                    this.selectedDeviceOption = selectedDeviceOption.DeviceId;
                    this.searchValueOptions = selectedDeviceOption.Values;
                    let selectedValueOption = this.searchValueOptions.find(e=>e.ValueId === valueId);
                    if(selectedValueOption){
                        this.selectedValueOption = selectedValueOption.ValueId;
                    }else{
                        this.selectedValueOption = null;
                    }
                }else{
                    this.selectedDeviceOption = null;
                }
            })
            .finally(()=>{
                // this.$store.state.loading = false;
                this.optionLoading=false;
            })
            
        },
        GetSearchValueOptions(deviceId){
            let device = this.searchDeviceOptions.find(e=>e.DeviceId === deviceId);
            if(device){
                this.searchValueOptions = device.Values;
            }
        },
        InitHistory(){
            if(!this.history) return;
            this.option.xAxis[0].data=[];
            this.option.series=[
                {
                    name: this.history.ValueName,
                    type: 'line',
                    data: [],
                }
            ];
            this.history.Datas.forEach((e)=>{
                this.option.xAxis[0].data.push(moment(e.Time).format('YYYY-MM-DD h:mm:ss'));
                this.option.series[0].data.push(e.Value);
            });

            this.option.yAxis[0].axisLabel.formatter = `{value} ${this.history.Unit}`;
            this.option.yAxis[0].name = this.history.DeviceName+'-'+this.history.ValueName;
            let min = Math.ceil(Math.min(...this.history.Datas.map(e => e.Value)))-2;
            let max = Math.ceil(Math.max(...this.history.Datas.map(e => e.Value)))+2;
            let between = Math.abs(min-max);
            this.option.yAxis[0].min = min;
            this.option.yAxis[0].max = max;

            if(between<50){
                this.option.yAxis[0].interval = 1;
            }else{
                this.option.yAxis[0].interval = 5;
            }
            
            this.historyData  = this.history.Datas;
            this.historyData.forEach((e, i)=>{
                e.Item = this.history.DeviceName+'-'+this.history.ValueName;
                e.Index = i+1;
                e.Time=e.Time ? moment(e.Time).format('YYYY-MM-DD h:mm:ss') : null;
            });
            this.InitialChart();
        },
        InitialChart(){
            
            if(this.myChart){
                this.myChart.dispose();
            }
            var chartDom = document.getElementById('chart');
            this.myChart = echarts.init(chartDom, 'dark');
            this.myChart.setOption(this.option);
        },
        selected(e){
            this.searchItems = e;
        },
        CheckValid(){
            let user = this.$store.getters.GetUserInfo;
            if(!user) return true;
            switch(user.Identity){
                case "Manager":
                case "Developer":
                case "Installer":
                case "Operator":
                    return false;
                default:
                    return true;
            }
        },
        exportFile(){
            this.fileName= "History_Data_"+this.endTime+"-"+this.endDate;
        },
        changeTab(e){
            if(e===1){
                // if(this.myChart){
                //     this.myChart.dispose();
                // }
            }
            if(e===0){
                // setTimeout(() => {
                //     this.InitialChart();
                // });
            }
        },
        
        dateChange(value){
            let _valid = moment(value, 'YYYY-MM-DD', true).isValid();
            if(_valid){
                this.dateSort(value, true);
            }
        },
        pickerDatesChange(value){
            switch(value.length){
                case 1:
                    this.startDate = value[0];
                    this.endDate=null;
                    break;
                case 2:
                    this.endDate = value[1];
                    this.dateSort(value[1],true);
                    break;
            }
        },
        dateSort(value){
            let diffMon = moment(value,'YYYY-MM').isBefore(moment(this.endDate,'YYYY-MM')) 
                || moment(value,'YYYY-MM').isBefore(moment(this.startDate,'YYYY-MM'));

            let _before = moment(this.endDate).isBefore(this.startDate);
            if( _before){
                this.startDate = value;
                this.endDate = this.dates[0];
            }
            let _after = moment(this.startDate).isAfter(this.endDate);
            if(_after){
                this.startDate = this.dates[1];
                this.endDate = value;
            }
            if(diffMon || moment(this.altDates,'YYYY-MM')!==moment(value,'YYYY-MM')){
                this.range = false;
                this.dates= value;
                this.altDates = value;
                setTimeout(() => {
                    this.range=true;
                    this.dates=[this.startDate,this.endDate];
                });
            }
        },
        GetTimePeriod(){
            switch(this.dateType){
                case "currentDay":
                    this.endTime = moment().format('YYYY-MM-DD');
                    break;
                case "currentWeek":
                    this.endTime = moment(moment().subtract(6, 'days')).format('YYYY-MM-DD');
                    break;
                case "currentMonth":
                    this.endTime = moment(moment().subtract(29, 'days')).format('YYYY-MM-DD');
                    break;
                case "custom":
                    this.endTime = this.startDate;
                    break;
            }
        },
        Search(){
            this.GetTimePeriod();
            if(!this.selectedDeviceOption){
                this.snackbar=true;
                this.snackText="請選擇查詢裝置"
                return;
            }
            if(!this.selectedValueOption){
                this.snackbar=true;
                this.snackText="請選擇查詢數值"
                return;
            }
            this.loading = true;
            
            // var a = moment(this.endTime);
            // var b = moment(this.endDate);
            // let days = b.diff(a, 'days') +1;
            // let tags = this.searchItems.map(e=>e.Id);
            // this.$api.Logs.Search(tags, this.endDate, days)
            this.$api.Logs.GetLogs(this.selectedDeviceOption, this.selectedValueOption, this.endTime, this.endDate)
            .then(res=>{
                res.data.Datas.sort(function(a,b){
                    return moment(b.Time).format()<moment(a.Time).format(); 
                })
                this.historyData=null;
                this.history = res.data;
                this.InitHistory();
            })
            .catch(error=>{
                this.Initial(error);
            })
            .finally(()=>{
                this.loading = false;
                this.$store.state.loading =false;
            })
        },


        
    },
}
</script>

<style scoped>
.main-container{
    overflow-y:auto;
    margin-top: 64px;
    /* padding: 25px; */
    height: 100vh;
    max-height: calc(100vh - 90px);
}
#chart{
    width: auto;
    height: calc(100vh - 300px);
}
.main-container >>> .v-data-table__wrapper{
    height: auto !important;
    overflow-y: auto !important;
}
.v-tabs >>> .v-tabs-items{
    overflow: hidden !important;
    max-height: none !important;
}
.time_range >>> i {
  color: #1976d2 !important;
}
p, .time_range >>> label{
    color: white;
}
.v-tab.v-tab--active{
    color: white !important;
}
.v-tab{
    color: rgb(129, 129, 129) !important;
}
</style>