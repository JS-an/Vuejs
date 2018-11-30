
<template>
  <div class="btn">
    <div title="add" class="btn-add" @click="popup('add')"></div>
    <div title="edit" class="btn-edit" @click="popup('modify')"></div>
    <div title="delete" class="btn-del" @click="popup('del')"></div>
  </div>
</template>

<script>
export default {
  name: 'btn',
  data () {
    return {
    }
  },
  methods: {
    popup (e) {
      switch (e) {
        case 'add':
          this.$popup('确认添加文章吗？', this.add)
          break
        case 'del':
          this.$popup('确认删除文章吗？', this.del)
          break
        case 'modify':
          this.$popup('确认修改文章吗？', this.modify)
          break
      }
    },
    add () {
      if (this.$parent.$options.name === 'admin-article') {
        const title = this.$parent.$refs.articleTitle.value
        const main = this.$parent.$refs.articleMain.value
        this.$axios.post('/api/users/article/add', {title, main})
          .then((res) => {
            if (typeof (res.data) === 'string' && res.data.length > 0) {
              alert(res.data)
            } else {
              this.$router.go(0)
            }
          })
      }
    },
    del () {
      if (this.$parent.$options.name === 'admin-article') {
        const id = this.$parent.$data.checkId
        this.$axios.post('/api/users/article/del', {id})
          .then((res) => {
            if (typeof (res.data) === 'string' && res.data.length > 0) {
              alert(res.data)
            } else {
              this.$router.go(0)
            }
          })
      }
    },
    modify () {
      if (this.$parent.$options.name === 'admin-article') {
        const id = this.$parent.$data.checkId
        const title = this.$parent.$refs.articleTitle.value
        const main = this.$parent.$refs.articleMain.value
        this.$axios.post('/api/users/article/modify', {id, title, main})
          .then((res) => {
            if (typeof (res.data) === 'string' && res.data.length > 0) {
              alert(res.data)
            } else {
              this.$router.go(0)
            }
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.btn{
  position: fixed;
  top: 10px;
  right: 10px;
  margin: auto;
  width: 240px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  .btn-add, .btn-edit, .btn-del{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-size: 32px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.5;
    border: 1px solid black;
    &:hover{
      opacity: 1;
      background-color: white;
      box-shadow: 0 0 12px 2px white
    }
  }
  .btn-add{
    background-image: url('/static/icon/add.png');
  }
  .btn-edit{
    background-image: url('/static/icon/edit.png');
  }
  .btn-del{
    background-image: url('/static/icon/delete.png');
  }
}
</style>
