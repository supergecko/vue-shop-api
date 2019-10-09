<template>
  <div>
    <!--轮播-->
    <div class="banner" >
        <div class="bg" ref="bg"
             @mouseover="bgOver($refs.bg)" @mousemove="bgMove($refs.bg,$event)" @mouseout="bgOut($refs.bg)">
          <transition name="fade">
            <div v-for="(item, i) in banner" v-if="i===mark" :key="i" style="position:absolute" @mouseover="stopTimer" @mouseout="startTimer">
              <img v-if="item.ad_code" class="img1" :src="item.ad_code"/>
<!--              <img v-if="item.picUrl2"  class="img2 a" :src="item.picUrl2"/>-->
<!--              <img v-if="item.picUrl3"  class="img3 b" :src="item.picUrl3"/>-->
            </div>
          </transition>
        </div>
        <div class="page">
          <ul class="dots">
            <li class="dot-active" v-for="(item, i) in banner" :class="{ 'dot':i!=mark }" :key="i" @click="change(i)"></li>
          </ul>
        </div>
    </div>

    <!--众筹-->
    <section class="w mt30 clearfix" style="margin-bottom: 50px">
      <el-row class="crowdWarp">
        <el-row class="lmbWarp">
          <el-col :span="17" class="lmbLeftItem">
            <div class="grid-content bg-purple middleHeaderLeft">
              <div class="contentHeader">
                <div>
                  <div class="contentHeaderBtn">{{activity.title}}</div>
                  <span>预计开始挖矿时间</span>
                  <el-tag type="warning">{{activity.dig_time}}</el-tag>
                </div>
                <div class="downTime" style="font-size:30px;right:140px;" v-if="activity.status===2">
                  团购结束
                </div>
                <div class="downTime" v-else>
                  距离本轮团购结束时间还有
                  <span>{{activity.rest_day}}天</span>
                </div>
              </div>
              <div class="contentMiddle">
                <div class="middleItem1">
                  <span>最低算力</span>
                  <el-tooltip content="该专区最低算力机型" placement="top">
                    <span class="el-icon-info"></span>
                  </el-tooltip>
                  <div>
                    <span>{{activity.minimum_hashrate}}</span>TH / S
                  </div>
                </div>
                <div class="middleItem2">
                  <span>电费</span>
                  <el-tooltip content="根据设备功耗计算每日电费 " placement="top">
                    <span class="el-icon-info"></span>
                  </el-tooltip>
                  <div>
                    <span>{{activity.electricity_cost}}</span> 元 / 天
                  </div>
                </div>
                <div class="middleItem3">
                  <el-tag>BTC</el-tag>
                  <span>来自BTC.com的理论收益</span>
                  <div>
                    <span>{{activity.income}}</span> BTC / 月
                  </div>
                </div>
              </div>
              <div class="contentFooter">
                <i class="el-icon-star-on"></i>
                <span>每日净挖矿所得等于每日挖矿产出减去算力费和电费。</span>
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="lmbRightItem">
            <div class="grid-content bg-purple-light middleHeaderRight">
<!--              <el-image-->
<!--                style="width: 300px; height: 200px"-->
<!--                src="../../../static/lmbImg/img20.png"-->
<!--                fit="fill"></el-image>-->
<!--              <div class="rightHeader">-->
<!--                <div style="font-size:80px">3</div>-->
<!--                <div class="rightHeaderItem">-->
<!--                  <div style="font-size:28px;margin-top:8px;">世代</div>-->
<!--                  <div style="font-size:20px;margin-bottom:16px;">矿机</div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div>- 蚂蚁矿机 L3++ <i class="el-icon-warning"></i>-</div>-->
            </div>
          </el-col>
        </el-row>
        <el-row class="lmbGoodsWarp">
          <el-col :span="6" class="goodsWarp" v-for="(item, i) in activity.goods" :key="i">
            <div class="goodItem">
              <div class="goodItemHead">
                <div style="padding-bottom: 13px">{{item.description}}</div>
                <div style="font-size: 14px;">算力:{{item.hashrate}} Th / s</div>
                <div class="hotBTn" :style="{'display':item.on_sale===1 ? 'none':'block'}">抢光了</div>
              </div>
              <div>功耗:{{item.electricity_consumption}} W</div>
              <div class="goodItemMiddle" style="font-size: 14px;">
                月化收益:{{item.income}} BTC
              </div>
              <div class="goodItemMiddle" style="font-size: 14px;">
                团购价格:<span style="color:red;font-weight:bold">{{item.shop_price}}</span>元
              </div>
              <div class="goodItemFooter">
                <el-progress :percentage=item.rate style="width:182px" :format="format"></el-progress>
                <el-button type="primary" :disabled="item.on_sale===1? false: true" style="width:214px;margin-top:16px;" @click="openOrderList(share_activity_id, item.goods_id)">
                  {{item.on_sale===0? '即将补货': item.on_sale===1?'立即抢购':'抢购结束'}}
                </el-button>
                <div class="goodItemFooterText">— {{item.goods_name}} —</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </section>

    <!--内容一-->
    <section class="sectionWarp1">
      <el-row class="firstMiddleTitle"  style="margin-top: 77px;margin-bottom: 82px">你是否遇到以下问题？</el-row>
      <el-row style="width: 100%">
        <el-col :span="10" class="tipTextWarp">
          <span class="tipText">想要挖矿，不知从何下手？</span>
          <span class="tipText">有了矿机，家里电价高？不会/没时间维护？</span>
        </el-col>
        <el-col :span="4">
          <el-image
            style="width: 198px; height: 198px"
            src="../../../static/lmbImg/img1.png"
            fit="fill"></el-image>
        </el-col>
        <el-col :span="10" class="tipTextWarp" style="align-items: flex-start;">
          <span class="tipText">想买矿机，不知道找谁买？怕被骗？</span>
          <span class="tipText">找人托管矿机，托管方不专业矿机不稳定？</span>
        </el-col>
      </el-row>
      <el-row class="secondItemWarp">
        <el-image
          style="width: 176px; height: 176px;position: absolute;"
          src="../../../static/lmbImg/img2.png"
          fit="fill"></el-image>
        <el-row class="firstMiddleTitle"> 郑重承诺</el-row>
        <el-row>雷猫商城本着为矿工提供专业一条龙服务的原则</el-row>
      </el-row>
      <el-row class="thirdItemWarp">
        <el-row class="thirdItem">
          <el-col :span="12" style="width: 100%;display: flex;justify-content: center;">
            <el-image
              style="width: 60px; height: 60px;margin-right: 10px"
              src="../../../static/lmbImg/img3.png"
              fit="fill"></el-image>
            <el-row style="width: 208px">雷猫商城所销售矿机均为全新机器非二手充新</el-row>
          </el-col>
          <el-col :span="12" style="width: 100%;display: flex;justify-content: center;">
            <el-image
              style="width: 60px; height: 60px;margin-right: 10px"
              src="../../../static/lmbImg/img5.png"
              fit="fill"></el-image>
            <el-row style="width: 208px">凡雷猫商城所售矿机，提供终身维护，180天质保期内出现问题无需买家二次付费</el-row>
          </el-col>
        </el-row>
        <el-row class="thirdItem">
          <el-col :span="12" style="width: 100%;display: flex;justify-content: center;">
            <el-image
              style="width: 60px; height: 60px;margin-right: 10px"
              src="../../../static/lmbImg/img4.png"
              fit="fill"></el-image>
            <el-row style="width: 208px">在雷猫商城购买矿机并委托雷猫商城托管，1个月内出现问题返厂维修，买家所有损失，雷猫商城将全额补偿（补偿额=用户机型24小时收益*掉线/维修天数-用户机型24小时电费*掉线/维修天数）</el-row>
          </el-col>
          <el-col :span="12" style="width: 100%;display: flex;justify-content: center;">
            <el-image
              style="width: 60px; height: 60px;margin-right: 10px"
              src="../../../static/lmbImg/img6.png"
              fit="fill"></el-image>
            <el-row style="width: 208px">凡委托雷猫商城托管矿机，当月因停电造成停机时长超过48小时，雷猫商城将补偿用户当月所有损失。当日因停电造成停机时长超过6小时，当日电费全免。</el-row>
          </el-col>
        </el-row>
      </el-row>
    </section>

    <!--内容二-->
    <section class="firstMiddle">
      <el-row class="firstMiddleHeader">
        <div class="firstMiddleTitle" style="color:#ffffff;">来雷猫轻松挖矿</div>
        <div class="firstMiddleText" style="color:#ffffff;">简化挖矿繁琐步骤，打包矿机购买、物流、矿场选择、机器维护、矿池接入的复杂环节</div>
      </el-row>
      <el-row style="width: 1220px;margin: 0 auto">
        <el-col :span="6" class="firstItem">
          <el-image
            style="width: 160px; height: 160px;"
            src="../../../static/lmbImg/img7.png"
            fit="fill"></el-image>
          <div class="firstItemText">用户购买套餐</div>
        </el-col>
        <el-col :span="6" class="firstItem">
          <el-image
            style="width: 160px; height: 160px;"
            src="../../../static/lmbImg/img8.png"
            fit="fill"></el-image>
          <div class="firstItemText">雷猫商城</div>
          <el-image
            style="width: 74px; height: 74px;margin-top: 24px;margin-bottom: 7px"
            src="../../../static/lmbImg/up.png"
            fit="fill"></el-image>
        </el-col>
        <el-col :span="6" class="firstItem">
          <el-image
            style="width: 160px; height: 160px;"
            src="../../../static/lmbImg/img9.png"
            fit="fill"></el-image>
          <div class="firstItemText">矿池分配收益</div>
        </el-col>
        <el-col :span="6" class="firstItem">
          <el-image
            style="width: 160px; height: 160px;"
            src="../../../static/lmbImg/img10.png"
            fit="fill"></el-image>
          <div class="firstItemText">用户收到收益</div>
        </el-col>
      </el-row>
      <el-row style="width: 1220px;margin: 0 auto">
        <el-row class="firstMiddleFooter">
          <div class="middleFooterWarp">
            <div class="middleFooterLeftItem">
              <el-image
                style="width: 80px; height: 80px"
                src="../../../static/lmbImg/img11.png"
                fit="fill"></el-image>
              <div>采购矿机</div>
            </div>
            <el-image
              style="width: 38px; height: 38px;margin-left: 10px"
              src="../../../static/lmbImg/right.png"
              fit="fill"></el-image>
          </div>
          <div class="middleFooterWarp">
            <div class="middleFooterLeftItem">
              <el-image
                style="width: 80px; height: 80px"
                src="../../../static/lmbImg/img12.png"
                fit="fill"></el-image>
              <div>运输矿机矿场</div>
            </div>
            <el-image
              style="width: 38px; height: 38px;margin-left: 10px"
              src="../../../static/lmbImg/right.png"
              fit="fill"></el-image>
          </div>
          <div class="middleFooterWarp">
            <div class="middleFooterLeftItem">
              <el-image
                style="width: 80px; height: 80px"
                src="../../../static/lmbImg/img13.png"
                fit="fill"></el-image>
              <div style="padding: 0 16px;">调试矿机联通矿池</div>
            </div>
            <el-image
              style="width: 38px; height: 38px;margin-left: 10px"
              src="../../../static/lmbImg/right.png"
              fit="fill"></el-image>
          </div>
          <div class="middleFooterWarp">
            <div class="middleFooterLeftItem">
              <el-image
                style="width: 80px; height: 80px"
                src="../../../static/lmbImg/img14.png"
                fit="fill"></el-image>
              <div>运维管理</div>
            </div>
          </div>
        </el-row>
      </el-row>
    </section>

    <!--内容三-->
    <section class="secondMiddle">
      <el-row class="firstMiddleHeader">
        <el-row class="firstMiddleTitle">值得信赖的矿机商城</el-row>
        <el-row class="firstMiddleText">500万+用户量 重购率80% 每日产出100+BTC</el-row>
      </el-row>

      <el-row >
        <el-col :span="6">
          <el-row class="secondItem">
            <el-image
              style="width: 126px; height: 126px;"
              src="../../../static/lmbImg/img15.png"
              fit="fill"></el-image>
            <div class="secondItemText">雷猫顶级供货方</div>
            <div class="secondItemExplain">雷猫提供最新款矿机支持矿机质量保证</div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="secondItem">
            <el-image
              style="width: 126px; height: 126px;"
              src="../../../static/lmbImg/img16.png"
              fit="fill"></el-image>
            <div class="secondItemText">五大矿池深度合作</div>
            <div class="secondItemExplain">BTC.com、AnlPool、F2Pool、ViaBTC、BTC.TCP五大矿池合作，支持用户自由选择矿池挖矿</div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="secondItem">
            <el-image
              style="width: 126px; height: 126px;"
              src="../../../static/lmbImg/img17.png"
              fit="fill"></el-image>
            <div class="secondItemText">支持矿池直接打款</div>
            <div class="secondItemExplain">可选择矿池直接将受益打给用户,BitDeer不参与收益的分配与划拨</div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="secondItem">
            <el-image
              style="width: 126px; height: 126px;"
              src="../../../static/lmbImg/img18.png"
              fit="fill"></el-image>
            <div class="secondItemText">24小时维护的专业团队</div>
            <div class="secondItemExplain">平台24小时提供专业的挖矿服务保障人员
            </div>
          </el-row>
        </el-col>
      </el-row>
    </section>

  </div>
</template>
<script>
  // import { setItem } from '../../utils/newLocalStorage'
  import { homePage } from '/api'
  import YShelf from '/components/shelf'

  export default {
    data () {
      return {
        share_activity_id: '',
        banner: [], // 轮播组
        activity: [], // 众筹数组
        mark: 0,
        bgOpt: {
          offsetLeft: 0,
          offsetTop: 0,
          offsetWidth: 0,
          offsetHeight: 0
        }
      }
    },
    methods: {
      openOrderList (share_activity_id, goods_id) {
        this.$router.push({
          path: '/orderList',
          query: {
            share_activity_id: share_activity_id,
            goods_id: goods_id
          }
        })
      },
      autoPlay () {
        this.mark++
        if (this.mark > this.banner.length - 1) {
          // 当遍历到最后一张图片置零
          this.mark = 0
        }
      },
      play () {
        // 每2.5s自动切换
        this.timer = setInterval(this.autoPlay, 2500)
      },
      change (i) {
        this.mark = i
      },
      startTimer () {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      stopTimer () {
        clearInterval(this.timer)
      },

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
      },
      format (percentage) {
        return percentage === 100 ? '售磐' : `已售${percentage}%`
      },
      _homePage1 () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        homePage().then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.banner = res.data.data.ad
            this.activity = res.data.data.activity
            this.share_activity_id = res.data.data.activity.share_activity_id
            loading.close()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    mounted () {
      this._homePage1()
    },
    created () {
      this.play()
    },
    components: {
      YShelf
    }
  }
</script>
<style>
  .el-progress__text{
    font-size: 12px!important;
    margin-left: 6px;
    text-align: center;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  .sectionWarp1{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 1220px;
    height:1074px;
    background:rgba(255,255,255,1);
    margin: 0 auto;
  }
  .tipTextWarp{
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 198px;
    padding-bottom: 31px;
    padding-top: 28px;
  }
  .tipText{
    border-bottom: 2px solid rgba(106,108,116,1);
    padding-bottom: 8px;
    width: auto;
  }
  .secondItemWarp{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 176px;
    position: relative;
    margin-top: 42px;
  }
  .thirdItemWarp{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 53px;
  }
  .thirdItem{
    display: flex;
    justify-content: center;
    width: 1220px;
    margin-bottom: 88px;
  }
  /*众筹样式开始*/
  .lmbWarp{
    background-image: url("../../../static/lmbImg/LMBgoodsBg.png");
    background-size: 100% 100%;
    height: 200px;
    color: #ffffff;
  }
  .lmbLeftItem{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .lmbRightItem{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .el-tag{
    height: auto;
    line-height: normal;
  }
  .middleHeaderLeft{

  }
  .middleItem1{
    padding-left: 5px;
    border-left:3px solid #ff5502;

  }
  .middleItem2{
    padding-left: 5px;
    border-left:3px solid #fcc676;
  }
  .middleItem3{
    padding-left: 5px;
    border-left:3px solid #29c07e;
  }
  .contentMiddle{
    display: flex;
    padding-top: 25px;
    padding-bottom: 25px;
  }
  .contentMiddle >div{
    width: 270px;
  }

  .middleHeaderRight{
    display: flex;
    flex-direction: column;
    align-items: center;
    color:rgba(60,58,60,1);
  }
  .rightHeader{
    display: flex;
  }
  .rightHeaderItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .contentHeader{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .contentHeaderBtn{
    width:50px;
    height:30px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    display: inline-block;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(15,120,219,1);
    text-align: center;
    line-height: 30px;
  }
  .downTime{
    position: absolute;
    top: 69px;
    right: 80px;
    color: black;
    font-weight: bold;
    font-size: 17px;
  }
  .downTime span{
    display: inline-block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-right: 4px;
    color: red;
    font-size: 35px;
  }
  .lmbGoodsWarp{
    margin-top: 22px;
    width: 1220px;
  }
  .goodsWarp{
    display: flex;
    justify-content: center;
  }
  .goodItem{
    width:274px;
    height:307px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .goodItemHead{
    height: 92px;
    width: 198px;
    /*border-bottom: 1px solid rgba(244,244,244,1);*/
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size:22px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(60,58,60,1);
    position: relative;
  }
  .hotBTn{
    width:80px;
    height:32px;
    background:rgba(245,84,84,1);
    opacity:0.94;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 32px;
    padding-left: 16px;
    position: absolute;
    top: 13px;
    left: -50px;
  }
  .goodItemMiddle{
    width: 198px;
    height: 33px;
    /*border-bottom: 1px solid rgba(244,244,244,1);*/
    text-align: center;
    line-height: 66px;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(136,136,136,1);
  }
  .goodItemFooter{
    height: 147px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .el-progress-bar {
    padding-right: 65px;
    margin-right: -68px;
  }
  .goodItemFooterBtn{
    width:214px;
    height:42px;
    background:rgba(105,168,244,1);
    opacity:0.62;
    border-radius:2px;
    color: #ffffff;
    text-align: center;
    line-height: 42px;
    margin-top: 16px;
  }
  .goodItemFooterText{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:300;
    color:rgba(153,153,153,1);
    margin-top: 19px;
  }
  /*众筹样式结束*/
  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHei";
    transition: all .3s;
    transition-timing-function: linear;
  }
  .banner {
    cursor: pointer;
    perspective: 3000px;
    position: relative;
    z-index: 19;
    margin: 0 auto;
    width: 1220px;
  }

  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateY(0deg) rotateX(0deg);
    & div{
      position: relative;
      height: 100%;
      width: 100%;
    }
  }

  .img1 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
  }
  .img2 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background-size: 95% 100%;
    border-radius: 10px;
  }
  .img3 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
  }
  .page {
    position: absolute;
    width: 100%;
    top: 470px;
    z-index: 30;
    .dots {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .dot-active {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: #409EFF;
        border-radius: 8px;
        margin-right: 10px;
        cursor: pointer;
      }
      .dot {
        opacity: 0.2;
      }
    }
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

  /*内容一*/
  .firstMiddle{
    background:rgba(4,57,106,1);
    width: 1220px;
    height:1074px;
    margin: 0 auto;
    padding-top: 88px;
  }
  .firstMiddleTitle{
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(60,58,60,1);
    text-align: center;
    margin-bottom: 27px;
  }
  .firstMiddleText{
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(107,111,134,1);
    text-align: center;
    margin-bottom: 71px;
  }
  .firstItemText{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:#ffffff;
    margin-top: 5px;
  }
  .firstItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .firstMiddleFooter{
    width:766px;
    height:222px;
    border:1px solid rgba(63,135,202,1);
    display: flex;
    justify-content: space-around;
    margin-left: 73px;
    margin-bottom: 92px;
  }
  .middleFooterLeftItem{
    width:116px;
    height:133px;
    background:rgba(255,255,255,1);
    text-align: center;
  }
  .middleFooterLeftItem .el-image{
    
    margin-top: 10px;
  }
  .middleFooterWarp{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .secondMiddle{
    background:rgba(255,255,255,1);
    padding-top: 119px;
    padding-bottom: 60px;
    width: 1220px;
    margin: 0 auto;
    height: 635px;
  }
  .secondItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .secondWarp{
    display: flex;
    justify-content: center;
  }
  .secondItemText{
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(60,58,60,1);
    margin-bottom: 13px;
    margin-top: 13px;
  }
  .secondItemExplain{
    width:154px;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(60,58,60,1);
    line-height:20px;
    text-align: center;
  }
  .secondItemLeft{
    padding-top: 58px;
    padding-left: 27px;
  }
  .secondItemRight{
    padding-top: 57px;
  }
</style>
