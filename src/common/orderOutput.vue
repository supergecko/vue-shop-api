<template>
  <el-row>
    <el-table v-if="!(orderDataList.length===0)"
      :data="orderDataList"
      style="width: 100%"
      height="310">
      <el-table-column
        prop="order_sn"
        label="订单号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="hashrate"
        label="算力"
        width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        label="套餐周期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mine_name"
        label="当前矿池"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="收益地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="rest_day"
        label="剩余电费天数"
        width="120">
      </el-table-column>
    </el-table>
    <el-row class="main-info-wrap" v-else>
      <img src="../assets/img/data.png" alt />
      <div class="txt">暂无数据...</div>
    </el-row>
  </el-row>
</template>

<script>
  export default {
    props: [
      'orderDataList'
    ],
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .main-info-wrap {
    min-height: 310px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
