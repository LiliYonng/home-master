import Cookies from 'js-cookie'
export default {
  state: {
    token: '',
    userInfo: {}
  },

  mutations: {
    setToken(state, val) {
      if (!val) return
      state.token = val
      Cookies.set('token', val)
    },
    getToken(state) {
      state.token = state.token || Cookies.get('token')
    },
    clearToken(state) {
      state.token = ''
      Cookies.remove('token')
    },
    getUserInfo(state) {
      const data = Cookies.get('userInfo')
      if (data) {
        state.userInfo = JSON.parse(data)
      }
    },
    setUserInfo(state, val) {
      state.userInfo = val
      if (Object.keys(val).length) Cookies.set('userInfo', JSON.stringify(val))
    },
    clearUserInfo(state) {
      state.userInfo = {}
      Cookies.remove('userInfo')
    }
  }
}
