<template>
    <el-main>
      <el-row class="crowdWarp" v-for="(item, i) in goodsList" :key="i">
        <el-row class="lmbWarp">
          <el-col :span="17" class="lmbLeftItem">
            <div class="grid-content bg-purple middleHeaderLeft">
              <div class="contentHeader">
                  <div>
                    <div class="contentHeaderBtn">{{item.title}}</div>
                    <span>预计开始挖矿时间</span>
                    <el-tag type="warning">{{item.create_time}}</el-tag>
                  </div>
                  <div class="downTime">
                    距离本轮团购时间还有
                    <span>10</span>:
                    <span>06</span>:
                    <span>30</span>
                  </div>
              </div>
              <div class="contentMiddle">
                <div class="middleItem1">
                  <span>最低算力</span>
                  <i class="el-icon-warning"></i>
                  <div>
                    $<span>0.3801</span>/G/天
                  </div>
                </div>
                <div class="middleItem2">
                  <span>电费</span>
                  <i class="el-icon-warning"></i>
                  <div>
                    $<span>2.3853</span>/G/天
                  </div>
                </div>
                <div class="middleItem3">
                  <el-tag>LTC</el-tag>
                  <span>来自BTC.com的理论收益</span>
                  <div>
                    $<span>1.5797</span>/G/天
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
              <div class="rightHeader">
                <div style="font-size:80px">3</div>
                <div class="rightHeaderItem">
                  <div style="font-size:28px;margin-top:8px;">世代</div>
                  <div style="font-size:20px;margin-bottom:16px;">矿机</div>
                </div>
              </div>
              <div>- 蚂蚁矿机 L3++ <i class="el-icon-warning"></i>-</div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if=item.goods class="lmbGoodsWarp">
          <el-col :span="6" class="goodsWarp" v-for="(item1, j) in item.goods" :key="j">
            <div class="goodItem">
              <div class="goodItemHead">
                <div style="padding-bottom: 13px">{{item1.description}}</div>
                <div>{{item1.hashrate}}</div>
                <div class="hotBTn" :style="{'display':item1.rate==100 ? 'block':'none'}">抢光了</div>
              </div>
              <div class="goodItemMiddle">
                {{item1.hashrate_cost}}
              </div>
              <div class="goodItemFooter">
                <el-progress :percentage=item1.rate style="width:182px" :format="format"></el-progress>
                <el-button type="primary" :disabled="item1.rate==100? true: false" style="width:214px;margin-top:16px;">即将补货</el-button>
                <div class="goodItemFooterText">— {{item1.goods_name}} —</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </el-main>
</template>

<script>
  import { goodsList } from '/api/index'

  export default {
    data () {
      return {
        goodsList: [] // 商品详情列表
      }
    },
    methods: {
      format (percentage) {
        return percentage === 100 ? '售磐' : `已售${percentage}%`
      }
    },
    mounted () {
      const page = 1
      let params = {page}
      goodsList(params).then(res => {
        if (res.status === 200) {
          this.goodsList = res.data.data
        } else {
          console.log('获取商品列表失败')
          this.ruleForm.errMsg = res.data.msg
        }
      })
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
<style scoped>
  /*众筹样式开始*/
  .crowdWarp{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 52px;
  }
  .lmbWarp{
    background-image: url("../../../static/lmbImg/LMBgoodsBg.png");
    background-size: 100% 100%;
    height: 200px;
    color: #ffffff;
    width: 1220px;
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
    top: 18px;
    right: 416px;
  }
  .downTime span{
    background:rgba(6,69,146,1);
    display: inline-block;
    width:22px;
    height:22px;
    text-align: center;
    line-height: 22px;
    margin-right: 4px;
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
    border-bottom: 1px solid rgba(244,244,244,1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(60,58,60,1);
    position: relative;
  }
  .hotBTn{
    width:102px;
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
    height: 66px;
    border-bottom: 1px solid rgba(244,244,244,1);
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
</style>
