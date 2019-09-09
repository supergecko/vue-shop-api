<template>
  <div style="    background: #f7f7f7;">
    <div class="orderListWarp" style="background: #fff;">
      <el-row class="orderListHead">
        <div>订单信息</div>
      </el-row>
      <el-row class="orderListForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="币种" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择币种">
              <el-option label="Bitcoin" value="shanghai"></el-option>
              <el-option label="Bitcoin Cash" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="机型">
            <el-row style="font-size: 20px;color: #32374a;">蚂蚁矿机15系列</el-row>
          </el-form-item>

          <el-form-item label="算力">
            <el-input
              placeholder="20 TH/S"
              :disabled="true"
              style="width: 217px">
            </el-input>
          </el-form-item>

          <el-form-item label="套餐周期">
            <el-row style="display: flex">
              <el-input
                placeholder="420天"
                :disabled="true"
                style="width: 217px;display: inline-block">
              </el-input>
              <el-row style="margin-left: 20px">
                (2019.10.30~2020.12.23)
                <i class="el-icon-info"></i>
              </el-row>
            </el-row>
          </el-form-item>

          <el-form-item label="优惠卷" >
            <el-select v-model="ruleForm.region" placeholder="无可用优惠劵" :disabled="true">
              <el-option label="Bitcoin" value="shanghai"></el-option>
              <el-option label="Bitcoin Cash" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="矿池">
            <el-radio-group v-model="radio1">
              <el-radio :label="3">AntPool</el-radio>
              <el-radio :label="6">BTC.com</el-radio>
              <el-radio :label="9">F2Pool</el-radio>
              <el-radio :label="12">ViaBTC</el-radio>
              <el-radio :label="15">BTC.TOP</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="收款方式" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="打款至我的个人钱包"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="BCH收币地址" prop="resource">
            <el-button @click="open">+ 添加新的BCH地址</el-button>
          </el-form-item>

          <el-row class="orderListMiddle">
            <el-form-item label="算力费">
              <el-row class="orderListMiddleText">$ 821.2</el-row>
            </el-form-item>
          </el-row>


          <el-form-item label="电费交纳天数">
            <el-radio-group v-model="radio">
              <el-radio :label="3">10</el-radio>
              <el-radio :label="6">20</el-radio>
              <el-radio :label="9">30</el-radio>
              <el-radio :label="12">40</el-radio>
            </el-radio-group>
            <el-row style="margin-top: 15px;margin-bottom: 15px">
              <el-input v-model="input" placeholder="请输入天数" style="width: 217px"></el-input>
            </el-row>
            <el-row class="powerRateTipOne">
              套餐中未交纳的电费剩余天数可以后续支付
            </el-row>
            <el-row class="powerRateTipTwo">
              <el-switch
                v-model="value1"
                active-text="后续电费从Matrixport钱包中自动扣除"
                inactive-text="">
              </el-switch>
            </el-row>

          </el-form-item>

          <el-row class="orderListMiddle">
            <el-form-item label="电费">
              <el-row class="orderListMiddleText">$ 97.00 <span>= $0.0970/T/天 × 100T × 10天</span> </el-row>
            </el-form-item>
          </el-row>

          <el-row class="orderListMiddle totalCost">
            <el-form-item label="总计">
              <el-row class="totalCostText">$4203.00</el-row>
            </el-form-item>
            <el-row class="totalCostWarp">
              <el-row class="powerRateTipOne" style="width:337px">
                套餐中未交纳的电费剩余天数可以后续支付
              </el-row>
              <el-row style="margin-top: 25px">
                <el-button type="info" disabled class="checkInBtn">确定</el-button>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-checkbox v-model="checked">我接受<router-link to="/serviceAgreement" style="margin-left: 5px;">雷猫矿机用户服务协议</router-link></el-checkbox>
              </el-row>
              <el-row style="margin-top: 10px;font-size: 14px;">
                如果你没有以下支付方式，请通过右下角的反馈入口联系客服
              </el-row>
            </el-row>
          </el-row>

          <el-form-item label="支付方式">

          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="payment-notice">
          <div class="sub-amount">注意事项:</div>
          <div class="notice-item">
            <h4 class="rubik-medium">法律声明</h4>
            <div class="tips-text">矿机共享共享服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机共享服务在您的国家或地区是合法的。否则，您将承担一切法律后果。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">无法退款</h4>
            <div class="tips-text">按照协议规定，一旦订单已付款，将不支持退款。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">定价规则</h4>
            <div class="tips-text">矿机共享套餐的定价会根据数字货币价格等多因素调整。实际购买价格以用户付款时为准，后续即使价格发生变化，雷猫也不会对这个订单进行差价补偿。</div>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        input: '',
        checked: true,
        value1: true,
        radio1: 6,
        radio: 3,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个矿池', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      open () {
        this.$prompt('请输入新的BTC地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {})
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
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
    padding-left: 272px;
  }

  .orderListMiddleText{
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    padding-left: 272px;
  }
  .orderListMiddleText span{
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
