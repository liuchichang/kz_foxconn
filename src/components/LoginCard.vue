<template>
    <v-card ref="loginCard" height="560" width="600" class="px-10">
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="primary"
        ></v-progress-linear>
        <v-card-title>
            <v-row class="mt-3" justify="center">
                <img class="logo" src="@/assets/foxconn-logo.png" />
            </v-row>
        </v-card-title>
        <v-card-subtitle>
            <v-row class="mt-5 mb-3" justify="center">
                <p class="text">{{company_name}}</p>
            </v-row>
        </v-card-subtitle>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <p class="font-weight-bold title">
                    帳號
                </p>
                <v-text-field
                    v-model="account"
                    placeholder="帳號"
                    outlined
                    :rules="[rules.required]"
                ></v-text-field>
                <p class="font-weight-bold title">
                    密碼
                </p>
                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="密碼"
                    outlined
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required]"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <p v-if="userError" class="ml-3 red--text">{{errorMessage}}</p>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="validate"
            >
                登入
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
  name: 'loginLayout',
  components: {
    
  },
  data() {
    return{
      account:null,
      password:null,
      showPassword:false,
      loading:false,
      valid:false,
      userError:false,
      errorMessage:"",
      user:{},
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    }
  },
  computed:{
    company_name:{
        get(){
            return process.env.VUE_APP_COMPANY_NAME
        },
    },
  },
  mounted(){
    let component = this.$refs.loginCard;
    component.$el.addEventListener("keydown", (e)=>{
        this.beforeValidate(e);
    });

  },
  beforeDestroy(){
      let component = this.$refs.loginCard;
      component.$el.removeEventListener("keydown", this.beforeValidate);
  },
  methods:{
    beforeValidate(e){
        if(e.key==='Enter'||e.key==='enter')
        this.validate();
    },
    validate () {
        this.loading=true;
        this.valid = this.$refs.form.validate();
        let data = {
            "id": this.account,
            "password": this.password
        }
        this.$api.Users.Signin(data)
        .then(res=>{
            console.log(res)
            this.user = res.data;
            this.user.id=this.account;
            this.user.password=this.password;
            this.userError = false;
            console.log(JSON.stringify(this.user))
            localStorage.setItem('UserInfo', JSON.stringify(this.user));

            this.$store.state.UserInfo = this.user;
            this.$router.push({path:'/'})
        })
        .catch(error=>{
            this.loading=false;
            this.userError = true;
            this.errorMessage = error.response.data;
        })
        // if(this.valid){
            
            
        // }
      },
  },
}
</script>

<style>
.logo{
    max-width:250px;
}
.text{
    font-size:1rem;
    letter-spacing: 0.1rem;
}

</style>
