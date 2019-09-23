<template>
  <div>
    <y-shelf title="我的礼卷" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName">
        <!--可用卡卷-->
        <el-tab-pane name="first">
          <span slot="label">可用卡券<span style="color:#409EFF;">(0)</span></span>
          <el-row v-if="!(available.length===0)">
            <el-col :span="8" class="couponWarp" v-for="(item, i) in available" :key="i">
              <el-row class="couponItem couponItem2">
                <el-row class="couponBtnHeader">
                  <el-col :span="8" class="couponHeaderLeft">{{item.name}}</el-col>
                  <el-col :span="16" class="couponHeaderRight">
                    <div>￥<span style="font-size: 56px">{{item.money}}</span></div>
                    <div>使用日期</div>
                    <span>{{item.begin_time}}-{{item.end_time}}</span>
                  </el-col>
                </el-row>
                <el-row class="couponBtnFooter">
                  <span>使用规则：优惠券仅限在有效期内</span>
<!--                  <div class="couponDOwn"></div>-->
                </el-row>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="main-info-wrap" v-else>
            <img src="../../../assets/img/data.png" alt />
            <div class="txt">暂无数据...</div>
          </el-row>
<!--          <el-row class="couponNoneWarp" v-else>-->
<!--            <el-image-->
<!--              style="width: 132px; height: 116px"-->
<!--              src="../../../../static/images/none.png"-->
<!--              fit="fill"></el-image>-->
<!--            <el-row class="couponNoneText">空空如也</el-row>-->
<!--          </el-row>-->
        </el-tab-pane>

        <!--已用&失效-->
        <el-tab-pane name="second">
          <span slot="label">已用&失效<span style="color:#409EFF;">(0)</span></span>
          <el-row v-if="!(unavailable.length===0)">
            <el-col :span="8" class="couponWarp" v-for="(item, i) in unavailable" :key="i">
              <el-row class="couponItem">
                <el-row class="couponBtnHeader">
                  <el-col :span="8" class="couponHeaderLeft">{{item.name}}</el-col>
                  <el-col :span="16" class="couponHeaderRight">
                    <div>￥<span style="font-size: 56px">{{item.money}}</span></div>
                    <div>使用日期</div>
                    <div>{{item.begin_time}}-{{item.end_time}}</div>
                  </el-col>
                </el-row>
                <el-row class="couponBtnFooter">
                  <span>使用规则：优惠券仅限在有效期内</span>
<!--                  <div class="couponDOwn"></div>-->
                </el-row>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="main-info-wrap" v-else>
            <img src="../../../assets/img/data.png" alt />
            <div class="txt">暂无数据...</div>
          </el-row>
<!--          <el-row class="couponNoneWarp" v-else>-->
<!--            <el-image-->
<!--              style="width: 132px; height: 116px"-->
<!--              src="../../../../static/images/none.png"-->
<!--              fit="fill"></el-image>-->
<!--            <el-row class="couponNoneText">空空如也</el-row>-->
<!--          </el-row>-->
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script>
  import { myCoupon } from '/api'
  import YShelf from '/components/shelf'
  import { getItem } from './../../../utils/newLocalStorage'
  export default {
    data () {
      return {
        activeName: 'first',
        available: [], // 可用礼券数组
        unavailable: [] // 不可用礼券
      }
    },
    methods: {
      // 拉取礼券
      _myCoupon () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        myCoupon(params).then(res => {
          loading.close()
          console.log(`礼券详情${JSON.stringify(res.data.data)}`)
          if (res.status === 200 && res.data.code === 1) {
            this.available = res.data.data.available
            this.unavailable = res.data.data.unavailable
          } else {
            this.$message.error('网络赛车啦')
          }
        })
      }
    },
    created () {
      this._myCoupon()
    },
    components: {
      YShelf
    }
  }
</script>
<style>
  .main-info-wrap {
    min-height: 205px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*border-top: 1px solid #e8e8e8;*/
  }
  .couponNoneWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 51px;
  }
  .couponNoneText{
    font-family:Microsoft YaHei;
    font-weight:300;
    color:rgba(153,153,153,1);
    margin-top: 19px;
  }
  .couponWarp{
    display: flex;
    justify-content: center;
    font-family:PingFang SC;
    color:rgba(255,255,255,1);
  }
  /*已过期*/
  .couponItem{
    width: 290px;
    height: 190px;
    margin-bottom: 15px;
    background-image: url("../../../../static/images/couponOver.png");
    background-size: 100% 100%;
    border-radius:4px;
  }
  /*已使用*/
  .couponItem1{
    background-image: url("../../../../static/images/couponUser.png");
  }
  /*未使用*/
  .couponItem2{
    background-image: url("../../../../static/images/coupon.png");
  }
  .couponBtnHeader{
    height: 143px;
    font-weight:400;
  }
  .couponHeaderLeft{
    padding-top: 14px;
    padding-left: 10px;
    font-size: 25px;
  }
  .couponHeaderRight{
    text-align: right;
    padding-right: 10px;
    padding-top: 13px;
  }
  .couponBtnFooter{
    height: 47px;
    font-weight:300;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .couponDOwn{
    background-image: url("../../../../static/images/couponDown.png");
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>
