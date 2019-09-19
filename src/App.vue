<template>
  <div id="app">
    <router-view class="main"></router-view>
    <remote-js :js-url="'https://bot.4paradigm.com/web/assets/ics-web-sdk-js.js'" :js-load-call-back="loadRongJs"></remote-js>
  </div>
</template>

<script>
  import RemoteJs from '../src/common/RemoteJs'// 导入组件
  export default {
    name: 'app',
    components: {
      RemoteJs
    },
    methods: {
      loadRongJs () {
        IcsWebSdkJs.init('https://bot.4paradigm.com/web/chat/11329/c3217105-9329-47f9-a088-677bb0b7b45d') // eslint-disable-line
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "assets/style/index.scss";

  #app {
    height: 100%;
  }

  .main {
    background: #ededed;;
  }
</style>
