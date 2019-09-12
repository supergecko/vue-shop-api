<template>
  <div class="bottom">
    <div class="content">
      <el-col :span="6">
        <div class="name"></div>
        <div class="copyright">Copyright © 2019 BitDeer All Rights Reserved</div>
        <div class="iconLink">
          <a href="#" class="iconfont icon-qq-copy-copy"></a>
          <a href="#" class="iconfont icon-logo-wechat"></a>
        </div>
      </el-col>
      <el-col :span="11">
        <el-col :span="8">
          <div class="title">产品</div>
          <div class="link">
            <span>矿机共享套餐</span>
          </div>
          <div class="link">
            <a href="#" class>计算器</a>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="title">信息</div>
          <div class="link">
            <!---->
            <a href="#" class>关于我们</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" class>联系我们</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" class>公告中心</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" class>新闻</a>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="title">支持</div>
          <div class="link">
            <!---->
            <a href="#" class>商务合作</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" target="_blank" rel="nofollow">帮助中心</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" target="_blank" rel="nofollow">提交工单</a>
          </div>
          <div class="link">
            <!---->
            <a href="/#" class>隐私条款</a>
          </div>
          <div class="link">
            <!---->
            <a href="#" class>用户条款</a>
          </div>
        </el-col>
      </el-col>
      <el-col class="rate" :span="7">
        <div class="el-row">
          <div class="title rubik-medium">主要汇率</div>
          <div class="list">
            <span v-for="(item, i) in footerRate.info" :key="i">1{{item.title}} = {{item.amount}}美元</span>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        footerRate: this.$store.state.footerRate
      }
    }
  }
</script>
<style scoped>
  .bottom {
    width: 100%;
    min-width: 1350px;
    background: #31384a;
    display: flex;
    justify-content: center;
  }
  .content {
    width: 1200px;
    height: 296px;
    box-sizing: border-box;
    margin: 0 120px;
    padding: 70px 0 20px;
    background: #31384a;
    color: #fff;
  }
  .name {
    width: 105px;
    height: 18px;
    background: url(//assets.bitdeer.cn/_nuxt/img/4afb937.png);
    background-size: 105px 18px;
  }
  .copyright {
    font-size: 12px;
    padding: 20px 0 10px;
    color: #fff;
    opacity: 0.45;
  }
  .title {
    font-family: Rubik-Medium;
    margin-bottom: 5px;
  }
  .link {
    padding-top: 15px;
  }
  .link span {
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    opacity: 0.45;
    cursor: pointer;
  }
  .link a {
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    opacity: 0.45;
    cursor: pointer;
  }

  .rate {
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.45);

  }
  .list{
    display: flex;
    flex-wrap: wrap;
  }
  .title{
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  .list span{
    margin-top: 20px;
    margin-right: 10px;
  }
  .iconfont{
    font-size: 25px;
    color: rgba(255,255,255,.45);
    margin-right: 10px;
    text-decoration:none
  }
  .iconfont:hover{
    color: #FFF;
    text-decoration: none;
  }
</style>
