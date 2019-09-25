<template>
  <div style="margin:20px auto">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in grandson[flag]" :key="index">
        <div class="secondTeam">
          <div class="team1Title">{{item.identity===1?'普通用户':'雷猫合伙人'}}</div>
          <el-row style="padding-top: 19px;">
            <el-col :span="15" class="teamLeft">
              <div class="userName">用户名:{{item.nickname}}</div>
              <div>累计贡献值:{{item.results==null?0:item.results}}</div>
            </el-col>
            <el-col :span="9" style="text-align: center;margin-top: -1px">
              <el-image
                style="width: 43px; height: 43px"
                :src=item.qrcode
                fit="fill"></el-image>
            </el-col>
          </el-row>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
  export default {
    props: [
      'flag',
      'number',
      'grandson'
    ],
    data () {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        secondList: [[
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }, {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }, {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }, {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ], [
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ], [
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          },
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ], [
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ], [
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          },
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ], [
          {
            title: '普通用户',
            userName: '叫我大王',
            contribution: '12451',
            url: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
          }
        ]],
        hackReset: false
      }
    },
    methods: {
      detectInfo (index, row) {
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      }
    }
  }
</script>
<style>
  .userName{
    padding-bottom: 8px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 135px;
  }
  .swiper-slide {
    width: 60%;
  }
  .swiper-slide:nth-child(2n) {
    width: 40%;
  }
  .swiper-slide:nth-child(3n) {
    width: 20%;
  }
  .secondTeam{
    width: 257px;
    height: 142px;
    background-image: url("../../static/images/team2.png");
    border-radius:10px;
    background-size: 100% 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .team1Title{
    text-align:center;
    font-size:19px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    padding-top: 42px;
  }
  .teamLeft{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    padding-left: 25px
  }
</style>

