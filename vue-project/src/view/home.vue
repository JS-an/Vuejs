<template>
  <div class="home">
    <div>
      该功能暂未展现
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  position: relative;
  div{
    width: 300px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: gray;
    font-size: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
