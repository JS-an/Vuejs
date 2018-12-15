<template>
  <transition name="fade">
    <div v-if="show" class="mask" @click="isShow">
      <div class="frame" @click.stop>
        <div class="close" @click="isShow">×</div>
        <p class="messge">{{msg}}</p>
        <div class="btn" @click="isPopupEvent">确定</div>
      </div>
    </div>
  </transition>
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
  .fade-enter-active{
    transition: all .3s;
  }
  .fade-enter{
    opacity: 0;
  }
  @keyframes prompt {
    0% {transform: translateY(-30px);}
    100% {transform: translateY(0px);}
  }
  .mask{
    z-index: 2;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    .frame{
      width: 400px;
      height: 200px;
      border-radius: 10px;
      z-index: 3;
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
      animation: prompt .3s;
      .close{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 24px;
        height: 24px;
        color: gray;
        border: 1px solid gray;
        border-radius: 12px;
        font-size: 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          color: red;
          border-color: red;
        }
      }
      .messge{
        font-size: 20px;
        margin-top: 10px;
      }
      .btn{
        width: 100px;
        height: 30px;
        border: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 10px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          background-color: #5bc49f;
          color: white;
        }
      }
    }
  }
</style>
