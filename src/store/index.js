import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo:null,
    loading:false,
    logining:false,
  },
  mutations: {
    pushUserInfo: (state, data) => {
      state.UserInfo = data;
    },
  },
  actions: {
    pushUserInfo(context, data){
      context.commit("pushUserInfo", data);
    },
    RemoveUserInfo(){
      this.state.UserInfo = null;
    },
  },
  getters: {
    GetUserInfo: state => {
      return state.UserInfo;
    }
  },
  modules: {
    
  }
})
