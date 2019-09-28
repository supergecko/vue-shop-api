import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import VueClipboard from 'vue-clipboard2'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import md5 from 'js-md5'
import axios from 'axios'
import { getItem } from './utils/newLocalStorage'

Vue.prototype.$md5 = md5
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false

axios.interceptors.response.use(config => {
  // 返回请求正确的结果
  return config
}, function (error) {
  // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      case 506:
        router.push('/login')
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = '连接到服务器失败'
  }
  return Promise.reject(error.message)
})
const whiteList = ['/home', '/goods', '/login', '/goodsDetails', '/aboutUs', '/crowdFunding', '/news', '/privacyAgreement', '/userAgreement', '/mineField', '/newDetails', '/userLogin']
router.beforeEach(function (to, from, next) {
  if (!(getItem('userToken'))) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
