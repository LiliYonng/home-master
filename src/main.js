import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import '../api/mock'
import autoIcon from './Icon'
router.beforeEach((to, from, next) => {
  //如果cookie中存有menu数据，添加动态路由
  store.commit('getMenu', router)
  store.commit('getUserInfo')
  store.commit('getToken')
  const token = store.state.user.token
  if (to.name != 'login' && !token) next({ name: 'login' })
  else {
    next()
  }
})
const app = createApp(App)
app.config.globalProperties.$icon = autoIcon
app.use(store).use(router).mount('#app')
