const baseUrl = '/api1'
import { ypost } from './public'
// 登陆1
export const userLogin = (params) => {
  return ypost(`${baseUrl}/home/user/do_login`, params)
}
// 退出登陆1
export const loginOut = (params) => {
  return ypost(`${baseUrl}/home/user/logout`, params)
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
// 商品列表接口1
export const goodsList = (params) => {
  return ypost(`${baseUrl}/home/goods/index`, params)
}
// 短信接口1
export const sendCode = (params) => {
  return ypost(`${baseUrl}/home/api/send_validate_code`, params)
}
// 商品详情接口1
export const goodsInfo = (params) => {
  return ypost(`${baseUrl}/home/goods/goodsInfo`, params)
}
// 保存电子钱包地址接口1
export const saveWallet = (params) => {
  return ypost(`${baseUrl}/home/user/save_wallet`, params)
}
// 获取电子钱包地址接口1
export const getWallet = (params) => {
  return ypost(`${baseUrl}/home/user/getWallet`, params)
}
// 购买矿机+电费接口1
export const buyNow = (params) => {
  return ypost(`${baseUrl}/home/order/buy_now`, params)
}
// 保存用户线下收货地址接口1
export const saveAddress = (params) => {
  return ypost(`${baseUrl}/home/user/save_address`, params)
}
// 订单详情接口1
export const orderDataList = (params) => {
  return ypost(`${baseUrl}/home/order/orderList`, params)
}
// 我的礼券接口1
export const myCoupon = (params) => {
  return ypost(`${baseUrl}/home/panel/myCoupon`, params)
}
// 我的团队接口1
export const polularizeDetail = (params) => {
  return ypost(`${baseUrl}/home/panel/popularizeDetail`, params)
}
// 新闻列表1
export const newsLlist = (params) => {
  return ypost(`${baseUrl}/home/article/articleList`, params)
}
// 新闻详情1
export const newsDetails = (params) => {
  return ypost(`${baseUrl}/home/article/detail`, params)
}
// 我的推广1
export const myPopularize = (params) => {
  return ypost(`${baseUrl}/home/panel/myPopularize`, params)
}
// 控制面板1
export const controlPanel = (params) => {
  return ypost(`${baseUrl}/home/panel/index`, params)
}
// 公告
export const marquee = (params) => {
  return ypost(`${baseUrl}/home/article/hot`, params)
}
// 获取用户收货地址1
export const getUserAddress = (params) => {
  return ypost(`${baseUrl}/home/user/userAddress`, params)
}
// 修改电子钱包地址1
export const editWallet = (params) => {
  return ypost(`${baseUrl}/home/user/editwallet`, params)
}
// 修改收货地址接口
export const editAddress = (params) => {
  return ypost(`${baseUrl}/home/user/editAddress`, params)
}
// 是否绑定矿池
export const isBindMine = (params) => {
  return ypost(`${baseUrl}/home/panel/isBindMine`, params)
}
// 绑定矿池
export const bindMine = (params) => {
  return ypost(`${baseUrl}/home/panel/bindMine`, params)
}
// 订单详情
export const orderDetail = (params) => {
  return ypost(`${baseUrl}/home/order/orderDetail`, params)
}
// 奖池列表
export const jackpotIndex = (params) => {
  return ypost(`${baseUrl}/home/jackpot/index`, params)
}
