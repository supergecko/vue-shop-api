import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)

const state = {
  login: false, // 是否登录
  userInfo: null, // 用户信息
  identity: '', // 用户ID
  token: '',
  homeCarousel: [], // 首页轮播数组
  footerRate: [] // 首页底部rate数据
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
