<template>
  <div class="home">
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '待编辑'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{
  font-size: 30px;
  div{
    text-align: center;
    color: red;
  }
}
</style>
