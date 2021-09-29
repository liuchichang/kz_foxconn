<template>
    <v-app id="inspire">
    <main>
        <v-container  fluid>
            <v-row class="align-end justify-center my-10">
                <p class="my-0 mr-5 display-1 ls-12">Oops!</p>
                <p class="my-0 title ls-12">This page isn't available.</p>
            </v-row>
            <v-row class="align-center justify-center my-10">
                <v-img
                    :max-width="$vuetify.breakpoint.smAndDown ? '80%' : '40%'"
                    src="@/assets/notfound.svg"
                />
            </v-row>
            <v-row class="align-center justify-center my-10 pt-10">
                <v-btn
                    color="primary"
                    depressed
                    @click="outofhere"
                >Back To Home</v-btn>
            </v-row>
        </v-container>
    </main>
</v-app>
</template>
<script>
export default {
    created: function() {
        // Redirect outside the app using plain old javascript
    },
    methods:{
        outofhere(){
            this.$router.push({path:'/'})
        },
    }
}
</script>


<style scoped>

.container {
  background-image:url("../assets/background.png");
  height: 100vh;
  background-repeat: round;
}
.ls-12{
    letter-spacing: .1rem !important;
}
</style>
