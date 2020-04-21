<template>
  <el-carousel trigger="click" height="500px" arrow="never">
    <el-carousel-item>
      <p class="slide-title">把家里没用的<span class="web">上七享网</span></p>
      <p class="slide-container">更用来学习以及展示成果</p>
    </el-carousel-item>
    <el-carousel-item>
      <p class="slide-title">以小区为中心<span class="web">通过七享网</span></p>
      <p class="slide-container">你可以注册并且使用</p>
    </el-carousel-item>
    <el-carousel-item>
      <p class="slide-title">把你想要放在<span class="web">心愿墙</span></p>
      <p class="slide-container">数据你可以自定是真实还是虚拟</p>
    </el-carousel-item>
    <el-carousel-item>
      <p class="slide-title">通过共享你会得到<span class="web">七豆</span></p>
      <p class="slide-container">放心我不会拿你的个人信息</p>
    </el-carousel-item>
  </el-carousel>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .el-carousel__item
    display: flex
    flex-direction: column
    justify-content center

    .slide-title
      font-size: $font-size-large-xx
      color: white

      .web
        color: yellow

    .slide-container
      font-size: 50px
</style>
