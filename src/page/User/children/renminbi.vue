<template>
  <div class="renminbi">
    <YShelf title="人民币余额"
            itemTitle="人民币充值"
            titleFlag="true"
            fivePath="true"
            style="margin-bottom: 10px;"></YShelf>
    <div class="wrap">
      <div class="explain">
        <div class="title">平台账号信息:</div>
        <ul class="ul">
          <li>银行名称: 中国银行
          </li>
          <li>开户支行: 中国银行深圳水库新村支行</li>
          <li>账号: 769265952328</li>
          <li>账户名: 深圳市哈希互联网电子科技有限公司</li>
        </ul>
      </div>

      <div class="recharge">
        <div class="re-num">
          <div class="title"><span class="zd">*</span>充值金额</div>
          <input class="reIput"
                 type="text"
                 v-model="money">
        </div>
        <div class="re-num">
          <div class="title"><span class="zd">*</span>转账卡号</div>
          <input class="reIput"
                 type="text"
                 v-model="cardNum">
        </div>

      </div>

      <div class="explain">
        <div class="title">充值说明:</div>
        <ul class="ul">
          <li>1、请转账付款后,务必填写转账信息。
          </li>
          <li>2、本充值地址仅接受人民币充值，请仔细核对。</li>
          <li>3、平台确认入账后，自动充值余额，超过24小时未到账，想客服反馈解决。</li>
        </ul>
      </div>
      <div class="btnWrap">
        <div class="title">&nbsp;</div>
        <button class="reBtn">充值</button>
      </div>
    </div>

  </div>
</template>

<script>
import YShelf from '/components/shelf'

export default {
  name: 'renminbi',
  components: {
    YShelf
  },
  data: function () {
    return {
      money: '',
      cardNum: ''
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.wrap {
  background-color: #fff;
  padding: 20px 24px;
  margin-bottom: 20px;
  .explain {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    li {
      margin-bottom: 8px;
    }
  }
  .recharge {
    display: inline-block;
    .re-num {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;
      .zd {
        color: red;
      }
      .reIput {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 3px;
        width: 250px;
      }
    }
  }
  .btnWrap {
    display: flex;
    flex-direction: row;
    .reBtn {
      display: inline-block;
      background-color: rgb(244, 172, 40);
      color: #fff;
      padding: 10px 40px;
      border-radius: 3px;
    }
  }
}

.title {
  width: 120px;
  padding-right: 20px;
}
</style>