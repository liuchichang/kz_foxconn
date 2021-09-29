<template>
    <v-dialog
            v-model="openDialog"
            persistent
            width="380px"
        >
            <v-card class="pa-2" v-if="SelectedItem">
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    top
                    color="primary"
                ></v-progress-linear>
                <v-card-title>提醒</v-card-title>
                <v-card-text >
                    確定要刪除 
                    <span>{{$t(`UserInfo.${SelectedItem.Identity}`)}}</span>
                    &nbsp;
                    <span class="font-weight-bold">{{SelectedItem.Name}}</span>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        color="#383838"
                        @click="cancelDelete"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="#FF3B3B"
                        dark
                        @click="deleteConfirm"
                    >
                        刪除
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  components: {

  },
  data() {
    return{
        loading:false,
    }
  },
  props:{
      showDeleteDialog: Boolean,
      SelectedItem:Object,
  },
    computed:{
        openDialog:{
            get(){
                return this.showDeleteDialog
            },
            set(dialog){
                this.$emit("update:showDeleteDialog", dialog)
            }
        }
    },
  mounted(){
    
  },
  methods:{
      cancelDelete(){
          this.openDialog=false;
      },
      deleteConfirm(){
          this.loading = true;
          this.loading = false;
          let data = this.SelectedItem.Id;
          let passcode = this.$store.getters.GetUserInfo.Passcode;
        //   console.log(data, passcode)
          this.$api.Users.DeleteUser(passcode, data)
          .then(()=>{
              this.openDialog=false;
              this.loading = false;
              this.$emit("deleteDone")
          })
          
      },
      getStatusColor(e){
            switch(e){
                case "登入":
                    return "#0BC669";
                case "離線":
                    return "#939393";
            }
        },
  },
}
</script>

<style>

</style>
