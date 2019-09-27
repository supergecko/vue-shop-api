<template>
  <el-row>
    <y-shelf title="电费订单" itemTitle="电费缴纳" titleFlag="true" thirdPath="true"></y-shelf>
    <el-main style="background:rgba(255,255,255,1);max-width: 950px;margin: 0 auto;margin-bottom: 20px;" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="套餐">
          <el-select v-model="ruleForm.name" :placeholder=electricityInfo.goods_name disabled>
            <el-option label="套餐一" value="shanghai"></el-option>
            <el-option label="套餐二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电费">
          <el-row style="font-size: 20px;color: #32374a;">{{electricityInfo.electricity}} 元 / 天</el-row>
        </el-form-item>
        <el-form-item label="电费缴纳天数" prop="electricityDays">
          <el-radio-group v-model="ruleForm.electricityDays">
            <el-radio :label="30" @change="changeDays">30天</el-radio>
            <el-radio :label="90" @change="changeDays">90天</el-radio>
            <el-radio :label="150" @change="changeDays">150天</el-radio>
            <el-radio :label="200" @change="changeDays">
              <el-input v-model=userInputDays placeholder="请输入天数(例如60代表6天)" style="width: 217px" :disabled="ruleForm.electricityDays===200? false: true"></el-input>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备数量">
          <el-row style="font-size: 20px;color: #32374a;">{{electricityInfo.goods_num}} 台</el-row>
        </el-form-item>
        <el-form-item label="付款方式" prop="payment">
          <div class="paymentWarp" v-for="(item, i) in electricityPay" :key="i">
            <div class="paymentItem">
              <el-radio v-model="ruleForm.payment" :label=item.pay_id  border size="medium">{{item.name}}</el-radio>
              <span style="padding-right: 30px">余额:{{item.balance}}</span>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="应缴纳费用">
          <el-row style="font-size: 20px;color: #32374a;">{{totalCase}} 元 <span style="font-size: 16px;color: rgb(153, 153, 153);">= (电费*电费缴纳天数*设备数量)</span></el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即缴纳</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
      <el-row class="orderListHead">
        <div>缴纳记录</div>
      </el-row>
      <el-row>
        <RechargeElectricityList :rechargeElectricity=rechargeElectricity></RechargeElectricityList>
      </el-row>
    </el-main>
    <!--弹窗支付-->
    <el-dialog  :visible.sync="qrCodeFalg">
      <!--线上支付-->
      <el-row class="qrcodeUrlWarp" v-show="paymentTypeFlag">
        <el-row style="font-size: 18px;margin-bottom: 10px" >请扫描下方二维码进行支付</el-row>
        <el-row>
          <el-image
            style="width: 300px; height: 407px"
            :src="qrCodeUrl"
            fit="fill"></el-image>
        </el-row>
        <el-row style="text-align: center;font-size: 14px;color: blue;margin-top: 5px;width: 360px">转账请备注手机号，以便工作人员核实到账情况。请勿备注与矿机有关字眼，如：蚂蚁矿机、神马矿机、比特币等</el-row>
        <el-row style="text-align: center;font-size: 14px;color: blue;margin-top: 5px;margin-bottom: 5px">转账校验请填写:郑</el-row>
      </el-row>
      <!--公账-->
      <el-row v-show="!paymentTypeFlag">
        <el-row style="font-size: 18px;text-align: center;margin-bottom: 15px">请线下转账对公账户</el-row>
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-form-item label="银行名称">
            <el-input v-model="formLabelAlign.bank_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="户   名">
            <el-input v-model="formLabelAlign.bank_title" disabled></el-input>
          </el-form-item>
          <el-form-item label="账   号">
            <el-input v-model="formLabelAlign.bank_account" disabled></el-input>
          </el-form-item>
          <el-form-item label="开 户 行">
            <el-input v-model="formLabelAlign.bank_open" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="text-align: center;font-size: 16px;">未支付金额: <span style="color:red;">{{unpaid}} 元</span></el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="paymentFail">重新选购</el-button>
        <el-button type="primary" @click="paymentSuccess">支付完成</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import YShelf from '/components/shelf'
  import { buyElectricityDetail, buyElectricityCost } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'
  import RechargeElectricityList from '/common/rechargeElectricityList'

  export default {
    data () {
      return {
        unpaid: 0, // 未支付金额
        ruleForm: {
          name: '',
          payment: '',
          electricityDays: ''
        },
        rules: {
          name: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          // 电费天数
          electricityDays: [
            {required: true, message: '请选择电费充值天数', trigger: 'change'}
          ],
          // 付款方式
          payment: [
            {required: true, message: '请选择付款方式', trigger: 'change'}
          ]
        },
        electricityInfo: {}, // 电费订单详情
        electricityPay: [], // 支付方式
        record: [], // 充值记录
        userInputDays: '', // 用户输入电费天数
        totalCase: 0, // 应缴纳总费用
        electricity: 0, // 电费单价
        buy_day: 0, // 提交天数
        paymentTypeFlag: false,
        qrCodeUrl: '', // 二维码图片
        qrCodeFalg: false, // 二维码弹框
        formLabelAlign: {
          bank_account: '',
          bank_name: '',
          bank_open: '',
          bank_title: ''
        },
        rechargeElectricity: [], // 充值记录
        goodsNum: 0 // 设备数量
      }
    },
    computed: {

    },
    methods: {
      // 完成支付
      paymentSuccess () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
        this.$router.push({
          path: '/user/orderList'
        })
      },
      // 取消支付
      paymentFail () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
      },
      // 电费天数切换
      changeDays (e) {
        if (e < 200) {
          this.userInputDays = ''
        }
      },
      // 电费订单详情
      _buyElectricityDetail () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const order_electricity_id = this.$route.query.order_electricity_id
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${order_electricity_id}__${timestamp}__thundercat`)
        let params = {user_id, order_electricity_id, timestamp, sign}
        buyElectricityDetail(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            this.electricity = res.data.data.info.electricity
            this.goodsNum = res.data.data.info.goods_num
            this.electricityInfo = res.data.data.info
            this.electricityPay = res.data.data.pay
            this.rechargeElectricity = res.data.data.record
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 购买电费
      _buyElectricityCost () {
        const loading = this.$loading({
          text: '充值中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const {payment, electricityDays} = this.ruleForm
        if (electricityDays === 200) {
          this.buy_day = parseFloat(this.userInputDays) * 30
        } else {
          this.buy_day = electricityDays
        }
        const user_id = getItem('userID')
        const buy_day = this.buy_day
        const pay_id = payment
        const order_electricity_id = this.$route.query.order_electricity_id
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${order_electricity_id}__${buy_day}__${pay_id}__${timestamp}__thundercat`)
        let params = {user_id, order_electricity_id, buy_day, pay_id, timestamp, sign}
        buyElectricityCost(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            if (res.data.data.pay_type < 3) {
              this.qrCodeUrl = res.data.data.base64
              this.qrCodeFalg = true
              this.paymentTypeFlag = true
              this.unpaid = res.data.data.unpaid
            } else if (res.data.data.pay_type === 3) {
              this.$message({
                message: '支付成功',
                type: 'success'
              })
              this.$router.push({
                path: '/user/orderList'
              })
            } else {
              this.qrCodeFalg = true
              this.paymentTypeFlag = false
              this.formLabelAlign.bank_account = res.data.data.address.bank_account
              this.formLabelAlign.bank_name = res.data.data.address.bank_name
              this.formLabelAlign.bank_open = res.data.data.address.bank_open
              this.formLabelAlign.bank_title = res.data.data.address.bank_title
              this.unpaid = res.data.data.unpaid
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 提交表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._buyElectricityCost()
          } else {
            this.$message({
              message: '请检查信息是否填写完善',
              type: 'warning'
            })
            return false
          }
        })
      }
    },
    created () {
      this._buyElectricityDetail()
    },
    components: {
      YShelf,
      RechargeElectricityList
    },
    watch: {
      // 电费天数
      'ruleForm.electricityDays' (newName, oldName) {
        if (!(newName === '')) {
          if (newName < 200) {
            this.totalCase = parseFloat(newName) * parseFloat(this.electricity) * parseFloat(this.goodsNum)// 总电费
            this.totalCase = parseFloat(this.totalCase).toFixed(2) // 总电费
          }
        }
      },
      // 用户输入的天数
      userInputDays (newName, oldName) {
        if (this.ruleForm.electricityDays === 200) {
          this.totalCase = parseFloat(newName * this.electricity * this.goodsNum).toFixed(2) // 用户输入天数*电费 = 总电费
        }
      }
    }
  }
</script>

<style scoped>
  .orderListHead{
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
  .qrcodeUrlWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .paymentWarp{
    display: inline-block;
  }
  .paymentItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title-line-bottom {
    display: inline-block;
    border-bottom: 3px solid #409EFF;
    padding: 20px 0 10px;
    color: #1c1f28;
    line-height: 23px;
    font-weight: 600;
  }
  .more-wrap {
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    color: #3c4156;
  }
  .main-info-wrap {
    min-height: 313px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #e8e8e8;
  }
  .bottom-text{
    font-size: 12px;
    color: #999;
    margin-left: 20px;
    margin-bottom: 30px;
  }
</style>
