<template>
  <el-row>
    <y-shelf title="账户中心"></y-shelf>
    <el-main style="background:rgba(255,255,255,1);margin-bottom: 20px" >
      <!--钱包地址-->
      <el-row class="orderListHead">
        <div>钱包地址</div>
      </el-row>
      <el-row>
        <div style="margin-bottom: 10px;margin-top: 15px">BTC 币种已支持的矿池：AntPool、BTC.com、F2Pool、ViaBTC、BTC.TOP</div>
        <AddressData :addressData=wallet_address :isAddress=false  @getWallet="getWallet" :flag=false></AddressData>
        <div style="text-align: center;padding-top:20px">
          <el-button type="primary" round @click="open()">添加新的BTC地址</el-button>
        </div>
      </el-row>

      <!--收货地址-->
      <el-row class="orderListHead">
        <div>收货地址</div>
      </el-row>
      <el-row>
<!--        <div style="margin-bottom: 10px;margin-top: 15px">该地址用于用户自提</div>-->
        <AddressData :addressData=userAddress :isAddress=true @getWallet="getWallet" :flag=true></AddressData>
        <div style="text-align: center;padding-top:20px">
          <el-button type="primary" round @click="dialogFormVisible = true">添加新的收货地址</el-button>

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
              <el-form-item label="收货地区" :label-width="formLabelWidth" prop="receivingArea">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="form.receivingArea"
                  style="width: 100%;">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货人" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="consignee">
                <el-input v-model="form.consignee" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货手机" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="mobile">
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
        </div>
      </el-row>

      <!--修改登录密码-->
<!--      <el-row class="orderListHead">-->
<!--        <div>修改登录密码</div>-->
<!--      </el-row>-->
    </el-main>
  </el-row>
</template>

<script>
  import YShelf from '/components/shelf'
  import { saveWallet, getWallet, saveAddress, getUserAddress } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'
  import AddressData from '/common/addressDataList'
  import { regionData, CodeToText } from 'element-china-area-data'

  export default {
    data () {
      return {
        options: regionData,
        wallet_address: [], // 用户钱包地址
        userAddress: [], // 用户收货地址
        dialogFormVisible: false,
        loadingWarp: '',
        formLabelWidth: '80px',
        form: {
          receivingArea: '', // 收货地区
          address: '', // 详细收货地址
          consignee: '', // 收货人
          mobile: '', // 收获手机
          zipcode: '' // 邮编
        },
        formRules: {
          // 收货地区校验
          receivingArea: [
            {required: true, message: '请选择收货地区', trigger: 'blur'}
          ],
          // 收货地址校验
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
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
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName
      }
    },
    methods: {
      // 获取用户钱包地址
      getWallet () {
        this.loadingWarp = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const coin_id = 1
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${coin_id}__${timestamp}__thundercat`)
        let params = {user_id, coin_id, timestamp, sign}
        getWallet(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.wallet_address = res.data.data.address
            if (this.wallet_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            this._getUserAddress()
          } else {
            this.$message.error('获取失败')
          }
        })
      },
      // 添加新的钱包地址
      open () {
        this.$prompt('请输入新的钱包地址', '提示', {
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
              this.getWallet()
            } else {
              this.$message.error('添加失败,请重试')
            }
          })
        }).catch(() => {})
      },
      // 添加新的收货地址
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { address, consignee, mobile, zipcode, receivingArea } = this.form
            const province = CodeToText[receivingArea[0]]
            const city = CodeToText[receivingArea[1]]
            const district = CodeToText[receivingArea[2]]
            const town = ''
            const user_id = getItem('userID')
            const timestamp = Date.parse(new Date()) / 1000
            const sign = this.$md5(`${user_id}__${province}__${city}__${district}__${town}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__thundercat`)
            let params = {user_id, province, city, district, town, consignee, mobile, zipcode, address, timestamp, sign}
            saveAddress(params).then(res => {
              console.log(res.data.data)
              if (res.status === 200 && res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.getWallet()
              } else {
                this.$message.error('添加失败,请重试')
              }
            })
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 获取用户收货地址
      _getUserAddress () {
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        getUserAddress(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.userAddress = res.data.data
            if (this.wallet_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            this.loadingWarp.close()
          } else {
            this.$message.error('获取失败')
          }
        })
      }
    },
    created () {
      this.getWallet()
    },
    components: {
      YShelf,
      AddressData
    }
  }
</script>

<style scoped>
  .orderListHead{
    width: 950px;
    border-bottom: 1px solid #d8d8d8;
    margin: 0 auto;
    padding-top: 10px;
  }
  .orderListHead div{
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    padding-bottom: 10px;
    border-bottom: 3px solid #5c82ff;
    display: inline-block;
  }
</style>
