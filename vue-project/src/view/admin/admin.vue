<template>
  <div class="admin-page">
    <admin-sidebar></admin-sidebar>
    <div class="admin-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.admin-page{
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  .admin-main{
    flex: 1;
    margin-top: 80px;
    overflow: hidden;
  }
}

</style>
