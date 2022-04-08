import Mock from 'mockjs'
//用户数据
const userList = [
  {
    account: 'admin',
    password: 'admin',
    token: Mock.Random.guid(),
    identity: 'Admin',
    userInfo: {
      name: '超级管理员',
      Profilephoto: '/adminImg.jpg',
      date: Mock.mock('@date("2022-MM-dd")'),
      location: Mock.mock('@province')
    }
  },
  {
    account: 'dengwaner',
    password: '123456',
    token: Mock.Random.guid(),
    identity: 'Ordinary',
    userInfo: {
      name: '邓邓等等噔',
      Profilephoto: '/userImg1.jpg',
      date: Mock.mock('@date("2022-MM-dd")'),
      location: Mock.mock('@province')
    }
  },
  {
    account: 'wangzhiying',
    password: '654321',
    token: Mock.Random.guid(),
    identity: 'Ordinary',
    userInfo: {
      name: '王志英小号',
      Profilephoto: '/userImg2.jpg',
      date: Mock.mock('@date("2022-MM-dd")'),
      location: Mock.mock('@province')
    }
  }
]
const normalMenu = [
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'HomeFilled',
    url: '/HomeView'
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: 'Briefcase',
    url: '/MallView'
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
        url: '/Other/PageOne'
      },
      {
        path: '/page2',
        name: 'page2',
        label: '页面2',
        icon: 'Setting',
        url: '/Other/PageTwo'
      }
    ]
  }
]
const manageMenu = [...normalMenu]
manageMenu.push({
  path: '/user',
  name: 'user',
  label: '用户管理',
  icon: 'UserFilled',
  url: '/UserView'
})
function getParam(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export default {
  getPermi: (config) => {
    let Obj = null
    const params = getParam(config.url)
    userList.forEach((item) => {
      if (item.account === params.UserName) {
        Obj =
          item.password === params.Password
            ? {
                code: 200,
                token: item.token,
                menu: item.identity === 'Admin' ? manageMenu : normalMenu,
                userInfo: item.userInfo
              }
            : { code: 600, ERR_Msg: '用户密码错误' }
      }
    })
    if (Obj) return Obj
    else {
      return {
        code: 601,
        ERR_Msg: '用户不存在'
      }
    }
  }
}
