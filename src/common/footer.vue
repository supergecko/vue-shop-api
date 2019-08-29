<template>
  <div class="footer">
    <div class="tag">
      <a href="javascript:;">友情链接</a>
      <a href="javascript:;">合作伙伴</a>
      <a href="javascript:;">联络我们</a>
      <a href="javascript:;">常见问题</a></div>
    <div class="cop"><p>Copy © 2019 领鹿谷网络科技有限公司 版权所有</p></div>

  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 50px 0 20px;
    background: #fff;
    margin-top: 20px;
  }

  .tag {
    display: flex;
    justify-content: center;
    a {
      height: 14px;
      padding: 0 10px;
      line-height: 14px;
    }
    a + a {
      border-left: 1px solid #666;
    }
  }

  .cop {
    text-align: center;
    margin: 10px 0;
  }
</style>
