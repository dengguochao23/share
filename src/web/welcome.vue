<template>
  <div class="welcome">
    <div class="left">
      <div class="left-bg"></div>
      <div class="left-text">
        <p class="title">ABOUT US</p>
        <p class="text">物品共享</p>
        <p class="text">拉近邻居间的距离</p>
      </div>
    </div>
    <div class="right">
      <login  class="dialog" ref="login" @closeed="closeLog"></login>
      <registered class="dialog" ref="register" @close="closeReg"></registered>
      <div class="right_bg_one">
        <img :src="require('../common/img/bg-login2.7eec4f6b.png')" alt="">
      </div>
      <div class="right_bg_two">
        <img :src="require('../common/img/bg-login3.677432e1.png')" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Login from '../components/login'
import Registered from '../components/registered'

export default {
  methods: {
    closeReg () {
      this.$refs.login.open_and_close()
    },
    closeLog () {
      this.$refs.register.open_and_close()
    }
  },
  components: {
    Login,
    Registered
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .welcome
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0

    .left
      background-color: $color-theme
      width: 44%
      height: 100%
      float: left
      position: relative

      .left-text
        position: absolute
        left: 50%
        transform: translate(-50%, -50%)
        top: 50%

        .title
          font-size: 25px
          color: white
          font-weight: 700
          margin-bottom: 20px

        .text
          font-size: 20px
          color: white
          margin-bottom: 10px

    .right
      float: right
      width: 56%
      height: 100%
      position: relative
      overflow: hidden

      .right_bg_two
        position: absolute
        right: 0
        bottom: -4px

      .right_bg_one
        position: absolute
        top: 20px
        right: 20px

      .dialog
        position: absolute
        left: 50%
        top: 50%
        margin-left: -25%
        margin-top: -28%
        z-index :10
</style>
