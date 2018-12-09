<template>
  <div class="page">
    <div class="page-links">
      <h1>友链</h1>
      <div class="show" @click="isShow">Show Me</div>
      <ul class="links">
        <li :key="index" v-for="(link, index) in linksMsg" class="link">
          <div class="link-img"><img :src="link.head" alt=""></div>
          <div class="link-msg">
            <h4>{{link.nickName}}</h4>
            <p class="information">{{link.information}}</p>
            <p>
              <a :href="link.github" target="_blank">GitHub</a>
              <a :href="link.web" target="_blank">个人网站</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'links',
  data () {
    return {
      linksMsg: Object // 页面信息
    }
  },
  computed: {
    // 用户信息
    user () {
      return this.$store.state.accountMsg
    }
  },
  methods: {
    getLinks () {
      this.$axios.get('/api/users/links/getLinks')
        .then((res) => {
          this.linksMsg = res.data
        })
    },
    isShow () {
      this.$popup('是否进行PY交易', this.show)
    },
    show () {
      this.$axios.post('api/users/links/show', {account: this.user.account})
        .then(() => {
          // 空白跳转实现刷新组件
          this.$router.replace({
            name: 'empty',
            query: {name: 'links'}
          })
        })
    }
  },
  mounted () {
    this.getLinks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page{
  position: relative;
  .page-links{
    max-width: 1024px;
    position: absolute;
    margin: 20px auto;
    padding: 20px;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
    border-radius: 10px;
    h1{
      margin-top: 20px;
      color: #9287e7;
      text-align: center;
    }
    .show{
      width: 80px;
      height: 30px;
      line-height: 30px;
      margin: auto;
      margin-top: 20px;
      text-align: center;
      border: 1px solid gray;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        background-color: gray;
        color: white;
      }
    }
    .links{
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;
      .link{
        display: flex;
        width: 450px;
        height: 100px;
        box-shadow: 2px 2px 10px 2px gray;
        border-radius: 5px;
        margin: 10px;
        transition: transform .5s;
        &:hover{
          transform: scale(1.05);
        }
        .link-img{
          position: relative;
          margin: 10px;
          width: 80px;
          height: 80px;
          border-radius: 5px;
          overflow: hidden;
          img{
            max-width: 80px;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
          }
        }
        .link-msg{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p{
            a{
              margin-right: 50px;
              color: #60acfc;
              text-decoration: none;
              &:hover{
                color: #ff7c7c;
              }
            }
          }
          .information{
            width: 350px;
            height: 40px;
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }
}
</style>
