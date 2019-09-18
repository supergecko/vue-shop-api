const baseUrl = '/api'
import {yget, ypost} from './public'

// 电脑列表
export const getComputer = (params) => {
  return yget(`${baseUrl}/goods/computer`, params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return ypost(`${baseUrl}/users/cartList`, params)
}
// 加入购物车
export const addCart = (params) => {
  return ypost(`${baseUrl}/goods/addCart`, params)
}
// 批量加入购物车
export const addCartBatch = (params) => {
  return ypost(`${baseUrl}/goods/addCartBatch`, params)
}
// 删除购物车
export const delCart = (params) => {
  return ypost(`${baseUrl}/goods/delCart`, params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return ypost(`${baseUrl}/users/cartEdit`, params)
}
// 全选
export const editCheckAll = (params) => {
  return ypost(`${baseUrl}/users/editCheckAll`, params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return ypost(`${baseUrl}/users/cartDel`, params)
}
// 获取用户地址
export const addressList = (params) => {
  return ypost(`${baseUrl}/users/addressList`, params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return ypost(`${baseUrl}/users/addressUpdate`, params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return ypost(`${baseUrl}/users/addressAdd`, params)
}
// 删除收货地址
export const addressDel = (params) => {
  return ypost(`${baseUrl}/users/addressDel`, params)
}
// 支付
export const payMent = (params) => {
  return ypost(`${baseUrl}/users/payMent`, params)
}
// 商品详情
export const productDet = (params) => {
  return yget(`${baseUrl}/goods/productDet`, params)
}
// 删除订单
export const delOrder = (params) => {
  return ypost(`${baseUrl}/users/delOrder`, params)
}
