<template>
  <div>
    <y-shelf title="我的订单" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--算力订单-->
        <el-tab-pane label="算力套餐订单" name="first">
          <OrderData :order_list=order_list v-if="order_list.length"></OrderData>
          <el-row v-else style="background: #fff;display: flex;flex-direction: column;justify-content: center;align-items: center;height: 400px;">
            <el-image
              style="width: 160px; height: 115px"
              src="../../../static/imgs/data.png"
              fit="fill"></el-image>
            <div class="txt">暂无数据...</div>
          </el-row>
        </el-tab-pane>

        <!--电费订单-->
        <el-tab-pane label="电费订单" name="second">
          <ElectricityOrder :electricity_list=electricity_list v-if="electricity_list.length"></ElectricityOrder>
          <el-row v-else style="background: #fff;display: flex;flex-direction: column;justify-content: center;align-items: center;height: 400px;">
            <el-image
              style="width: 160px; height: 115px"
              src="../../../static/imgs/data.png"
              fit="fill"></el-image>
            <div class="txt">暂无数据...</div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>

  </div>
</template>
<script>
  import { orderDataList } from '/api'
  import YShelf from '/components/shelf'
  import OrderData from '/common/orderDataList'
  import ElectricityOrder from '/common/electricityOrder'
  import { getItem } from './../../../utils/newLocalStorage'

  export default {
    data () {
      return {
        order_list: [], // 算力订单数组
        electricity_list: [], // 电费订单数组
        activeName: 'first'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      // 拉取订单信息
      _orderDetail () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        orderDataList(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            this.order_list = res.data.data.order_list
            this.electricity_list = res.data.data.electricity_list
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    created () {
      if (this.$route.query.goBackFlag === true) {
        this.activeName = 'second'
      }
      this._orderDetail()
    },
    components: {
      YShelf,
      OrderData,
      ElectricityOrder
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  .order-id {
    margin-left: 20px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
