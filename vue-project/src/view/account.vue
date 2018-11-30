<template>
  <div class="box">
    <div class="page">
      <div class="page-msg">
        <h2>个人信息</h2>
        <div>
          <label for="account">账号：</label>
          <input type="text" id="account" disabled v-model="accountMsg.account">
        </div>
        <div>
          <label for="github">GitHub：</label>
          <input type="text" id="github" v-model="accountMsg.github">
        </div>
        <div>
          <label for="web">个人网站：</label>
          <input type="text" id="web" v-model="accountMsg.web">
        </div>
        <div>
          <label></label>
          <input class="btn" type="button" value="保存修改" @click="isUpdateUser">
        </div>
      </div>
      <div class="page-psw">
        <h2>修改密码</h2>
        <div>
          <label for="oldpsw">原密码：</label>
          <input type="password" id="oldpsw" v-model="oldpsw">
        </div>
        <div>
          <label for="newpsw">新密码：</label>
          <input type="password" id="newpsw" v-model="newpsw">
        </div>
        <div>
          <label for="againpsw">确认密码：</label>
          <input type="password" id="againpsw" v-model="againpsw">
        </div>
        <div>
          <label></label>
          <input class="btn" type="button" value="修改密码" @click="isUpdatePassword">
        </div>
      </div>
      <div class="page-img">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      accountMsg: Object,
      oldpsw: '',
      newpsw: '',
      againpsw: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.accountMsg
    }
  },
  // 刷新页面时监控user，值存在时才获取
  watch: {
    user: function () {
      this.getUser()
    }
  },
  methods: {
    // 得到用户信息
    getUser () {
      this.$axios.get('/api/users/user/account?account=' + this.user.account)
        .then((res) => {
          this.accountMsg = res.data
        })
    },
    // 更新用户信息
    updateUser () {
      this.$axios.post('/api/users/user/update', this.accountMsg)
        .then((res) => {
          if (!res.data) {
            this.$router.push({
              name: 'sign'
            })
          } else {
            alert('更新成功')
          }
        })
    },
    updatePassword () {
      this.$axios.post('/api/users/user/updatePassword', {account: this.accountMsg.account, oldpsw: this.oldpsw, newpsw: this.newpsw})
        .then((res) => {
          if (res.data === false) {
            this.$router.push({
              name: 'sign'
            })
          } else if (res.data === 1) {
            alert('原密码错误')
          } else {
            alert('更新成功')
          }
        })
    },
    isUpdateUser () {
      this.$popup('是否修改个人信息', this.updateUser)
    },
    isUpdatePassword () {
      if (this.newpsw === this.againpsw) {
        this.$popup('是否修改密码', this.updatePassword)
      } else {
        alert('两次新密码不一致')
      }
    }
  },
  mounted () {
    if (Object.keys(this.user).length > 0) { // 判断值存在时才获取
      this.$store.commit('closeSidebar')
      this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  position: relative;
  .page{
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 768px;
    padding: 10px;
    border: 1px solid #c7c7c7;
    background-color: white;
    border-radius: 6px;
    .page-msg, .page-psw{
      color: red;
      div{
        margin-top: 20px;
        label{
          display: inline-block;
          width: 100px;
        }
        input{
          width: 400px;
          height: 30px;
          outline: none;
          border-radius: 5px;
          border: 1px solid #e7e7e7;
          padding: 2px 5px;
        }
        .btn{
          background-color: #60acfc;
          cursor: pointer;
          &:hover{
            color: white;
            background-color: #ff7c7c;
          }
        }
      }
    }
    .page-psw{
      margin-top: 50px;
    }
    .page-img{
      color: red;
    }
  }
}
</style>
