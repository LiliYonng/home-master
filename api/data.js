import axios from './axios'

// export const getMenu = (param) => {
//   return axios.request({
//     url: '/getMenu',
//     method: 'get'
//   })
// }  
// export const refreshToken = (token)=>{
//   return axios.request({
//     url: '/refeshToken',
//     method:'get',
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
// }
export const getData = () => {
  return axios.request({
    url: '/user/getChartData',
    method: 'get'
  })
}
export const getPermission = (params) => {
  return axios.request({
    // url: 'login/getPermission',
    url:'/login',
    method: 'post',
    data:params
  })
}
export const getUserData = (params) => {
  return axios.request({
    url: '/user/getData',
    method: 'get',
    params
  })
}
export const getMallData = (params) => {
  return axios.request({
    url: '/mall/getMalls',
    method: 'get',
    params
  })
}

export const addUser =(params)=>{
  return axios.request({
    url:'/user/add',
    method:'post',
    data:params
  })
}
export const addMall =(params)=>{
  return axios.request({
    url:'/mall/add',
    method:'post',
    data:params
  })
}
export const delUser = (params)=>{
  return axios.request({
    url:'/user/delete',
    method:'post',
    data:{'id':params}
  })
}
export const delMall = (params)=>{
  return axios.request({
    url:'/mall/delete',
    method:'post',
    data:{'id':params}
  })
}
export const editUser = (params)=>{
  return axios.request({
    url:'/user/edit',
    method:'post',
    data:params
  })
}
export const editMall = (params)=>{
  return axios.request({
    url:'/mall/edit',
    method:'post',
    data:params
  })
}
export const changeState = (params)=>{
  return axios.request({
    url:'/mall/edit',
    method:'post',
    data:params
  })
}