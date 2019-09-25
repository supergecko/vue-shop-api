<template>
  <div class="usdt">
    <YShelf title="USDT充值"
            style="margin-bottom: 10px;"></YShelf>
    <div class="wrap">
      <div class="address">
        <div class="title">
          链名称
        </div>
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="address">
        <div class="title">USDT钱包地址:</div>
        <p v-show="ERC20"
           disabled
           class="ipt"
           type="text">{{ usdtList[0].address }}</p>
        <p v-show="Omni"
           disabled
           class="ipt"
           type="text">{{ usdtList[1].address }}</p>
        <p v-show="TRC20"
           disabled
           class="ipt"
           type="text">{{ usdtList[2].address }}</p>
        <button class="btn"
                v-clipboard:copy="usdtList[0].address"
                v-clipboard:success="copy">复制充值地址</button>
      </div>

      <div class="QRcode">
        <div class="title">USDT钱包二维码:</div>
        <div class="imgWrap"
             v-show="ERC20">
          <img width="200"
               class="img"
               src="../../../../static/images/ERC20.png"
               alt="">
          <span class="name">{{ usdtList[0].name }}</span>
        </div>
        <div class="imgWrap"
             v-show="Omni">
          <img width="200"
               class="img"
               src="../../../../static/images/Omni.png"
               alt="">
          <span class="name">{{ usdtList[1].name }}</span>
        </div>
        <div class="imgWrap"
             v-show="TRC20">
          <img width="200"
               class="img"
               src="../../../../static/images/TRC20.png"
               alt="">
          <span class="name">{{ usdtList[2].name }}</span>
        </div>
      </div>

      <div class="explain">
        <div class="title">充值说明:</div>
        <ul class="ul">
          <li>1、请转账付款后,务必填写转账钱包地址。
          </li>
          <li>2、本充值地址仅接受USDT充值，请仔细核对。</li>
          <li>3、平台确认入账后，自动充值余额，超过24小时未到账，想客服反馈解决。</li>
        </ul>
      </div>

      <div class="recharge">
        <div class="re-num">
          <div class="title"><span class="zd">*</span>充值数量</div>
          <input class="reIput"
                 type="text"
                 v-model="reNum">
        </div>
        <div class="re-num">
          <div class="title"><span class="zd">*</span>转账钱包地址</div>
          <input class="reIput"
                 type="text"
                 v-model="reAddress">
        </div>
        <div class="btnWrap">
          <div class="title">&nbsp;</div>
          <button class="reBtn">充值</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import YShelf from '/components/shelf'
import Clipboard from 'clipboard'

export default {
  name: 'usdt',
  components: {
    YShelf,
    Clipboard
  },
  data: function () {
    return {
      usdtList: [
        {
          name: 'USDT-ERC20',
          address: '0x19ca17e90ebc8bbab67985e9651cfd70a0c1fbbd'
        },
        {
          name: 'OMNI:',
          address: '3Gf96NvTvbQD6wa9eowtAGFeZqvqw5nTGF'
        },
        {
          name: 'USDT-TRC20',
          address: 'TNH9F5Ve8bCj35uc1PENxCDL1t91oPTZTs'
        }
      ],
      reNum: '',
      reAddress: '',
      options: [{
        value: 'ERC20',
        label: 'USDT-ERC20'
      }, {
        value: 'Omni',
        label: 'USDT-Omni'
      }, {
        value: 'TRC20',
        label: 'USDT-TRC20'
      }],
      value: 'ERC20',
      ERC20: true,
      Omni: false,
      TRC20: false
    }
  },
  methods: {
    copy () {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  },
  watch: {
    value () {
      if (this.value === 'ERC20') {
        this.ERC20 = true
        this.Omni = false
        this.TRC20 = false
      } else if (this.value === 'Omni') {
        this.ERC20 = false
        this.Omni = true
        this.TRC20 = false
      } else if (this.value === 'TRC20') {
        this.ERC20 = false
        this.Omni = false
        this.TRC20 = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background-color: #fff;
  padding: 20px 24px;
  margin-bottom: 20px;
  .address {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    .ipt {
      background-color: rgba(0, 0, 0, 0);
      font-size: 14px;
      margin-right: 20px;
      color: #666;
    }
    .btn {
      color: rgb(244, 172, 40);
      border: 1px solid rgb(244, 172, 40);
      padding: 5px 8px;
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .QRcode {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    .imgWrap {
      border: 1px solid #aaa;
      border-radius: 5px;
      position: relative;
      .img {
        border-radius: 5px;
        padding: 10px;
        padding-top: 30px;
      }
      .name {
        background-color: rgb(244, 172, 40);
        color: #fff;
        padding: 3px 15px;
        position: absolute;
        left: 0;
        top: 5px;
      }
    }
  }
  .explain {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
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
        widows: 250px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 3px;
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
}

.title {
  width: 120px;
  padding-right: 20px;
}
</style>