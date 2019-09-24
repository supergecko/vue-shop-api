<template>
  <div class="news">
    <div class="head">
      <div>
        <div class="title-wrap">
          <el-breadcrumb class="nav"
                         separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>新闻</el-breadcrumb-item>
          </el-breadcrumb>
          <p class="head-title hand">新闻报道</p>
          <p class="head-describe">
            <span>对于我们的读者，请在下面查阅媒体关于雷猫矿机最新的文章报道</span>
            <br />
            <span>对于资讯媒体，请通过lintingxin@linglu666.cn联系我们</span>
          </p>
        </div>
      </div>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="main">
          <ul class="ul">
            <li class="li hand"
                v-for="(item,index) in newsList"
                :key="index"
                @click="toPath(index)">
              <div class="img">
                <img width="250"
                     :src="item.thumb"
                     alt />
              </div>
              <div class="content">
                <p class="content-title">{{ item.title }}</p>
                <p class="content-main">{{ item.description }}</p>
                <p class="address">
                  <span>{{ item.author }}</span>&nbsp;
                  <span>{{ item.publish_time }}</span>
                </p>
              </div>
            </li>
            <li class="load"
                v-show="isLoad">
              <div class="load-more">
                <button class="btn"
                        @click="load()">
                  <span>加载更多</span>
                  <span class="iconfont icon-xiajiantou"></span>
                </button>
              </div>
            </li>
            <li class="none"
                v-show="!isLoad">
              <p>(o≖◡≖) 我是可是一个有底线的小可爱 ！！！</p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { newsLlist } from '/api/index'

export default {
  name: 'news',
  data: function () {
    return {
      showTotal: 4,
      newsList: [],
      isLoad: true,
      params: {
        page: 1
      }
    }
  },
  created () {
    newsLlist(this.params)
      .then(res => {
        this.newsList = res.data.data
      })
  },
  methods: {
    load () {
      this.params.page = ++this.params.page
      newsLlist(this.params)
        .then(res => {
          this.newsList = this.newsList.concat(res.data.data)
          if (res.data.data.length < 20) {
            this.isLoad = false
          }
        })
    },
    toPath (index) {
      this.$router.push({
        path: '/newDetails',
        query: {
          id: this.newsList[index].article_id
        }
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.news {
  background-color: rgb(239, 242, 245);
  min-width: 1200px;
}
.head {
  min-width: 1200px;
  background-color: #fff;
  padding: 20px 0 20px;
  text-align: center;
}
.head-title {
  /* min-width: 1200px; */
  font-size: 20px;
  color: #2a2d3a;
  padding-bottom: 16px;
  font-weight: 700;
  text-align: center;
}
.head-describe {
  font-size: 16px;
  color: #999;
}

.main {
  background-color: rgba(0, 0, 0, 0);
  padding: 20px 0;
  box-sizing: border-box;
}
.ul {
  list-style: none;
}
.li {
  width: 1200px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  list-style: none;
  overflow: hidden;
  padding: 22px 20px;
  border-bottom: 1px solid #f7f7f7;
  box-sizing: border-box;
}
.img {
  width: 320px;
  height: 207px;
  overflow: hidden;
}
.content {
  /* float: left; */
  width: 100%;
  padding: 10px 0 10px 20px;
  position: relative;
}
.content-title {
  font-size: 24px;
  color: #2a2d3a;
  line-height: 1.3;
}
.li:hover .content-title {
  color: rgb(6, 99, 222);
}
.content-main {
  height: 58px;
  padding-top: 12px;
  color: #666;
  padding-top: 12px;
  line-height: 1.4;
  box-sizing: border-box;
  overflow: hidden;
}
.address {
  font-size: 14px;
  color: #999;
  position: absolute;
  bottom: 10px;
}
.address span {
  display: inline-block;
  width: 100%;
}
.load {
  text-align: center;
  list-style: none;
}
.load-more {
  padding: 30px 0;
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
}
.btn {
  color: #a4a4a4;
  background-color: #eff2f5;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin: 0 auto;
}
.none {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 15px 0;
  background: rgb(220, 220, 220);
}
span {
  cursor: pointer;
}
.hand {
  cursor: pointer;
}
.title-wrap {
  width: 1200px;
  margin: 0 auto;
}
</style>
