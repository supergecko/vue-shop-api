import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const MineField = resolve => require(['/page/MineField/mineField'], resolve)
const AboutUs = resolve => require(['/page/AboutUs/aboutUs'], resolve)
const ServiceAgreement = resolve => require(['/page/ServiceAgreement/serviceAgreement'], resolve)
const GoodS = resolve => require(['/page/Goods/goods'], resolve)
const OrderList = resolve => require(['/page/OrderList/orderList'], resolve)
const CrowdFunding = resolve => require(['/page/CrowdFunding/crowdFunding'], resolve)
const Spread = resolve => require(['/page/Spread/spread'], resolve)
const RakeBack = resolve => require(['/page/RakeBack/rakeBack'], resolve)
const Jackpot = resolve => require(['/page/Jackpot/Jackpot'], resolve)
const goodsDetails = resolve => require(['/page/Goods/goodsDetails'], resolve)
const Cart = resolve => require(['/page/Cart/cart'], resolve)
const order = resolve => require(['/page/Order/order'], resolve)
const user = resolve => require(['/page/User/user'], resolve)
const news = resolve => require(['/page/News/news'], resolve)
const newDetails = resolve => require(['/page/NewDetails/newDetails'], resolve)
const orderList = resolve => require(['/page/User/children/order'], resolve)
const myTeam = resolve => require(['/page/User/children/myTeam'], resolve)
const information = resolve => require(['/page/User/children/information'], resolve)
const chargeRecharge = resolve => require(['/page/User/children/chargeRecharge'], resolve)
const addressList = resolve => require(['/page/User/children/addressList'], resolve)
const dailyOutput = resolve => require(['/page/User/children/dailyOutput'], resolve)
const extension = resolve => require(['/page/User/children/extension'], resolve)
const coupon = resolve => require(['/page/User/children/coupon'], resolve)
const receivingAddress = resolve => require(['/page/User/children/receivingAddress'], resolve)
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
        {path: 'jackpot', component: Jackpot},
        {path: 'rakeBack', component: RakeBack},
        {path: 'crowdFunding', component: CrowdFunding},
        {path: 'orderList', name: 'orderList', component: OrderList},
        {path: 'mineField', component: MineField},
        {path: 'aboutUs', component: AboutUs},
        {path: 'serviceAgreement', component: ServiceAgreement},
        {path: 'goodsDetails', name: 'goodsDetails', component: goodsDetails},
        {path: '/news', name: 'news', component: news},
        {path: '/newDetails', name: 'newDetails', component: newDetails}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: true
      }
    },
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
      meta: {requireAuth: true},
      children: [
        {path: 'orderList', name: '订单列表', component: orderList},
        {path: 'myTeam', name: '我的团队', component: myTeam},
        {path: 'information', name: '控制面板', component: information},
        {path: 'addressList', name: '收益地址', component: addressList},
        {path: 'coupon', name: '我的优惠', component: coupon},
        {path: 'support', name: '售后服务', component: support},
        {path: 'extension', name: '我的推广', component: extension},
        {path: 'dailyOutput', name: '每日产出', component: dailyOutput},
        {path: 'chargeRecharge', name: '电费充值', component: chargeRecharge},
        {path: 'receivingAddress', name: '收货地址', component: receivingAddress}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
