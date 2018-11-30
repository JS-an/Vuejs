<template>
  <div v-if="show" class="mask" @click="isShow">
    <div class="frame" @click.stop>
      <p class="messge">{{msg}}</p>
      <div class="btn" @click="isPopupEvent">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      msg: '',
      callback: null
    }
  },
  methods: {
    isShow () {
      this.show = false
      document.getElementById('app').removeChild(this.$el)
    },
    isPopupEvent () {
      this.show = false
      this.callback && this.callback()
      document.getElementById('app').removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    .frame{
      width: 360px;
      height: 200px;
      border-radius: 20px;
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .messge{
        font-size: 20px;
      }
      .btn{
        width: 100px;
        height: 30px;
        border: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 10px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: gray;
          color: white;
        }
      }
    }
  }
</style>
