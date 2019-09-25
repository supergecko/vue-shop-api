<template>
  <div class="usdtUser">
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px"
              height="400">
      <el-table-column prop="oddNum"
                       label="提币单号"
                       width="120">
      </el-table-column>
      <el-table-column prop="address"
                       label="提币地址"
                       width="300">
      </el-table-column>
      <el-table-column prop="remark"
                       label="地址备注"
                       width="230">
      </el-table-column>
      <el-table-column prop="cardNum"
                       label="提币数量(USDT)"
                       width="200">
      </el-table-column>
      <el-table-column prop="tag"
                       label="提现状态"
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
        oddNum: 1,
        address: '福建省福州市鼓楼区软件园',
        remark: '第一个地址',
        cardNum: '200',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        address: '福建省福州市鼓楼区软件园',
        remark: '第一个地址',
        cardNum: '200',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        address: '福建省福州市鼓楼区软件园',
        remark: '第一个地址',
        cardNum: '200',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        address: '福建省福州市鼓楼区软件园',
        remark: '第一个地址',
        cardNum: '200',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        address: '福建省福州市鼓楼区软件园',
        remark: '第一个地址',
        cardNum: '200',
        tag: '已关闭'
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
.usdtUser {
  width: 990px;
}
</style>