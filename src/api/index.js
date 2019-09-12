const baseUrl = '/api1'
import {ypost} from './public'
// 登陆1
export const userLogin = (params) => {
  return ypost(`${baseUrl}/home/user/do_login`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return ypost(`${baseUrl}/users/loginOut`, params)
}
// 首页接口1
export const homePage = (params) => {
  return ypost(`${baseUrl}/home/index/new_index`, params)
}
// 注册账号1
export const register = (params) => {
  return ypost(`${baseUrl}/home/user/reg`, params)
}
// 上传图片
export const upload = (params) => {
  return ypost(`${baseUrl}/users/upload`, params)
}
// 修改头像
export const updateheadimage = (params) => {
  return ypost(`${baseUrl}/users/updateheadimage`, params)
}
// 商品详情接口
export const goodsList = (params) => {
  return ypost(`${baseUrl}/home/goods/index`, params)
}
// 短信接口1
export const sendCode = (params) => {
  return ypost(`${baseUrl}/home/api/send_validate_code`, params)
}

