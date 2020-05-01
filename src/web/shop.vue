<template>
  <div class="shop">
    <div class="head">
      <div class="info">
        <div class="logo">
          <el-avatar shape="square" :size="100"
                     src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </div>
        <div class="name">
          Hi,{{nickname}}
        </div>
        <div class="room">
          {{room}}
        </div>
        <div class="count">
          <span>您的7豆: </span>
          <span class="num">{{count}}</span>
        </div>
        <div class="my">
          <el-button style="width: 250px;background: white;color: black" type="primary" @click="toMyHome">进入我的主页
          </el-button>
        </div>
      </div>
      <div class="slider">
        <p>欢迎进入兑换商城</p>
        <p>你可以在这里兑换自己想要的东西</p>
      </div>
    </div>
    <el-divider content-position="center"><h1>蔬菜</h1></el-divider>
    <div class="shop">
      <div v-for="(item,index) in vegetables" :key="index" class="item"
           v-on="{mouseenter:onMouseEnter, mouseleave:onMouseLeave}">
        <div class="img">
          <el-image style="width: 140px; height: 140px"
                    :src="item.url"
                    :fit="fit"></el-image>
        </div>
        <p class="name">香菜</p>
        <p class="count">7豆</p>
        <div @click.stop="addShopCart(item)" class="cover" ref="cover">
          <p>我要兑换</p>
        </div>
      </div>
    </div>
    <el-divider content-position="center"><h1>饮料</h1></el-divider>
    <div class="shop">
      <div v-for="(item,index) in vegetables" :key="index" class="item"
           v-on="{mouseenter:onMouseEnter, mouseleave:onMouseLeave}">
        <div class="img">
          <el-image style="width: 140px; height: 140px"
                    :src="item.url"
                    :fit="fit"></el-image>
        </div>
        <p class="name">香菜</p>
        <p class="count">7豆</p>
        <div @click.stop="addShopCart(item)" class="cover" ref="cover">
          <p>我要兑换</p>
        </div>
      </div>
    </div>
    <div v-for="(ball, index) in balls" :key="index">
      <transition
        @before-enter="beforeDrop"
        @enter="droping"
        @after-enter="afterDrop"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"><img :src="ball.url" alt="" class=""></div>
        </div>
      </transition>
    </div>
    <shopping id="shopping" ref="shopping"></shopping>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Shopping from '../components/shopping'
import { addClass, removeClass } from '../common/js/dom'
const BALL_LEN = 10 // 设置球子的数量
const innerClsHook = 'inner-hook'
function createBalls () {
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({
      show: false
    })
  }
  return balls
}
export default {
  data () {
    return {
      ballurl: 'https://img30.360buyimg.com/n1//jfs/t1/94787/15/9690/145517/5e122566E8676ef07/f014612d065cd9d5.jpg',
      fit: 'fit',
      vegetables: [
        {
          url: 'https://img30.360buyimg.com/n1//jfs/t1/94787/15/9690/145517/5e122566E8676ef07/f014612d065cd9d5.jpg'
        },
        {
          url: 'https://img30.360buyimg.com/n1//jfs/t1/106719/5/15272/90515/5e6efe02Ef2b35a68/96ad62b1478603c5.jpg'
        },
        {
          url: 'https://img30.360buyimg.com/n1//jfs/t1/85009/3/8877/18132/5e070eb4E501514b4/28e32bed3bf76433.jpg'
        },
        {
          url: 'https://img30.360buyimg.com/n1//jfs/t1/94787/15/9690/145517/5e122566E8676ef07/f014612d065cd9d5.jpg'
        },
        {
          url: 'https://img30.360buyimg.com/n1//jfs/t1/94787/15/9690/145517/5e122566E8676ef07/f014612d065cd9d5.jpg'
        }
      ],
      balls: createBalls(), // 用来控制小球的显示隐藏
      ballLeft: 0,
      ballTop: 0
    }
  },
  computed: {
    nickname () {
      return this.userInfo.account || 'sdfsdf'
    },
    room () {
      return this.userInfo.building + '幢' + this.userInfo.unit + '单元' + this.userInfo.room
    },
    count () {
      return this.userInfo.count
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.dropBalls = []
  },
  methods: {
    toMyHome () {
      this.$router.push('/myHome')
    },
    onMouseEnter (event) {
      const el = event.target
      const cover = el.getElementsByClassName('cover')[0]
      addClass(el, 'active')
      cover.style.bottom = '0'
    },
    onMouseLeave (event) {
      const el = event.target
      const bottom = -40
      const cover = el.getElementsByClassName('cover')[0]
      removeClass(el, 'active')
      cover.style.bottom = `${bottom}px`
    },
    addShopCart (item) {
      // 获得球的高度
      this.ballLeft = event.currentTarget.getBoundingClientRect().left + 115
      this.ballTop = event.currentTarget.getBoundingClientRect().top
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = event.currentTarget
          ball.url = item.url
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      // 初始化球的高度
      const inner = el.getElementsByClassName(innerClsHook)[0]
      el.style.display = ''
      el.style.transform = `translate3d(0px,${this.ballTop + 12}px, 0)`
      inner.style.transform = `translate3d(${this.ballLeft}px,0, 0)`
    },
    droping (el, done) {
      this._reflow = document.body.offsetHeight // 重新计算流浪器高度
      const shopping = this.$refs.shopping.$el.clientWidth
      const shopCart = document.getElementById('shopping').getBoundingClientRect()
      const shopCartLeft = shopCart.left + (shopping / 2)
      const shopCartTop = shopCart.top + (shopping / 2)
      const inner = el.getElementsByClassName(innerClsHook)[0]
      // 小球滚动的行程
      el.style.transform = `translate3d(0px,${Math.abs(shopCartTop)}px,0)`
      inner.style.transform = `translate3d(${Math.abs(shopCartLeft)}px,0,0)`
      // 小球动画的时间
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift() // 目的是小球回收,拿到第一个小球
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
      this.ballTop = 0
      this.ballLeft = 0
    }
  },
  components: {
    Shopping
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .shop
    width: $width-container
    margin: 0px auto
    padding-top: 20px

    .head
      width: 100%
      height: 300px
      display: flex
      margin-bottom: 50px

      .info
        width: 300px
        border-top-left-radius: 10px
        border-bottom-left-radius: 10px
        height: 300px
        display: flex
        background-color: $color-theme
        justify-content: center
        flex-direction: column
        align-items: center
        color: white

      .info div
        margin-top: 10px

      .slider
        flex: 1
        background-color: white
        border-top-right-radius: 10px
        border-bottom-right-radius: 10px
        background: url("http://www.igarwin.com/static/img/introduce.8ba987dc.png")
        background-position: center;
        color: white

      .slider p:nth-child(1)
        margin: 90px 0 0 50px
        font-size: $font-size-large-xx

      .slider p:nth-child(2)
        margin: 30px 0 0 50px

    .shop
      width: 100%
      display: flex
      flex-wrap: wrap
      margin-bottom: 50px

      .item
        box-sizing: border-box
        padding: 0 20px
        cursor: pointer
        background-color: white
        width: 230px
        height: 240px
        margin-right: 12.5px
        margin-bottom: 12.5px
        position: relative
        overflow: hidden

        &.active
          box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)

      .img
        text-align: center
        margin: 15px 0

      .name
        font-size: $font-size-large
        font-weight: 900

      .cover
        width: 100%
        height: 40px
        background-color: $color-theme
        position: absolute
        bottom: -50px
        left: 0
        text-align: center
        color: white
        line-height: 40px
        transition: all 0.3s

      .item:nth-child(5)
        margin-right: 0

    .ball
      position: fixed
      z-index: 1000
      top :0
      left :0
      transition: all 0.88s cubic-bezier(0.275, -0.32, 0.885, 0.175)
      .inner
        width : 20px
        height :20px
        border-radius :50%
        transition: all 0.88s linear
      img
        width : 20px
        height :20px
        border-radius :50%
        animation : 0.88s shopImg
  .el-divider__text
    background-color: $color-background-d !important
  @keyframes shopImg
    0%
      transform :scale(2.5)
    25%
      transform :scale(1.8)
    50%
      transform :scale(1.2)
    75%
      transform :scale(0.6)
    100%
      transform :scale(0.3)
</style>
