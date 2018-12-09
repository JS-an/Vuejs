<template>
  <div class="links">
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'links',
  data () {
    return {
      msg: '待编辑'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.links{
  font-size: 30px;
  div{
    color: red;
    text-align: center;
  }
}
</style>
