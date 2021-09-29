<template>
<v-app id="inspire">
    <main>
    <AppBar :UserInfo="UserInfo"/>
    <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
    </v-main>
    <SideMenu :UserInfo="UserInfo"/>
    </main>
</v-app>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
import AppBar from '../components/AppBar.vue'
export default {
  name: 'mainLayout',
  components: {
    SideMenu, AppBar
  },
  data() {
    return{
    }
  },
  computed:{
    UserInfo:{
      get(){
        return this.$store.state.UserInfo;
      }
    }
    
  },
  watch:{
  },
  mounted(){
    
  },
  methods:{
    // UserInfo(){
    //   setTimeout(() => {
    //     console.log(JSON.parse(localStorage.getItem('UserInfo')))
    //     return JSON.parse(localStorage.getItem('UserInfo'));
    //   }, 3000);
    // },
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
}
.container {
  /* background-image:url("../assets/background.png") */
  background-color: #011F4E;
}
.v-application{
  background: unset !important;
  background-color: #011F4E;
}

</style>
