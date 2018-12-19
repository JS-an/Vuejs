<template>
  <div class="admin-account">
    <div class="list">
      <ul class="list-msg">
        <li class="user" :key="i" v-for="(accountMsg, i) in accountList" :class="{active: active === i}" @click="active = i">
          <img :src="accountMsg.head" alt="">
          <div>
            <h4>{{accountMsg.account}}</h4>
            <p v-if="accountMsg.role === 1" class="admin">管理员</p>
            <p v-else class="general">普通用户</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <div v-if="user" class="main-msg">
        <p>
          <span>用户名：</span>
          <input ref="account" type="text" :value="user.account">
        </p>
        <p>
          <span>用户密码：</span>
          <input type="text" v-model="user.password">
        </p>
        <p>
          <span>用户等级：</span>
          <select v-model="user.role">
            <option :value="0">0（普通用户）</option>
            <option :value="1">1（管理员）</option>
            <option :value="2">2（超级管理员）</option>
          </select>
        </p>
        <p>
          <span>昵称：</span>
          <input type="text" v-model="user.nickName">
        </p>
        <p>
          <span>头像链接：</span>
          <input type="text" v-model="user.head">
        </p>
        <p>
          <span>GitHub地址：</span>
          <input type="text" v-model="user.github">
        </p>
        <p>
          <span>Web地址：</span>
          <input type="text" v-model="user.web">
        </p>
        <p>
          <span>创建时间：</span>
          <input type="text" v-model="user.createTime">
        </p>
        <p>
          <span>展示友链：</span>
          <select v-model="user.show">
            <option :value="false">false</option>
            <option :value="true">true</option>
          </select>
        </p>
        <p>
          <span>简介：</span>
          <input type="text" v-model="user.information">
          (限制{{user.information.length}}/50字)
        </p>
        <button @click="isUpdate">保存修改</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adimnAccount',
  data () {
    return {
      accountList: Object,
      active: 0
    }
  },
  computed: {
    user () {
      return this.accountList[this.active]
    }
  },
  methods: {
    // 得到用户列表
    getUserList () {
      this.$axios.get('/api/users/user/userList')
        .then(res => {
          this.accountList = res.data
        })
    },
    // 更新用户数据
    updateUserAll () {
      this.$axios.post('/api/users/user/updateUserAll', {user: this.user, newAccount: this.$refs.account.value})
        .then(res => {
          alert('更新成功')
        })
    },
    isUpdate () {
      this.$popup('是否更新重要数据', this.updateUserAll)
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>
.admin-account{
  height: 100%;
  margin: 5px;
  display: flex;
  .list{
    height: 100%;
    flex-shrink: 0;
    border: 1px solid #ccc;
    margin-right: 10px;
    overflow: auto;
    .list-msg{
      width: 300px;
      margin: 2px;
      .user{
        height: 100px;
        margin-top: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        display: flex;
        align-items: center;
        img{
          width: 80px;
          margin: 0 10px;
          border-radius: 40px;
        }
        div{
            text-align: center;
          p{
            width: 180px;
            border-radius: 5px;
          }
          .general{
            background-color: #32d3eb;
          }
          .admin{
            background-color: #feb64d;
          }
        }
      }
      .active{
        background-color: #5bc49f;
      }
    }
  }
  .main{
    width: 100%;
    border: 1px solid #ccc;
    overflow: auto;
    .main-msg{
      margin: 10px;
      p{
        width: 650px;
        height: 30px;
        margin: 10px 0;
        word-wrap: break-word;
        span{
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
        select{
          height: 30px;
          width: 120px;
        }
      }
      button{
        width: 180px;
        height: 30px;
        margin: 20px 0;
        outline: none;
        border-radius: 5px;
        border: 1px solid #e7e7e7;
        background-color: #60acfc;
        cursor: pointer;
        &:hover{
          color: white;
          background-color: #ff7c7c;
        }
      }
    }
  }
}
</style>
