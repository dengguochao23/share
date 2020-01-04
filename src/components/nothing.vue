<template>
  <div class="nothing">
    <div class="nothing-container">
      <p class="null">空空如也</p>
      <p @click="onclick" class="link">你可以添加你的物品</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    onclick () {
      this.$router.push('/myHome')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .nothing
    width: 100%
    min-height: 300px
    position :relative
    .nothing-container
      position :absolute
      left :50%
      top : 50%
      transform: translate(-50%,-50%)
      text-align :center
      .null
        font-size :2em
        color: $color-theme
      .link
        cursor :pointer
</style>
