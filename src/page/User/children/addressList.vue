<template>
  <div>
    <y-shelf title="收益地址" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--BTC-->
        <el-tab-pane label="BTC" name="first">
          <div style="margin-bottom: 10px;">BTC 币种已支持的矿池：AntPool、BTC.com、F2Pool、ViaBTC、BTC.TOP</div>
          <AddressData></AddressData>
          <div style="text-align: center;padding-top:20px">
            <el-button type="primary" round @click="update('BTC')">添加新的BTC地址</el-button>
          </div>
        </el-tab-pane>

        <!--ETH-->
        <el-tab-pane label="ETH" name="second">
          <div style="margin-bottom: 10px;">ETH 币种已支持的矿池：AntPool、BTC.com</div>
          <AddressData></AddressData>
          <div style="text-align: center;padding-top:20px">
            <el-button type="primary" round @click="update('ETH')">添加新的ETH地址</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>


    <!--添加地址弹窗-->
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <input type="text" :placeholder=currency v-model="msg.userName">
        </div>
        <div>
          <input type="text" placeholder="请输入该地址的备注,可不填" v-model="msg.streetName">
        </div>
        <div>注：为了您的资金安全，后续添加地址时需要进行双身份验证，双身份验证是指需要校验邮箱、手机号、谷歌身份验证器等身份中的2种。</div>
        <div>
          <span><input type="checkbox" v-model="msg.isDefault" style="margin-right: 5px;">设为默认</span>
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addressList, addressUpdate, addressAdd, addressDel } from '/api/goods'
  import YButton from '/components/YButton'
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
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        activeName: 'first',
        currency: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        // &&msg.tel
        return msg.userName && msg.streetName
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      _addressList () {
        addressList().then(res => {
          let data = res.result
          if (data.length) {
            this.addList = res.result
            this.addressId = res.result[0].addressId || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          this._addressList()
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
      },
      // 保存
      save (p) {
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
        this.popupOpen = false
      },
      // 删除
      del (addressId, i) {
        addressDel({addressId}).then(res => {
          if (res.status === '0') {
            this.addList.splice(i, 1)
          } else {
            alert('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.currency = '请输入' + item + '收益地址'
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收益地址'
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收益地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      }
    },
    created () {
      this._addressList()
    },
    components: {
      YButton,
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
