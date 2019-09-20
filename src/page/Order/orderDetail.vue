<template>
  <div class="odDetail">
    <y-shelf title="我的订单"
             itemTitle="订单详情"
             titleFlag="true"
             thirdPath="true"></y-shelf>
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
          <ul>
            <li>{{ order.goods_name }}</li>
            <li>{{ pay.title }}</li>
            <li>{{ order.goods_num }}</li>
            <li>{{ order.hashrate }}</li>
            <li>{{ order.cycle_day }}</li>
            <li>{{ order.add_time }}</li>
            <li>{{ order.final_price }}元</li>
          </ul>
          <ul style="margin-top: 20px;">
            <li>{{ ele.all_day }}</li>
            <li>--</li>
            <li>--</li>
            <li>--</li>
            <li>--</li>
            <li>--</li>
            <li>{{ ele.electricity_cost }}元</li>
          </ul>
        </div>
      </div>

      <div class="payInfo">
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
            <p>支付币种</p>
            <p>{{ pay.title }}</p>
          </div>
          <div class="content">
            <p>支付状态</p>
            <p>{{ pay_status }}</p>
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
import { orderDetail } from '/api/index'
import { getItem } from './../../utils/newLocalStorage'

export default {
  name: 'odDetail',
  components: {
    YShelf
  },
  data: function () {
    return {
      ele: {},
      minus: {},
      order: {},
      pay: {}
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
          this.minus = data.minus
          this.order = data.order
          this.pay = data.pay
          console.log(data)
        })
    }
  },
  computed: {
    order_statue () {
      if (this.order.order_status === 0 && this.pay.pay_status === 0) {
        return '未支付'
      } else if (this.order.order_status === 0 && this.pay.pay_status === 1) {
        return '已支付'
      } else if (this.order.order_status === 1 && this.pay.pay_status === 1) {
        return '未发货'
      } else if (this.order.order_status === 2 && this.pay.pay_status === 1) {
        return '已发货'
      } else if (this.order.order_status === 4) {
        return '超时关闭'
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
    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
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