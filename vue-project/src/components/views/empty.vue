<template>
  <div></div>
</template>
<script>
export default {
  name: 'empty',
  created () {
    this.$router.replace({
      name: this.$route.query.name
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
