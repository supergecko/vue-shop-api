<template>
  <div>
    <y-shelf title="收益地址" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName">
        <!--BTC-->
        <el-tab-pane label="BTC" name="first">
          <div style="margin-bottom: 10px;">BTC 币种已支持的矿池：AntPool、BTC.com、F2Pool、ViaBTC、BTC.TOP</div>
          <AddressData :addressData=wallet_address></AddressData>
          <div style="text-align: center;padding-top:20px">
            <el-button type="primary" round @click="open()">添加新的BTC地址</el-button>
          </div>
        </el-tab-pane>

        <!--ETH-->
<!--        <el-tab-pane label="ETH" name="second">-->
<!--          <div style="margin-bottom: 10px;">ETH 币种已支持的矿池：AntPool、BTC.com</div>-->
<!--          <AddressData></AddressData>-->
<!--          <div style="text-align: center;padding-top:20px">-->
<!--            <el-button type="primary" round @click="update('ETH')">添加新的ETH地址</el-button>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </el-main>


    <!--添加地址弹窗暂废-->
<!--    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">-->
<!--      <div slot="content" class="md" :data-id="msg.addressId">-->
<!--        <div>-->
<!--          <input type="text" :placeholder=currency v-model="msg.userName">-->
<!--        </div>-->
<!--&lt;!&ndash;        <div>&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="text" placeholder="请输入该地址的备注,可不填" v-model="msg.streetName">&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div>注：为了您的资金安全，后续添加地址时需要进行双身份验证，双身份验证是指需要校验邮箱、手机号、谷歌身份验证器等身份中的2种。</div>-->
<!--&lt;!&ndash;        <div>&ndash;&gt;-->
<!--&lt;!&ndash;          <span><input type="checkbox" v-model="msg.isDefault" style="margin-right: 5px;">设为默认</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <y-button text='保存'-->
<!--                  class="btn"-->
<!--                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"-->
<!--                  @btnClick="save()">-->
<!--        </y-button>-->
<!--      </div>-->
<!--    </y-popup>-->
  </div>
</template>
<script>
  import { saveWallet, getWallet } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import AddressData from '/common/addressDataList'

  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收益地址',
        msg: {
          userName: ''
        },
        activeName: 'first',
        currency: '',
        wallet_address: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName
      }
    },
    methods: {
      // 获取用户收币地址
      getWallet () {
        const loadingWarp = this.$loading({
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
            console.log(res.data.data.address)
            if (this.wallet_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            loadingWarp.close()
          } else {
            this.$message.error('获取失败')
          }
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
              this.getWallet()
            } else {
              this.$message.error('添加失败,请重试')
            }
          })
        }).catch(() => {})
      }
    },
    created () {
      this.getWallet()
    },
    components: {
      YPopup,
      YShelf,
      AddressData
    }
  }
</script>
<style scoped lang="scss">
  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
