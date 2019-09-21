<template>
  <div class="newDetail">
    <div class="wrap">
      <el-breadcrumb class="nav"
                     separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news' }">新闻</el-breadcrumb-item>
        <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="header">
        <div class="title">
          <h1 class="h1">{{ this.new.title }}</h1>
        </div>
        <p class="info">
          <span>{{ this.new.publish_time }}</span>
          <span>来源：{{ this.new.author }}</span>
        </p>
      </div>

      <div class="content">
        <div class="des">{{ this.new.description }}</div>
        <div class="c-content"
             v-html='content'
             v-if="this.new.content">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newsDetails } from '/api/index'

export default {
  name: 'newDetail',
  data: function () {
    return {
      new: {}
    }
  },
  created () {
    let id = this.$route.query.id
    let params = {
      article_id: id
    }

    // axios.get('http://www.dterdal.com/home/article/detail',
    //   { params: {
    //     article_id: id
    //   } }).then(res => {
    //   this.new = res.data.data
    //   console.log(this.new)
    // })
    newsDetails(params)
      .then(res => {
        this.new = res.data.data
      })
  },
  methods: {},
  computed: {
    content () {
      var str = this.new.content
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    }
  }
}
</script>

<style scoped>
.newDetail {
  background-color: #eff2f5;
  padding: 20px 0;
}
.wrap {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px 20px;
  box-sizing: border-box;
}
.h1 {
  font-size: 30px;
  color: rgb(42, 45, 58);
  line-height: 1.3;
  font-weight: 500;
}
.info {
  border-bottom: 1px solid rgb(247, 247, 247);
}
.info span {
  display: inline-block;
  margin-right: 60px;
  font-size: 14px;
  color: #999;
  padding: 25px 0 15px;
}
.des {
  background-color: rgb(250, 250, 250);
  color: rgb(42, 45, 58);
  margin: 15px 0px 20px;
  padding: 30px 20px;
}
.c-content {
  font-size: 16px;
  color: #666;
}
.nav {
  margin-bottom: 30px;
}
img {
  width: 320px;
}
</style>