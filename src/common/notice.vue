<template>
  <div class="vueBox">
    <div class="marquee">
      <div class="marquee_title">
        <span>最新新闻</span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list"
            :class="{marquee_top:animate}">
          <li v-for="(item, index) in marqueeList"
              @click="toPath(index)">
            <span>{{item.title}}</span>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { marquee } from '/api/index'

export default {
  data () {
    return {
      animate: false,
      marqueeList: [
        {
          name: '1军',
          city: '北京',
          amount: '10'
        },
        {
          name: '2军',
          city: '上海',
          amount: '20'
        },
        {
          name: '3军',
          city: '广州',
          amount: '30'
        },
        {
          name: '4军',
          city: '重庆',
          amount: '40'
        }
      ]
    }
  },
  created: function () {
    setInterval(this.showMarquee, 2000)
    this.getDate()
  },
  methods: {
    showMarquee: function () {
      this.animate = true
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0])
        this.marqueeList.shift()
        this.animate = false
      }, 500)
    },
    getDate () {
      marquee()
        .then(res => {
          this.marqueeList = res.data.data
        })
    },
    toPath (index) {
      this.$router.push({
        path: '/newDetails',
        query: {
          id: this.marqueeList[index].article_id
        }
      })
    }
  }
}
</script>

<style scoped>
div,
ul,
li,
span,
img {
  margin: 0;
  padding: 0;
  display: flex;
  box-sizing: border-box;
}
.marquee {
  width: 1220px;
  align-items: center;
  color: black;
  background: #262a37;
  display: flex;
  box-sizing: border-box;
}

.marquee_title {
  height: 30px;
  font-size: 14px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
  color: hsla(0, 0%, 100%, 0.6);
  cursor: pointer;
  padding-left: 0px;
  padding-right: 20px;
}

.marquee_box {
  display: block;
  position: relative;
  width: 60%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;
  color: hsla(0, 0%, 100%, 0.6);
  cursor: pointer;
}

.marquee_list li span {
  padding: 0 2px;
}

.red {
  color: #ff0101;
}
</style>
