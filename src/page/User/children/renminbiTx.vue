<template>
  <div class="usdtTx"
       style="width: 990px">
    <YShelf title="人民币提现"
            style="margin-bottom: 10px;"></YShelf>
    <div class="header">
      <img src="/static/images/iconTitle.png"
           alt="">
      <div class="h-left">
        <p>0550783062</p>
        <p>可用资金: <span style="color: red">￥0.00</span></p>
        <p>冻结资金: <span style="color: red">￥0.00</span></p>
      </div>
      <div class="h-right">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>可提现金额: <span style="color: red">￥0.00</span></p>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="提现记录"
                   name="first">
        <rmbRecord></rmbRecord>
      </el-tab-pane>
      <el-tab-pane label="提现账号"
                   name="second">
        <rmbCard></rmbCard>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import YShelf from '/components/shelf'
import rmbRecord from '/common/rmbRecord'
import rmbCard from '/common/rmbCard'

export default {
  name: 'usdtTx',
  components: {
    YShelf,
    rmbRecord,
    rmbCard
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
</style>