<template>
  <div class="usdtTx">
    <YShelf title="USDT余额"
            style="margin-bottom: 10px;"></YShelf>
    <div class="header">
      <img src="/static/images/iconTitle.png"
           alt="">
      <div class="h-left">
        <div class="h-wrap">
          <p>可用币数: <span style="color:rgb(0,156,122);font-weight: bold">USDT</span> <span style="color: red">2.66</span></p>
          <p>冻结币数: <span style="color:rgb(0,156,122);font-weight: bold">USDT</span> <span style="color: red">0.00</span></p>
          <button @click="toPath()"
                  class="h-btn">点击充值</button>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="使用记录"
                   name="first">
        <usdtUser></usdtUser>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import YShelf from '/components/shelf'
import usdtUser from '/common/usdtUser'
import usdtAccount from '/common/usdtAccount'

export default {
  name: 'usdtTx',
  components: {
    YShelf,
    usdtUser,
    usdtAccount
  },
  data: function () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    toPath () {
      this.$router.push('usdt')
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header p {
  padding: 5px;
  margin-right: 180px;
}
.h-left {
}
.h-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.h-btn {
  padding: 0 15px;
  background-color: rgb(64, 158, 255);
  color: #fff;
}
</style>