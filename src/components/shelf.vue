<template>
  <div class="gray-box">
    <div class="title" v-if="!titleFlag">
      <span style="font-size:14px">{{title}}</span>
      <div>
        <slot name="right"></slot>
      </div>
    </div>

    <div v-if="titleFlag" class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user/information' }">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/dailyOutput' }" v-if="itemFlag">每日产出</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--头部内容-->
    <el-row v-if="bgFlag" style="margin-bottom: 13px">
      <el-col :span="17">
        <div class="grid-content bg-purple middleHeaderLeft">
          <div class="contentHeader">
            <span>第5轮：预计开始挖矿时间</span>
            <el-tag>2019/03/27</el-tag>
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
      <el-col :span="7"><div class="grid-content bg-purple-light middleHeaderRight">
        <div class="rightHeader">
          <div style="font-size:80px">3</div>
          <div class="rightHeaderItem">
            <div style="font-size:28px;margin-top:8px;">世代</div>
            <div style="font-size:20px;margin-bottom:16px;">矿机</div>
          </div>
        </div>
        <div>- 蚂蚁矿机 L3++ <i class="el-icon-warning"></i>-</div>
      </div></el-col>
    </el-row>
    <!--内容-->
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'title',
      'bgFlag',
      'titleFlag',
      'itemFlag'
    ]
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .gray-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, .14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    .title {
      padding-left: 30px;
      position: relative;
      z-index: 10;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 8px 8px 0 0;
      box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
      background: #f3f3f3;
      background: -webkit-linear-gradient(#fbfbfb, #ececec);
      background: linear-gradient(#fbfbfb, #ececec);
      line-height: 60px;
      font-size: 18px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
    }
  }

  /*众筹样式开始*/
  .el-tag{
    height: auto;
    line-height: normal;
  }
  .middleHeaderLeft{
    padding-left: 24px;
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
  }
  .rightHeader{
    display: flex;
  }
  .rightHeaderItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
