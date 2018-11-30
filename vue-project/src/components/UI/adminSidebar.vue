<template>
  <div class="admin-nav">
    <router-link to="/home" class="nav-up">
      <div class="arrow-left"></div>
      <span class="text">Back Home</span>
    </router-link>
    <user class="nav-user"></user>
    <div class="nav-down">
      <router-link :class="{checked: isCheck === 1}" @click.native="isCheck = 1" to="/admin/home">Home</router-link>
      <router-link :class="{checked: isCheck === 2}" @click.native="isCheck = 2" to="/admin/acticle">Acticle</router-link>
      <router-link :class="{checked: isCheck === 3}" @click.native="isCheck = 3" to="/admin/games">Games</router-link>
      <router-link :class="{checked: isCheck === 4}" @click.native="isCheck = 4" to="/admin/links">Links</router-link>
      <router-link :class="{checked: isCheck === 5}" @click.native="isCheck = 5" to="/admin/account">Account</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-sidebar',
  data () {
    return {
      isCheck: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-nav{
  height: 80px;
  width: 100%;
  background-color: #b7b7b7;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  a{
  text-decoration: none;
  color: black;
  }
  .nav-up{
    position: relative;
    width: 80px;
    text-align: center;
    line-height: 40px;

    &:hover .arrow-left{
      display: none;
    }

    &:hover .text{
      display: inline;
    }

    .arrow-left{
      position: absolute;
      top: calc(50% - 5px);
      left: calc(50% - 5px);
      width: 10px;
      height: 10px;
      border-top: 2px solid black;
      border-right: 2px solid black;
      transform: rotate(-135deg);
    }
    .text{
      display: none;
      font-size: 10px;
      line-height: 80px;
    }
  }
  .nav-user{
    width: 220px;
    height: 120px;
    transform: translateY(-27px) scale(0.8)
  }
  .nav-down{
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a{
      height: 60px;
      width: 60px;
      margin-left: 20px;
      border-radius: 30px;
      background-color: white;
      text-align: center;
      line-height: 60px;
    }
    .checked{
      background-color: #ff7c7c8c;
      color: white;
    }
  }
}
</style>
