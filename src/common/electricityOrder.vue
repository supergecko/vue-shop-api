<template>
  <el-table
    :data="electricity_list"
    style="width: 100%"
    height="400">
    <el-table-column
      prop="ele_sn"
      label="订单号"
      sortable
      width="170">
    </el-table-column>
    <el-table-column
      prop="goods_num"
      label="设备数量(台)"
      width="130">
    </el-table-column>
    <el-table-column
      prop="electricity_consumption"
      label="月耗电度数"
      width="130">
    </el-table-column>
    <el-table-column
      prop="electricity"
      label="电费单价(元)"
      width="130">
    </el-table-column>
    <el-table-column
      prop="electricity_cost"
      label="总电费"
      width="130">
    </el-table-column>
    <el-table-column
      prop="all_day"
      label="电费剩余天数"
      width="130">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" type="primary"
          @click="handleEdit(scope.$index, scope.row)">立即充值</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: [
      'electricity_list'
    ],
    data () {
      return {
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(row)
        this.$router.push({path: '/user/chargeRecharge'})
      }
    }
  }
</script>
