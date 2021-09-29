<template>
    
    <div class="main-container">
        <v-row class="px-3 align-center">
            <p class="text-h6 font-weight-bold my-0 mr-5">警報資料</p>
            <Combobox 
                :items="searchOptions"
                @change="selectedOptions($event)"
                multiple
                style="max-width:300px; margin-top:10px"
            />
        </v-row>
        <v-row class="mt-5 mb-2 px-3 align-center">
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
        <v-card flat>
            <v-card-title>
            查詢結果
            <v-spacer></v-spacer>
            <v-text-field
                class="mr-5 search-bar"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <div class="mt-3">
                <v-btn 
                    class="mr-5 white--text"
                    color="red" 
                    :disabled="selectedItem.length<=0"
                    @click="deleteSelected"
                    :loading="deleteLoading"
                >
                    <v-icon class="mr-1">mdi-delete</v-icon>
                    刪除
                </v-btn>
                <vue-json-to-csv
                    :json-data="alarms.Alarms"
                    :csv-title="fileName"
                >
                    <v-btn 
                        color="green" 
                        :disabled="CheckValid() && !alarms.Alarms.length>0"
                        class="white--text"
                        @click="exportFile">
                        <v-icon class="mr-1">mdi-file-excel-box</v-icon>
                        匯出
                    </v-btn>
                </vue-json-to-csv>
            </div>
            </v-card-title>
            <v-data-table
                :loading="loading"
                v-model="selectedItem"
                item-key="Index"
                :show-select="!CheckValid()"
                :headers="tableHeaders"
                :items="alarms.Alarms"
                :items-per-page="10"
                :search="search"
                class="elevation-1"
            ></v-data-table>
        </v-card>
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
import Combobox from '@/components/Combobox.vue'

export default {
    name: 'AlarmManagement',
    components: { VueJsonToCsv, Combobox},
    data() {
        return{
            dateType:null,
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
            selectedItem:[],
            searchItems:[],
            searchOptions:[],
            loading:false,
            alarms:{
                "Count": 0,
                "IsOverLimit": false,
                "Alarms": []
            },
            // alarmsData:[],
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
                    value: 'Content',
                },
                {
                    text: '警報時間',
                    align: 'start',
                    sortable: true,
                    value: 'AlarmTime',
                },
                {
                    text: '解除時間',
                    align: 'start',
                    sortable: true,
                    value: 'ClearTime',
                },
            ],
            search:'',
            fileName:'',
            snackbar:false,
            snackText:"",
            deleteLoading:false,
        }
    },
    mounted(){
        this.dateType = 'currentDay';
        this.$store.state.loading=true;
        
        this.searchOptions=[];
        this.$api.Alarm.GetContents()
        .then(res=>{
            res.data.forEach(e => {
                let option={
                    Id:e,
                    Name:e
                }
                this.searchOptions.push(option);
            });
            
            console.log(res);
        })
        .finally(()=>{
            this.$store.state.loading=false;
        })
    },
    watch:{
        dateType(val){
            this.GetTimePeriod();
            if(val!=='custom'){
                this.endDate = moment().format("YYYY-MM-DD");
            }
            
        }
    },
    methods:{
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
        selectedOptions(items){
            this.searchItems = items;
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
        deleteSelected(){
            this.deleteLoading = true;
            let deleteItems = this.selectedItem.map(e=>e.Id);
            let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
            deleteItems.forEach(e=>{
                this.$api.Alarm.Delete(passcode, e)
                .then(()=>{
                    let index = this.alarms.Alarms.findIndex(k=>k.Id === e);
                    this.alarms.Alarms.splice(index,1);
                })
                .catch(error=>{
                    this.Initial(error);
                })
                .finally(()=>{
                    this.deleteLoading = false;
                    this.selectedItem=[];
                    this.Search();
                })
                
            })
            //**刪除API */
        },
        exportFile(){
            this.fileName= "Alarm_Report_"+this.endTime+"-"+this.endDate;
        },
        changeTab(e){
            if(e===0){
                if(this.myChart){
                    this.myChart.dispose();
                }
                
            }
            if(e===1){
                setTimeout(() => {
                    var chartDom = document.getElementById('chart');
                    this.myChart = echarts.init(chartDom);
                    this.myChart.setOption(this.option);
                });
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
        Search(){
            this.GetTimePeriod();
            if(this.searchItems.length<=0){
                this.snackbar=true;
                this.snackText="請選擇查詢項目"
                return;
            }
            this.loading = true;
            let tags = this.searchItems.map(e=>e.Id);

            this.$api.Alarm.Search(this.endTime, this.endDate, tags)
            .then(res=>{
                console.log(res)
                this.alarms = res.data;
                this.alarms.Alarms.map((e,i)=>{
                    e.Index = i;
                    e.AlarmTime=moment(e.AlarmTime).format('YYYY-MM-DD h:mm:ss');
                    e.ClearTime=
                    e.ClearTime ? moment(e.ClearTime).format('YYYY-MM-DD h:mm:ss') : "";
                })
                // this.alarmsData.forEach((e, i)=>{
                //     e.Index = i+1;
                // })
            })
            .catch(err=>{
                console.log(err);
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
    padding: 25px;
    height: 100vh;
    max-height: calc(100vh - 90px);
}
#chart{
    width: auto;
    height: calc(100vh - 300px);
}
.main-container >>> .v-data-table__wrapper{
    /* height: 470px !important; */
    overflow-y: auto !important;
}
.search-bar{
    max-width:330px
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