<template>
  <div class="layout-container">
    <y-header :showNav="false"></y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box "
               style="padding-top: 0px;">
            <div class="box-inner">
              <ul class="account-nav"
                  style="padding-top: 0px;">
                <li v-for="(item,i) in nav"
                    :key='i'
                    :class="{current:item.name===title,li:true}"
                    @click="tab(item)">
                  <a @click="change(i)"
                     href="javascript:;"><i :class=item.icon></i>{{item.name}}<i v-if="item.children"
                                                                                 v-show="isActice"
                                                                                 class='jiantou el-icon-arrow-down'></i><i v-if="item.children"
                                                                                                                           v-show="!isActice"
                                                                                                                           class='jiantou el-icon-arrow-up'></i></a>
                </li>
              </ul>
              <ul v-show="!isActice">
                <li class="childLi"
                    v-for=" (child,index)
                      in
                      nav[5].children"
                    :key="index"
                    :class="{current:child.name===title,li:true}">

                  <a @click="tab(child)"
                     href="javascript:;">{{ child.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>

  </div>

</template>
<script>
  import YFooter from '/common/footer'
  import YHeader from '/common/header'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: '账户资料',
        nav: [
          {name: '账户中心', path: 'userInfo', icon: 'el-icon-user-solid'},
          {name: '控制面板', path: 'information', icon: 'el-icon-time'},
          {name: '我的订单', path: 'orderList', icon: 'el-icon-edit-outline'},
          {name: '我的推广', path: 'extension', icon: 'el-icon-star-on'},
          {name: '我的礼卷', path: 'coupon', icon: 'el-icon-star-on'},
          { name: '资金管理',
            icon: 'el-icon-date',
            children: [
              { name: 'USDT充值', path: 'usdt' },
              { name: '人民币充值', path: 'rmbPage' },
              { name: 'USDT提现', path: 'usdtTx' },
              { name: '人民币提现', path: 'rmbPageTx' }
            ]
          }
        ],
        editAvatar: true,
        isActice: true,
        path: ''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      tab (e) {
        setTimeout(() => {
          let path = this.$route.path.split('/')[2]

          this.nav[5].children.forEach(child => {
            if (child.path === path) {
              this.title = child.name
              console.log(this.title)
            }
          })
        }, 100)

        if (e.path) {
          this.$router.push({ path: '/user/' + e.path })
        }
      },
      change (index) {
        if (index === 5) {
          this.isActice = !this.isActice
        }
      }
    },
    created () {
      let path = this.$route.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
    },
    components: {
      YFooter,
      YHeader
    },
    watch: {
      $route (to) {
        let path = to.path.split('/')[2]
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  .w {
    padding-top: 40px;
  }

  .content {
    display: flex;
    height: 100%;
  }
  .gray-box {
    overflow: visible;
  }
  .account-sidebar {
    width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      overflow: visible;
      li {
        position: relative;
        height: 48px;
        border-top: 1px solid #ebebeb;
        line-height: 48px;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98afee;
            line-height: 50px;
            color: #fff;
          }
        }
        a {
          display: block;
        }
        &.current {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98afee;
            line-height: 50px;
            color: #fff;
          }
        }
      }
    }
  }

  .account-content {
    margin-left: 20px;
    flex: 1;
  }
  .li {
    position: relative;
    .jiantou {
      position: absolute;
      right: 15px;
      top: 16px;
    }
  }

  .childLi {
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding-left: 30px;
      height: 50px;
      line-height: 50px;
    }
  }
  .current {
    a {
      position: relative;
      z-index: 1;
      height: 50px;
      background-color: #98afee;
      line-height: 50px;
      color: #fff;
    }
  }

</style>
