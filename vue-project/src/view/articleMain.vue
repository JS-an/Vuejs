<template>
  <div class="article">
    <div class="article-main">
      <h1 class="article-title">
        <div class="back-prev-page" @click="backPrevPage"><img src="/static/icon/return.png" alt=""></div>
        {{content.title}}
        <hr>
      </h1>
      <div v-html="toHtml" class="article-html"></div>
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
      box-shadow: 0 0 30px 5px gray;
      background-color: #e7e7e7;
      border-radius: 6px;
      word-wrap: break-word;
      .article-title{
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #e7e7e7;
        font-size: 26px;
        text-align: center;
        .back-prev-page{
          font-size: 0;
          margin: 5px;
          position: absolute;
          text-align: center;
          cursor: pointer;
          img{
            &:hover{
              transform: scale(1.2);
          }
          }
        }
        hr{
          margin: 5px;
          border-color: gray;
        }
      }
      .article-html{
        padding: 10px;
      }
    }
  }
</style>
