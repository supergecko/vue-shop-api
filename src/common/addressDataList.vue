<template>
  <el-table
    :data="addressData"
    border
    style="width:100%"
    :row-class-name="tableRowClassName"
    height="400">
    <el-table-column
      prop="address"
      label="地址"
      width="800">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
<!--        <el-button-->
<!--          @click.native.prevent="deleteRow(scope.$index, tableData)"-->
<!--          type="text"-->
<!--          size="small">-->
<!--          删除-->
<!--        </el-button>-->
        <el-button type="text" size="small" @click="open()">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { saveWallet } from '/api'
  import { getItem } from './../utils/newLocalStorage'
  export default {
    props: [
      'addressData'
    ],
    data () {
      return {}
    },
    methods: {
      // 切换样式
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      // 删除按钮
      deleteRow (index, rows) {
        this.$confirm('注：如果该地址正用于某一执行中的算力套餐，删除地址之后收益仍然会打款至该地址，如果您要修改打款地址请到Dashboard中操作。', '确定要删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {

        })
      },
      // 添加新的线上收币地址
      open () {
        this.$prompt('请输入新的收货地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (value) => {
            if (value.trim().length < 1) {
              return '输入不能为空'
            }
          },
          inputErrorMessage: '输入不能为空'
        }).then(({value}) => {
          const user_id = getItem('userID')
          const address = value
          const coin_id = 1
          const timestamp = Date.parse(new Date()) / 1000
          const sign = this.$md5(`${user_id}__${coin_id}__${address}__${timestamp}__thundercat`)
          let params = {user_id, coin_id, address, timestamp, sign}
          const loading = this.$loading({
            text: '添加中',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
            target: '.wrapper'
          })
          saveWallet(params).then(res => {
            loading.close()
            console.log(res)
            if (res.status === 200 && res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.loadingOrderList()
            } else {
              this.$message.error('添加失败,请重试')
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
