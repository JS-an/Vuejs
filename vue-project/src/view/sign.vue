<template>
  <div class="bg">
    <div class="login">
      <ul>
        <li :class="{active: type === 'Login'}" @click="type = 'Login'">Login</li>
        <li :class="{active: type === 'Register'}" @click="type = 'Register'">Register</li>
      </ul>
      <div class="login-msg">
        <h2 class="login-title">{{type}}</h2>
        <input v-model="account" name="account" type="text" placeholder="Account" @input="isAccountRule">
        <input v-model="password" name="password" type="password" placeholder="Password" @input="isAccountRule">
        <input v-if="type === 'Register'" v-model="againPassword" :class="{ispassword: ispassword}" name="againPassword" type="password" placeholder="AgainPassword" @input="isAccountRule">
        <input :class="{submit: 'submit', disable: disable}" type="submit" value="Submit" @click="submit">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'Login',
      account: '',
      password: '',
      againPassword: '',
      disable: true,
      ispassword: false
    }
  },
  methods: {
    // 检测信息是否完整
    isAccountRule () {
      if (this.type === 'Register') {
        if (this.account && this.password && this.againPassword && this.password === this.againPassword) {
          this.disable = false
        } else {
          this.disable = true
        }
        this.isPassword()
      } else {
        if (this.account && this.password) {
          this.disable = false
        } else {
          this.disable = true
        }
      }
    },
    // 检测两次密码是否一致
    isPassword () {
      if (this.password === this.againPassword) {
        this.ispassword = false
      } else {
        this.ispassword = true
      }
    },
    // 提交表单
    submit () {
      if (this.type === 'Register') { // 注册表单
        this.$axios.post('/api/users/user/register', {account: this.account, password: this.password})
          .then((res) => {
            if (typeof (res.data) === 'string') {
              alert(res.data)
            } else {
              alert('注册成功，请登录！')
              this.$router.go(0)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else { // 登录表单
        this.$axios.post('/api/users/user/signin', {account: this.account, password: this.password})
          .then((res) => {
            if (typeof (res.data) === 'string') {
              alert(res.data)
            } else {
              alert('登录成功！')
              this.$store.commit('isAccount', res.data)
              this.$router.replace({
                name: 'home'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .login{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 400px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 10px;
    ul{
      position: absolute;
      top: -25px;
      list-style: none;
      li{
        float: left;
        width: 80px;
        height: 30px;
        line-height: 25px;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
      }
      .active{
        background-color: white;
        color: #ff7c7c;
      }
    }
    .login-msg{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 300px;
      height: 400px;
      margin-left: calc(50% - 150px);
      text-align: center;
      input{
        height: 40px;
        font-size: 20px;
        outline: none;
        border: none;
        border-bottom: 1px solid gray;
      }
      .login-title{
        font-size: 40px;
      }
      .submit{
        background-color: #60acfc;
        border: none;
        border-radius: 6px;
        transition: all .3s;
        &:hover{
          color: white;
          background-color: #ff7c7c;
        }
      }
      .disable{
        pointer-events: none;
        background-color: #e7e7e7;
        color: gray;
      }
      .ispassword{
        border-bottom-color: red;
      }
    }
  }
}
</style>
