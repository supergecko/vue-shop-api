<template>
  <div>
    <y-shelf title="我的礼卷" style="margin-bottom: 10px;"></y-shelf>

    <el-main style="padding-top: 0px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--可用卡卷-->
        <el-tab-pane name="first">
          <span slot="label">可用卡券<span style="color:#409EFF;">(0)</span></span>
           可用卡券
        </el-tab-pane>

        <!--已用&失效-->
        <el-tab-pane name="second">
          <span slot="label">已用&失效<span style="color:#409EFF;">(0)</span></span>
          已用&失效
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
