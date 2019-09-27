<template>
  <el-row>
    <el-table :data="rechargeElectricity" v-if="!(rechargeElectricity.length===0)"
              style="width: 100%"
              height="350">
      <el-table-column prop="create_time"
                       label="充值日期"
                       sortable
                       width="180">
      </el-table-column>
      <el-table-column prop="num"
                       label="台数"
                       width="120">
      </el-table-column>
      <el-table-column prop="single"
                       label="单台日费用"
                       width="120">
      </el-table-column>
      <el-table-column prop="all_day"
                       label="充值天数"
                       width="120">
      </el-table-column>
      <el-table-column prop="price"
                       label="电费总价"
                       width="120">
      </el-table-column>
      <el-table-column prop="actual_price"
                       label="订单总金额"
                       width="120">
      </el-table-column>
      <el-table-column prop="pay_status"
                       label="订单状态"
                       width="120"
                       :filters="[
      { text: '未支付', value: '未支付' },
      { text: '待确认', value: '待确认' },
      { text: '已完成', value: '已完成' },
      { text: '已关闭', value: '已关闭' },
      ]"
                       :filter-method="filterTag"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.pay_status === '已关闭' ? 'danger' :
           scope.row.pay_status === '已完成' ? 'success':
           scope.row.pay_status === '已关闭' ? 'info':
           scope.row.pay_status === '待确认' ? 'warning':''"
                  close-transition>{{scope.row.pay_status}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row  class="main-info-wrap" v-else>
      <img src="../assets/img/data.png" alt />
      <div class="txt">暂无数据...</div>
    </el-row>
  </el-row>
</template>

<script>
  export default {
    props: [
      'rechargeElectricity'
    ],
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      filterTag (value, row) {
        return row.pay_status === value
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
<style scoped>
  .main-info-wrap {
    min-height: 261px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
