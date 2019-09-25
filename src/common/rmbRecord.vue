<template>
  <div class="usdtUser">
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px"
              height="400">
      <el-table-column prop="oddNum"
                       label="提现单号"
                       width="105">
      </el-table-column>
      <el-table-column prop="bank"
                       label="提现银行"
                       width="120">
      </el-table-column>
      <el-table-column prop="region"
                       label="开户地区"
                       width="160">
      </el-table-column>
      <el-table-column prop="cardNum"
                       label="银行卡号"
                       width="200">
      </el-table-column>
      <el-table-column prop="cardhold"
                       label="持卡人"
                       width="85">
      </el-table-column>
      <el-table-column prop="money"
                       label="提现金额(￥)">
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
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
        tag: '已关闭'
      },
      {
        oddNum: 1,
        bank: '中国人民银行',
        region: '福建省福州市鼓楼区软件园',
        cardNum: '12345678901234560000',
        cardhold: '李白白',
        money: '10000000',
        state: '良好',
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
</style>