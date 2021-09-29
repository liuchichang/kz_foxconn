<template>
<v-row justify="center">
    <v-dialog
      v-model="openDialog"
      scrollable
      :max-width="$vuetify.breakpoint.mdAndUp ? '40%' : '100%'"
    >
        <v-card
            v-if="item"
            class="mx-auto px-auto"
        >
            <v-card-title>
                <v-chip label small :color="item.item.IsConnected ? '#0BC669' : '#939393'" dark>{{item.item.IsConnected ? "連線中" : "離線"}}</v-chip>
                <p class="ml-2 my-0">{{item.item.Name}}</p>
                <v-btn 
                    icon
                    @click="GoEditing"
                    v-if="!editing && hasUser"
                >
                    <v-icon>mdi-cog</v-icon>
                </v-btn>
                <div v-if="editing && hasUser">
                    <v-btn 
                        class="mx-2"
                        small 
                        text
                        @click="CancelEdit"
                    >
                        取消
                    </v-btn>
                    <v-btn 
                        small 
                        color="primary"
                        @click="SaveEdit"
                    >
                        儲存設定
                    </v-btn>
                </div>
                <v-spacer/>
                <v-btn 
                    icon
                    @click="openDialog=false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
            {{item.item.Id}}
            <v-divider class="my-5"/>
            <div v-if="!editing">
                <template v-for="(data, i) in item.data">
                    <div :key="i" >
                        <v-row class="justify-center align-center">
                            <v-col cols="2">
                                <p class="subtitle-1 fw-400 my-0">
                                    <v-icon small class="my-auto" :color="alarming(data.value) ? '#FF3B3B' : '#383838'" v-if="alarming(data.value)">mdi-bell</v-icon>
                                    {{$t(`${type}.${data.name}`)}}
                                </p>
                            </v-col>
                            
                            <v-col cols="7">
                                <div v-if="!data.value.IsRst" class="d-flex justify-center">
                                <p 
                                    v-if="typeof(data.value.Value)==='number'" 
                                    class="subtitle-1 fw-400 my-0 single-value"
                                >
                                    {{data.value.Value}} {{data.value.Unit}}
                                </p>
                                <p 
                                    v-if="typeof(data.value.Value)==='boolean'" 
                                    class="subtitle-1 fw-400 my-0 value"
                                    :class="Translate(type, data.name, data.value.Value).color+'--text'"
                                >
                                    {{Translate(type, data.name, data.value.Value).text}}
                                </p>
                            </div>
                            <div v-else class="d-flex justify-space-around">
                                <p v-for="(item,k) in data.value.Value" :key="k" class="subtitle-1 mb-0 mx-2 value">
                                    {{item.Value}} {{item.Unit}}
                                </p>
                            </div>
                            </v-col>
                            <v-col cols="3">
                                <v-btn
                                    text
                                    @click="GoSearch(item.item.Id, data.name)"
                                >
                                    前往查詢
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-divider class="my-2"/>
                    </div>
                </template>
            </div>
            <div v-else>
                <draggable v-model="item.data" @change="log">
                    <transition-group>
                        <template v-for="(data, i) in item.data">
                            <div :key="i" >
                                <v-row class="justify-center align-center">
                                    {{data.value.IsVisible}}
                                    <v-col cols="1">
                                        <v-btn 
                                            icon 
                                            small
                                            style="cursor: pointer;"
                                        >
                                            <v-icon small>mdi-drag-horizontal-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="1">
                                        
                                        <v-btn 
                                            icon 
                                            small
                                            @click="data.value.IsVisible=!data.value.IsVisible"
                                        >
                                            <v-icon small v-if="data.value.IsVisible">mdi-eye</v-icon>
                                            <v-icon small v-else>mdi-eye-off-outline</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-icon small class="my-auto" :color="alarming(data.value) ? '#FF3B3B' : '#383838'" v-if="alarming(data.value)">mdi-bell</v-icon>
                                        <p class="subtitle-1 fw-400 my-0">{{$t(`${type}.${data.name}`)}}</p>
                                    </v-col>
                                    <v-col cols="6">
                                        
                                    </v-col>
                                </v-row>
                                <v-divider class="my-2"/>
                            </div>
                        </template>
                </transition-group>
                </draggable>
            </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'EquipmentDetail',
  components: {
    draggable
  },
  data() {
    return{
      rawData:null,
      editing:false,
    }
  },
  props:["item","type","dialog"],
  watch:{
      dialog(val){
          this.$emit("openDetail", {show:val, data:this.item});
      },
      
  },
  computed:{
    hasUser(){
        if(localStorage.getItem("UserInfo")){
            switch(JSON.parse(localStorage.getItem("UserInfo")).Identity){
                case "Developer":
                case "Installer":
                case "Manager":
                    return true;
                default:
                    return false;
            }
        }else{
            return false;
        }
    },
    openDialog:{
        get(){
            return this.dialog
        },
        set(dialog){
            
            if(this.editing){
                this.CancelEdit();
            }
            this.$emit("update:dialog", dialog)
        }
    }
  },
  mounted(){
    
  },
  methods:{
      GoSearch(deviceId, valueId){
          this.$router.push({name:'history', params: { deviceId: deviceId, valueId: valueId }})
      },
      log(){
          this.item.data.forEach((e,i) => {
              e.value.Index = i;
          });
      },
      alarming(data){
        if(
          data.IsLowerLimitAlarm 
          || data.IsUpperLimitAlarm
          || data.IsAlarm
        ){
          this.IsAlarm = true;
          return true;
        }else{
          return false;
        }
      },
      GoEditing(){
          this.rawData = JSON.parse(JSON.stringify(this.item));
          this.editing=true;
      },
      CancelEdit(){
          this.editing=false;
          this.$emit("CancelChange", this.rawData);
      },
      SaveEdit(){
          this.editing=false;
          this.$emit("ChangeData", this.item);
      },
  },
}
</script>

<style scoped>
.value{
  border: 0.5px solid rgb(189, 189, 189);
  border-radius: 3px;
  padding: 4px;
  min-width: 80px;
  text-align: center;
}
.single-value{
  min-width: 100%;
  border: 0.5px solid rgb(189, 189, 189);
  border-radius: 3px;
  padding: 4px;
  text-align: center;
}
</style>
