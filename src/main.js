import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
//import '../api/mock'
import autoIcon from './Icon'

//在应用实例创建之前加载cookie中保存的数据
store.commit('getMenu', router)
store.commit('getUserInfo')
store.commit('getToken')
store.commit('getTap')
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (to.name != 'login' && !token) next({ name: 'login' })
  else if (token && to.name === 'login') next({ name: 'home' })
  else {
    next()
  }
})

const app = createApp(App)
app.config.globalProperties.$icon = autoIcon
app.use(store).use(router).mount('#app')
