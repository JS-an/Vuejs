<template>
  <div class="box">
    <div class="page">
      <div class="page-img">
        <div class="preview">
          <img :src="imgUrl || user.head" alt="">
        </div>
        <input ref="fileData" type="file" @change="isChange">
        <button @click="updateHead">上传</button>
      </div>
      <div class="page-msg">
        <h2>个人信息</h2>
        <div>
          <label for="account">账号：</label>
          <input type="text" id="account" disabled v-model="accountMsg.account">
        </div>
        <div>
          <label for="nickName">昵称：</label>
          <input type="text" id="nickName" v-model="accountMsg.nickName">
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
          <label for="information">简介：</label>
          <input type="text" id="information" v-model="accountMsg.information" @input="limitLength">
        </div>
        <div>
          <label></label>
          <input class="btn" type="button" value="保存修改" @click="isUpdateUser">
        </div>
      </div>
      <div :class="{'page-psw': true, show: show}">
        <h2><span @click="show = !show"><img src="/static/icon/jia.png" v-show="show"><img src="/static/icon/jian.png" v-show="!show"></span>&nbsp;修改密码</h2>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      accountMsg: Object, // 页面信息
      fd: new FormData(), // 表单数据
      oldpsw: '',
      newpsw: '',
      againpsw: '',
      show: true,
      imgUrl: null
    }
  },
  computed: {
    // 用户信息
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
    // 上传头像
    updateHead () {
      if (this.fd.has('file')) {
        this.$axios('/api/users/user/updateHead', {method: 'post', data: this.fd, headers: {'Conten-Type': 'multipart/form-data'}})
          .then((res) => {
            alert('更新成功')
            this.$router.go(0)
          })
      } else {
        alert('图片不能为空')
      }
    },
    // 更新用户信息
    updateUser () {
      this.$axios.post('/api/users/user/updateUser', this.accountMsg)
        .then((res) => {
          if (res.data === false) {
            this.$router.push({
              name: 'sign'
            })
          } else {
            alert('更新成功')
          }
        })
    },
    // 更新密码
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
    },
    // 头像预览
    isChange (e) {
      this.fd.delete('file')
      this.fd.delete('account')
      let files = this.$refs.fileData.files[0]
      if (!files) {
        return false
      }
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onload = (e) => {
        this.compress(e.target.result).then((url) => {
          this.imgUrl = url
          console.log(this.fd.getAll('file'))
        })
      }
    },
    // 压缩图片
    compress (src) {
      return new Promise((resolve, reject) => {
        let opt = {
          w: 158,
          h: 158,
          quality: 0.92
        }
        let img = new Image()
        img.src = src
        let canvas = document.createElement('canvas')
        let cxt = canvas.getContext('2d')
        canvas.width = opt.w
        canvas.height = opt.h
        img.onload = () => {
          cxt.drawImage(img, 0, 0, img.width, img.height, 0, 0, opt.w, opt.h)
          canvas.toBlob((blob) => {
            this.fd.append('file', blob)
            this.fd.append('account', JSON.stringify(this.accountMsg.account))
            resolve(canvas.toDataURL('image/jpeg', opt.quality))
          })
        }
      })
    },
    // 限制字数
    limitLength () {
      if (this.accountMsg.information.length > 50) {
        this.accountMsg.information = this.accountMsg.information.slice(0, 50)
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
      h2{
        img{
          cursor: pointer;
          float: left;
          height: 31px;
        }
      }
    }
    .page-img{
      width: 200px;
      position: absolute;
      right: 0;
      .preview{
        width: 160px;
        height: 160px;
        margin: 20px 0;
        border: 1px solid #ccc;
        border-radius: 80px;
        overflow: hidden;
        img{
          width: 160px;
        }
      }
      input{
        width: 180px;
        font-size: 16px;
      }
      button{
        width: 180px;
        height: 30px;
        margin-top: 23px;
        outline: none;
        border-radius: 5px;
        border: 1px solid #e7e7e7;
        background-color: #60acfc;
        &:hover{
          color: white;
          background-color: #ff7c7c;
        }
      }
    }
    .show{
      overflow: hidden;
      height: 50px;
    }
  }
}
</style>
