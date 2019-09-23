<template>
  <div style="background: #f7f7f7;">
    <div class="orderListWarp" style="background: #fff;">
      <el-row class="orderListHead">
        <div>产品信息</div>
      </el-row>
      <el-row class="orderListForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="购买数量" prop="num">
            <el-input-number v-model="ruleForm.num" :min="1" :max="1000000000" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="币种" prop="currency">
            <el-select v-model="ruleForm.currency" placeholder="请选择币种" :disabled="goodsInfo.forbidden==1? true: false" >
              <el-option :label=item.title :value=item.coin_id v-for="(item, i) in goodsInfo.coin" :key="i" v-if="goodsInfo.coin">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="机型">
            <el-row style="font-size: 20px;color: #32374a;" v-if="goodsInfo.goods">{{goodsInfo.goods.goods_name}}</el-row>
          </el-form-item>

          <el-form-item label="算力">
            <el-input v-if="goodsInfo.goods"
              :placeholder=goodsInfo.goods.hashrate
              :disabled="true"
              style="width: 217px">
            </el-input>
          </el-form-item>

          <el-form-item label="品牌">
            <el-row style="display: flex">
              <el-input v-if="goodsInfo.cycle"
                :placeholder=goodsInfo.cycle[0].description
                :disabled="true"
                style="width: 217px;display: inline-block">
              </el-input>
<!--              <el-row style="margin-left: 20px">-->
<!--                (2019.10.30~2020.12.23)-->
<!--                <i class="el-icon-info"></i>-->
<!--              </el-row>-->
            </el-row>
          </el-form-item>

          <el-form-item label="优惠卷" >
            <el-select v-model="ruleForm.coupon" placeholder="无可用优惠劵" :disabled="true">
              <el-option label="Bitcoin" value="shanghai"></el-option>
              <el-option label="Bitcoin Cash" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="矿池" prop="orePool">
            <el-radio-group v-model="ruleForm.orePool">
              <el-radio :label=item.mine_id v-for="(item, i) in goodsInfo.mine" :key="i" v-if="goodsInfo.mine">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="托管方式" prop="trusteeshipM">
            <el-radio-group v-model="ruleForm.trusteeshipM">
              <el-radio :label=item.host_id v-for="(item, i) in goodsInfo.host" :key="i" v-if="goodsInfo.host" @change="switchingInput(item.host_id)">{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="钱包地址" v-if="paymentInputFlag" prop="btcAddress">
            <el-select v-model="ruleForm.btcAddress" placeholder="请选择钱包地址">
              <el-option :label=item.address :value=item.wallet_id v-for="(item, i) in wallet_address" :key="i">
              </el-option>
            </el-select>
            <el-button @click="open">+ 添加新的线上钱包地址</el-button>
          </el-form-item>

          <el-form-item label="收货地址" v-else prop="userAddress">
            <!--收货地址-->
            <el-select v-model="ruleForm.userAddress" placeholder="请输入实际收货地址">
              <el-option :label=item.address :value=item.address_id v-for="(item, i) in underLine_address" :key="i">
              </el-option>
            </el-select>
            <!-- Form -->
            <el-button type="text" @click="dialogFormVisible = true">+ 添加新的收货地址</el-button>

            <el-dialog title="收货" :visible.sync="dialogFormVisible">
              <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
                <el-form-item label="收货地址" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="address">
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
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="formCheckIn('form')">确 定</el-button>
              </div>
            </el-dialog>
          </el-form-item>
          <el-form-item label="产品总价">
            <el-row class="orderListMiddleText" v-if="goodsInfo.goods">￥ {{goodsInfo.goods.shop_price}}<span> (单台价格)</span></el-row>
          </el-form-item>

          <el-row class="orderListMiddle" style="padding-left: 0px;padding-top: 8px;">
            <el-row class="orderListHead">
              <div>电费详情</div>
            </el-row>
          </el-row>


          <el-form-item label="电费交纳天数" style="padding-top: 15px" prop="electricityDays">
            <el-radio-group v-model="ruleForm.electricityDays">
              <el-radio :label="30" @change="changeDays">1个月</el-radio>
              <el-radio :label="90" @change="changeDays">3个月</el-radio>
              <el-radio :label="150" @change="changeDays">5个月</el-radio>
              <el-radio :label="200" @change="changeDays">
                  <el-input v-model=userInputDays placeholder="请输入月数(例如6代表6个月)" style="width: 217px" :disabled="ruleForm.electricityDays===200? false: true"></el-input>
              </el-radio>
            </el-radio-group>
            <el-row class="powerRateTipOne" style="margin-top: 15px">
              套餐中未交纳的电费剩余天数可以后续支付
            </el-row>
            <el-row class="powerRateTipTwo">
              <el-switch
                v-model="lmbPayment"
                active-text="后续电费是否雷猫币支付"
                inactive-text="">
              </el-switch>
            </el-row>
          </el-form-item>

          <el-row class="orderListMiddle">
            <el-form-item label="电费">
              <el-row class="orderListMiddleText">￥ {{totalElectricity}} <span v-if="goodsInfo.goods">= {{goodsInfo.goods.electricity}}元/天  × {{electricityDay/30}}个月(单台电费)</span> </el-row>
            </el-form-item>
          </el-row>

          <el-row class="orderListMiddle totalCost">
            <el-form-item label="总计">
              <el-row class="totalCostText">￥ {{totalCase}}<span>= (单台费用+电费)*数量</span></el-row>
            </el-form-item>
            <el-row class="totalCostWarp">
              <el-row class="powerRateTipOne" style="width:337px">
                套餐中未交纳的电费剩余天数可以后续支付
              </el-row>
              <el-row style="margin-top: 25px">
                <el-button type="primary" class="checkInBtn"  @click="submitForm('ruleForm')">确定</el-button>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-checkbox v-model="checked">我接受<router-link to="/serviceAgreement" style="margin-left: 5px;">雷猫矿机用户服务协议</router-link></el-checkbox>
              </el-row>
              <el-row style="margin-top: 10px;font-size: 14px;margin-bottom: 20px">
                如果你没有以下支付方式，请通过右下角的反馈入口联系客服
              </el-row>
            </el-row>
          </el-row>

          <el-form-item label="支付方式" style="margin-top:22px;" prop="paymentMethod">
            <el-radio-group v-model="ruleForm.paymentMethod" class="paymentMethodWarp">
              <el-radio :label=item.pay_id class="paymentMethodItem" v-for="(item, i) in goodsInfo.pay" :key="i" v-if="goodsInfo.pay">
                <el-image
                  style="width: 36px; height:36px"
                  :src='"../../../static/paymentMethod/"+item.description+".png"'
                  fit="fill"></el-image>
                <div style="text-align:center">{{item.name}}</div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>

      <!--注意事项-->
      <el-row>
        <div class="payment-notice">
          <div class="sub-amount">注意事项:</div>
          <div class="notice-item">
            <h4 class="rubik-medium">法律声明</h4>
            <div class="tips-text">矿机服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机服务在您的国家或地区是合法的。否则，您将承担一切法律后果。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">无法退款</h4>
            <div class="tips-text">按照协议规定，一旦订单已付款，将不支持退款。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">定价规则</h4>
            <div class="tips-text">矿机服务套餐的定价会根据数字货币价格等多因素调整。实际购买价格以用户付款时为准，后续即使价格发生变化，雷猫也不会对这个订单进行差价补偿。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">算力波动说明</h4>
            <div class="tips-text">雷猫提供的套餐对应的为真实算力，真实算力由于网络、矿机功率等不稳定因素会导致波动，雷猫不承诺100%稳定运行。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">不可控风险声明</h4>
            <div class="tips-text">雷猫不对以下不可控风险所造成的损失负责：不能预见、不能避免或不能克服的客观事件，包括自然灾害如洪水、火山爆发、地震、山崩、火灾、被中国政府部门评定为百年不遇级别以上的风暴和恶劣气候等，政府行为和政府指令，城市级别的电网供电事故，以及社会异常事件如战争、罢工、动乱等。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">使用范围声明</h4>
            <div class="tips-text">用户不得将雷猫提供的算力用于攻击网络等违法违规行为，否则雷猫有权强行收回您的算力。</div>
          </div>
        </div>
      </el-row>
    </div>

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
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="paymentFail">重新选购</el-button>
        <el-button type="primary" @click="paymentSuccess">支付完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { goodsInfo, saveWallet, getWallet, buyNow, saveAddress } from '/api'
  import { getItem } from './../../utils/newLocalStorage'
  export default {
    data () {
      return {
        qrCodeUrl: '', // 二维码图片
        qrCodeFalg: false, // 二维码弹框
        dialogFormVisible: false,
        paymentTypeFlag: false,
        formLabelWidth: '80px',
        form: {
          address: '', // 收货地址
          consignee: '', // 收货人
          mobile: '', // 收获手机
          zipcode: '' // 邮编
        },
        loadingWarp: '', // 加载
        wallet_address: [], // 钱包地址
        underLine_address: [], // 线下收货地址
        wallet_address_flag: false, // 收货/钱包地址切换flag
        coin_id: 1,
        cycle_id: 1, // 周期的ID
        address: '', // 用户收货地址
        loading: true,
        userInputDays: '', // 用户输入电费天数
        goodsInfo: {}, // 商品详情
        paymentInputFlag: true, // 收款地址flag
        input: '',
        checked: true, // 是否同意服务协议
        lmbPayment: true, // 是否需要雷猫币支付
        electricityDay: 0, // 小字的天数
        totalElectricity: 0, // 总电费
        initTotalElectricity: 0, // 初始化矿机单价价格
        totalCase: 0, // 总费用
        electricity: '', // 初始化电费单价价格
        formLabelAlign: {
          bank_account: '',
          bank_name: '',
          bank_open: '',
          bank_title: ''
        },
        ruleForm: {
          currency: 'BTC', // 币种
          coupon: '', // 优惠劵
          trusteeshipM: '', // 托管方式
          btcAddress: '', // 钱包地址
          userAddress: '', // 用户收货地址
          orePool: '', // 矿池
          electricityDays: '', // 电费天数
          num: 1, // 购买数量
          paymentMethod: '' // 支付方式
        },
        rules: {
          // 购买数量校验
          num: [
            {required: true, message: '请确认购买数量', trigger: 'change'}
          ],
          // 币种校验
          currency: [
            {required: true, message: '请选择币种', trigger: 'change'}
          ],
          // 矿池校验
          orePool: [
            {required: true, message: '请选择一个矿池', trigger: 'change'}
          ],
          // 是否需要雷猫币支付校验
          lmbPayment: [
            {required: true, message: '请选择一个矿池', trigger: 'change'}
          ],
          // 托管方式
          trusteeshipM: [
            {required: true, message: '请选择托管方式', trigger: 'change'}
          ],
          // 钱包地址
          btcAddress: [
            {required: true, message: '请选择钱包地址', trigger: 'change'}
          ],
          // 收货地址
          userAddress: [
            {required: true, message: '请选择收货地址', trigger: 'change'}
          ],
          // 电费天数
          electricityDays: [
            {required: true, message: '请选择电费交纳天数', trigger: 'change'}
          ],
          // 支付方式
          paymentMethod: [
            {required: true, message: '请选择支付方式', trigger: 'change'}
          ]
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
      // 完成支付
      paymentSuccess () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
        this.$router.push({
          path: '/user/orderList'
        })
      },
      paymentFail () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
        this.loadingOrderList()
      },
      // 用户收货地址提交
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { address, consignee, mobile, zipcode } = this.form
            const user_id = getItem('userID')
            const timestamp = Date.parse(new Date()) / 1000
            const sign = this.$md5(`${user_id}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__thundercat`)
            let params = {user_id, consignee, mobile, zipcode, address, timestamp, sign}
            saveAddress(params).then(res => {
              console.log(res.data.data)
              if (res.status === 200 && res.data.code === 1) {
                console.log('保存地址成功')
                this.loadingOrderList()
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
      // 获取用户钱包地址
      getWallet () {
        const user_id = getItem('userID')
        if (this.ruleForm.currency === 'BTC') {
          this.coin_id = 1
        } else {
          this.coin_id = this.ruleForm.currency
        }
        const coin_id = this.coin_id
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
            this.loadingWarp.close()
          } else {
            this.$message.error('获取失败')
          }
        })
      },
      // 切换收币/收货地址
      switchingInput (name) {
        if (name === 2) {
          this.paymentInputFlag = false
        } else {
          this.paymentInputFlag = true
        }
      },
      // 拉取订单信息
      loadingOrderList () {
        this.loadingWarp = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const share_activity_id = this.$route.query.share_activity_id
        const goods_id = this.$route.query.goods_id
        let params = {share_activity_id, goods_id, user_id}
        goodsInfo(params).then(res => {
          console.log(`商品详情${JSON.stringify(res.data.data)}`)
          if (res.status === 200 && res.data.code === 1) {
            this.goodsInfo = res.data.data
            this.electricity = res.data.data.goods.electricity
            this.totalCase = res.data.data.goods.shop_price
            this.initTotalElectricity = res.data.data.goods.shop_price
            this.cycle_id = res.data.data.cycle[0].cycle_id
            this.underLine_address = res.data.data.user_address
            this.getWallet()
          } else {
            console.log('登录失败')
            this.ruleForm.errMsg = res.data.msg
          }
        })
      },
      // 电费天数切换
      changeDays (e) {
        if (e < 200) {
          this.userInputDays = ''
        }
      },
      // 添加新的线上钱包地址
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
          if (this.ruleForm.currency === 'BTC') {
            this.coin_id = 1
          } else {
            this.coin_id = this.ruleForm.currency
          }
          const coin_id = this.coin_id
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
      },
      // 购买矿机+电费
      buyNow () {
        const loading = this.$loading({
          text: '购买中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        if (this.ruleForm.currency === 'BTC') {
          this.coin_id = 1
        } else {
          this.coin_id = this.ruleForm.currency
        }
        const {coupon, trusteeshipM, btcAddress, orePool, electricityDays, num, paymentMethod, userAddress} = this.ruleForm
        const user_id = getItem('userID')
        const share_activity_id = this.$route.query.share_activity_id
        const coin_id = this.coin_id
        const buy_num = num
        const cycle_id = this.cycle_id
        const coupon_id = coupon
        const mine_id = orePool
        const host_id = trusteeshipM
        const address_id = userAddress // 收货地址
        const wallet_id = btcAddress // 钱包地址
        const buy_day = electricityDays
        const pay_id = paymentMethod
        const deduct_ele_by_thundercat = this.lmbPayment
        const goods_id = this.$route.query.goods_id
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${this.initTotalElectricity}__${this.electricity}__${user_id}__${timestamp}__thundercat`)
        let params = {user_id, share_activity_id, coin_id, buy_num, cycle_id, coupon_id, mine_id, host_id, address_id, wallet_id, buy_day, pay_id, goods_id, deduct_ele_by_thundercat, timestamp, sign}
        buyNow(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            console.log(res.data.data.pay_type)
            if (res.data.data.pay_type < 3) {
              this.qrCodeUrl = res.data.data.base64
              this.qrCodeFalg = true
              this.paymentTypeFlag = true
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
            }
          } else {
            this.$message.error('提交订单失败,请重试')
            this.ruleForm.errMsg = res.data.msg
          }
        })
      },
      // 提交表单
      submitForm (formName) {
        if (this.checked === false) {
          this.$message({
            message: '请勾选用户服务协议',
            type: 'warning'
          })
          return
        }
        if (this.checked === false) {
          this.$message({
            message: '请勾选用户服务协议',
            type: 'warning'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.buyNow()
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
    mounted () {
      this.loadingOrderList()
    },
    watch: {
      'ruleForm.electricityDays' (newName, oldName) {
        if (newName < 200) {
          this.electricityDay = newName
          this.totalElectricity = parseFloat(newName) * parseFloat(this.electricity)
          this.totalElectricity = parseFloat(this.totalElectricity).toFixed(2)
        }
      },
      'ruleForm.num' (newName, oldName) {
        this.totalCase = this.initTotalElectricity
        this.totalCase = (parseFloat(this.totalCase) + parseFloat(this.totalElectricity)) * newName
        this.totalCase = parseFloat(this.totalCase).toFixed(2)
      },
      userInputDays (newName, oldName) {
        if (this.ruleForm.electricityDays === 200) {
          this.totalElectricity = parseFloat(newName * this.electricity * 30).toFixed(2)
          this.electricityDay = newName * 30
        }
      },
      totalElectricity (newName, oldName) {
        this.totalCase = this.initTotalElectricity
        this.totalCase = (parseFloat(this.totalCase) + parseFloat(newName)) * this.ruleForm.num
        this.totalCase = parseFloat(this.totalCase).toFixed(2)
      }
    }
  }
</script>
<style>
  .qrcodeUrlWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .paymentMethodWarp{
    display: flex;
    align-items: center;
  }
  .paymentMethodItem{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .orderListWarp{
    width: 1200px;
    margin: 0 auto;
    padding: 50px;
    box-shadow: 0 2px 6px 0 rgba(4,4,4,.1);
    border-radius: 2px;
    margin-top: 20px;
  }
  .orderListForm{
    background: #f7f7f7;
    padding: 34px 50px 0;
    width: 1100px;
    margin: 0px auto;
    padding-top: 20px;
    margin-top: 20px;
  }
  .orderListHead{
    width: 1100px;
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
  .orderListMiddle{
    width: 1100px;
    margin-left: -50px;
    padding-left: 50px;
    background: #fff;
    height: 80px;
    padding-top: 20px;
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    border-bottom: 1px dotted #999;
    border-top: 1px dotted #999;
  }
  .totalCost{
    border: 0px;
    height:auto;
  }
  .totalCostWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .checkInBtn{
    width: 310px;
    height: 60px;
  }
  .totalCostText{
    font-family: Rubik-Medium;
    font-size: 50px;
    color: #1c1f28;
    text-align: center;
    margin-left: -300px;
    width: 1050px;
  }

  .orderListMiddleText{
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    width: 1050px;
    text-align: center;
    margin-left: -300px;
  }
  .orderListMiddleText span{
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
  .totalCostText span{
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
  .el-form-item__label{
    text-align: left;
  }
  .powerRateTipOne{
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    background: #fff4e2;
    color: #fe8b0f;
    padding-left: 46px;
    border: 1px solid rgba(255,171,9,.2);
  }
  .powerRateTipTwo{
    background: #fff;
    height: 66px;
    line-height: 66px;
    margin-top: 20px;
    padding-left: 46px;
  }
  .payment-notice {
    background: #f7f7f7;
    border: 1px solid #eee;
    padding: 30px;
    margin-top: 20px;
  }
  .payment-notice .sub-amount {
    color: #999;
  }
  .rubik-medium {
    font-weight: 700!important;
    font-size: 16px;
    color: #1c1f28;
    margin-bottom: 4px;
  }
  .payment-notice .notice-item .tips-text {
    font-size: 16px;
    color: #666;
    line-height: 19px;
  }
  .payment-notice .notice-item {
    margin-top: 15px;
  }
</style>
