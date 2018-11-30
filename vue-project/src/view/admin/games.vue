<template>
  <div class="games">
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'games',
  data () {
    return {
      msg: 'games'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.games{
  font-size: 30px;
  div{
    color: red;
  }
}
</style>
