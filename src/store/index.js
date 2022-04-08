import { createStore } from 'vuex'
import user from './user'
import tab from './tab'
import menu from './menu.js'
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    tab,
    menu
  }
})
