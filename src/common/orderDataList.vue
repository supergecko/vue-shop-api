<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="400">
    <el-table-column
      prop="date"
      label="下单日期"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderID"
      label="订单ID"
      width="240  ">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="190">
    </el-table-column>
    <el-table-column
      prop="orderTotal"
      label="订单总金额"
      width="180"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="订单状态"
      width="200"
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
        <el-tag
          :type="scope.row.tag === '已关闭' ? 'danger' :
           scope.row.tag === '已完成' ? 'success':
           scope.row.tag === '已取消' ? 'info':
           scope.row.tag === '确认中' ? 'warning':''"
          close-transition>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1518 弄',
          orderTotal: 100,
          tag: '已关闭'
        }, {
          date: '2016-05-04',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1517 弄',
          orderTotal: 100,
          tag: '已取消'
        }, {
          date: '2016-05-01',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1519 弄',
          orderTotal: 100,
          tag: '确认中'
        }, {
          date: '2016-05-03',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1516 弄',
          orderTotal: 100,
          tag: '已完成'
        }, {
          date: '2016-05-03',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1516 弄',
          orderTotal: 100,
          tag: '待支付'
        }, {
          date: '2016-05-02',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1518 弄',
          orderTotal: 100,
          tag: '已关闭'
        }, {
          date: '2016-05-04',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1517 弄',
          orderTotal: 100,
          tag: '已取消'
        }, {
          date: '2016-05-01',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1519 弄',
          orderTotal: 100,
          tag: '确认中'
        }, {
          date: '2016-05-03',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1516 弄',
          orderTotal: 100,
          tag: '已完成'
        }, {
          date: '2016-05-03',
          orderID: '王小虎',
          name: '上海市普陀区金沙江路 1516 弄',
          orderTotal: 100,
          tag: '待支付'
        }]
      }
    },
    methods: {
      formatter (row, column) {
        return row.orderID
      },
      filterTag (value, row) {
        return row.tag === value
      }
    }
  }
</script>
