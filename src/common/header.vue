<template>
  <div>
    <div class="header-box">
      <el-row class="headerNotice">
        <Notice></Notice>
      </el-row>
      <header class="w">
        <div class="w-box">
          <!--左侧logo-->
          <div class="nav-logo">
            <h1>
              <router-link to="/"
                           title="雷猫矿机官网">THUNDERCAT</router-link>
            </h1>
          </div>
          <!--导航-->
          <div class="nav-sub"
               :class="{fixed: st}">
            <div class="nav-sub-bg"></div>
            <div class="nav-sub-wrapper"
                 :class="{fixed:st}">
              <div class="w">
                <div class="nav-list">
                  <li>
                    <router-link to="/"
                                 :class="{classA: this.$route.path=='/home'? true:false}">首页</router-link>
                  </li>
                  <li>
                    <router-link to="/crowdFunding"
                                 :class="{classA: this.$route.path=='/crowdFunding'? true:false}">矿机拼团</router-link>
                  </li>
                  <!--                  <li>-->
                  <!--                    <router-link to="/store"-->
                  <!--                                 :class="{classA: this.$route.path=='/store'? true:false}">商城</router-link>-->
                  <!--                  </li>-->
                  <li>
                    <router-link to="/jackpot"
                                 :class="{classA: this.$route.path=='/jackpot'? true:false}">奖池瓜分</router-link>
                  </li>
                  <li>
                    <router-link to="/rakeBack"
                                 :class="{classA: this.$route.path=='/rakeBack'? true:false}">推广返佣</router-link>
                  </li>
                  <li>
                    <router-link to="/mineField"
                                 :class="{classA: this.$route.path=='/mineField'? true:false}">雷猫矿场</router-link>
                  </li>
                  <li>
                    <router-link to="/news"
                                 :class="{classA: this.$route.path=='/news'? true:false}">新闻</router-link>
                  </li>
                  <li>
                    <router-link to="/aboutUs"
                                 :class="{classA: this.$route.path=='/aboutUs'? true:false}">关于我们</router-link>
                  </li>
                </div>
                <div class="userLoginText" :class="{userLoginTextFixed:st}">
                  <router-link to="/user/userInfo">{{userLoginText}}</router-link>
                </div>
              </div>
            </div>
          </div>
          <!--个人中心-->
          <div class="right-box">
            <div class="nav-aside"
                 ref="aside"
                 :class="{fixed: (st && showNav)}">
              <div class="user pr">
                <router-link to="/user/userInfo">个人中心</router-link>
                <!--用户信息显示-->
                <div class="nav-user-wrapper pa"
                     v-if="userLoginFalg">
                  <div class="nav-user-list">
                    <ul>
                      <!--头像-->
                      <li class="nav-user-avatar">
                        <!--                        <p class="name">陈二狗</p>-->
                      </li>
                      <li v-for="(item, i) in navList"
                          :key="i">
                        <router-link :to="item.link">{{item.text}}</router-link>
                      </li>
                      <li>
                        <a href="javascript:;"
                           @click="_loginOut">退出</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    </div>
  </div>
</template>
<script>
import YButton from '/components/YButton'
import Notice from '/common/notice'
import { mapState } from 'vuex'
import { loginOut } from '/api/index'
import { getItem, clear } from './../utils/newLocalStorage'

export default {
  props: {
    showNav: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      userLoginText: getItem('userName') ? `尊敬的 ${getItem('userID')} 欢迎您` : '未登录', // 是否登录用户名显示
      userLoginFalg: false,
      user: {},
      // 列表
      navList: [{
        text: '账户中心',
        link: '/user/userInfo'
      }, {
        text: '控制面板',
        link: '/user/information'
      }, {
        text: '我的订单',
        link: '/user/orderList'
      }, {
        text: '我的推广',
        link: '/user/extension'
      }, {
        text: '我的礼券',
        link: '/user/coupon'
      }],
      st: false
    }
  },
  computed: {
    ...mapState([
      'userId'
    ])
  },
  methods: {
    // 控制顶部
    navFixed () {
      if (this.$route.path === '/goods' ||
        this.$route.path === '/home' ||
        this.$route.path === '/goodsDetails' ||
        this.$route.path === '/jackpot' ||
        this.$route.path === '/rakeBack' ||
        this.$route.path === '/crowdFunding' ||
        this.$route.path === '/aboutUs' ||
        this.$route.path === '/orderList' ||
        this.$route.path === '/serviceAgreement' ||
        this.$route.path === '/news' ||
        this.$route.path === '/newDetails' ||
        this.$route.path === '/mineField' ||
        this.$route.path === '/store') {
        // 计算是否吸顶
        if (this.showNav) {
          let st = document.documentElement.scrollTop || document.body.scrollTop
          st >= 100 ? this.st = true : this.st = false
        }
      }
    },
    // 退出登陆
    _loginOut () {
      console.log(this.userId)
      this.$confirm('你是否确定退出此账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const user_id = getItem('userID')
        let params = { user_id }
        loginOut(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            clear()
            window.location.href = '/'
            this.$message({
              type: 'success',
              message: '退出登录成功!'
            })
          }
        })
      }).catch(() => { })
    }
  },
  mounted () {
    if ((getItem('userToken'))) {
      this.userLoginFalg = true
    }
    setTimeout(() => {
      this.navFixed()
    }, 300)
    window.addEventListener('scroll', this.navFixed)
    window.addEventListener('resize', this.navFixed)
  },
  destroyed () {
    window.removeEventListener('scroll', this.navFixed)
    window.removeEventListener('resize', this.navFixed)
  },
  components: {
    YButton,
    Notice
  }
}
</script>
<style>
.userLoginText{
  line-height: 28px;position: absolute;right:-260px;width: 180px;
}
.userLoginTextFixed{
  right: -60px;
}
.nav-sub .nav-list li a[data-v-a1bfd9a2]:hover {
  color: #4c84ff !important;
  font-size: 14px !important;
}
.w-box .nav-list li {
  font-size: 12px;
}
.classA {
  color: #5079d9 !important;
  font-weight: bold;
  font-size: 15px;
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";
.headerNotice {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  color: #fff;
  line-height: 40px;
  background: #262a37;
}
.move_in_cart {
  animation: mymove 0.5s ease-in-out;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.header-box {
  background: $head-bgc;
  background-image: -webkit-linear-gradient(#000, #121212);
  background-image: linear-gradient(#000, #121212);
  width: 100%;
}

header {
  height: 60px;
  z-index: 30;
  position: relative;
}

.w-box {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  margin: 0 auto;
  h1 {
    height: 100%;
    display: flex;
    align-items: center;
    > a {
      background: url(/static/images/lmbLogo.png) no-repeat 50%;
      background-size: cover;
      display: block;
      @include wh(40px, 40px);
      text-indent: -9999px;
      background-position: 0 0;
    }
  }
  .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 22px;
    li {
      /*color: #c8c8c8;*/
      display: block;
      font-size: 14px;
      padding: 0 25px;
      &:hover {
        color: #4dd9d5;
      }
    }
  }
  .nav-aside {
    position: relative;
    &:before {
      background: #333;
      background: hsla(0, 0%, 100%, 0.2);
      content: " ";
      @include wh(0px, 13px);
      overflow: hidden;
      position: absolute;
      top: 4px;
      left: 0;
    }
    &.fixed {
      width: 262px;
      position: fixed;
      left: 50%;
      margin-left: 182px;
      margin-top: 0;
      z-index: 32;
      top: -40px;
      transform: translate3d(0, 59px, 0);
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      .user {
        &:hover {
          a:before {
            background-position: -215px 0;
          }
        }
      }
      .shop {
        &:hover {
          a:before {
            background-position: -210px -22px;
          }
        }
      }
    }
  }

  .right-box {
    display: flex;
  }
  .nav-aside {
    display: flex;
    margin-left: -105px;
  }
  // 用户
  .user {
    margin-left: 150px;
    &:hover {
      a:before {
        background-position: -5px 0;
      }
      .nav-user-wrapper {
        top: 18px;
        visibility: visible;
        opacity: 1;
        -webkit-transition: opacity 0.15s ease-out;
        transition: opacity 0.15s ease-out;
      }
    }
    > a {
      position: relative;
      @include wh(36px, 20px);
      display: block;
      text-indent: -9999px;
      float: right;
      &:before {
        content: " ";
        position: absolute;
        left: 8px;
        top: 0;
        @include wh(20px);
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) -155px
          0;
        background-size: 240px 107px;
        transition: none;
      }
    }
    li + li {
      text-align: center;
      position: relative;
      border-top: 1px solid #f5f5f5;
      line-height: 44px;
      height: 44px;
      color: #616161;
      font-size: 12px;
      &:hover {
        background: #fafafa;
      }
      a {
        display: block;
        color: #616161;
      }
    }
    .nav-user-avatar {
      > div {
        position: relative;
        margin: 0 auto 8px;
        @include wh(46px);
        text-align: center;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
        }
        .avatar {
          border-radius: 50%;
          display: block;
          @include wh(100%);
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .name {
        margin-bottom: 16px;
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
        color: #757575;
      }
    }
    .nav-user-wrapper {
      width: 168px;
      transform: translate(-50%);
      left: 50%;
    }
    .nav-user-list {
      width: 168px;
      &:before {
        left: 50%;
      }
    }
  }
  .shop {
    position: relative;
    float: left;
    margin-left: 21px;
    width: 61px;
    z-index: 99;
    &:hover {
      a:before {
        content: " ";
        background-position: 0 -22px;
      }
    }
    .nav-user-wrapper.active {
      top: 18px;
      visibility: visible;
      opacity: 1;
      -webkit-transition: opacity 0.15s ease-out;
      transition: opacity 0.15s ease-out;
    }
    > a {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: block;
      right: 0;
      z-index: 1;
      &:before {
        display: block;
        @include wh(30px, 100%);
        content: " ";
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
          0 -22px;
        background-size: 240px 107px;
        background-position: -150px -22px;
      }
    }
    .cart-num {
      position: relative;
      display: block;
      margin-left: 31px;
      margin-top: -1px;
      min-width: 30px;
      text-indent: 0;
      line-height: 20px;
      > i {
        background: #eb746b;
        background-image: -webkit-linear-gradient(#eb746b, #e25147);
        background-image: linear-gradient(#eb746b, #e25147);
        box-shadow: inset 0 0 1px hsla(0, 0%, 100%, 0.15),
          0 1px 2px hsla(0, 0%, 100%, 0.15);
        text-align: center;
        font-style: normal;
        display: inline-block;
        @include wh(20px);
        line-height: 20px;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        &.no {
          background: #969696;
          background-image: -webkit-linear-gradient(#a4a4a4, #909090);
          background-image: linear-gradient(#a4a4a4, #909090);
          box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
        }
      }
    }
    .nav-user-wrapper {
      right: 0;
      width: 360px;
      .nav-user-list {
        &:before {
          right: 34px;
        }
      }
    }
    .nav-user-list {
      padding: 0;
      width: 100%;
      .full {
        border-radius: 8px;
        overflow: hidden;
      }
      .nav-cart-items {
        max-height: 363px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .cart-item {
        height: 120px;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #f0f0f0;
        &:hover {
          background: #fcfcfc;
          .del {
            display: block;
          }
        }
      }
      li:first-child .cart-item:first-child {
        border-top: none;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
      }
      .cart-item-inner {
        padding: 20px;
        position: relative;
      }
      .item-thumb {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        border-radius: 3px;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
          border: 0 solid transparent;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
          border-radius: 3px;
        }
        img {
          display: block;
          @include wh(80px, 80px);
          border-radius: 3px;
          overflow: hidden;
        }
      }
      .item-desc {
        margin-left: 98px;
        display: table;
        @include wh(205px, 80px);
        h4 {
          color: #000;
          width: 185px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 10px;
        }
        .attrs span {
          position: relative;
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
        .attrs span:last-child {
          margin-right: 0;
        }
        h6 {
          color: #cacaca;
          font-size: 12px;
          line-height: 14px;
          margin-top: 20px;
          span {
            display: inline-block;
            font-weight: 700;
            color: #cacaca;
          }
          .price-icon,
          .price-num {
            color: #d44d44;
          }
          .price-num {
            margin-left: 5px;
            font-size: 14px;
          }
          .item-num {
            margin-left: 10px;
          }
        }
      }
      .cart-cell {
        display: table-cell;
        vertical-align: middle;
      }
      .del {
        display: none;
        overflow: hidden;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .nav-cart-total {
      box-sizing: content-box;
      position: relative;
      padding: 20px;
      height: 40px;
      background: #fafafa;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 8px 8px;
      box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
        0 -3px 8px rgba(0, 0, 0, 0.04);
      background: -webkit-linear-gradient(#fafafa, #f5f5f5);
      background: linear-gradient(#fafafa, #f5f5f5);
      p {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 12px;
        color: #c1c1c1;
      }
      h5 {
        line-height: 20px;
        font-size: 14px;
        color: #6f6f6f;
        span {
          font-size: 18px;
          color: #de4037;
          display: inline-block;
          font-weight: 700;
        }
        span:first-child {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      h6 {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 108px;
      }
    }
  }
}

@media (max-height: 780px) {
  .nav-cart-items {
    max-height: 423px !important;
  }
}

@media (max-height: 900px) {
  .nav-cart-items {
    max-height: 544px !important;
  }
}

@media (max-height: 1080px) {
  .nav-cart-items {
    max-height: 620px !important;
  }
}

// 用户信息弹出
.nav-user-wrapper {
  position: absolute;
  z-index: 30;
  padding-top: 18px;
  opacity: 0;
  visibility: hidden;
  top: -3000px;
  .nav-user-list {
    position: relative;
    padding-top: 20px;
    background: #fff;
    border: 1px solid #d6d6d6;
    border-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
    &:before {
      position: absolute;
      content: " ";
      background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
        no-repeat -49px -43px;
      background-size: 240px 107px;
      @include wh(20px, 8px);
      top: -8px;
      margin-left: -10px;
    }
  }
}

.nav-sub {
  height: 60px;
  z-index: 1;
  &.fixed {
    position: fixed;
    z-index: 21;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #dadada;
    background-image: -webkit-linear-gradient(#fff, #f1f1f1);
    background-image: linear-gradient(#fff, #f1f1f1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-sub-wrapper {
    padding: 17px 0;
    position: relative;
    margin-left: 26px;
    &.fixed {
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
      width: 1220px;
      margin-left: -247px;
    }
    &:after {
      content: " ";
      position: absolute;
      top: 89px;
      left: 50%;
      margin-left: -610px;
      width: 1220px;
      background: #000;
      height: 1px;
      display: none;
      opacity: 0;
      -webkit-transition: opacity 0.3s ease-in;
      transition: opacity 0.3s ease-in;
    }
  }
  .w {
    display: flex;
    justify-content: space-between;
    width: auto;
  }
  .nav-list {
    line-height: 28px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 800px;
    li:first-child {
      padding-left: 0;
      a {
        padding-left: 10px;
      }
    }
    li {
      position: relative;
      float: left;
      padding-left: 2px;
      a {
        display: block;
        padding: 0 13px;
        color: #666;
      }
    }
    li:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 13px;
      width: 2px;
      height: 2px;
      background: #bdbdbd;
    }
  }
}

@media (min-width: 1px) {
  .nav-sub .nav-sub-wrapper:after {
    display: block;
  }
}

.cart-con {
  /*display: flex;*/
  text-align: center;
  position: relative;
  p {
    padding-top: 185px;
    color: #333333;
    font-size: 16px;
  }
}

.cart-con:before {
  position: absolute;
  content: " ";
  left: 50%;
  transform: translate(-50%, -70%);
  top: 50%;
  width: 76px;
  height: 62px;
  background: url("/static/images/cart-empty-new.png") no-repeat;
  background-size: cover;
}
</style>

