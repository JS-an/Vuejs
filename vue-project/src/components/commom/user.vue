<template>
  <div class="user">
    <div class="user-img" @click="show = !show">
      <img src="/static/icon/up.png" alt="icon">
    </div>
    <ul v-show="show" class="user-handle">
      <li v-if="!accountMsg" @click="toSign">登录 / 注册</li>
      <li v-if="accountMsg" @click="toAccount">个人中心</li>
      <li v-if="accountMsg" @click="exit">用户注销</li>
    </ul>
    <div class="user-name">
      {{accountMsg.account}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      show: false
    }
  },
  computed: {
    accountMsg () {
      return this.$store.state.accountMsg
    }
  },
  methods: {
    toSign () {
      this.$router.push({
        name: 'sign'
      })
    },
    toAccount () {
      this.$router.push({
        name: 'account'
      })
    },
    exit () {
      this.$axios.post('/api/users/user/exit', {account: this.accountMsg.account})
        .then((res) => {
          this.$store.state.accountMsg = Object
          alert(res.data)
          this.$router.go(0)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  .user-img{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: white;
    border-radius: 40px;
    cursor: pointer;
    overflow: hidden;
    &:hover{
      box-shadow: 0 0 40px 4px lightblue;
    }
    img{
      max-height: 80px;
      max-width: 80px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }
  .user-handle{
    position: absolute;
    top: 0;
    left: calc(50% + 44px);
    bottom: 0;
    right: 0;
    margin: auto;
    list-style: none;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li{
      width: 62px;
      margin: 5px 0;
      color: white;
      cursor: pointer;
      &:hover{
        color: red;
      }
    }
  }
  .user-name{
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
}
</style>
