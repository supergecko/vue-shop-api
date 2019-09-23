import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const MineField = resolve => require(['/page/MineField/mineField'], resolve)
const AboutUs = resolve => require(['/page/AboutUs/aboutUs'], resolve)
const ServiceAgreement = resolve => require(['/page/ServiceAgreement/serviceAgreement'], resolve)
const OrderList = resolve => require(['/page/OrderList/orderList'], resolve)
const CrowdFunding = resolve => require(['/page/CrowdFunding/crowdFunding'], resolve)
const RakeBack = resolve => require(['/page/RakeBack/rakeBack'], resolve)
const Jackpot = resolve => require(['/page/Jackpot/Jackpot'], resolve)
const user = resolve => require(['/page/User/user'], resolve)
const news = resolve => require(['/page/News/news'], resolve)
const orderDetail = resolve => require(['/page/Order/orderDetail'], resolve)
const newDetails = resolve => require(['/page/NewDetails/newDetails'], resolve)
const orderList = resolve => require(['/page/User/children/order'], resolve)
const userInfo = resolve => require(['/page/User/children/userInfo'], resolve)
const myTeam = resolve => require(['/page/User/children/myTeam'], resolve)
const information = resolve => require(['/page/User/children/information'], resolve)
const chargeRecharge = resolve => require(['/page/User/children/chargeRecharge'], resolve)
const addressList = resolve => require(['/page/User/children/addressList'], resolve)
const dailyOutput = resolve => require(['/page/User/children/dailyOutput'], resolve)
const extension = resolve => require(['/page/User/children/extension'], resolve)
const coupon = resolve => require(['/page/User/children/coupon'], resolve)
const userAgreement = resolve => require(['/page/Agreement/userAgreement'], resolve)
const privacyAgreement = resolve => require(['/page/Agreement/privacyAgreement'], resolve)
const Store = resolve => require(['/page/Store/store'], resolve)

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
        { path: 'home', component: Home },
        { path: 'jackpot', component: Jackpot },
        { path: 'rakeBack', component: RakeBack },
        { path: 'crowdFunding', component: CrowdFunding },
        { path: 'orderList', name: 'orderList', component: OrderList },
        { path: 'mineField', component: MineField },
        { path: 'aboutUs', component: AboutUs },
        { path: 'serviceAgreement', component: ServiceAgreement },
        { path: '/news', name: 'news', component: news },
        { path: '/newDetails', name: 'newDetails', component: newDetails },
        { path: '/userAgreement', name: 'userAgreement', component: userAgreement },
        { path: '/privacyAgreement', name: 'privacyAgreement', component: privacyAgreement },
        { path: '/store', name: 'store', component: Store }
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
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      meta: { requireAuth: true },
      children: [
        { path: 'orderList', name: '订单列表', component: orderList },
        { path: 'myTeam', name: '我的团队', component: myTeam },
        { path: 'information', name: '控制面板', component: information },
        { path: 'addressList', name: '收益地址', component: addressList },
        { path: 'coupon', name: '我的优惠', component: coupon },
        { path: 'extension', name: '我的推广', component: extension },
        { path: 'dailyOutput', name: '每日产出', component: dailyOutput },
        { path: 'chargeRecharge', name: '电费充值', component: chargeRecharge },
        { path: 'userInfo', name: '账户中心', component: userInfo },
        { path: 'orderDetail', name: 'orderDetail', component: orderDetail }
      ]
    },
    { path: '*', redirect: '/home' }
  ]
})
