<template>
  <div class="notFound">
    <div class="not-container">
      <p class="num">404</p>
      <p class="text">你似乎来到了不正确的地方</p>
      <el-button type="primary" @click="home">回到首页</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    home () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .notFound
    position :fixed
    top: 0
    left :0
    right :0
    bottom :0
    width :100%
    height :100%
    background-color: $color-theme
    .not-container
      width: 500px;
      height: 300px;
      background: white;
      border-radius :20px
      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      color :$color-text-desc
      display :block
      padding :20px
      background-image :url("../common/img/logo.png")
      background-repeat :no-repeat
      background-position :bottom right
      background-size : 50% 50%
      .num
        font-weight :900
        font-size :80px
      .text
        font-size :20px
        font-weight :700
        margin-bottom :30px
</style>
