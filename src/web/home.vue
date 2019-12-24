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
        <div class="item good" @click.stop="onHelp">
          <i class="iconfont iconhands icon"></i>
          <el-divider></el-divider>
          <p class="title">我要求助</p>
        </div>
        <div class="item hot">
          <i class="iconfont iconremen icon"></i>
          <el-divider></el-divider>
          <p class="title">热心住户</p>
        </div>
        <div class="item help" @click.stop="onWish">
          <i class="iconfont iconbangzhu icon"></i>
          <el-divider></el-divider>
          <p class="title">他人求助</p>
        </div>
        <div class="item info" @click.stop="onDrift">
          <i class="iconfont iconxingxing1 icon"></i>
          <el-divider></el-divider>
          <p class="title">我的足迹</p>
        </div>
      </div>
    </div>
    <div class="study" ref="study">
      <div class="container">
        <div class="title">使用教程</div>
        <div class="text">从申请到完成，只需4步轻松搞定</div>
        <div class="process">
          <div class="icon-wrapper">
            <div class="icon">
              <i class="iconfont iconpen item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconyonghu item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconlouzuo item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconwancheng item"></i>
            </div>
          </div>
          <div class="process-text">
            <el-steps :active="step" align-center>
              <el-step title="1、提交申请" description="求助者在求助中提交使用物品申请"></el-step>
              <el-step title="2、用户审核" description="物品持有者对于求助者的申请"></el-step>
              <el-step title="3、物品领取" description="审核通过之后，求助者就可以到物业中心领取物品"></el-step>
              <el-step title="4、完成" description="求助者可对物品进行评价"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from '../components/slider'

export default {
  data () {
    return {
      // 进度条动画展示，只允许展示一次
      isShowProcess: false,
      step: 0,
      processScrollTop: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    toMyHome () {
      this.$router.push('/myHome')
    },
    onHelp () {
      this.$router.push('/help')
    },
    onDrift () {
      this.$router.push('/drift')
    },
    onWish () {
      this.$router.push('/wish')
    },
    // 进度条展示
    initScroll () {
      this.processScrollTop = this.$refs.study.offsetTop - 300
      window.addEventListener('scroll', this.handleScroll)
    },
    handleScroll (e) {
      let current = e.target.scrollingElement.scrollTop
      if (this.isShowProcess) {
        return
      }
      if (current > this.processScrollTop) {
        this.isShowProcess = true
        this.showProcess()
      }
    },
    showProcess () {
      let timer = setInterval(() => {
        this.step = this.step + 1
        if (this.step === 4) {
          clearInterval(timer)
        }
      }, 2000)
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
          align-items: center

          .logo
            padding: 40px 0 20px 0

          .name
            width: 100%
            font-size: $font-size-large
            text-align: center
            margin-bottom: 20px

          .room
            width: 350px
            font-size: $font-size-medium
            text-align: center

          .detail
            display: flex
            width: 350px
            justify-content: space-around
            margin-bottom: 25px

            .item
              width: 50px
              height: 50px
              text-align: center

              .num
                color: $color-theme

    .section
      width: 100%
      margin-top: 30px

      .container
        width: 60%
        margin: 0 auto
        border-radius: 5px
        display: flex
        justify-content: space-around
        padding: 30px 80px 30px 80px

        .item
          width: 160px
          height: 200px
          border: 1px solid #cccccc
          box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
          padding: 10px 15px 10px 15px
          border-radius: 10px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          cursor: pointer
          color: white

          &.good
            background-color: $color-theme

          &.hot
            background-color: #F56C6C

          &.help
            background-color: #E6A23C

          &.info
            background-color: #909399

          .icon
            font-size: 70px

          .title
            font-size: 30px

    .study
      padding :50px 0px
      margin-top: 30px
      background-color: white

      .container
        align-items: center
        width: $width-container
        margin: 0 auto
        display: flex
        flex-direction: column
        .title
          font-size :40px
          color :$color-theme
        .text
          padding :10px 5px
          font-size :$font-size-large
        .process
          width :100%
          .icon-wrapper
            margin :20px 0px
            display :flex
            display :flex
            justify-content :space-around
            .icon
              width :100px
              height :100px
              text-align :center
              border-radius :100px
              border :10px solid $color-theme
              .item
                font-size :40px
                line-height: 100px
</style>
