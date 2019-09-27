<template>
  <div>
    <y-shelf title="我的推广" style="margin-bottom: 10px;"></y-shelf>
    <el-main style="padding-top: 0px">
      <!--头部背景-->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="invite-banner">
              <div class="banner-txt">
                <div class="banner-slogon">邀请奖励滚滚而来</div>
                <div class="sub-slogon">超优套餐送好友，雷猫积分返佣拿不停</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--邀请人数-->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="info-title">
              <div class="info-title__item"><span class="total-title">累计返佣金额</span>
                <mallki class-name="mallki-text" :text=add_up_coin class="rubik-medium" style="padding: 0;margin-bottom: -7px;"/>
                <span class="unit">雷猫积分</span>
              </div>
              <div class="info-title__item"><span>累计邀请人数</span>
                <mallki class-name="mallki-text" :text=direct_number class="rubik-medium" style="padding: 0;margin-bottom: -7px;"/>
                <el-button type="primary"  @click="tab">点击查看详情</el-button>
              </div>
              <div class="info-title__item info-title__item--current"><span>当前身份</span>
                <span class="measure-word rubik-medium">{{identity}}</span>
                <i class="el-icon-info"></i>
              </div>
            </div>
          </div>
        </el-col>

      </el-row>

      <!--邀请链接-->
      <el-row style="background: #fafafa;">
        <el-col :span="18">
          <div class="my-link">
            <label>我的邀请链接</label>
            <el-input v-model="input" placeholder="请输入内容" class="main-link-input" disabled :value=input id="test"></el-input>
            <el-button type="primary" @click="copyText">复制</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="main-link-img">
            <el-image
              style="width: 100px; height: 100px"
              :src="QRCodeUrl"
              fit="fill"></el-image>
          </div>
        </el-col>
      </el-row>

      <!--规则-->
<!--      <el-row style="background: #fafafa;">-->
<!--        <el-col :span="24">-->
<!--          <div class="intro">-->
<!--            <h3 class="rubik-medium">详细规则：</h3>-->
<!--            <p>被邀请者的使用邀请者链接成功注册并下单，邀请者可获得被邀请者首单算力费金额的百分比返佣，比例由邀请者的等级决定，每次返佣金额最高为$1000</p>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <!--佣金-->
      <el-row class="withdraw-info">
        <el-col :span="12" class="withdraw-num">
          <div class="withdraw-num">
            <div class="invite-text hit-value">
              <label>可用雷猫积分：</label>
                <mallki class-name="mallki-text" :text=available class="rubik-medium" style="padding: 0;margin-bottom: -7px;"/>
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="withdraw-num">
          <div class="inv-tips withdraw-btn">
            <el-button type="info">申请转账</el-button>
            <i class="el-icon-info"></i>
          </div>
<!--          <div class="withdraw-right">-->
<!--            <label class="address-label">提币地址</label>-->
<!--            <el-button type="primary">+ 添加</el-button>-->
<!--          </div>-->
        </el-col>
      </el-row>

      <!--返佣记录-->
      <el-row class="detail-list-container">
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <!--返佣记录-->
            <el-tab-pane name="first">
              <span slot="label">返佣记录<i class="el-icon-info"></i></span>
              <RakeBackDataList :bonus_record=bonus_record></RakeBackDataList>
            </el-tab-pane>

            <!--转账记录-->
<!--            <el-tab-pane label="转账记录" name="second">-->
<!--              <RakeBackDataList></RakeBackDataList>-->
<!--            </el-tab-pane>-->
          </el-tabs>
        </el-col>

<!--        <el-col :span="24" class="main-info-wrap">-->
<!--          <img src="../../../assets/img/data.png" alt />-->
<!--          <div class="txt">暂无数据...</div>-->
<!--        </el-col>-->
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import YShelf from '/components/shelf'
  import Mallki from '/components/Mallki'
  import RakeBackDataList from '/common/rakeBackDataList'
  import { myPopularize } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'

  export default {
    data () {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        QRCodeUrl: '',
        activeName: 'first',
        input: '',
        identity: '',
        add_up_coin: 0, // 累计返佣雷猫积分
        direct_number: 0, // 累计邀请人数
        available: 0, // 可提佣金
        bonus_record: [] // 返佣记录
      }
    },
    methods: {
      copyText () {
        const _this = this
        this.$copyText(this.input).then(function (e) {
          _this.$message({
            message: '复制成功',
            type: 'success'
          })
        }, function (e) {
          _this.$message.error('复制失败，请重试')
        })
      },
      _myPopularize () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        myPopularize(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            console.log(res.data.data)
            this.input = res.data.data.popularize_url
            this.QRCodeUrl = res.data.data.qr_code
            this.add_up_coin = res.data.data.add_up_coin === null ? 0 : res.data.data.add_up_coin
            this.direct_number = res.data.data.direct_number === null ? 0 : res.data.data.direct_number
            this.available = res.data.data.available === null ? 0 : res.data.data.available
            this.identity = res.data.data.identity
            this.bonus_record = res.data.data.bonus_record
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      tab (e) {
        this.$router.push({path: '/user/myTeam'})
      }
    },
    created () {
      this._myPopularize()
    },
    components: {
      YShelf,
      Mallki,
      RakeBackDataList
    }
  }
</script>

<style scoped>
  .invite-banner {
    background: #3c4156 url(//assets.bitdeer.cn/_nuxt/img/2f82b34.png) no-repeat;
    background-position: 133px -60px;
    height: 240px;
  }

  .invite-banner .banner-txt {
    margin-left: 30px;
    padding-top: 40px;
    max-width: 600px;
    color: #fff;
  }

  .invite-banner .banner-txt .banner-slogon {
    font-size: 32px;
    line-height: 50px;
  }

  .invite-banner .banner-txt .sub-slogon {
    font-size: 16px;
    margin-top: 20px;
    color: #b8bac0;
  }

  .info-title {
    height: 110px;
    line-height: 50px;
    padding: 30px 0;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .info-title__item:first-child {
    padding-left: 30px;
    margin-right: 15px;
  }

  .info-title__item:nth-child(2) {
    width: 312px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    text-align: center;
  }

  .info-title__item:nth-child(3) {
    margin-left: 50px;
  }

  .total-title {
    margin-right: 10px;
  }

  .rubik-medium {
    font-size: 24px;
    font-weight: bold;
    padding: 0 18px;
    color: #000000;
  }
  .my-link{
    height: 124px;
    margin: 0 30px;
    border-bottom: 1px dotted #d8d8d8;
    display: flex;
    align-items: center;
  }
  label{
    font-size: 16px;
    color: #666;
  }
  .main-link-input{
    width: 448px;
    padding: 0 5px;
    margin: 0 5px;
  }
  .main-link-img{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 124px;
  }
  .intro{
    padding: 50px 30px;
    margin-bottom: 20px;
  }
  .intro h3{
    font-size: 16px;
    color: #3c4156;
    text-align: left;
    margin-bottom: 14px;
    font-weight: bold;
  }
  .withdraw-info{
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(4,4,4,.1);
    border-radius: 2px;
    padding: 30px;
    height: 98px;
    display: flex;
    margin-top: 20px;
  }
  .withdraw-num{
    display: flex;
    justify-content: center;
    align-items: center;
    /*border-right: 1px solid #d8d8d8;*/
  }
  .withdraw-right{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .detail-list-container{
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(4,4,4,.1);
    border-radius: 2px;
    margin-top: 20px;
    padding-left: 20px;
  }
  .main-info-wrap {
    min-height: 313px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
