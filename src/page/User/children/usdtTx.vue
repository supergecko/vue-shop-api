<template>
  <div class="usdtTx">
    <YShelf title="USDT提现"
            style="margin-bottom: 10px;"></YShelf>
    <div class="header">
      <img src="/static/images/iconTitle.png"
           alt="">
      <div class="h-left">
        <p>0550783062</p>
        <p>可用币数: <span style="color:rgb(0,156,122);font-weight: bold">USDT</span> <span style="color: red">2.66</span></p>
        <p>冻结币数: <span style="color:rgb(0,156,122);font-weight: bold">USDT</span> <span style="color: red">0.00</span></p>
      </div>
      <div class="h-right">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>可提币数: <span style="color:rgb(0,156,122);font-weight: bold">USDT</span> <span style="color: red">2.66</span></p>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="提现记录"
                   name="first">
        <usdtUser></usdtUser>
      </el-tab-pane>
      <el-tab-pane label="提现地址"
                   name="second">
        <usdtAccount></usdtAccount>
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
  methods: {}
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
</style>