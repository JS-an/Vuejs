<template>
  <div class="games">
    <div>
      <iframe src="https://js-an.github.io/HTML5/canvasClock/canvasClock.html"></iframe>
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
<style scoped>
.games{
  font-size: 30px;
  height: 2000px;
}
iframe{
  width: 1300px;
  height: 650px;
}
</style>
