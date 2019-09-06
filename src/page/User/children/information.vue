<template>
  <div>
    <y-shelf title="控制面板"></y-shelf>
    <div class="ControlPanel">
      <el-container>
        <el-header>
          <el-card
            class="box-card"
            :body-style="{ padding: '0px',background: '#fbfbfb' }"
            style="position:relative">
            <div class="header-title">
              <span class="iconfont icon-btc-"></span>
              <div class="name">BTC</div>
              <div class="plan-num">0个套餐正在挖矿</div>
            </div>
          </el-card>
        </el-header>

        <el-main>
          <el-card class="box-card" :body-style="{ padding: '0 0 0 20px'}">
            <el-row>
              <!-- left -->
              <el-col :span="9">
                <!-- <el-card> -->
                <el-row>
                  <el-col :span="8">
                    <div class="icon">
                      <span class="iconfont icon-shandian"></span>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="total-title">总算力</div>
                    <div class="total-rate">
                      <span class="rate-title">0</span>
                      <span class>Th/S</span>
                    </div>
                    <button class="rate-btn">购买更多</button>
                  </el-col>
                </el-row>
                <!-- </el-card> -->
              </el-col>
              <!-- right -->
              <el-col :span="15">
                <el-card class="box-card" :body-style="{ padding: 0}">
                  <el-col :span="5">
                    <div class="icon">
                      <span class="iconfont icon-qiandai"></span>
                    </div>
                  </el-col>
                  <el-col :span="19" class="total-wrap">
                    <div class="total-title">
                      <span>总产出</span>
                      <el-tooltip content="数据从你选择的矿池每天进行同步" placement="top">
                        <span class="el-icon-info"></span>
                      </el-tooltip>
                    </div>
                    <div class="total-revenue">
                      <span>0.00000000</span>
                      <span class="total-content">BTC</span>
                    </div>
                    <div class="total-detail">
                      <span>≈ $0.00</span>
                    </div>
                    <div class="share">
                      <span class="el-icon-share"></span>
                    </div>
                  </el-col>
                </el-card>
              </el-col>
            </el-row>
          </el-card>

          <el-row class="marginTop">
            <el-col :span="15">
              <el-row>
                <el-card class="box-card" :body-style="{ padding: '0 0 0 20px'}">
                  <el-col :span="12">
                    <span class="title-line-bottom">每日产出</span>
                    <el-tooltip content="数据从你选择的矿池每天进行同步" placement="top">
                      <span class="el-icon-info"></span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="12" class="more-wrap">
                    <span>最近14天</span>&nbsp;
                    <a style="color:#409EFF" @click="tab()">更多></a>
                  </el-col>
                  <el-col :span="24" class="main-info-wrap">

                    <img src="../../../assets/img/data.png" alt />
                    <div class="txt">暂无数据...</div>
                  </el-col>
                </el-card>
              </el-row>
            </el-col>
            <el-col :span="9" style="padding-left: 10px;">
              <el-card class="box-card" :body-style="{ padding: '0 0 0 20px'}">
                <span class="title-line-bottom">矿池分配</span>
                <el-col :span="24" class="main-info-wrap">
                  <img src="../../../assets/img/data.png" alt />
                  <div class="txt">暂无数据...</div>
                </el-col>
              </el-card>
            </el-col>
          </el-row>

          <el-row class="marginTop">
            <el-card class="box-card" :body-style="{ padding: '0 0 0 20px'}">
              <span class="title-line-bottom bottomItem">每单产出</span>
                <el-tabs v-model="activeName">
                  <el-tab-pane label="全部订单状态" name="first">
                    <OrderOutput></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="待运行" name="second">
                    <OrderOutput></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="运行中" name="third">
                    <OrderOutput></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="已结束" name="fourth">
                    <OrderOutput></OrderOutput>
                  </el-tab-pane>
                </el-tabs>
            </el-card>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { upload, updateheadimage } from '/api/index'
  import YShelf from '/components/shelf'
  import OrderOutput from '/common/OrderOutput'
  import vueCropper from 'vue-cropper'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        imgSrc: '',
        editAvatarShow: false,
        cropContext: '',
        cropperImg: '',
        previews: {},
        option: {
          img: '',
          zoom: 0
        },
        fixedNumber: [1, 1],
        example2: {
          info: true,
          size: 1,
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true
        },
        activeIndex: 1,
        tabPosition: 1,
        order: [1, 2, 3, 4],
        activeName: 'first'
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      tab (e) {
        this.$router.push({path: '/user/dailyOutput'})
      },
      upimg (e) {
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.option.img = e.target.result
        }
      },
      cropper () {
        if (this.option.img) {
          this.$refs.cropper.getCropData((data) => {
            this.imgSrc = data
            upload({imgData: data}).then(res => {
              if (res.status === '0') {
                let path = res.result.path
                updateheadimage({imageSrc: path}).then(res1 => {
                  if (res1.status === '0') {
                    let info = this.userInfo
                    info.avatar = path
                    this.RECORD_USERINFO({info: info})
                    alert('更换成功')
                    this.editAvatarShow = false
                  }
                })
              }
            })
          })
        } else {
          alert('别玩我啊 先选照骗')
        }
      },
      editAvatar () {
        this.editAvatarShow = true
      },
      realTime (data) {
        this.previews = data
        let w = 100 / data.w
        this.option.zoom = w
      }
    },
    components: {
      YButton,
      YShelf,
      vueCropper,
      OrderOutput
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .avatar-box {
    height: 124px;
    display: flex;
    margin: 0 30px 30px;
    border-bottom: #dadada solid 1px;
    line-height: 30px;
    display: flex;
    align-items: center;
    .img-box {
      @include wh(80px);
      border-radius: 5px;
      overflow: hidden;
    }
    img {
      display: block;
      @include wh(100%)
    }
    .r-box {
      margin-left: 20px;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
    }
  }

  // 修改头像
  .edit-avatar {
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include wh(100%);
    background-color: rgba(0, 0, 0, .5);
    @extend %block-center;
    .content {
      display: flex;
      padding: 45px 100px 0;
    }
    > div {
      box-sizing: content-box;
      @include wh(700px, 500px);
      margin: 0;
    }
    .btn {
      width: 80px;
      height: 30px;
      margin-left: 10px;
      position: relative;
      text-align: center;
      line-height: 30px;
      text-shadow: rgba(255, 255, 255, .496094) 0 1px 0;
      border: 1px solid #E6E6E6;
      border-radius: 10px;
      &:hover {
      }
      a {
        color: #666;
        display: block;
        @include wh(100%);
      }
    }
    input[type=file] {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      opacity: 0;
      width: 80px;
      height: 30px;
      cursor: pointer;
      box-sizing: border-box;
      border: 15px solid #000;
      overflow: hidden;
    }
    .edit-l {
      width: 100px;
      text-align: center;
    }
    .edit-r {
      margin-left: 20px;
      flex: 1;
      > div {
        border: 1px solid #ccc;
        width: 320px;
        height: 320px;
      }
    }
  }

  .image-container {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    padding: 0 10px;
    @extend %block-center;
    &:hover {
      svg {
        transition: all 1s;
        transform: rotate(360deg);
        transform-origin: 50% 50%;
      }
      path {
        fill: #8a8a8a;
      }
    }
  }

  .big {
    display: block;
    width: 320px;
    height: 320px;
  }

  .bootom-btn {
    padding: 0 15px;
    border-top: 1px solid #E6E6E6;
    bottom: 0;
    height: 60px;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /*内容开始*/
  .ControlPanel {

  }

  .icon {
    width: 60px;
    height: 60px;
    background-color: rgba(255, 152, 0, 0.1);
    border-radius: 50%;
    box-sizing: border-box;
    margin: 52px 0 0 40px;
    padding-top: 18px;
    text-align: center;
  }
  .icon-btc- {
    position: absolute;
    left: 12px;
    font-size: 45px;
    border-radius: 50%;
    color: rgb(255, 157, 50);
    transform: rotate(20deg);
  }
  .icon-shandian,
  .icon-qiandai {
    color: rgb(255, 152, 0);
    font-size: 20px;
  }
  .total-title {
    font-size: 14px;
    color: #999;
    margin-top: 30px;
  }
  .total-rate {
    margin-bottom: 20px;
    font-size: 25px;
    color: #1c1f28;
    margin: 15px 0;
  }
  .rate-title {
    font-size: 50px;
  }
  .rate-btn,
  .orders-box-btn {
    display: block;
    color: #409EFF;
    border: 1px solid #409EFF;
    background-color: #fff;
    text-align: center;
    width: 120px;
    height: 34px;
    border-radius: 4px;
    line-height: 34px;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
  }

  .rate-btn:hover {
    background-color: rgb(92, 130, 255);
    color: #fff;
  }

  .total-revenue {
    font-size: 50px;
    color: #1c1f28;
    margin: 15px 0;
  }

  .total-content {
    font-size: 25px;
  }
  .total-detail {
    padding-top: 14px;
    border-top: 1px solid #e8e8e8;
    color: #999;
    color: #3c4156;
    font-size: 20px;
    margin-bottom: 30px;
  }
  .total-wrap {
    position: relative;
  }
  .el-icon-info {
    margin-left: 10px;
    color: rgb(197, 199, 205);
  }
  .share {
    width: 20px;
    height: 20px;
    background-color: rgb(197, 199, 205);
    border-radius: 50%;
    position: absolute;
    right: 25px;
    top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .el-icon-share {
    font-size: 10px;
    color: #fff;
  }
  .header-title {
    width: 238px;
    height: 60px;
    padding-left: 74px;
    border-bottom: 3px solid #409EFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header-title:hover {
    background-color: #fff;
  }
  .name {
    font-size: 20px;
    font-weight: 700;
  }
  .plan-num {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }

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
  .more:visited {
    color: #409EFF;
  }
  .marginTop {
    margin-top: 20px;
  }
  .main-info-wrap {
    min-height: 313px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #e8e8e8;
  }
  .txt {
    margin-top: 15px;
    font-size: 20px;
    color: #999;
    text-align: center;
  }
  .orderForm {
    line-height: 58px;
    text-align: right;
    padding-right: 20px;
  }
  .orders-table {
    text-align: center;
    border-top: 1px solid #e8e8e8;
  }
  .orders-table-title {
    font-size: 14px;
    color: #3c4156;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .residue-day {
    color: #9b9b9b;
  }
  .orders-box-content {
    min-height: 313px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .orders-box-btn {
    width: 200px;
    margin-top: 20px;
  }
  .orders-box-btn:hover {
    background-color: #409EFF;
    color: #fff;
  }
  .bottomItem{
    right: 20px;
    height: 40px;
    line-height: 40px;
    padding: 0px;
    position: absolute;
    top: 0px;
  }
</style>
