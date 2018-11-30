<template>
  <div class="wrap-left">
    <div class="links">
      <user></user>
    </div>
    <div ref="nav" class="nav">
      <router-link @click.native="closeSidebar" to="/home">Home</router-link>
      <router-link @click.native="closeSidebar" to="/article">Article</router-link>
      <router-link @click.native="closeSidebar" to="/games">Games</router-link>
      <router-link @click.native="closeSidebar" to="/links">Links</router-link>
      <router-link @click.native="closeSidebar" to="/admin">Admin</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      msg: 'sidebar'
    }
  },
  methods: {
    closeSidebar () {
      this.$store.commit('closeSidebar')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap-left{
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url('/static/img/start.jpg');
  .links{
    height: 140px;
  }
  .nav{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    a{
      font-size: 30px;
      display: block;
      text-decoration: none;
      width: 180px;
      height: 60px;
      color: #fff;
      border: 1px solid #888;
      border-radius: 30px;
      text-align: center;
      line-height: 60px;
      margin-bottom: 50px;
      transition: all .3s;
      &:hover{
        background-color: #888;
        color: red;
      }
    }
  }
}
</style>
