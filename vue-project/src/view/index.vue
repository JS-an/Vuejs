<template>
  <div class="three-col">
    <sidebar ref="sidebar" :class="['sidebar',{'show-sidebar':open}]"></sidebar>
    <div class="b">
      <div ref="btn" :class="['btn']" @click="isOpen">
        <div :class="['arrow',{'arrow-rotate':open}]"></div>
      </div>
    </div>
    <div id="top" ref="main" :class="['main']" @click="closeSidebar">
      <router-view class="tab-anima"></router-view>
      <backtop></backtop>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
    }
  },
  computed: {
    open () {
      return this.$store.state.open
    }
  },
  methods: {
    isOpen () {
      this.$store.commit('isOpen')
    },
    closeSidebar (e) {
      this.$store.commit('closeSidebar')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.three-col{
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  /* 侧边栏 */
  .sidebar{
    width: 0px;
    overflow: hidden;
    transition: width .3s;
  }
  .show-sidebar{
    width: 220px;
  }
  /* 侧边栏按钮*/
  .b{
    z-index: 2;
    align-self: center;
    transform: translateY(-60px);
    .btn{
      position: absolute;
      width: 30px;
      height: 120px;
      border-radius: 0 30px 30px 0;
      background-color: #eee;
      cursor: pointer;
      &:hover{
        background-color: #555;
        /* 侧边栏按钮箭头*/
        .arrow{
        border-color: #fff;
        }
      }
      /* 侧边栏箭头 */
      .arrow{
        position: absolute;
        top: calc(50% - 5px);
        width: 20px;
        height: 20px;
        border-top: 2px solid #000;
        border-right: 2px solid #000;
        transform: rotate(45deg);
        transition: transform .3s;
        transform-origin: 75% 25%;
      }
      .arrow-rotate{
        transform: rotate(225deg);
      }
    }
  }
  /* 内容视图 */
  .main{
    flex: 1;
    overflow-x: hidden;
    background-image: url('/static/img/start.jpg');
  }
}

</style>
