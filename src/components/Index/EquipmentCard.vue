<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      :elevation="hover ? 6 : 2"
      class="card mx-5 my-5 pr-8"
      :style="checkAlarm() ? 'border: 2px solid #FF3B3B' : 'border: 1px solid #ffffff'" 
      :min-width=" $vuetify.breakpoint.md ? '322' : '450'"
      @click="openDetail" 
    >
      <v-card-title>
        <v-chip label small :color="item.IsConnected ? '#0BC669' : '#939393'" dark>{{item.IsConnected ? "連線中" : "離線"}}</v-chip>
        <p class="ml-3 my-0">
          {{item.Name}}
        </p>
      </v-card-title>
      <v-card-text v-if="item.Data" class="justify-start">
        <v-divider class="mb-3"/>
        <template v-for="(data, i) in datas">
          <!-- <v-row v-if="data.value.IsVisible" :key="i" :style="alarming(data.value) ? 'color:#FF3B3B' : 'color:#383838'"> -->
          <v-row :key="i" :style="alarming(data.value) ? 'color:#FF3B3B' : 'color:#383838'">
            <v-col cols="1">
              <v-icon small class="my-auto" :color="alarming(data.value) ? '#FF3B3B' : '#383838'" v-if="alarming(data.value)">mdi-bell</v-icon>
            </v-col>
            <v-col cols="3">
              <p class="subtitle-1 fw-400 my-0">{{$t(`${type}.${data.name}`)}}</p>
            </v-col>
            <v-col cols="8">
              <div v-if="!data.value.IsRst && data.value.IsVisible" class="d-flex justify-center">
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
                <template v-for="(item,k) in data.value.Value" >
                  <p :key="k" v-if="item.IsVisible" class="subtitle-1 mb-0 mx-2 value">
                    {{item.Value}} {{item.Unit}}
                  </p>
                </template>
                
              </div>
            </v-col>
          </v-row>
        </template>
        <!-- <v-row v-if="datas.length>2" class="px-5 mt-3 py-0 justify-end">
          <p class="primary--text">more...</p>
        </v-row> -->
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'EquipmentCard',
  components: {
    
  },
  data() {
    return{
      hasAlarm:0,
      itemDatas:null,
    }
  },
  props:["item", "type"],
  computed:{
    datas:{
      get(){
        let datas=[];
        Object.keys(this.item.Data).forEach(e=>{
          let item={
              name: e,
              value: this.item.Data[e]
          }
          datas.push(item)
        })
        datas.sort((a,b)=>{
          return a.value.Index - b.value.Index;
        })
        console.log(datas)
        return datas;
      },
      set(){

      },
    }
  },
  mounted(){
    
  },
  watch:{

  },
  methods:{
      openDetail(){
        let datas=[];
        Object.keys(this.item.Data).forEach(e=>{
          let item={
              name: e,
              value: this.item.Data[e]
          }
          datas.push(item)
        })
        datas.sort((a,b)=>{
          return a.value.Index - b.value.Index;
        })
        
        this.$emit("openDetail", {show:true, item:this.item, datas:datas});
      },
      checkAlarm(){
        let hasAlarm = 0;
        this.datas.forEach(data=>{
          
          if(
            data.value.IsLowerLimitAlarm 
            || data.value.IsUpperLimitAlarm
            || data.value.IsAlarm
          ){
            hasAlarm+=1;
          }
        })
        return hasAlarm>0 ? true : false;
      },
      alarming(data){
        if(
          data.IsLowerLimitAlarm 
          || data.IsUpperLimitAlarm
          || data.IsAlarm
        ){
          return true;
        }else{
          return false;
        }
      },
      
  },
}
</script>

<style scoped>
.fw-400{
  font-weight: 400 !important;
}
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
.card{
  background-color: rgb(89,143,193,0.1);
}
p{
  color: white;
}
</style>
