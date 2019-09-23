<template>
  <div class="store">
    <div class="banner">
      <h1 class="h1">矿机商城</h1>
      <p>
        矿机团购、矿机厂商现货和期货促销，二手矿机验货交易平台
        <br />（蚂蚁矿机、神马矿机、芯动矿机、阿瓦隆矿机、矿机配件等）
      </p>
    </div>

    <div class="Content">
      <div class="nav">
        <ul class="wrap">
          <li v-for="(item, index) in nav"
              :key="index">
            <a :class="{active: item.checked,navA: true}"
               @click="activeNav(item,index)"
               href="#">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div>{{ allShop }}</div>
      <div class="shop-wrap">
        <!-- 全部 -->
        <Commodity :shop="this.all"
                   v-show="activeAll"></Commodity>
        <!-- 分类 -->
        <Commodity v-for="(item,key,index) in shop"
                   :key="index"
                   :shop="shop[key]"
                   v-show="index == num"></Commodity>
      </div>

    </div>
  </div>
</template>

<script>
import Commodity from '@/common/commodity'

export default {
  name: 'store',
  components: {
    Commodity
  },
  data: function () {
    return {
      nav: [
        { name: '全部', checked: true },
        { name: '蚂蚁矿机', checked: false },
        { name: '显卡矿机', checked: false },
        { name: '神马矿机', checked: false },
        { name: '阿瓦隆矿机', checked: false },
        { name: '雪豹矿机', checked: false },
        { name: '芯动矿机', checked: false },
        { name: '电源', checked: false },
        { name: '配件', checked: false },
        { name: '硬件钱包', checked: false },
        { name: '二手矿机', checked: false }
      ],
      activeAll: true,
      shop: {
        'mayi': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '蚂蚁矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '蚂蚁矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '蚂蚁矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '蚂蚁矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'xianka': [
          {
            imgUrl: '@/common/images/mine2.png',
            title: '显卡矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '显卡矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '显卡矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'shenma': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '神马矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '神马矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '神马矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '神马矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '神马矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'awalong': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 0
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '阿瓦隆矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'xuebao': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '雪豹矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '雪豹矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '雪豹矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '雪豹矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'xindong': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 0
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '芯动矿机T2',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'dianyuan': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '电源',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '电源',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'peijian': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '配件',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '配件',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '配件',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'yingbao': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '硬件钱包',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '硬件钱包',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '硬件钱包',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '硬件钱包',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '硬件钱包',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ],
        'ershoukj': [
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 0
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          },
          {
            imgUrl: '@/common/images/storeOver.png',
            title: '二手矿机',
            content: '芯动矿机T2,算力432MH/s±5％',
            price: '￥ 8800.00',
            quantity: 1
          }
        ]
      },
      all: [],
      num: null
    }
  },
  methods: {
    activeNav (list, index) {
      this.nav.forEach((item, idx) => {
        if (index === idx) {
          this.nav[idx].checked = true
        } else {
          this.nav[idx].checked = false
        }
      })

      if (index === 0) {
        this.activeAll = true
        this.num = null
      } else {
        this.activeAll = false
        this.num = index - 1
      }
    }
  },
  computed: {
    allShop () {
      for (var i in this.shop) {
        this.shop[i].forEach(item => {
          this.all.push(item)
        })
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.store {
  width: 1220px;
  margin: 20px auto;
  background: rgba(239, 239, 239, 1);
}
.banner {
  height: 338px;
  background: url("../../../static/images/storeBg.png");
  text-align: center;
}
.banner h1 {
  font-size: 44px;
  font-weight: 530;
  color: #fff;
  padding-top: 70px;
  padding-bottom: 50px;
}
.banner p {
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
}

.nav {
  padding: 0 119px;
  margin: 36px 0 28px;
}
.wrap {
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
}
.wrap li {
  list-style: none;
}
.navA {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  text-decoration: none;
}
.active {
  color: #5b81e9;
}

.marginRi {
  margin-right: 0;
}
</style>