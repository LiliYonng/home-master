export default {
  getMenu: () => {
    return {
      code: 20000,
      menuData: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'HomeFilled',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'Briefcase',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'UserFilled',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'Location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'Setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'Setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  }
}
