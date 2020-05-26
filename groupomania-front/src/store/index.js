import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 

export default new Vuex.Store({
  state: {
    afficheAuth: true,
    authObj: {
      userId: "",
      token: "",
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
