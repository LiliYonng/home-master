export default {
  state: {
    isCollapse: false,
    active: null,
    tabList: [
      {
        path: '/home',
        name: 'home',
        label: '首页'
      }
    ]
  },
  mutations: {
    handleMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      state.active = val
      const res = state.tabList.findIndex((item) => item.name === val.name)
      if (res === -1) {
        state.tabList.push(val)
      }
    },
    closeTab(state, index) {
      state.tabList.splice(index, 1)
    },
  }
}
