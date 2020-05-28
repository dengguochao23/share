<template>
  <div class="loading" v-if="visible" ref="load">
    <div class="cover"></div>
    <div class="loading-container">
      <img class="gif" width="50px" height="50px" :src="require('../common/img/loading.gif')" alt="">
      <p class="text">加载中.........</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading',
  data () {
    return {
      loading: true
    }
  },
  props: {
    visible: {
      type: Boolean,
      default () {
        return false
      }
    },
    content: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .loading
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1000

    .cover
      width: 100%
      height 100%
      background-color: black
      opacity: 0.6
      z-index: 1001
      position: absolute
      top: 0
      left: 0
      overflow-y: hidden !important

    .loading-container
      position: absolute
      top: 50%
      transform: translate(-50%, -50%)
      left: 50%
      background-color: white
      width: 250px
      height: 150px
      z-index: 1002
      border: 5px solid $color-theme
      border-radius: 10px
      text-align: center

      .gif
        margin-top: 25px

      .text
        color: $color-theme
        font-size: $font-size-large-x
</style>
