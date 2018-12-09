<template>
  <div class="article">
    <div class="article-main">
      <h1>全部文章</h1>
      <div class="article-search">
        <input ref="searchText" type="text" placeholder="search" @keydown.enter="searchArticleList">
      </div>
      <ul>
        <li :key="item._id" v-for="item in list" >
          <router-link tag="h2" :to="{name: 'articleMain', params: {id: item._id}}">{{item.title}}</router-link>
          <div class="img">
            <img :src="item.cover" alt="">
          </div>
          <div class="time">
            <p>创建时间：{{item.createTime}}</p>
            <p>更新时间：{{item.updateTime}}</p>
          </div>
        </li>
      </ul>
      <div class="article-page">
        <button @click="prevPage" :class="{disabled: isprev}" :disabled="isprev">prev</button>
        {{page}} / {{totalPage}}
        <button @click="nextPage" :class="{disabled: isnext}" :disabled="isnext">next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'acticle',
  data () {
    return {
      list: [],
      page: Number.parseInt(this.$route.query.page) || 1,
      totalPage: undefined,
      isTotal: undefined,
      q: '',
      isprev: false,
      isnext: false
    }
  },
  // watch: {
  // 该监测方法用 beforeRouteUpdate 代替
  //   '$route': function () {
  //     this.getArticleList()
  //   }
  // },
  methods: {
    // 得到文章列表
    getArticleList () {
      this.$axios.get('/api/users/article?q=' + this.q + '&page=' + this.page)
        .then((res) => {
          this.isTotal = Math.ceil(res.data.count / 5)
          if (this.totalPage !== this.isTotal) {
            this.totalPage = this.isTotal
            this.isDisabled()
          }
          this.list = res.data.article
        })
    },
    searchArticleList () {
      this.q = this.$refs.searchText.value
      this.page = 1
      this.isDisabled()
      this.getArticleList()
    },
    // 上一页
    prevPage () {
      this.page -= 1
      this.$router.push({
        name: 'article',
        query: {
          q: this.q,
          page: this.page
        }
      })
      this.isDisabled()
    },
    // 下一页
    nextPage () {
      this.page += 1
      this.$router.push({
        name: 'article',
        query: {
          q: this.q,
          page: this.page
        }
      })
      this.isDisabled()
    },
    // 文章导航键返回首页
    firstPage () {
      this.q = ''
      this.page = 1
      this.isDisabled()
    },
    // 判断页数变化时按钮状态
    isDisabled () {
      if (this.page > 1 && this.page < this.totalPage) {
        this.isprev = false
        this.isnext = false
      } else if (this.page === 1 && (this.page === this.totalPage || this.totalPage === 0)) {
        this.isprev = true
        this.isnext = true
      } else if (this.page === 1) {
        this.isprev = true
        this.isnext = false
      } else if (this.page === this.totalPage) {
        this.isprev = false
        this.isnext = true
      } else {
        this.page = 1
        this.isprev = true
        this.isnext = false
      }
    }
  },
  mounted () {
    this.getArticleList()
  },
  beforeRouteUpdate (to, from, next) {
    Object.keys(to.query).length === 0 && this.firstPage() // 返回首页
    this.getArticleList()
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.article{
  position: relative;
  .article-main{
    max-width: 768px;
    position: absolute;
    margin: 20px auto;
    padding: 0 20px;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
    border-radius: 10px;
    h1{
      text-align: center;
      margin: 40px 0;
    }
    .article-search{
      text-align: center;
      input{
      font-size: 16px;
      padding: 4px 10px;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
      background-color: #f7f7f7;
      }
    }
    ul{
      list-style: none;
      margin-bottom: 40px;
      li{
        height: 400px;
        margin-top: 20px;
        padding: 6px;
        background-color: white;
        border: 1px solid #e1e1e1;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h2{
          text-align: center;
          cursor: pointer;
          transition: all .2s;
          &:hover{
            color: #60acfc;
          }
        }
        .img{
          height: 300px;
          overflow: hidden;
          img{
            width: 100%;
            transition: all 1s;
            &:hover{
              transform: translateY(calc(300px - 100%));
            }
          }
        }
        .time{
          font-size: 12px;
        }
      }
    }
    .article-page{
      font-size: 20px;
      margin-bottom: 40px;
      text-align: center;
      button{
        width: 40px;
        font-size: 20px;
        cursor: pointer;
        border: none;
        background: none;
        margin: 0 20px;
        &:hover{
          color: red;
        }
      }
      .disabled{
        cursor: not-allowed;
        opacity: .5;
        &:hover{
          color: black;
        }
      }
    }
  }
}
</style>
