<template>
  <div class="usdtUser">
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px"
              height="400">
      <el-table-column prop="time"
                       label="时间"
                       width="160">
      </el-table-column>
      <el-table-column prop="status"
                       label="使用情况"
                       width="200">
      </el-table-column>
      <el-table-column prop="money"
                       label="金额"
                       width="200">
      </el-table-column>
      <el-table-column prop="residue"
                       label="剩余金额"
                       width="200">
      </el-table-column>
      <el-table-column prop="tag"
                       label="状态"
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
          <el-tag :type="scope.row.tag === '已关闭' ? 'danger' :
           scope.row.tag === '已完成' ? 'success':
           scope.row.tag === '已取消' ? 'info':
           scope.row.tag === '确认中' ? 'warning':''"
                  close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'usdtUser',
  data: function () {
    return {
      tableData: [{
        time: '2019/09/25 17:40',
        status: '购买电费',
        money: '1250',
        residue: '200',
        tag: '已完成'
      },
      {
        time: '2019/09/25 17:40',
        status: '购买电费',
        money: '1250',
        residue: '200',
        tag: '已完成'
      },
      {
        time: '2019/09/25 17:40',
        status: '购买电费',
        money: '1250',
        residue: '200',
        tag: '已完成'
      },
      {
        time: '2019/09/25 17:40',
        status: '购买电费',
        money: '1250',
        residue: '200',
        tag: '已完成'
      },
      {
        time: '2019/09/25 17:40',
        status: '购买电费',
        money: '1250',
        residue: '200',
        tag: '已完成'
      }
      ]
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

<style scoped>
</style>