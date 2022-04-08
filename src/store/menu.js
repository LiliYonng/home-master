import Cookies from 'js-cookie'
export default {
  state: { menuData: [] },
  mutations: {
    setMenu(state, val) {
      state.menuData = val
      if (Object.keys(val).length) Cookies.set('menu', JSON.stringify(val)) //对象需要转换为json格式才能存入json
    },
    clearMenu(state) {
      state.menuData = []
      Cookies.remove('menu')
    },
    getMenu(state, router) {
      const data = Cookies.get('menu')
      if (data) {
        state.menuData = JSON.parse(data)
        this.commit('addMenu', router)
      }
    },
    addMenu(state, router) {
      if (!Cookies.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookies.get('menu'))
      state.menuData = menu
      const menuRoute = []
      menu.forEach((item) => {
        if (item.children) {
          //存在二级菜单
          item.children = item.children.map((item) => {
            item.component = () => import(`../views${item.url}`)
            return item
          }) //返回的是一个带有component属性的对象数组。注意是数组而不是对象
          menuRoute.push(...item.children) //将数组解构取出对象
        } else {
          item.component = () => import(`../views${item.url}`)
          menuRoute.push(item)
        }
      })
      //动态路由添加
      menuRoute.forEach((item) => {
        router.addRoute('main', item)
      })
    }
  }
}
