<template>
  <div class="about3">
    <div class="block">
      <el-carousel height="604px"
                   trigger="click">
        <el-carousel-item v-for="(src,index) in bannerImg"
                          :key="index">
          <img src="../../../static/imgs/banner.png"
               alt />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="about">
      <div class="title">
        <h2 class="h2">关于我们</h2>
        <div class="bottom-border"></div>
      </div>

      <div class="content">
        <el-row>
          <el-col :span="11"
                  class="content-left">
            <span class="border-top"></span>
            <h3 class="h3">雷猫矿机</h3>
            <p class="p-content">
              <span>
                一个为用户提供矿机共享服务的平台，为用户节省了购买、安装、托管矿机的复杂流程，一键下单，即可享受服务。
                <br />

                <br />区别于市面上的任何矿机共享产品:
                <br />雷猫矿机平台上用户收益更加透明：真实矿机提供挖矿服务，平台根据用户指示链接指定矿池，再由矿池将数值货币挖矿产出直接分配至用户提供的钱包地址。
                <br />雷猫矿机的矿机产品选择更为灵活的基础，售后服务优势更为明显； 雷猫矿场提供稳定及优质的托管服务，若因矿场方原因造成设备停机，平台将为用户全额补偿收益。
                平台选择全球领先矿机厂商设备，深度合作全球一流矿机f2pool.com、BTC.com和AntPool。
                <br />

                <br />“真实矿机挖矿、矿池直接打款、用户收益透明、服务套餐选择灵活”，雷猫矿机致力于全球用户提供透明、安全、便捷的全球一流的矿机共享服务。
              </span>
            </p>
          </el-col>
          <el-col :span="13"
                  class="content-right">
            <img src="../../../static/imgs/kuangji.png"
                 alt />
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="relation">
      <div class="title">
        <h2 class="h2">联系方式</h2>
        <div class="bottom-border"></div>
      </div>
      <div class="relation-content">
        <img width="750px"
             src="../../../static/imgs/bottom2.png"
             alt />
        <div class="num">
          <p>
            <span>电话</span>
            <br />18965904532 &nbsp;&nbsp;&nbsp;林经理
          </p>
          <p>
            <span>邮箱</span>
            <br />lintingxin@linglu666.cn
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="bottom">
      <ul class="wrap">
        <li><a href="javascript;">友情链接</a></li>
        <li><a href="javascript;">合作伙伴</a></li>
        <li><a href="javascript;">联络我们</a></li>
        <li><a href="javascript;">常见问题</a></li>
      </ul><br>
      <p>copy 2019领鹿谷网络科技有限公司 版权所有</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      bannerImg: [
        // '../../../static/imgs/banner.png',
        // '../../../static/imgs/banner.png',
        '../../../static/imgs/banner.png'
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.about3 {
  width: 1220px;
  margin: 0 auto;
  padding: 20px 0;
}
/* .el-carousel__indicator--horizontal{
    width: 16px;
    height: 16px;
    background: rgba(89, 126, 247, 1);
    border-radius: 50%;
  }
  .el-carousel__button {
    width: 16px;
    height: 16px;
    background: rgba(89, 126, 247, 1);
    border-radius: 50%;
  } */
.about,
.relation {
  width: 100%;
  text-align: center;
}
.title {
  display: inline-block;
  margin: 77px auto;
  text-align: center;
  margin-bottom: 103px;
}
.bottom-border {
  width: 60px;
  height: 8px;
  background: rgba(81, 78, 81, 1);
  margin: 22px auto 0;
}
.h2 {
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(60, 58, 60, 1);
}

.content {
  padding: 0 118px;
}
.content-left {
  padding: 17px 0;
}
.content-left::before {
  display: block;
  content: "";
  width: 52px;
  height: 1px;
  background: rgba(60, 58, 60, 1);
}
.h3 {
  margin-top: 35px;
  width: 96px;
  height: 24px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(60, 58, 60, 1);
}
.p-content {
  margin-top: 80px;
  text-align: left;
  color: #3c3a3c;
  font-size: 16px;
  line-height: 25px;
  /* font-family: MicrosoftYaHeiLight; */
}
.content-right {
  text-align: right;
}

.relation .title {
  margin-top: 187px;
  margin-bottom: 100px;
}
.relation {
  margin-bottom: 173px;
}
.relation-content {
  padding: 0 118px;
  text-align: left;
  position: relative;
}
.num {
  width: 426px;
  height: 292px;
  background: rgba(232, 238, 246, 1);
  position: absolute;
  top: 70px;
  right: 118px;
}
.num p {
  color: #3c3a3c;
  font-size: 20px;
  margin: 66px 0 0 84px;
  line-height: 25px;
}
.num span {
  font-weight: 600;
  padding: 10px 0;
}
.bottom {
  width: 100%;
  height: 118px;
  background: url("../../../static/imgs/bottom.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrap {
  list-style: none;
}
.wrap a {
  text-decoration: none;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  margin-left: 10px;
  border-right: 2px rgba(231, 229, 229, 1) solid;
  padding-right: 10px;
}
.wrap a:hover {
  color: #5079d9;
}
.wrap li {
  float: left;
}
.wrap li:last-child a {
  border: none;
}
.bottom p {
  font-size: 12px;
  font-weight: 300;
  color: #fff;
}
</style>
