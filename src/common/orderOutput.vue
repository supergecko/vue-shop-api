<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="orderID"
      label="订单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="produce"
      label="累计产出"
      width="100">
    </el-table-column>
    <el-table-column
      prop="power"
      label="算力"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cycle"
      label="套餐周期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="orePool"
      label="当前矿池"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="收益地址"
      width="200">
    </el-table-column>
    <el-table-column
      prop="day"
      label="剩余电费天数">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          orderID: '02',
          produce: '1000',
          power: '1010',
          cycle: '1天',
          orePool: '当前矿池',
          address: '上海市普陀区金沙江路 1518 弄',
          day: 1
        }, {
          orderID: '02',
          produce: '1000',
          power: '1010',
          cycle: '1天',
          orePool: '当前矿池',
          address: '上海市普陀区金沙江路 1518 弄',
          day: 1
        }, {
          orderID: '02',
          produce: '1000',
          power: '1010',
          cycle: '1天',
          orePool: '当前矿池',
          address: '上海市普陀区金沙江路 1518 弄',
          day: 1
        }, {
          orderID: '02',
          produce: '1000',
          power: '1010',
          cycle: '1天',
          orePool: '当前矿池',
          address: '上海市普陀区金沙江路 1518 弄',
          day: 1
        }]
      }
    }
  }
</script>
