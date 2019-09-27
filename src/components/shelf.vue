<template>
  <div class="gray-box">
    <div class="title"
         v-if="!titleFlag">
      <span style="font-size:14px">{{title}}</span>
      <div>
        <slot name="right"></slot>
      </div>
    </div>

    <div class="title"
         v-if="titleFlag">
      <el-breadcrumb separator="/"
                     v-if="firstPath">
        <el-breadcrumb-item :to="{ path: '/user/information' }">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/dailyOutput' }">每日产出</el-breadcrumb-item>
      </el-breadcrumb>
      <el-breadcrumb separator="/"
                     v-if="secondPath">
        <el-breadcrumb-item :to="{ path: '/user/extension' }">我的推广</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/myTeam' }">我的团队</el-breadcrumb-item>
      </el-breadcrumb>
      <el-breadcrumb separator="/"
                     v-if="thirdPath">
        <el-breadcrumb-item :to="{path: '/user/orderList',query: {goBackFlag: true}}">电费订单</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/chargeRecharge' }">电费缴纳</el-breadcrumb-item>
      </el-breadcrumb>
      <el-breadcrumb separator="/"
                     v-if="fourPath">
        <el-breadcrumb-item :to="{ path: '/user/usdtTx' }">USDT余额</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/usdt' }">USDT充值</el-breadcrumb-item>
      </el-breadcrumb>
      <el-breadcrumb separator="/"
                     v-if="fivePath">
        <el-breadcrumb-item :to="{ path: '/user/rmbPageTx' }">人民币余额</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/rmbPage' }">人民币充值</el-breadcrumb-item>
      </el-breadcrumb>
      <el-breadcrumb separator="/"
                     v-if="sevenPath">
        <el-breadcrumb-item :to="{ path: '/user/orderList' }">算力套餐订单</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/orderDetail' }">查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'title',
    'itemFlag',
    'itemTitle',
    'titleFlag',
    'firstPath',
    'bgFlag',
    'secondPath',
    'thirdPath',
    'fourPath',
    'fivePath',
    'sevenPath'
  ]
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.gray-box {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .title {
    padding-left: 30px;
    position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 24px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
    background: #f3f3f3;
    background: -webkit-linear-gradient(#fbfbfb, #ececec);
    background: linear-gradient(#fbfbfb, #ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 18px;
      font-weight: 400;
      color: #626262;
      display: inline-block;
    }
  }
}
</style>
