<template>
  <el-table
    :data="dailyOutput"
    style="width: 100%"
    height="310">
    <el-table-column
      prop="order_sn"
      label="日期"
      width="280">
    </el-table-column>
    <el-table-column
      prop="rest_day"
      label="每日产出"
      width="280">
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
