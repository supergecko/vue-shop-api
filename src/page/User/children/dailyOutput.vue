<template>
  <el-row>
    <y-shelf title="控制面板" itemTitle="每日产出" titleFlag="true" firstPath="true"></y-shelf>
    <el-main style="padding-top: 0px">
      <el-card class="box-card" :body-style="{ padding: '0 0 0 20px'}">
        <el-col :span="12">
          <span class="title-line-bottom">每日产出</span>
        </el-col>
        <el-col :span="12" class="more-wrap">
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="24" class="main-info-wrap">
          <img src="../../../assets/img/data.png" alt />
          <div class="txt">暂无数据...</div>
        </el-col>
        <el-col :span="24" style="">
          <span class="el-icon-info"></span>
          <span class="bottom-text">以上数据来源为您选择的选择的矿池且数据每天更新一次。算力运行结束后，5-7个工作日内由矿池打款结余。</span>
        </el-col>
      </el-card>
    </el-main>

  </el-row>
</template>

<script>
  import YShelf from '/components/shelf'

  export default {
    data () {
      return {
        value3: ''
      }
    },
    computed: {

    },
    methods: {

    },
    components: {
      YShelf
    }
  }
</script>

<style scoped>
  .title-line-bottom {
    display: inline-block;
    border-bottom: 3px solid #409EFF;
    padding: 20px 0 10px;
    color: #1c1f28;
    line-height: 23px;
    font-weight: 600;
  }
  .more-wrap {
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    color: #3c4156;
  }
  .main-info-wrap {
    min-height: 313px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #e8e8e8;
  }
  .bottom-text{
    font-size: 12px;
    color: #999;
    margin-left: 20px;
    margin-bottom: 30px;
  }
</style>
