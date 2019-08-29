<template>
  <div>
    <div class="banner">
      <div class="bg" ref="bg"
           @mouseover="bgOver($refs.bg)"
           @mousemove="bgMove($refs.bg,$event)"
           @mouseout="bgOut($refs.bg)">
        <span class="img a"></span>
        <span class="text b">雷猫矿机<br/>回敬雷猫矿机</span>
        <span class="copyright c">code by qingjin.me | picture from t.tt</span>
      </div>
    </div>


    <section class="w mt30 clearfix">
      <y-shelf title="众筹" bgFlag=true>
        <div slot="content" class="hot">
          <mall-goods :msg="item" v-for="(item,i) in hot" :key="i"></mall-goods>
        </div>
      </y-shelf>
    </section>
<!--    <section class="w mt30 clearfix" v-for="(item,i) in floors" :key="i">-->
<!--      <y-shelf :title="item.title">-->
<!--        <div slot="content" class="floors">-->
<!--          <div class="imgbanner">-->
<!--            <img v-lazy="floors[i].image.image" :alt="item.title">-->
<!--          </div>-->
<!--          <mall-goods :msg="tab" v-for="(tab,i) in item.tabs" :key="i"></mall-goods>-->
<!--        </div>-->
<!--      </y-shelf>-->
<!--    </section>-->

<!--    内容一-->
    <section>
      <div class="mining-steps">
        <h2 class="title">来比特小鹿轻松挖矿</h2>
        <h3 class="subtitle">简化挖矿繁琐步骤，打包矿机购买、物流、矿场选择、机器维护、矿池接入的复杂环节</h3>
        <div class="warp animate">
          <section class="steps">
            <div><img src="//assets.bitdeer.cn/_nuxt/img/34b9695.png" alt="">
              <p>用户购买套餐</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/e0dcb60.png" alt="">
              <p>比特小鹿矿机分时共享平台</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/43e9625.png" alt="">
              <p>矿池分配收益</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/b95ffe1.png" alt="">
              <p>用户收到收益</p>
            </div>
          </section>
          <section class="belongs">
            <div class="arrow-top"><img src="//assets.bitdeer.cn/_nuxt/img/11b1312.jpg" alt=""></div>
          </section>
          <section class="bitdeer-steps">
            <div><img src="//assets.bitdeer.cn/_nuxt/img/4aee527.png" alt="">
              <p>采购矿机</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/7944d40.png" alt="">
              <p>运输矿机至矿场</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/61e8cab.png" alt="">
              <p>调试矿机联通矿池</p>
            </div>
            <div><img src="//assets.bitdeer.cn/_nuxt/img/89a56b1.png" alt="">
              <p>运维管理</p>
            </div>
          </section>
        </div>
      </div>
    </section>

<!--    内容二-->
    <section>
      <div class="advantage">
        <h2>值得信赖的矿机分时共享平台</h2>
        <h3>500万+用户量 复购率80% 每日产出100+BTC</h3>
        <section>
          <div>
            <div class="img-wrap"><img src="//assets.bitdeer.cn/_nuxt/img/c0159db.png" alt=""></div>
            <p class="title">比特大陆顶级供货方</p>
            <p class="intro">比特大陆提供最新款矿机支持，矿机质量保障</p>
          </div>
          <div>
            <div class="img-wrap"><img src="//assets.bitdeer.cn/_nuxt/img/29d2e03.png" alt=""></div>
            <p class="title">五大矿池深度合作</p>
            <p class="intro">BTC.com、AntPool、F2Pool、ViaBTC、BTC.TOP五大矿池合作，支持用户自由选择矿池挖矿</p>
          </div>
          <div>
            <div class="img-wrap"><img src="//assets.bitdeer.cn/_nuxt/img/04ded28.png" alt=""></div>
            <p class="title">支持矿池直接打款</p>
            <p class="intro">可选择矿池直接将收益打给用户，BitDeer不参与收益的分配与划拨</p>
          </div>
          <div>
            <div class="img-wrap"><img src="//assets.bitdeer.cn/_nuxt/img/d70a9b7.png" alt=""></div>
            <p class="title">24小时维护的专业团队</p>
            <p class="intro">平台24小时提供专业的挖矿服务保障人员</p>
          </div>
        </section> <button class="buy">选购套餐</button>
      </div>
    </section>


    <section></section>
  </div>
</template>
<script>
  import { productHome } from '/api'
  import YShelf from '/components/shelf'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  export default {
    data () {
      return {
        banner: {},
        bgOpt: {
          offsetLeft: 0,
          offsetTop: 0,
          offsetWidth: 0,
          offsetHeight: 0
        },
        floors: [],
        hot: [
          {
            productName: '矿机一',
            sub_title: '这是一个测试，这是一个测试',
            productId: 1,
            salePrice: 100,
            productImageBig: 'http://pic1.win4000.com/wallpaper/c/53cdd1ec00d80.jpg'
          },
          {
            productName: '矿机二',
            sub_title: '这是一个测试，这是一个测试',
            productId: 1,
            salePrice: 100,
            productImageBig: 'http://pic1.win4000.com/wallpaper/c/53cdd1ec00d80.jpg'
          },
          {
            productName: '矿机二',
            sub_title: '这是一个测试，这是一个测试',
            productId: 1,
            salePrice: 100,
            productImageBig: 'http://pic1.win4000.com/wallpaper/c/53cdd1ec00d80.jpg'
          },
          {
            productName: '矿机二',
            sub_title: '这是一个测试，这是一个测试',
            productId: 1,
            salePrice: 100,
            productImageBig: 'http://pic1.win4000.com/wallpaper/c/53cdd1ec00d80.jpg'
          }
        ]
      }
    },
    methods: {
      // 鼠标移入
      bgOver (event) {
        // 获取移入时的位置
        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = event
        this.bgOpt.offsetLeft = offsetLeft
        this.bgOpt.offsetTop = offsetTop
        this.bgOpt.offsetWidth = offsetWidth
        this.bgOpt.offsetHeight = offsetHeight
      },
      // 鼠标移动
      bgMove (dom, eve) {
        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.bgOpt
        let X, Y
        let mouseX = eve.pageX - offsetLeft
        let mouseY = eve.pageY - offsetTop
        if (mouseX > offsetWidth / 2) {
          X = mouseX - (offsetWidth / 2)
        } else {
          X = mouseX - (offsetWidth / 2)
        }
        if (mouseY > offsetHeight / 2) {
          Y = offsetHeight / 2 - mouseY
        } else {
          Y = offsetHeight / 2 - mouseY
        }
        dom.style['-webkit-transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
        dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      },
      // 鼠标移除
      bgOut (dom) {
        dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
        dom.style['-webkit-transform'] = 'rotateY(0deg) rotateX(0deg)'
      }
    },
    mounted () {
      productHome().then(res => {
        // 还要加个home_hot
        const {home_floors} = res.result
        console.log(res.result)
        this.floors = home_floors
        // this.hot = home_hot
      })
    },
    components: {
      YShelf,
      product,
      mallGoods
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHei";
    transition: all .3s;
    -webkit-transition: all .3s;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
  }

  .banner {
    perspective: 3000px;
    position: relative;
    z-index: 19;
  }

  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background: url("/static/images/banner-3d-item.png") center no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    -webkit-transform-origin: 50% 50%;
    -webkit-transform: rotateY(0deg) rotateX(0deg);
  }

  .img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background: url("/static/images/banner-3d.png") center no-repeat;
    background-size: 95% 100%;
  }

  .text {
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 30px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .copyright {
    position: absolute;
    bottom: 10%;
    right: 10%;
    font-size: 10px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .a {
    -webkit-transform: translateZ(40px);
  }

  .b {
    -webkit-transform: translateZ(20px);
  }

  .c {
    -webkit-transform: translateZ(0px);
  }

  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /*内容一开始*/
  .mining-steps{
    padding: 70px 0 80px;
    text-align: center;
    min-height: 756px;
  }
  .mining-steps .title{
    font-size: 32px;
    color: #333;
    font-weight: 700;
  }
  .mining-steps .subtitle {
    font-size: 16px;
    color: #8993a8;
    padding: 15px 0 68px;
  }
  .mining-steps .warp{
    width: 1200px;
    margin: 0 auto;
  }
  .mining-steps .warp .steps{
    display: flex;
    justify-content: space-between;
  }
  .mining-steps .warp .steps>div{
    position: relative;
    width: 240px;
    text-align: center;
    padding-bottom: 10px;
  }
  .mining-steps .warp.animate .steps>div:first-child img{
    transition: transform .45s ease-in-out;
    transform: scale(1);
  }
  .mining-steps .warp.animate .steps>div:nth-child(2) img{
    transition: transform .4s ease-in-out 4.4s;
    transform: scale(1);
    -webkit-animation: scale-img-data-v-07899da7 4.8s .13s;
    animation: scale-img-data-v-07899da7 4.8s .13s;
  }
  .mining-steps .warp.animate .steps>div:nth-child(3) img{
    transition: transform .45s ease-in-out .26s;
    transform: scale(1);
  }
  .mining-steps .warp.animate .steps>div:nth-child(4) img{
    transition: transform .45s ease-in-out .39s;
    transform: scale(1);
  }
  .mining-steps .warp .steps>div img{
    width: 200px;
    transform: scale(0);
  }
  .mining-steps .warp.animate .steps>div p{
    transition: opacity .22s ease-in-out .96s;
    opacity: 1;
  }
  .mining-steps .warp .steps>div p{
    padding-top: 10px;
    font-size: 16px;
    color: #3f465c;
    opacity: 0;
  }
  .mining-steps .warp.animate .steps>div:not(:last-child):after, .mining-steps .warp.animate .steps>div p{
    transition: opacity .22s ease-in-out .96s;
    opacity: 1;
  }
  .mining-steps .warp .steps>div:not(:last-child):after {
    font-family: iconfont!important;
    font-size: 12px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\E632";
    color: #8993a8;
    position: absolute;
    right: -60px;
    top: 90px;
    opacity: 0;
  }
  :after, :before {
    box-sizing: border-box;
    margin: 0;
  }
  .mining-steps .warp .belongs{
    transform: translateX(-150px);
  }
  .mining-steps .warp .belongs .arrow-top{
    padding-top: 10px;
    width: 37px;
    margin: 0 auto;
  }
  .mining-steps .warp.animate .belongs .arrow-top img{
    transition: all .4s ease-in-out 4.4s;
    transform: scale(1);
    transform-origin: bottom;
  }
  .mining-steps .warp .belongs .arrow-top img{
    width: 100%;
    transform: scale(0);
  }
  .mining-steps .warp.animate .bitdeer-steps{
    transition: border-color .48s ease-in-out 1.69s,background-color .4s ease-in-out 4.4s,margin-top .4s ease-in-out 4.4s;
    border-color: #8993a8;
    background-color: #f5f6f8;
    margin-top: -16px;
  }
  .mining-steps .warp .bitdeer-steps{
    width: 720px;
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
    margin-left: 82px;
    border: 1px dashed transparent;
    border-radius: 2px;
    min-height: 136px;
    box-sizing: content-box;
  }
  .mining-steps .warp .bitdeer-steps>div{
    width: 120px;
    position: relative;
  }
  .mining-steps .warp.animate .bitdeer-steps>div:first-child img{
    transition: all .36s ease-in-out 1.69s;
    transform: translate(0);
    width: 100px;
  }
  .mining-steps .warp .bitdeer-steps>div:first-child img{
    transform: translate(270px,-240px);
  }
  .mining-steps .warp.animate .bitdeer-steps>div:not(:last-child):after, .mining-steps .warp.animate .bitdeer-steps>div p{
    transition: opacity .48s ease-in-out 1.69s;
    opacity: 1;
  }
  .mining-steps .warp .bitdeer-steps>div:not(:last-child):after {
    font-family: iconfont!important;
    font-size: 12px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\E632";
    color: #8993a8;
    position: absolute;
    right: -60px;
    top: 50px;
    opacity: 0;
  }
  .mining-steps .warp.animate .bitdeer-steps>div:nth-child(2) img{
    transition: all .36s ease-in-out 1.79s;
    transform: translate(0);
    width: 100px;
  }
  .mining-steps .warp.animate .bitdeer-steps>div:nth-child(3) img{
    transition: all .36s ease-in-out 1.89s;
    transform: translate(0);
    width: 100px;
  }
  .mining-steps .warp.animate .bitdeer-steps>div:nth-child(4) img{
    transition: all .36s ease-in-out 1.99s;
    transform: translate(0);
    width: 100px;
  }
  /*内容一结束*/

  /*内容二开始*/
  .advantage{
    text-align: center;
    background: url(//assets.bitdeer.cn/_nuxt/img/13a65b8.png) bottom no-repeat #2a2d3a;
    background-size: 100%;
    color: #fff;
    padding: 70px 0;
  }
</style>
