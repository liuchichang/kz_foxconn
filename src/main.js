import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import api from "@/API/Index.js"

Vue.prototype.$api = api;
Vue.config.productionTip = false;

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import funcs from "@/mixins/funcs"
Vue.mixin(funcs);

import i18n from './i18n'

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
