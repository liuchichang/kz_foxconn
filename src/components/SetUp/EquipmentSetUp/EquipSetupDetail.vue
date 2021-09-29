<template>
<v-row justify="center">
    <v-dialog
      v-model="openDialog"
      scrollable
      :max-width="$vuetify.breakpoint.mdAndUp ? '50%' : '90%'"
    >
        <v-card
            v-if="openDialog"
            class="mx-auto px-auto"
        >
            <v-card-title>
                <p :class="'font-weight-bold my-0 mr-3'">{{selectedItem.Id}}</p>
                <v-chip label small :color="Color" dark>{{$t(`EquipSetUp.${type}`)}}</v-chip>
                <v-spacer/>
                <p class='my-0 mr-2 font-weight-bold subtitle-2'>{{selectedItem.IsEnable ? '啟用' : '停用' }}</p>
                <v-switch
                    v-model="selectedItem.IsEnable"
                    inset
                    :color="Color"
                ></v-switch>
            </v-card-title>
            <v-card-text>
                <v-row class="mx-0 my-0 align-center">
                    <h3 
                        v-if="!editing"
                        class="justify-start"
                    >
                        {{selectedItem.Name}}
                    </h3>
                    <v-text-field
                    v-else
                    v-model="selectedItem.Name"
                    @click.stop=""
                    hide-details
                    >
                    </v-text-field>
                    <v-btn
                        v-if="!editing"
                        class="mr-2"
                        icon
                        @click.stop="editing=true"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        v-else
                        class="mr-2"
                        text
                        @click="CancelEdit"
                    >
                        取消
                    </v-btn>
                    <v-btn 
                        v-if="editing"
                        @click="SaveEdit"
                        icon
                    >
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-row>

            <v-divider class="my-5"/>
            <EquipSetupDODetail 
                v-if="checkType(selectedItem.Id)==='DO'" 
                :selectedItem="selectedItem" 
                :AlarmGroups="AlarmGroups"
                :AlarmViaDO="AlarmViaDO"
                :type="type"
            />
            <EquipSetupDIDetail 
                v-if="checkType(selectedItem.Id)==='DI'" 
                :selectedItem="selectedItem" 
                :AlarmGroups="AlarmGroups"
                :AlarmViaDO="AlarmViaDO"
                :type="type"
            />
            <EquipSetupAIDetail 
                v-if="checkType(selectedItem.Id)==='AI'" 
                :selectedItem="selectedItem" 
                :AlarmGroups="AlarmGroups"
                :AlarmViaDO="AlarmViaDO"
                :type="type"
            />
            <EquipSetupUPSDetail 
                v-if="checkType(selectedItem.Id)==='UPS'" 
                :selectedItem="selectedItem" 
                :AlarmGroups="AlarmGroups"
                :AlarmViaDO="AlarmViaDO"
                :type="type"
            />
            <EquipSetupOtherDetail 
                v-if="checkType(selectedItem.Id)==='Other'" 
                :selectedItem="selectedItem" 
                :AlarmGroups="AlarmGroups"
                :AlarmViaDO="AlarmViaDO"
                :type="type"
            />
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    text
                    @click="Cancel"
                >
                    取消
                </v-btn>
                <v-btn
                    @click="Save"
                    color="primary"
                >
                    儲存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import EquipSetupDIDetail from "./EquipSetupDIDetail"
import EquipSetupDODetail from "./EquipSetupDODetail"
import EquipSetupAIDetail from "./EquipSetupAIDetail"
import EquipSetupUPSDetail from "./EquipSetupUPSDetail"
import EquipSetupOtherDetail from "./EquipSetupOtherDetail"

export default {
  name: 'EquipSetupDetail',
  components: {
    EquipSetupDIDetail, EquipSetupDODetail, EquipSetupAIDetail, EquipSetupUPSDetail, EquipSetupOtherDetail
  },
  data() {
    return{
      editing:false,
      rawItem:null,
      selectedItem:null,
      AlarmGroups:[],
      AlarmSelected:[],
      AlarmViaDO:[
          {label:'None',value:"false"},
          {label:'DO-001',value:'DO-001'},
          {label:'DO-002',value:'DO-002'},
          {label:'DO-003',value:'DO-003'},
          {label:'DO-004',value:'DO-004'},
          {label:'DO-005',value:'DO-005'},
          {label:'DO-006',value:'DO-006'},
          {label:'DO-007',value:'DO-007'},
          {label:'DO-008',value:'DO-008'},
        ]
    }
  },
  props:["item","dialog", "type", "index"],
  computed:{
      Color: function(){
          switch(this.type){
            case "DigitalOutputs":
                return '#1867C0';
            case "DigitalInputs":
                return "#17A0BF";
            case "AnalogInputs":
                return "#0EC2A8";
            case "UPSs":
                return '#A2C200';
            case "PowerMeters":
                return "#91B0C2";
            case "THMeters":
                return "#5CA3CC";
            case "PDUs":
                return "#5C8CCC";
            default:
                return "primary";
          }
      },
      openDialog:{
            get(){
                return this.dialog
            },
            set(dialog){
                this.$emit("update:dialog", dialog)
            }
    }   
  },
  watch:{
    editing(val){
      if(val){
        this.rawItem= JSON.parse(JSON.stringify(this.item));
      }
    },
    openDialog(val){
        this.selectedItem = JSON.parse(JSON.stringify(this.item));
        if(!val){
            this.SaveEdit();
        }
    },
  },
  mounted(){
      let passcode = JSON.parse(localStorage.getItem("UserInfo")).Passcode;
      this.$api.AlaSettings.GetAlarmGroups(passcode)
      .then(res=>{
          this.AlarmGroups = res.data;
      })
  },
  methods:{
      checkType(id){
          if(id.includes("TH")||id.includes("EM")||id.includes("PDU")){
              return "Other";
          }else if(id.includes("DI")){
              return "DI";
          }else if(id.includes("DO")){
              return "DO";
          }else if(id.includes("AI")){
              return "AI";
          }else if(id.includes("UPS")){
              return "UPS";
          }

      },
      isVisible(data){
          data.isVisible = !data.isVisible;
      },
      CancelEdit(){
        this.editing = false;
        this.selectedItem = this.rawItem;
      },
      SaveEdit(){
        this.editing = false;
      },
      Cancel(){
        this.selectedItem=null;
        this.openDialog=false;
      },
      Save(){
        this.openDialog=false;
        this.$emit("SaveEdit", this.selectedItem)
      },
  },
}
</script>

<style scoped>
.DigitalOutputs{
    color: #1867C0;
}
.DigitalInputs{
    color:#17A0BF;
}
.AnalogInputs{
    color: #0EC2A8;
}
.Ups{
    color:#A2C200;
}
.集合式電表{
    color: #91B0C2;
}
.溫濕度計{
    color:#5CA3CC;
}
.排插{
    color:#5C8CCC;
}
</style>
