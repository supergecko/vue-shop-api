<template>
  <el-table :data="order_list"
            style="width: 100%"
            height="400">
    <el-table-column prop="buy_time"
                     label="购买日期"
                     sortable
                     width="150">
    </el-table-column>
    <el-table-column prop="order_sn"
                     label="订单ID"
                     width="200">
    </el-table-column>
    <el-table-column prop="goods_name"
                     label="商品名称"
                     width="130">
    </el-table-column>
    <el-table-column prop="actual_price"
                     label="订单总金额"
                     width="150"
                     :formatter="formatter">
    </el-table-column>
    <el-table-column prop="order_status"
                     label="订单状态"
                     width="150"
                     :filters="[
      { text: '待支付', value: '待支付' },
      { text: '确认中', value: '确认中' },
      { text: '已完成', value: '已完成' },
      { text: '已取消', value: '已取消' },
      { text: '已关闭', value: '已关闭' },
      ]"
                     :filter-method="filterTag"
                     filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.order_status === '已关闭' ? 'danger' :
           scope.row.order_status === '已完成' ? 'success':
           scope.row.order_status === '已取消' ? 'info':
           scope.row.order_status === '确认中' ? 'warning':''"
                close-transition>{{scope.row.order_status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="actual_price"
                     label="订单详情"
                     width="140"
                     :formatter="formatter">
      <template slot-scope="scope">
        <el-button type="text"
                   size="small"
                   @click="look(scope.$index)">查看详情</el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: [
    'order_list'
  ],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    formatter (row, column) {
      return row.actual_price
    },
    filterTag (value, row) {
      return row.order_status === value
    },
    look (index) {
      this.$router.push({
        path: '/user/orderDetail',
        query: {
          id: this.order_list[index].order_id
        }
      })
    }
  }
}
</script>
