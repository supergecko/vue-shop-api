<template>
  <div class="mine">
    <div class="banner">
      <img src="../../../static/imgs/mine1.png"
           alt />
    </div>

    <div class="content-wrap">
      <div class="interior">
        <div class="interior-left">
          <div class="describe">
            <h3 class="h3">矿场内部</h3>
            <span class="describe-span">网络、散热设备</span>
          </div>
          <p class="interior-left-p">Inside the mine</p>
        </div>
        <div class="interior-right">
          <img src="../../../static/imgs/mine2.png"
               alt />
        </div>
      </div>

      <div class="external">
        <div class="external-left">
          <div class="describe">
            <h3 class="h3">矿场外部</h3>
            <span class="describe-span">电力设备</span>
          </div>
          <p class="external-left-p">Mines outside</p>
        </div>
        <div class="external-right">
          <img src="../../../static/imgs/mine3.png"
               alt />
          <img class="img3"
               width="368"
               height="260"
               src="../../../static/imgs/mine3.png"
               alt />
          <span class="external-span">The mine equipmen</span>
        </div>
      </div>

      <div class="hydropower">
        <img style="margin-right: 25px;"
             src="../../../static/imgs/mine5.png"
             alt="">
        <img style="margin-right: 48px;"
             src="../../../static/imgs/mine6.png"
             alt="">
        <div class="interior-left">
          <div class="describe">
            <h3 class="h3">水电站</h3>
            <span class="describe-span">电力可靠保障</span>
          </div>
          <p class="interior-left-p">Hydropower station</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.mine {
  width: 1220px;
  margin: 0 auto;
  padding: 20px 0;
}
.banner {
  margin-bottom: 112px;
}
.content-wrap {
  padding: 0 224px;
  margin-bottom: 72px;
}

.interior {
  display: flex;
  flex-direction: row;
  margin-bottom: 125px;
}
.describe {
  border-left: 6px solid rgb(91, 129, 233);
  padding-left: 4px;
  line-height: 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 270px;
}
.h3 {
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(60, 58, 60, 1);
}
.describe-span {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(60, 58, 60, 1);
}
.interior-left-p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(136, 136, 136, 1);
  margin-top: 5px;
}
.interior-right {
  margin-left: 48px;
}

.external {
  margin-bottom: 276px;
  display: flex;
  flex-direction: row;
}
.external-left {
  display: flex;
  flex-direction: column;
}
.external h3 {
  font-size: 44px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(60, 58, 60, 1);
}
.external .describe-span {
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(60, 58, 60, 1);
}
.external .describe {
  line-height: 43px;
  margin-top: 55px;
}
.external-left-p {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  margin-top: 27px;
  color: rgba(136, 136, 136, 1);
}
.external-right {
  position: relative;
  margin-left: 149px;
}
.img3 {
  position: absolute;
  top: 151px;
  left: 66px;
}
.external-span {
  position: absolute;
  top: 28px;
  left: 285px;
  color: #dbdddf;
  font-size: 24px;
  line-height: 36px;
}
.hydropower {
  display: flex;
  flex-direction: row;
}
.hydropower .describe {
  margin-top: 20px;
}
</style>
