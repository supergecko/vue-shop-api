import {
  GET_USERINFO,
  RECORD_USERINFO,
  UPDATE_ID,
  ADD_HOMECAROUSEL,
  ADD_FOOTERRATE
} from './mutation-types'
import { setStore } from '../utils/storage'
import { setItem } from '../utils/newLocalStorage'

export default {
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },

  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },

  // 更新用户ID
  [UPDATE_ID] (state, info) {
    console.log(`vuex中的值 ${JSON.stringify(info.info.identity)}`)
    state.identity = info.info.identity
    state.token = info.info.token
    setItem({
      name: 'userToken',
      value: info.info.token,
      expires: 86400000,
      startTime: Date.parse(new Date())
    })
    setItem({
      name: 'identityId',
      value: info.info.identity,
      expires: 5000,
      startTime: Date.parse(new Date())
    })
  },

  // 更新首页轮播数组
  [ADD_HOMECAROUSEL] (state, info) {
    state.homeCarousel = info
  },

  // 更新首页底部rate数据
  [ADD_FOOTERRATE] (state, info) {
    state.footerRate = info
  }
}
