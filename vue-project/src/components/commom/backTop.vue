<template>
  <div v-show="scroll" class="btn-up" @click="textScroll">
    <div class="arrow-up"></div>
  </div>
</template>

<script>
export default {
  name: 'backtop',
  data () {
    return {
      scroll: false
    }
  },
  methods: {
    textScroll () {
      let scrollPosition = this.$el.parentNode.scrollTop
      let scrolling = setInterval(() => {
        if (scrollPosition > 10) {
          scrollPosition -= scrollPosition / 2 // 调速率
          this.$el.parentNode.scrollTop = scrollPosition
        } else {
          scrollPosition = 0
          this.$el.parentNode.scrollTop = scrollPosition
          clearInterval(scrolling)
        }
      }, 40)
    },
    getScroll () {
      const clientHeight = document.body.clientHeight
      window.addEventListener('scroll', (e) => {
        this.scroll = e.target.scrollTop > clientHeight / 2
      }, true)
    }
  },
  mounted () {
    this.getScroll()
  }
}
</script>

<style lang="scss" scoped>
.btn-up{
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #eee;
  opacity: 0.5;

  &:hover{
  opacity: 1;
  background-color: #333;

    .arrow-up{
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
    }
  }
  .arrow-up{
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 10px);
  width: 20px;
  height: 20px;
  border-top: 2px solid #888;
  border-right: 2px solid #888;
  transform: rotate(-45deg);
  }
}
</style>
