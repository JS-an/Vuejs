<template>
  <div class="article">
    <div class="article-main">
      <div class="back-prev-page" @click="backPrevPage"><img src="/static/icon/return.png" alt=""></div>
      <h1 class="article-title">{{content.title}}</h1>
      <hr>
      <div v-html="toHtml"></div>
    </div>
  </div>
</template>

<script>
import md from '../assets/markdown.js'

export default {
  data () {
    return {
      content: 'Nothing'
    }
  },
  computed: {
    toHtml () {
      return md(this.content.main || this.content)
    }
  },
  methods: {
    getArticle () {
      this.$axios.get('/api/users/article/' + this.$route.params.id)
        .then(res => {
          this.content = res.data
        })
    },
    backPrevPage () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
  .article{
    position: relative;
    .article-main{
      max-width: 768px;
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      margin: auto;
      padding: 10px;
      border: 1px solid black;
      border-radius: 6px;
      word-wrap: break-word;
      .back-prev-page{
        width: 30px;
        height: 60px;
        position: fixed;
        transform: translateX(-41px);
        background-color: #e7e7e7;
        border-radius: 60px 0 0 60px;
        text-align: center;
        padding: 18px 0 0 4px;
        cursor: pointer;
        &:hover{
          background-color: rgb(162, 221, 177);
        }
      }
      .article-title{
        text-align: center;
        margin: 10px;
      }
    }
  }
</style>
