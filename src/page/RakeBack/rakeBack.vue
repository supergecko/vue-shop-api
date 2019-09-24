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
      <el-row style="width: 1220px;background:rgba(255,255,255,1);margin-top: 67px">
        <el-row class="rakeHeader">
          <div class="rakeHeaderBTn">我的团队</div>
        </el-row>

        <!--爷爷-->
        <!--为空的时候-->
        <el-row v-show="(JSON.stringify(leader) === '{}')">
          <el-row class="publicTitle">
            <el-row style="margin-bottom: -6px">我的推荐人</el-row>
            <el-row class="publicTitleFooterBtn"></el-row>
          </el-row>
          <el-row class="referenceWarp">
            <el-row>
              <el-col :span="12" class="referenceHeaderLeft">
                <el-image
                  style="width: 31px; height: 31px"
                  src="../../../../static/images/recommenderlogo.png"
                  fit="fill"></el-image>
                <div style="font-size: 30px;">当前等级</div>
              </el-col>
              <el-col :span="12" class="referenceHeaderRight">{{leader.identity==1?'普通用户':'雷猫合伙人'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="referenceFooterLeft">
                <div class="FooterLeftItem1">暂无</div>
                <div>邀请人数 暂无</div>
                <div>累计贡献值 暂无</div>
              </el-col>
              <el-col :span="12" class="referenceFooterRight">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="leader.qrcode"
                  fit="fill"></el-image>
              </el-col>
            </el-row>
          </el-row>
        </el-row>
        <!--不为空-->
        <el-row v-show="!(JSON.stringify(leader) === '{}')">
          <el-row class="publicTitle">
            <el-row style="margin-bottom: -6px">我的推荐人</el-row>
            <el-row class="publicTitleFooterBtn"></el-row>
          </el-row>
          <el-row class="referenceWarp">
            <el-row>
              <el-col :span="12" class="referenceHeaderLeft">
                <el-image
                  style="width: 31px; height: 31px"
                  src="../../../../static/images/recommenderlogo.png"
                  fit="fill"></el-image>
                <span>{{leader.identity==1?'普通用户':'雷猫合伙人'}}</span>
              </el-col>
              <el-col :span="12" class="referenceHeaderRight">当前等级</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="referenceFooterLeft">
                <div class="FooterLeftItem1">用户名: {{leader.nickname}}</div>
                <div>邀请人数: {{leader.direct_number==null? 0 : leader.direct_number}}</div>
                <div>累计贡献值: {{leader.results==null? 0 : leader.results}}</div>
              </el-col>
              <el-col :span="12" class="referenceFooterRight">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="leader.qrcode"
                  fit="fill"></el-image>
              </el-col>
            </el-row>
          </el-row>
        </el-row>

        <!--儿子-->
        <el-row v-show="children.length===0">
          <el-row class="publicTitle secondTitle">
            <el-row style="margin-bottom: -6px">我邀请的人</el-row>
            <el-row class="publicTitleFooterBtn"></el-row>
          </el-row>
          <el-carousel :autoplay="false" type="card" ref="carousel" v-on:change="changeFun" style="width: 950px;margin: 0 auto;">
            <el-carousel-item v-for="(item, i) in 3" :key="i" name="index" style="height: 264px;border-radius:10px;">
              <div class="myTeam1">
                <div class="team1Title">普通用户</div>
                <el-row style="margin-top: 50px;">
                  <el-col :span="15" class="teamLeft">
                    <div class="userName">用户名:暂无</div>
                    <div>累计贡献值:暂无</div>
                  </el-col>
                  <el-col :span="9" style="text-align: center;margin-top: -20px;">
                    <el-image
                      style="width: 100px; height: 100px"
                      src="http://www.dterdal.com/public/code.png"
                      fit="fill"></el-image>
                  </el-col>
                </el-row>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-row>
        <el-row v-show="!(children.length===0)">
          <el-row class="publicTitle secondTitle">
            <el-row style="margin-bottom: -6px">我邀请的人</el-row>
            <el-row class="publicTitleFooterBtn"></el-row>
          </el-row>
          <el-carousel :autoplay="false" type="card" ref="carousel" v-on:change="changeFun">
            <el-carousel-item v-for="(item, i) in children" :key="i" name="index" style="height: 264px;border-radius:10px;">
              <div class="myTeam1">
                <div class="team1Title">{{item.identity==1?'普通用户':'雷猫合伙人'}}</div>
                <el-row style="margin-top: 50px;">
                  <el-col :span="15" class="teamLeft">
                    <div class="userName">用户名:{{item.nickname}}</div>
                    <div>累计贡献值:{{item.results==null? 0 : item.results}}</div>
                  </el-col>
                  <el-col :span="9" style="text-align: center;margin-top: -20px;">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.qrcode"
                      fit="fill"></el-image>
                  </el-col>
                </el-row>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-row>

        <!--孙子-->
        <el-row style="display: flex;justify-content: center">
          <el-image
            style="width: 52px; height: 52px"
            src="../../../../static/lmbImg/downArrow.png"
            fit="fill"></el-image>
        </el-row>
        <el-row style="width: 950px;margin: 0 auto">
          <secondary-agent :flag=flag :grandson=grandson ref="mychild"></secondary-agent>
        </el-row>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import { polularizeDetail } from '/api'
  import secondaryAgent from '/common/secondaryAgent'
  import { getItem } from './../../utils/newLocalStorage'
  export default {
    data () {
      return {
        url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
        flag: '',
        leader: {},
        children: [],
        grandson: []
      }
    },
    computed: {},
    methods: {
      _polularizeDetail () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        polularizeDetail(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            this.leader = res.data.data.leader
            this.children = res.data.data.children
            this.grandson = res.data.data.grandson
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      changeFun (index) {
        this.flag = index
        // this.$refs.mychild.detectInfo()
      }
    },
    created () {
      this._polularizeDetail()
    },
    components: {
      secondaryAgent
    }
  }
</script>

<style scoped>
  .userName{
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 248px;
  }
  .FooterLeftItem1{
    font-family: WenQuanYi Zen Hei;
    font-weight: 400;
    color: rgba(236,237,251,1);
    font-size: 26px;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 300px;
  }
  .referenceWarp{
    width: 475px;
    height: 264px;
    border-radius: 30px;
    background-image: url("../../../static/images/recommenderBg.png");
    background-size: 100% 100%;
    margin: 0 auto;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(236,237,251,1);
  }
  .referenceHeaderLeft{
    padding-left: 30px;
    padding-top: 30px;
    display: flex;
    align-items: center;
  }
  .referenceHeaderLeft span{
    font-size: 24px;
    margin-bottom: 3px;
    margin-left: 2px;
  }
  .referenceHeaderRight{
    font-size: 20px;
    text-align: right;
    padding-right: 30px;
    padding-top: 35px;
  }
  .referenceFooterLeft{
    padding-left: 34px;
    padding-top: 70px;
  }
  .referenceFooterRight{
    text-align: right;
    padding-right: 30px;
    padding-top: 76px;
  }
  .publicTitle{
    font-size:20px;
    font-family:WenQuanYi Zen Hei;
    font-weight:400;
    color:rgba(60,58,60,1);
    text-align: center;
    margin-top: 56px;
    margin-bottom: 20px;
  }
  .publicTitleFooterBtn{
    width: 106px;
    height: 12px;
    background: rgba(228,195,164,1);
    opacity: 0.74;
    margin: 0 auto;
  }
  .rakeHeader{
    width:746px;
    height: 66px;
    box-sizing: border-box;
    padding-top: 30px;
    margin: 0 auto;
  }
  .rakeHeaderBTn{
    background-image: url("../../../static/images/rakeHeadBg.png");
    background-size: 100% 100%;
    width: 252px;
    height: 48px;
    margin: 0 auto;
    box-sizing: border-box;
    font-size:15px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(216,80,60,1);
    text-align: center;
    line-height: 48px;
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
    height:250px;
    width: 236px;
    margin-right: 37px;
  }
  .rakeMiddleTips{
    width:54px;
    height:54px;
    background:rgba(114,118,127,1);
    border-radius:50%;
    font-size:16px;
    font-family:Adobe Heiti Std;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:54px;
    text-align: center;
    margin: 0 auto;
    margin-top: -15px;
  }
  .rakeMiddleText{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51,51,51,1);
    padding-left: 36px;
    padding-top: 22px;
    padding-right: 40px;
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
