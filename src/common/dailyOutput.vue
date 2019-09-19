<template>
  <el-table
    :data="orderDataList  "
    style="width: 100%"
    height="310">
    <el-table-column
      prop="order_sn"
      label="日期"
      width="300">
    </el-table-column>
    <el-table-column
      prop="rest_day"
      label="每日产出">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: [
      'dailyOutput'
    ],
    data () {
      return {
      }
    }
  }
</script>
