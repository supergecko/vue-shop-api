<template>
  <el-container style="display: flex;align-items: center;padding-top: 20px">
    <!--返佣头部-->
    <el-header style="height: auto">
      <el-image
        style="width: 1220px; height: 193px"
        src="../../../static/images/rakeBg.png"
        fit="fill"></el-image>
    </el-header>
    <el-main style="padding-top: 0px;overflow-x: hidden">
      <!--合伙人规则-->
      <el-row>
        <el-row class="rakeHeader">
          <div class="rakeHeaderBTn">合伙人规则</div>
        </el-row>
        <el-row class="rakeMiddleWarp">
          <el-col :span="6" class="rakeMiddleItem">
            <div class="rakeMiddleTips">1</div>
            <div class="rakeMiddleText">合伙人可使用专属邀请码进行新用户（普通用户）推广，新用户可使用合伙人专属邀请码注册并下单</div>
          </el-col>
          <el-col :span="6" class="rakeMiddleItem">
            <div class="rakeMiddleTips">2</div>
            <div class="rakeMiddleText">合伙人可获得使用其邀请码注册的普通用户所购买的雷猫产品全额的10%返佣，以及5%的缴纳电费金额返佣。（返佣以雷猫币的方式体现，下同）</div>
          </el-col>
          <el-col :span="6" class="rakeMiddleItem">
            <div class="rakeMiddleTips">3</div>
            <div class="rakeMiddleText">当普通用户购买雷猫产品金额高于10万元人民币，将可以选择升级成为合伙人。此时，其上级合伙人将不再获得新合伙人产品购买金额的返佣奖励</div>
          </el-col>
          <el-col :span="6" class="rakeMiddleItem">
            <div class="rakeMiddleTips">4</div>
            <div class="rakeMiddleText">但可获得通过新合伙人专属邀请码注册的新用户产品购买金额的2%，以及缴纳电费金额的2%返佣</div>
          </el-col>
        </el-row>
      </el-row>
      <!--我的团队-->
      <el-row style="background:rgba(250,250,250,1);margin-top: 28px">
        <el-row class="rakeHeader" style="margin-bottom:18px">
          <div class="rakeHeaderBTn">我的团队</div>
        </el-row>
        <el-row class="publicTitle">我邀请的人</el-row>
        <el-row>
          <el-carousel :autoplay="false" type="card" ref="carousel" v-on:change="changeFun">
            <el-carousel-item v-for="item in 6" :key="item" name="index" style="height: 264px;border-radius:10px;">
              <div class="myTeam1">
                <div class="team1Title">雷猫合伙人</div>
                <el-row style="margin-top: 50px;">
                  <el-col :span="15" class="teamLeft">
                    <div style="margin-bottom: 10px">用户名:12323</div>
                    <div>累计贡献值:213312</div>
                  </el-col>
                  <el-col :span="9" style="text-align: center;margin-top: -20px;">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      fit="fill"></el-image>
                  </el-col>
                </el-row>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-row>
        <el-row style="display: flex;justify-content: center">
          <el-image
            style="width: 52px; height: 52px"
            src="../../../../static/lmbImg/downArrow.png"
            fit="fill"></el-image>
        </el-row>
        <el-row style="width: 950px">
          <secondary-agent :flag=flag  ref="mychild"></secondary-agent>
        </el-row>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import secondaryAgent from '/common/secondaryAgent'
  export default {
    data () {
      return {
        url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
        flag: ''
      }
    },
    computed: {},
    methods: {
      changeFun (index) {
        this.flag = index
        // this.$refs.mychild.detectInfo()
      }
    },
    created () {

    },
    components: {
      secondaryAgent
    }
  }
</script>

<style scoped>
  .publicTitle{
    font-size:25px;
    font-family:WenQuanYi Zen Hei;
    font-weight:400;
    color:rgba(60,58,60,1);
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .rakeHeader{
    width:746px;
    height: 66px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(221,221,221,1);
    padding-top: 30px;
    margin: 0 auto;
  }
  .rakeHeaderBTn{
    background-image: url("../../../static/images/rakeHeadBg.png");
    background-size: 100% 100%;
    width: 172px;
    height: 24px;
    margin: 0 auto;
    box-sizing: border-box;
    font-size:15px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(216,80,60,1);
    text-align: center;
    line-height: 24px;
  }
  .rakeMiddleWarp{
    display: flex;
    margin-right: -37px;
    padding-top: 47px;
    justify-content: center;
  }
  .rakeMiddleItem{
    background:rgba(255,255,255,1);
    border-radius:4px;
    height:178px;
    width: 159px;
    margin-right: 37px;
  }
  .rakeMiddleTips{
    width:29px;
    height:29px;
    background:rgba(114,118,127,1);
    border-radius:50%;
    font-size:16px;
    font-family:Adobe Heiti Std;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:29px;
    text-align: center;
    margin: 0 auto;
    margin-top: -15px;
  }
  .rakeMiddleText{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    padding-left: 15px;
    padding-top: 10px;
    padding-right: 15px;
  }

  .myTeam1{
    background-size: 100% 100%;
    width: 475px;
    height: 264px;
    border-radius:10px;
    background-image: url("../../../static/images/team1.png");
  }
  .team1Title{
    text-align:center;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    padding-top: 74px;
  }
  .teamLeft{
    border-right: 1px solid rgba(255,255,255,1);
    font-size:20px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    padding-left: 47px
  }
</style>
