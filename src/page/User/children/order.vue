<template>
  <div>
    <y-shelf title="我的订单" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="算力套餐订单" name="first">
          <OrderData></OrderData>
        </el-tab-pane>
        <el-tab-pane label="电费订单" name="second">
          <OrderData v-if="orderList.length"></OrderData>
          <div v-else>
            <div style="padding: 100px 0;text-align: center">
              你还未创建过订单
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合并支付电费单" name="third">
          <OrderData v-if="orderList.length"></OrderData>
          <div v-else>
            <div style="padding: 100px 0;text-align: center">
              你还未创建过订单
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>

  </div>
</template>
<script>
  import { orderList, delOrder } from '/api/goods'
  import YShelf from '/components/shelf'
  import OrderData from '/common/orderDataList'

  export default {
    data () {
      return {
        orderList: [],
        activeName: 'first'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      _orderList () {
        orderList().then(res => {
          this.orderList = res.result
        })
      },
      _delOrder (orderId, i) {
        delOrder({orderId}).then(res => {
          if (!res.status) {
            this.orderList.splice(i, 1)
          } else {
            alert('删除失败')
          }
        })
      }
    },
    created () {
      this._orderList()
    },
    components: {
      YShelf,
      OrderData
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
