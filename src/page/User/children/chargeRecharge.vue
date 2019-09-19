<template>
  <el-row>
    <y-shelf title="我的订单" itemTitle="电费充值" titleFlag="true" thirdPath="true"></y-shelf>
    <el-main style="background:rgba(255,255,255,1);height:400px;margin-bottom: 20px" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="套餐" prop="name">
          <el-select v-model="ruleForm.name" placeholder="请选择套餐机型名称">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="月电费">
          <el-row style="font-size: 20px;color: #32374a;">200元/月</el-row>
        </el-form-item>

        <el-form-item label="付款方式">
          <div class="paymentWarp">
            <div class="paymentItem">
              <el-radio v-model="ruleForm.payment" label="1" border size="medium">抵用雷猫币</el-radio>
              <span style="padding-right: 30px">余额:1000</span>
            </div>
            <div class="paymentItem">
              <el-radio v-model="ruleForm.payment" label="2" border size="medium">抵用USDT</el-radio>
              <span style="padding-right: 30px">余额:1000</span>
            </div>
            <div class="paymentItem">
              <el-radio v-model="ruleForm.payment" label="3" border size="medium">抵用人民余额</el-radio>
              <span style="padding-right: 30px">余额:1000</span>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="剩余应缴费">
          <el-row style="font-size: 20px;color: #32374a;">1200</el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即充值</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>

  </el-row>
</template>

<script>
  import YShelf from '/components/shelf'

  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          payment: 1
        },
        rules: {
          name: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      }
    },
    computed: {

    },
    methods: {

    },
    components: {
      YShelf
    }
  }
</script>

<style scoped>
  .paymentWarp{
    display: flex;
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
