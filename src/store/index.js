import { createStore } from 'vuex'
import user from './user'
import tab from './tab'
import menu from './menu.js'
export default createStore({
  state: {
    screenWidth: document.body.clientWidth
  },
  getters: {},
  mutations: {
    setScreenWidth(state,val){
      state.screenWidth = val;
    }
  },
  actions: {},
  modules: {
    user,
    tab,
    menu
  }
})
