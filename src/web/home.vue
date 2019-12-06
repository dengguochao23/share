<template>
  <div class="home">
    <div class="slider">
      <div class="slider-box">
        <slider></slider>
        <div class="info">
          <div class="logo">
            <el-avatar shape="square" :size="100"
                       src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </div>
          <div class="name">
            Hi,dengguochao
          </div>
          <div class="room">
            103幢一单元1502
            <el-divider></el-divider>
          </div>
          <div class="detail">
            <div class="item">
              <p class="num">1</p>
              <p>求助</p>
            </div>
            <div class="item">
              <p class="num">1</p>
              <p>可借</p>
            </div>
            <div class="item">
              <p class="num">1</p>
              <p>可评价</p>
            </div>
            <div class="item">
              <p class="num">1</p>
              <p>7豆</p>
            </div>
          </div>
          <div class="my">
            <el-button style="width: 300px" type="primary" @click="toMyHome">进入我的主页</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="good">
          sdfsdfsdfsdfsdfsdf
          <i class="iconfont iconsousuo"></i>
        </div>
        <div class="help">
        </div>
        <div class="star"></div>
        <div class="hot"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from '../components/slider'

export default {
  methods: {
    toMyHome () {
      this.$router.push('/myHome')
    }
  },
  components: {
    Slider
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .home
    width: 100%

    .slider
      background: $color-theme
      height: 500px
      margin-bottom :50px
      .slider-box
        position: relative
        margin: 0 auto
        width: $width-container
        z-index: 5

        .info
          position: absolute
          right: 0px
          bottom: 50px
          width: 400px
          height: 400px
          background-color: $color-background
          z-index: 10
          border-radius: 10px
          display: flex
          flex-direction: column
          align-items :center
          .logo
            padding:40px 0 20px 0
          .name
            width: 100%
            font-size: $font-size-large
            text-align :center
            margin-bottom :20px
          .room
            width: 350px
            font-size: $font-size-medium
            text-align :center
          .detail
            display: flex
            width :350px
            justify-content :space-around
            margin-bottom :25px
            .item
              width :50px
              height : 50px
              text-align :center
              .num
                color :$color-theme
    .section
      width :100%
      margin-top: 30px
      .container
        width :$width-container
        margin :0 auto
        border :1px solid #cccccc
        box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
        border-radius: 5px
        display :flex

</style>
