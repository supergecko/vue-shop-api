<template>
  <el-row>
    <el-table v-if="!(addressData.length===0)"
      :data="addressData"
      border
      style="width:100%"
      :row-class-name="tableRowClassName"
      height="278">
      <el-table-column
        prop="address"
        label="地址"
        width="750">
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
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row  class="main-info-wrap" v-else>
      <img src="../assets/img/data.png" alt />
      <div class="txt">暂无数据...</div>
    </el-row>
    <!--收货地址-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
        <el-form-item label="收获地址" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="consignee">
          <el-input v-model="form.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收获手机" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="zipcode">
          <el-input v-model="form.zipcode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="formCheckIn('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import { editAddress, editWallet } from '/api'
  import { getItem } from './../utils/newLocalStorage'
  export default {
    props: [
      'addressData',
      'isAddress'
    ],
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '80px',
        address_id: 0, // 收货地址ID
        wallet_id: 0, // 钱包地址ID
        form: {
          address: '', // 收货地址
          consignee: '', // 收货人
          mobile: '', // 收获手机
          zipcode: '' // 邮编
        },
        formRules: {
          // 收货地址校验
          address: [
            {required: true, message: '请输入收货地址', trigger: 'blur'}
          ],
          // 收货人校验
          consignee: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'}
          ],
          // 手机号校验
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          // 邮政编码校验
          zipcode: [
            {required: true, message: '请输入邮政编码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 修改收货地址
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              text: '修改中',
              background: 'rgba(0, 0, 0, 0.7)',
              fullscreen: true,
              target: '.wrapper'
            })
            const { address, consignee, mobile, zipcode } = this.form
            const user_id = getItem('userID')
            const timestamp = Date.parse(new Date()) / 1000
            const address_id = this.address_id
            const sign = this.$md5(`${user_id}__${address_id}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__thundercat`)
            let params = {user_id, address_id, consignee, mobile, zipcode, address, timestamp, sign}
            editAddress(params).then(res => {
              loading.close()
              if (res.status === 200 && res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$emit('getWallet')
              } else {
                this.$message.error('获取失败')
              }
            })
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 修改钱包地址
      _editWallet () {
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
          const wallet_id = this.wallet_id
          const timestamp = Date.parse(new Date()) / 1000
          const sign = this.$md5(`${user_id}__${wallet_id}__${address}__${timestamp}__thundercat`)
          let params = {user_id, wallet_id, address, timestamp, sign}
          const loading = this.$loading({
            text: '修改中',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
            target: '.wrapper'
          })
          editWallet(params).then(res => {
            loading.close()
            if (res.status === 200 && res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$emit('getWallet')
            } else {
              this.$message.error('添加失败,请重试')
            }
          })
        }).catch(() => {})
      },
      // 切换样式
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row'
        } else {
          return 'success-row'
        }
      },
      // 编辑
      handleEdit (index, row) {
        if (this.isAddress) {
          this.dialogFormVisible = true
          this.address_id = row.address_id
        } else {
          this.wallet_id = row.wallet_id
          this._editWallet()
        }
      }
    }
  }
</script>
<style>
  .main-info-wrap {
    min-height: 278px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #e8e8e8;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
