<template>
<v-app id="inspire">
    <main>
        <v-container fill-height fluid>
            <v-layout align-center justify-center>
                <LoginCard />
            </v-layout>
        </v-container>
    </main>
</v-app>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue"
export default {
  name: 'loginLayout',
  components: {
    LoginCard
  },
  data() {
    return{
      
    }
  },
  mounted(){
    
  },
  methods:{
      
  },
}
</script>

<style scoped>
.container {
  /* background-image:url("../assets/background.png"); */
  background-color: #011F4E;;
  height: 100vh;
  background-repeat: round;
}
</style>
