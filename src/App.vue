<template>
  <div>
    <router-view ref="view"></router-view>
    <v-snackbar
        v-model="snackbar"
        :color="snackDanger ? '#FF3B3B' : '#4CAF50'"
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
export default {
  name: 'MainLayout',
  components: {
  },
  data() {
    return{
      afterUpdated:true,
      snackDanger:true,
      snackbar:false,
      snackText:"",
    }
  },
  computed:{
    UserInfo:{
      get(){
        return JSON.parse(localStorage.getItem('UserInfo'));
      },

    },
  },
  watch:{

  },
  mounted(){
    this.$root.$on("message",text=>{
      this.snackDanger = true;
      this.message(text)
    });
    this.$root.$on("info",text=>{
      this.snackDanger = false;
      this.message(text)
    });
    //** Passcode Invalidation Test */
    

    if(!this.UserInfo){
      this.clearUser();
      return;
    }
    
    this.StartPageLoading();
    this.$store.state.logining = true;
    this.$api.Users.GetMyInfo(this.UserInfo.Passcode)
    .then(()=>{
      let data = {
          "id": this.UserInfo.id,
          "password": this.UserInfo.password
      }
      this.Signin(data);
    })
    .catch(()=>{
      this.clearUser();
      this.StopPageLoading();
    })
   
  },
  methods:{
    message(text){
      this.snackbar = true;
      this.snackText = text;
    },
    clearUser(){
      localStorage.removeItem('UserInfo');
      this.$store.state.UserInfo=null;
      if(this.$refs.view){
        this.$refs.view.$forceUpdate();
      }
      this.$store.state.logining = false;
    },
    Signin(data){
      this.StartPageLoading();
      
      this.$api.Users.Signin(data)
      .then(res=>{
          let user = res.data;
          user.id=data.id;
          user.password=data.password;
          localStorage.setItem('UserInfo', JSON.stringify(user));
          this.$store.dispatch("pushUserInfo",user);
      })
      .finally(()=>{
        this.StopPageLoading();
        this.$store.state.logining = false;
      })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
  background-color: #011F4E;
}
.container {
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
}
.main-container{
  overflow-y:auto;
  padding: 25px 25px 0px 25px;
  height: 100vh;
  max-height: calc(100vh - 90px);
}
.data-container{
  overflow: auto;
  max-height: calc(100% - 74px);
}

</style>
