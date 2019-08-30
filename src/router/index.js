import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const GoodS = resolve => require(['/page/Goods/goods'], resolve)
const Spread = resolve => require(['/page/Spread/spread'], resolve)
const goodsDetails = resolve => require(['/page/Goods/goodsDetails'], resolve)
const Cart = resolve => require(['/page/Cart/cart'], resolve)
const order = resolve => require(['/page/Order/order'], resolve)
const user = resolve => require(['/page/User/user'], resolve)
const orderList = resolve => require(['/page/User/children/order'], resolve)
const userInfo = resolve => require(['/page/User/children/userInfo'], resolve)
const information = resolve => require(['/page/User/children/information'], resolve)
const addressList = resolve => require(['/page/User/children/addressList'], resolve)
const dailyOutput = resolve => require(['/page/User/children/dailyOutput'], resolve)
const extension = resolve => require(['/page/User/children/extension'], resolve)
const coupon = resolve => require(['/page/User/children/coupon'], resolve)
const aihuishou = resolve => require(['/page/User/children/aihuishou'], resolve)
const support = resolve => require(['/page/User/children/support'], resolve)
const checkout = resolve => require(['/page/Checkout/checkout'], resolve)
const payment = resolve => require(['/page/Order/payment'], resolve)
const paysuccess = resolve => require(['/page/Order/paysuccess'], resolve)

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'goods', component: GoodS},
        {path: 'spread', component: Spread},
        {path: 'goodsDetails', name: 'goodsDetails', component: goodsDetails}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/cart', name: 'cart', component: Cart},
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
        {path: 'payment', name: 'payment', component: payment}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '订单列表', component: orderList},
        {path: 'userInfo', name: '个人中心', component: userInfo},
        {path: 'information', name: '控制面板', component: information},
        {path: 'addressList', name: '收益地址', component: addressList},
        {path: 'coupon', name: '我的优惠', component: coupon},
        {path: 'support', name: '售后服务', component: support},
        {path: 'extension', name: '我的推广', component: extension},
        {path: 'aihuishou', name: '以旧换新', component: aihuishou},
        {path: 'dailyOutput', name: '每日产出', component: dailyOutput}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
