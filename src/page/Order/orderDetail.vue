<template>
  <div class="odDetail">
    <y-shelf title="我的订单"
             itemTitle="订单详情"
             titleFlag="true"
             sevenPath="true"></y-shelf>
    <div class="bg">
      <div class="head-wrap">
        <div class="time">
          <p class="p1">下单时间</p>
          <p>{{ order.add_time }}</p>
        </div>
        <div class="num">
          <p class="p1">下单号</p>
          <p>{{ order.order_sn }}</p>
        </div>
        <div class="status">
          <p class="p1">订单状态</p>
          <p style="color: rgb(101,155,244)">{{ order_statue }}</p>
        </div>
        <button :class="active ? 'receiving' : 'success'"
                @click="receiving()"
                v-show="showRev">
          <span v-show="active">确认收货</span>
          <span v-show="!active">已收货</span>
        </button>
      </div>

      <div class='address'>
        <div class="title"><span>首次选择的矿机和地址</span></div>
        <div class="content">
          <p>矿池</p>
          <p>{{ order.mine_name }}</p>
        </div>
        <div class="content">
          <p>地址</p>
          <p>{{ address}}</p>
        </div>
      </div>

      <div class="info">
        <div class="title"><span>商品信息</span></div>
        <div class="content">
          <ul class="info-title"
              style="margin-top: 20px;background: rgb(250,250,250);">
            <li>型号</li>
            <li>币种</li>
            <li>数量</li>
            <li>算力</li>
            <li>品牌</li>
            <li>预计交付时间</li>
            <li>价格</li>
          </ul>
          <ul>
            <li>{{ order.goods_name }}</li>
            <li>{{ pay.title }}</li>
            <li>{{ order.goods_num }}台</li>
            <li>{{ order.hashrate }}TH/s</li>
            <li>{{ order.cycle_day }}</li>
            <li>{{ order.mine_doing }}</li>
            <li>{{ order.final_price }}元</li>
          </ul>
          <div class="title"
               style="margin-top: 10px;"><span>电费信息</span></div>
          <ul class="info-title"
              style="margin-top: 20px;background: rgb(250,250,250);">
            <li>电费时长</li>
            <li>--</li>
            <li>数量</li>
            <li>--</li>
            <li>--</li>
            <li>--</li>
            <li>价格</li>
          </ul>
          <ul>
            <li>{{ ele.all_day }}天</li>
            <li>--</li>
            <li>{{ order.goods_num }}台</li>
            <li>--</li>
            <li>--</li>
            <li>--</li>
            <li>{{  }}</li>
          </ul>
        </div>
      </div>

      <!--优惠信息-->
      <div class="payInfo">
        <div class="title"><span>优惠信息</span></div>
        <div class="inWrap">
          <div class="content">
            <p>类型</p>
            <p>{{ discount.name }}</p>
          </div>
          <div class="content">
            <p>金额</p>
            <p>{{discount.amount}}</p>
          </div>
<!--          <div class="content">-->
<!--            <p>挖矿币种</p>-->
<!--            <p>{{ pay.title }}</p>-->
<!--          </div>-->
<!--          <div class="content">-->
<!--            <p>支付状态</p>-->
<!--            <p>{{ pay_status }}</p>-->
<!--          </div>-->
        </div>
      </div>

      <div class="payInfo" style="margin-top: 20px">
        <div class="title"><span>支付信息</span></div>
        <div class="inWrap">
          <div class="content">
            <p>订单金额</p>
            <p>{{ pay.actual_price }}</p>
          </div>
          <div class="content">
            <p>支付方式</p>
            <p>{{ pay.pay_name }}</p>
          </div>
          <div class="content">
            <p>挖矿币种</p>
            <p>{{ pay.title }}</p>
          </div>
          <div class="content">
            <p>支付状态</p>
            <p>{{ pay_status }}</p>
          </div>
        </div>
      </div>

      <div class="payInfo"
           style="margin-top: 20px"
           v-if="!(delivery===null)">
        <div class="title"><span>物流信息</span></div>
        <div class="inWrap">
          <div class="content">
            <p>物流公司</p>
            <p>{{ delivery.shipping_name }}</p>
          </div>
          <div class="content">
            <p>物流单号</p>
            <p>{{ delivery.invoice_no }}</p>
          </div>
        </div>
      </div>

      <div class="close">
        <button class="btn"
                @click="close()">关闭</button>
      </div>

    </div>

  </div>
</template>

<script>
import YShelf from '/components/shelf'
import { orderDetail, shouhuo } from '/api/index'
import { getItem } from './../../utils/newLocalStorage'

export default {
  name: 'odDetail',
  components: {
    YShelf
  },
  data: function () {
    return {
      ele: {},
      order: {},
      pay: {},
      delivery: {},
      active: true,
      discount: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    close () {
      this.$router.push('/user/orderList')
    },
    getData () {
      // eslint-disable-next-line no-unused-vars
      const user_id = getItem('userID')
      let order_id = this.$route.query.id
      const timestamp = Date.parse(new Date()) / 1000
      const sign = this.$md5(`${user_id}__${order_id}__${timestamp}__thundercat`)
      let params = {
        user_id,
        order_id,
        timestamp,
        sign
      }
      orderDetail(params)
        .then(res => {
          let data = res.data.data
          this.ele = data.ele
          this.order = data.order
          this.pay = data.pay
          this.discount = data.discount[0]
          this.delivery = data.delivery
          console.log(this.delivery)
        })
    },
    receiving () {
      if (!this.active) {
        return
      }
      this.$confirm('是否确认收货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        const user_id = getItem('userID')
        let order_id = this.$route.query.id
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${order_id}__${timestamp}__thundercat`)
        let params = {
          user_id,
          order_id,
          timestamp,
          sign
        }
        shouhuo(params)
          .then(res => {
            console.log(res)
          })
        this.$message({
          type: 'success',
          message: '收货成功!'
        })
        this.active = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消收货'
        })
      })
    }
  },
  computed: {
    order_statue () {
      if (this.order.order_status === '未支付') {
        return '未支付'
      } else if (this.order.order_status === '待确认') {
        return '待确认'
      } else if (this.order.order_status === '待发货') {
        return '待发货'
      } else if (this.order.order_status === '已发货') {
        return '已发货'
      } else if (this.order.order_status === '已完成') {
        return '已完成'
      } else if (this.order.order_status === '已关闭') {
        return '已关闭'
      }
    },
    pay_status () {
      if (this.pay.pay_status === 0) {
        return '未支付'
      } else if (this.pay.pay_status === 1) {
        return '已支付'
      }
    },
    address () {
      if (this.order.host_id === 1) {
        return this.order.wallet_address
      } else if (this.order.host_id === 2) {
        return this.order.user_address
      }
    },
    showRev () {
      if (this.order.order_status === '已发货' && this.order.host_id === 2) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.head-wrap {
  background-color: rgb(237, 240, 242);
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-bottom: 30px;
  div {
    width: 200px;
    line-height: 30px;
    padding-right: 60px;
    text-align: center;
    .p1 {
      font-weight: 600;
      color: #333;
    }
  }
  .receiving {
    height: 32px;
    padding: 5px 15px;
    margin-top: 17px;
    color: rgb(237, 240, 242);
    background-color: rgb(101, 155, 244);
  }
  .success {
    height: 32px;
    padding: 5px 15px;
    margin-top: 17px;
    color: rgb(237, 240, 242);
    background-color: #bbb;
  }
}
.address {
  margin-bottom: 40px;
  .content {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    line-height: 16px;
    p {
      margin-right: 80px;
    }
  }
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  span {
    border-bottom: 3px solid rgb(91, 129, 233);
    padding-bottom: 14px;
    padding-right: 10px;
  }
}
.info {
  margin-bottom: 40px;
  .content {
    .info-title {
      box-sizing: border-box;
    }
    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      padding: 20px 10px;
      line-height: 19px;
      li {
        flex: 1;
      }
      .dianfei {
        border: 1px solid #ccc;
        padding: 3px 5px;
        box-sizing: border-box;
        -webkit-box-shadow: #c7c7c7 0px 0px 5px;
        -moz-box-shadow: #c7c7c7 0px 0px 5px;
        box-shadow: #c7c7c7 0px 0px 5px;
      }
    }
  }
}
.payInfo {
  .inWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .content {
      width: 50%;
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      line-height: 19px;
      p {
        margin-right: 70px;
      }
    }
  }
}
.close {
  text-align: center;
  margin: 25px 0;
  .btn {
    padding: 10px 30px;
    border-radius: 3px;
    background-color: rgb(101, 155, 244);
    color: #fff;
  }
}
</style>
