<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      :elevation="hover ? 16 : 2"
      class="mr-5 mb-5"
      :min-width=" $vuetify.breakpoint.md ? '330' : '350'"
      @click="openDetail()"
    >
      <v-card-title class="pt-1 pb-0">
        <p :class="'font-weight-bold my-0 mr-3'">{{item.Id}}</p>
        <v-chip label small :color="Color" dark>{{$t(`EquipSetUp.${type}`)}}</v-chip>
        <v-spacer/>
        <p class='my-0 mr-2 font-weight-bold subtitle-2'>{{item.IsEnable ? '啟用' : '停用' }}</p>
        <v-switch
            v-model="item.IsEnable"
            @click.stop=""
            inset
            :color="Color"
        ></v-switch>
        <!-- <v-spacer/>
        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn> -->
        
      </v-card-title>
      <v-card-text class="justify-start">
        <v-row class="mx-0 my-0 align-center">
            <h3
              v-if="!editing"
              style="text-align: left;"
            >
              {{item.Name}}
            </h3>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'EquipSetupCard',
  components: {
    
  },
  data() {
    return{
      editing:false,
      rawItem:null,
    }
  },
  props:["item","index","type"],
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
      }
  },
  mounted(){
    
  },
  
  methods:{
      openDetail(){
        this.$emit("openDetail", {show:true, data:this.item, index:this.index, type: this.type});
      },
      
  },
}
</script>

<style scoped>
.fw-400{
  font-weight: 400 !important;
}
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
