<template>
  <div class="Commodity">
    <div class="commodity-wrap">
      <div :class="{commodity:true,marginR:activeMr(index)}"
           v-for="(item, index) in shop"
           :key="index">
        <img class="over"
             src="../../static/images/storeOver.png"
             alt=""
             v-show="item.quantity == 0">
        <div style="width: 312px;height: 214px">
          <img class="commodityImg"
               width="312"
               height="214"
               src="../../static/images/mine2.png"
               alt />
        </div>

        <div class="content">
          <h3 class="title">{{ item.title }}</h3>
          <p class="describe">{{ item.content }}</p>
          <div class="price-wrap">
            <span class="price">{{ item.price }}</span>
            <button v-show="item.quantity != 0"
                    class="buy"
                    @click="toBuy(1,239)">立即购买</button>
            <button v-show="item.quantity == 0"
                    class="buy"
                    style="background:rgba(203,207,212,1);">已售罄</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Commodity',
  props: ['shop'],
  data: function () {
    return {
      marR: false
    }
  },
  mounted () {

  },
  methods: {
    activeMr (index) {
      console.log(index + 1)
      if ((index + 1) % 3 === 0) {
        return true
      } else {
        return false
      }
    },
    toBuy (share_activity_id, goods_id) {
      this.$router.push({
        path: 'orderList',
        query: {
          share_activity_id: share_activity_id,
          goods_id: goods_id
        }
      })
    }
  }
}
</script>

<style scoped>
.commodityImg {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.commodity-wrap {
  padding: 0 119px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.commodity {
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 26px;
  position: relative;
  margin-right: 22px;
}
.over {
  position: absolute;
  top: 0;
  right: 0;
}
.content {
  padding: 0 18px;
  box-sizing: border-box;
}
.commodity h3 {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(60, 58, 60, 1);
  margin-top: 25px;
}
.describe {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(60, 58, 60, 1);
  margin-top: 15px;
  margin-bottom: 22px;
}
.price-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 26px;
}
.price {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(245, 84, 84, 1);
}
.buy {
  padding: 12px 21px;
  background-color: rgba(85, 148, 242, 1);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: none;
  outline: none;
}
.marginR {
  margin-right: 0;
}
</style>