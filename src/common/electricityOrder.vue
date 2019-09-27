<template>
  <el-table
    :data="electricity_list"
    style="width: 100%"
    height="400">
    <el-table-column
      prop="ele_sn"
      label="订单号"
      sortable
      width="210">
    </el-table-column>
    <el-table-column
      prop="goods_num"
      label="设备数量(台)"
      width="140">
    </el-table-column>
<!--    <el-table-column-->
<!--      prop="electricity_consumption"-->
<!--      label="月耗电度数"-->
<!--      width="130">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="electricity"
      label="电费单价(元)"
      width="140">
    </el-table-column>
    <el-table-column
      prop="electricity_cost"
      label="总电费"
      width="140">
    </el-table-column>
    <el-table-column
      prop="all_day"
      label="电费剩余天数"
      width="180">
      <template slot-scope="scope">
        {{scope.row.all_day}}
        <el-tag type="danger" close-transition
                :style="{display:scope.row.all_day<7?'inline-block':'none'}" style="margin-left:15px">请及时缴纳</el-tag>
      </template>
    </el-table-column>
<!--    <el-table-column prop="ele_status"-->
<!--                     label="订单状态"-->
<!--                     width="120"-->
<!--                     :filters="[-->
<!--      { text: '未缴纳', value: '未缴纳' },-->
<!--      { text: '已缴纳', value: '已缴纳' },-->
<!--      { text: '待续费', value: '待续费' },-->
<!--      ]"-->
<!--                     :filter-method="filterTag"-->
<!--                     filter-placement="bottom-end">-->
<!--      <template slot-scope="scope">-->
<!--        <el-tag :type="scope.row.ele_status === '未缴纳' ? 'danger' :-->
<!--           scope.row.ele_status === '已缴纳' ? 'success':-->
<!--           scope.row.ele_status === '待续费' ? 'warning':''"-->
<!--                close-transition>{{scope.row.ele_status}}</el-tag>-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button
          size="mini" type="primary"
          @click="handleEdit(scope.$index, scope.row)">立即缴纳</el-button>
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
        userAllDay: 0 // 用户电费剩余天数
      }
    },
    methods: {
      // filterTag (value, row) {
      //   return row.ele_status === value
      // },
      handleEdit (index, row) {
        this.$router.push({
          path: '/user/chargeRecharge',
          query: {
            order_electricity_id: row.order_electricity_id
          }
        })
      }
    }
  }
</script>
