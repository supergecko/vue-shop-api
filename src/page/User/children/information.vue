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
              <div class="plan-num">{{num}}个套餐正在挖矿</div>
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
                      <span class="rate-title">{{hashrate_balance.hashrate}}</span>
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
                      <span>{{hashrate_balance.balance}}</span>
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
<!--                  <el-col :span="12" class="more-wrap">-->
<!--                    <span>最近14天</span>&nbsp;-->
<!--                    <a style="color:#409EFF" @click="tab()">更多></a>-->
<!--                  </el-col>-->
                  <el-col :span="24" class="main-info-wrap">
                    <DailyOutput :dailyOutput=day_balance v-if="day_balance.length===0"></DailyOutput>
                    <el-row v-else>
                      <img src="../../../assets/img/data.png" alt />
                      <div class="txt">暂无数据...</div>
                    </el-row>
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
                    <OrderOutput :orderDataList=all_order></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="待运行" name="second">
                    <OrderOutput :orderDataList=init_order></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="运行中" name="third">
                    <OrderOutput :orderDataList=doing_order></OrderOutput>
                  </el-tab-pane>
                  <el-tab-pane label="已结束" name="fourth">
                    <OrderOutput :orderDataList=end_order></OrderOutput>
                  </el-tab-pane>
                </el-tabs>
            </el-card>
          </el-row>
        </el-main>
      </el-container>
    </div>

    <el-dialog title="绑定矿池" :visible.sync="dialogFormVisible" style="width:50%;margin: 0 auto;text-align: center ">
      <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
        <!--鱼池名称-->
        <el-form-item label="鱼池名称" prop="poolName" :label-width="formLabelWidth">
          <el-select v-model="form.poolName" placeholder="请选择活动区域" style="width: 100%;">
            <el-option :label=item.description :value=item.mine_id v-for="(item, i) in mine" :key="i">
            </el-option>
          </el-select>
        </el-form-item>
        <!--矿池账号-->
        <el-form-item label="矿池账号" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="poolId">
          <el-input v-model="form.poolId" style="width: 100%"></el-input>
        </el-form-item>
        <!-- 矿池密码-->
        <el-form-item label="矿池密码" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="poolPassword">
          <el-input v-model="form.poolPassword" style="width: 100%" show-password></el-input>
        </el-form-item>
        <!--用户名-->
        <el-form-item label="用 户 名" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="poolUserName">
          <el-input v-model="form.poolUserName" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="formCheckIn('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { controlPanel, isBindMine, bindMine } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'
  import YShelf from '/components/shelf'
  import OrderOutput from '/common/OrderOutput'
  import DailyOutput from '/common/dailyOutput'
  import vueCropper from 'vue-cropper'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        imgSrc: '',
        editAvatarShow: false,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        mine: [],
        form: {
          poolName: '', // 矿池名称
          poolId: '', // 矿池账号
          poolPassword: '', // 矿池密码
          poolUserName: '' // 用户名
        },
        formRules: {
          // 矿池名称校验
          poolName: [
            {required: true, message: '请输入矿池名称', trigger: 'change'}
          ],
          // 矿池账号校验
          poolId: [
            {required: true, message: '请输入矿池账号', trigger: 'blur'}
          ],
          // 矿池密码校验
          poolPassword: [
            {required: true, message: '请输入矿池密码', trigger: 'blur'}
          ],
          // 用户名校验
          poolUserName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
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
        activeName: 'first',
        num: 0, // 套餐数量
        hashrate_balance: {}, // 总算力和总产出数组
        all_order: [], // 全部订单
        init_order: [], // 待运行
        doing_order: [], // 运行中
        end_order: [], // 已结束
        day_balance: [] // 每日产出
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      // 是否绑定矿池
      _isBindMine () {
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        isBindMine(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            if (res.data.data.bind_status === 0) {
              this.dialogFormVisible = true
              this.mine = res.data.data.mine
            } else {
              this.dialogFormVisible = false
            }
          } else {
            this.$message.error('获取失败')
          }
        })
      },
      // 矿池绑定
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { poolUserName, poolName, poolId, poolPassword } = this.form
            const user_id = getItem('userID')
            const username = poolUserName
            const mine_id = poolName
            const account = poolId
            const password = poolPassword
            const timestamp = Date.parse(new Date()) / 1000
            const sign = this.$md5(`${user_id}__${account}__${password}__${username}__${mine_id}__${timestamp}__thundercat`)
            let params = {user_id, account, password, timestamp, username, mine_id, sign}
            bindMine(params).then(res => {
              console.log(res.data.data)
              if (res.status === 200 && res.data.code === 1) {
                console.log('矿池绑定成功')
              } else {
                this.$message.error('获取失败')
              }
            })
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      _controlPanel () {
        const loading = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const coin_id = 1
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${coin_id}__${timestamp}__thundercat`)
        let params = {user_id, coin_id, timestamp, sign}
        controlPanel(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            console.log(`控制面${JSON.stringify(res.data.data)}`)
            this.num = res.data.data.num === null ? 0 : res.data.data.num
            this.hashrate_balance = res.data.data.hashrate_balance
            this.all_order = res.data.data.all_order
            this.init_order = res.data.data.init_order
            this.doing_order = res.data.data.doing_order
            this.end_order = res.data.data.end_order
            this.day_balance = res.data.data.day_balance
          } else {
            this.$message.error('网络赛车啦')
          }
        })
      },
      tab (e) {
        this.$router.push({path: '/user/dailyOutput'})
      },
      editAvatar () {
        this.editAvatarShow = true
      }
    },
    created () {
      this._isBindMine()
      this._controlPanel()
    },
    components: {
      YButton,
      YShelf,
      vueCropper,
      OrderOutput,
      DailyOutput
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
