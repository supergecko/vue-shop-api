<template>
  <div>
    <y-shelf title="我的礼卷" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName">
        <!--可用卡卷-->
        <el-tab-pane name="first">
          <span slot="label">可用卡券<span style="color:#409EFF;">(0)</span></span>
          <el-row>
            <el-col :span="8" class="couponWarp" v-for="item in 6" :key="item">
              <el-row class="couponItem couponItem2">
                <el-row class="couponBtnHeader">
                  <el-col :span="8" class="couponHeaderLeft">新人劵</el-col>
                  <el-col :span="16" class="couponHeaderRight">
                    <div>￥<span style="font-size: 56px">500</span></div>
                    <div>使用日期</div>
                    <div>2019.9.20-2019.10.20</div>
                  </el-col>
                </el-row>
                <el-row class="couponBtnFooter">
                  <span>使用规则：优惠券仅限在有效期内</span>
                  <div class="couponDOwn"></div>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!--已用&失效-->
        <el-tab-pane name="second">
          <span slot="label">已用&失效<span style="color:#409EFF;">(0)</span></span>
          <el-row>
            <el-col :span="8" class="couponWarp" v-for="item in 6" :key="item">
              <el-row class="couponItem">
                <el-row class="couponBtnHeader">
                  <el-col :span="8" class="couponHeaderLeft">新人劵</el-col>
                  <el-col :span="16" class="couponHeaderRight">
                    <div>￥<span style="font-size: 56px">500</span></div>
                    <div>使用日期</div>
                    <div>2019.9.20-2019.10.20</div>
                  </el-col>
                </el-row>
                <el-row class="couponBtnFooter">
                  <span>使用规则：优惠券仅限在有效期内</span>
                  <div class="couponDOwn"></div>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      YShelf
    }
  }
</script>
<style>
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
    font-size: 16px;
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
