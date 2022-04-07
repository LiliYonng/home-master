import axios from './axios'
export const getMenu = (param) => {
  return axios.request({
    url: 'getMenu',
    method: 'get'
  })
}
export const getData = () => {
  return axios.request({
    url: 'home/getData',
    method: 'get'
  })
}
export const getUserData = (params) => {
  return axios.request({
    url: 'user/getData',
    method: 'get',
    params
  })
}
export const getPermission = (params) => {
  return axios.request({
    url: 'login/getPermission',
    method: 'get',
    params
  })
}
