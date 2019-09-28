<template>
  <div class="bottom">
    <div class="content">
      <el-col :span="5">
        <div class="name">Thunder Cat</div>
        <div class="copyright">Copyright © 2019 Thunder Cat All Rights Reserved</div>
        <div class="iconLink">
          <a class="iconfont icon-qq-copy-copy"></a>
          <a class="iconfont icon-logo-wechat"></a>
        </div>
      </el-col>
      <el-col :span="10">
        <el-col :span="8">
          <div class="title">产品</div>
          <div class="link">
            <span>
              <router-link class="router-link"
                           to="/crowdFunding">矿机购买</router-link>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="title">信息</div>
          <div class="link">
            <!---->
            <span href="#"
                  class>
              <router-link to="/aboutUs">关于我们</router-link>
            </span>
          </div>
          <div class="link">
            <!---->
            <span href="#"
                  class>
              <router-link to="/news">新闻</router-link>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="title">支持</div>
          <div class="link">
            <!---->
            <span href="#"
                  class>
              <router-link to="/aboutUs">商务合作</router-link>
            </span>
          </div>
          <div class="link">
            <!---->
            <span href="/#"
                  class>
              <router-link to="/privacyAgreement">隐私条款</router-link>
            </span>
          </div>
          <div class="link">
            <!---->
            <span href="#"
                  class>
              <router-link to="/userAgreement">用户条款</router-link>
            </span>
          </div>
        </el-col>
      </el-col>
      <el-col class="rate"
              :span="9">
        <el-col :span="3">
          &nbsp;
        </el-col>
        <el-col :span="21">
          <div class="el-row bottom-r">
            <div class="title rubik-medium">主要汇率</div>
            <div class="list">
              <span v-for="(item, i) in footerRate"
                    :key="i">1{{item.title}} = {{item.amount}}美元</span>
            </div>
          </div>
        </el-col>

      </el-col>
    </div>
  </div>
</template>
<script>
import { setItem, getItem } from '../utils/newLocalStorage'
import { homePage } from '/api'
export default {
  data () {
    return {
      footerRate: getItem('footRate')
    }
  },
  methods: {
    _homePage () {
      homePage().then(res => {
        if (res.status === 200 && res.data.code === 1) {
          setItem({
            name: 'footRate',
            value: res.data.data.rate,
            expires: 86400000,
            startTime: Date.parse(new Date())
          })
          this.footerRate = getItem('footRate')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created () {
    this._homePage()
  }
}
</script>
<style scoped>
.bottom {
  width: 100%;
  min-width: 1250px;
  background: #31384a;
  display: flex;
  justify-content: center;
}
.content {
  width: 1250px;
  height: 296px;
  box-sizing: border-box;
  margin: 0 120px;
  padding: 70px 0 20px;
  background: #31384a;
  color: #fff;
}
.name {
  height: 18px;
  line-height: 18px;
  background-size: 105px 18px;
  font-size: 20px;
  font-weight: bold;
}
.copyright {
  width: 200px;
  font-size: 12px;
  padding: 20px 0 10px;
  color: #fff;
  opacity: 0.45;
}
.title {
  font-family: Rubik-Medium;
  margin-bottom: 5px;
}
.link {
  padding-top: 15px;
}
.link span {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  opacity: 0.45;
}
.link a {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  /* opacity: 0.45; */
}

.rate {
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.45);
  min-width: 350px;
}
.bottom-r {
  margin: 0 auto;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.title {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.list span {
  margin-top: 20px;
  /* margin-right: 10px; */
  width: 160px;
}
.iconfont {
  font-size: 25px;
  color: rgba(255, 255, 255, 0.45);
  margin-right: 10px;
  text-decoration: none;
}
.iconfont:hover {
  color: #fff;
  text-decoration: none;
}
</style>
