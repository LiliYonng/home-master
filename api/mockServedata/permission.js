import Mock from 'mockjs'
//用户数据
const userList = [
  {
    account: 'admin',
    password: 'admin',
    token: Mock.Random.guid()
  },
  {
    account: 'dengwaner',
    password: '123456',
    token: Mock.Random.guid()
  },
  {
    account: 'wangzhiying',
    password: '654321',
    token: Mock.Random.guid()
  }
]
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
    let Obj = {}
    const params = getParam(config.url)
    userList.forEach((item) => {
      if (item.account === params.UserName) {
        Obj =
          item.password === params.Password
            ? { code: 200, token: item.token }
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
