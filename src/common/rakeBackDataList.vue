<template>
  <el-table
    :data="bonus_record"
    style="width: 100%"
    height="400">
    <el-table-column
      prop="buy_time"
      label="订单号"
      sortable
      width="200">
    </el-table-column>
    <el-table-column
      prop="order_sn"
      label="用户名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="返佣类型"
      width="100">
    </el-table-column>
    <el-table-column
      prop="actual_price"
      label="购买金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="actual_price"
      label="时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="order_status"
      label="订单状态"
      width="180"
      :filters="[
      { text: '已成功', value: '已成功' },
      { text: '已失败', value: '已失败' },
      { text: '未付款', value: '未付款' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.order_status === '已失败' ? 'danger' :
           scope.row.order_status === '已成功' ? 'success':
           scope.row.order_status === '未付款' ? 'info':''"
          close-transition>{{scope.row.order_status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: [
      'bonus_record'
    ],
    data () {
      return {
      }
    },
    methods: {
      formatter (row, column) {
        return row.actual_price
      },
      filterTag (value, row) {
        return row.order_status === value
      }
    }
  }
</script>
