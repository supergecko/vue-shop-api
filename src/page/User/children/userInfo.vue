<template>
  <div>
    <y-shelf title="个人中心" style="margin-bottom: 10px;"></y-shelf>
    <el-main style="padding-top: 0px">
      <el-row class="header">
        <el-col :span="12" class="headerLeft">
          <div class="leftWarp">
            <el-image
              style="width: 100px; height: 100px;border-radius: 50px;"
              :src="url"
              fit="fill"></el-image>
            <div class="itemRight">
              <h1 class="itemRightTitle">陈二狗</h1>
              <span class="itemPadding">下午好</span>
              <a class="itemPadding">修改个人信息 ></a>
            </div>
          </div>
        </el-col>

        <el-col :span="12" class="headerRight">
          <div class="itemPadding">账户安全:<span style="color: red;font-size:18px;">普通</span></div>
          <div class="itemPadding">绑定手机:
            <span style="margin-left: 5px"></span>
            <el-button type="danger" style="padding: 4px 10px;">绑定</el-button>
          </div>
          <div class="itemPadding">绑定邮箱:
            <span style="margin-left: 5px"></span>
            <el-button type="danger" style="padding: 4px 10px;">绑定</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row class="middle">
        <el-row>
          <el-col :span="12" class="middleWarp">
            <el-image
              style="width: 60px; height: 60px;border-radius: 50px;"
              :src="url"
              fit="fill"></el-image>
            <div class="middleItemRight">
              <h1 class="middleTitle">我的设备数量</h1>
              <a>查看详情 ></a>
            </div>
          </el-col>
          <el-col :span="12" class="middleWarp">
            <el-image
              style="width: 60px; height: 60px;border-radius: 50px;"
              :src="url"
              fit="fill"></el-image>
            <div class="middleItemRight">
              <h1 class="middleTitle">电费剩余天数</h1>
              <a>立即充值 ></a>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="middleWarp" style="padding-left:0px">
            <el-image
              style="width: 60px; height: 60px;border-radius: 50px;"
              :src="url"
              fit="fill"></el-image>
            <div class="middleItemRight">
              <h1 class="middleTitle">雷猫币余额</h1>
              <a>查看详情 ></a>
            </div>
          </el-col>
          <el-col :span="12" class="middleWarp" style="padding-left:0px">
            <el-image
              style="width: 60px; height: 60px;border-radius: 50px;"
              :src="url"
              fit="fill"></el-image>
            <div class="middleItemRight">
              <h1 class="middleTitle">我的优惠劵</h1>
              <a>查看详情 ></a>
            </div>
          </el-col>
        </el-row>
      </el-row>

      <el-row>
        <el-col :span="8"></el-col>
        <el-col :span="8">
            <el-carousel>
              <el-carousel-item v-for="item in 4" :key="item">
                <el-dropdown>
                  <div class="el-dropdown-link" style="width: 316px;height: 300px">下拉菜单</div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item style="width: 316px;">黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item >双皮奶</el-dropdown-item>
                    <el-dropdown-item >蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-main>
  </div>

</template>

<script>
  import YShelf from '/components/shelf'

  export default {
    data () {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    computed: {},
    methods: {
      test () {
        console.log('11111')
      }
    },
    created () {

    },
    components: {
      YShelf
    }
  }
</script>

<style scoped>
  .header {
    height: 140px;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(4, 4, 4, .1);
    border-radius: 2px;
  }

  .leftWarp {
    display: flex;
    padding-left: 20px;
  }

  .itemRight {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
  }

  .itemRightTitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .itemPadding {
    margin-bottom: 10px;
  }

  .headerLeft {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .headerRight {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 10px;
    align-items: center;
  }

  .middle {
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(4, 4, 4, .1);
    border-radius: 2px;
    margin-top: 20px;
  }

  .middleWarp {
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    justify-content: center;
  }

  .middleItemRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  .middleTitle {
    font-size: 16px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
