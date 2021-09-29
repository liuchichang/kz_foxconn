<template>
    <v-row justify="center">
        <v-dialog
        v-model="openDialog"
        scrollable
        :max-width="$vuetify.breakpoint.mdAndUp ? '30%' : '90%'"
        >
            <v-card
                class="mx-auto px-auto"
            >
                <v-card-title
                    class="headline white--text"
                    :class="danger ? 'deep-orange' : 'primary'"
                >
                    提醒
                </v-card-title>
                <v-card-text>
                    <p
                        class="subtitle my-3"
                    >{{message}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        @click="Cancel()"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        @click="Comfirm()"
                        :color="danger ? 'deep-orange' : 'primary'"
                        dark
                    >
                        {{action}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

export default {
  name: 'DoubleCheckDialog',
  components: {

  },
  data() {
    return{
        
    }
  },
  props:{
        dialog:{
            type:Boolean,
        },
        message:{
            type:String,
        },
        action:{
            type:String,
        },
        danger:{
            type:Boolean,
        },
        alertFunc:{
            type:String,
        },
  },
  computed:{
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
    
  },
  mounted(){
      
  },
  methods:{
        Cancel(){
            this.openDialog=false;
        },
        Comfirm(){
            this.openDialog=false;
            
            switch(this.alertFunc){
                case "ExecuteUpdate":
                    this.$emit("ExecuteUpdate");
                    break;
                case "ExecuteReset":
                    this.$emit("ExecuteReset");
                    break;
                case "ExecuteReboot":
                    this.$emit("ExecuteReboot");
                    break;
                default:
                    this.$emit("Comfirm");
                    break;
            }
        },
  },
}
</script>

<style scoped>
</style>
