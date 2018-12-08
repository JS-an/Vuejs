<template>
  <div class="article">
    <div class="article-list">
      <ul>
        <li v-for="(article, i) in list" :key="article._id" :class="{articleitem: 'articleitem', articleshow: show === i}" @click="checkArticle(article, i)">
          <h2>{{article.title}}</h2>
          <p>创建时间：{{article.createTime}}</p>
          <p>更新时间：{{article.updateTime}}</p>
        </li>
      </ul>
    </div>
    <div class="article-main">
      <div class="main-up">
        <div class="new-article" @click="popup">写新文章</div>
        <input ref="articleTitle" type="text" v-model="title" placeholder="标题">
      </div>
      <div class="main-down">
        <textarea ref="articleMain" v-model="content" placeholder="写点什么(markdown语法)"></textarea>
        <div v-html="markedToHTML" class="marked-hljs"></div>
      </div>
      <btn></btn>
    </div>
  </div>
</template>

<script>
import md from '../../assets/markdown.js'

export default {
  name: 'admin-article',
  data () {
    return {
      list: [],
      checkId: 0,
      show: -1,
      title: '',
      content: ''
    }
  },
  computed: {
    // 监听文章内容变化
    markedToHTML () {
      return md(this.content)
    }
  },
  methods: {
    // 获取页面数据
    getArticleList () {
      this.$axios.get('/api/users/article')
        .then((res) => {
          this.list = res.data.article.map((obj) => obj)
        })
    },
    // markdown获取内容
    updataMarked (e) {
      this.content = e.target.value
    },
    // 选中获取文章与展示内容
    checkArticle (article, i) {
      this.show = i
      this.checkId = article._id
      this.title = article.title
      this.content = article.main
    },
    // 遮罩层事件
    popup () {
      this.$popup('确认写新文章吗？', this.newArticle)
    },
    // 取消选中，返回空白页面
    newArticle () {
      this.show = -1
      this.checkId = ''
      this.title = ''
      this.content = ''
    }
  },
  mounted () {
    this.getArticleList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.article{
  height: 100%;
  display: flex;
  .article-list{
    width: 200px;
    margin-left: 4px;
    overflow: auto;
    .articleitem{
      height: 200px;
      border: 1px solid rgba(128, 128, 128, 0.5);
      border-radius: 4px;
      margin-top: 4px;
      word-wrap: break-word;
      h2{
        height: 160px;
        font-size: 16px;
      }
      p{
        font-size: 10px;
        height: 20px;
        line-height: 20px;
      }
    }
    .articleshow{
      background-color: rgba(128, 128, 128, 0.3);
    }
  }
  .article-main{
    flex: 1;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .main-up{
      position: relative;
      height: 40px;
      .new-article{
        position: absolute;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        border: 1px solid gray;
        border-radius: 15px;
        margin: 5px 0 0 30px;
        cursor: pointer;
        &:hover{
          background-color: grey;
          color: white;
        }
      }
      input{
        position: absolute;
        width: 300px;
        height: 30px;
        border: none;
        outline: none;
        border-bottom: 1px solid gray;
        margin: 5px 0 0 120px;
      }
    }
    .main-down{
      flex: 1;
      display: flex;
      justify-content: space-around;
      textarea{
        padding: 10px;
        width: 49%;
        outline: none;
        resize: none;
      }
      .marked-hljs{
        padding: 10px;
        width: 49%;
        border: 1px dashed gray;
        overflow: auto;
      }
    }
  }
}
</style>
