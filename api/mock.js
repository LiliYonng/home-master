import Mock from 'mockjs'
import homeApi from './mockServedata/home'
import menuApi from './mockServedata/menu'
import userApi from './mockServedata/user'
Mock.mock('/api/home/getData', homeApi.getData)
Mock.mock('/api/getMenu', menuApi.getMenu)
Mock.mock(/\/api\/user\/getData/, userApi.getUserData)
Mock.mock(/user\/add/, userApi.addUserData)
Mock.mock(/user\/delete/, userApi.deleteUserData)
Mock.mock(/user\/edit/, userApi.editUserData)
//正则表达式匹配部分url 字符串则匹配全部url