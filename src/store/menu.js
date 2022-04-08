import Cookie from 'js-cookie'
export default {
  state: { menu: [] },
  mutations: {
    getMenu(state) {
      console.log('get')
      return state.menu
    },
    setMenu(state, val) {
      state.menu = val
    }
  }
}
