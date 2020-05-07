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
      <div v-for="(item,index) in vegetables" :key="index" class="item">
        <div class="img" v-on.stop="{mouseenter:onMouseEnter, mouseleave:onMouseLeave}">
          <el-image style="width: 140px; height: 140px"
                    :src="item.image"
                    :fit="fit"></el-image>
        </div>
        <p class="name">{{item.name}}</p>
        <p class="count">{{item.price}}豆</p>
        <div @click.stop="addShopCart(item)" class="cover" ref="cover">
          <p>我要兑换</p>
        </div>
        <div class="null" v-show="item.stock === 0">
          <p>库存清空</p>
        </div>
      </div>
    </div>
    <el-divider content-position="center"><h1>水果</h1></el-divider>
    <div class="shop">
      <div v-for="(item,index) in fruit" :key="index" class="item">
        <div class="img" v-on.prevent="{mouseenter:onMouseEnter, mouseleave:onMouseLeave}">
          <el-image style="width: 140px; height: 140px"
                    :src="item.image"
                    :fit="fit"></el-image>
        </div>
        <p class="name">{{item.name}}</p>
        <p class="count">{{item.price}}豆</p>
        <div @click.stop="addShopCart(item)" class="cover" ref="cover">
          <p>我要兑换</p>
        </div>
        <div class="null" v-show="item.stock === 0">
          <p>库存清空</p>
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
    <shopping id="shopping" ref="shopping" @onClick="clickShop"></shopping>
    <el-dialog class="dialog" title="我的购物车" :visible.sync="outDialogShopCart" width="40%">
      <el-dialog
        width="30%"
        title="提示"
        :visible.sync="inDialogShopCart"
        append-to-body>
        <p style="margin-bottom: 20px">你确认要提交吗？</p>
        <el-button
          type="primary"
          @click.stop="_sellMyShop">提交
        </el-button>
      </el-dialog>
      <el-table :show-summary="true" :data="myShop" style="width: 100%" max-height="250">
        <el-table-column property="name" label="物品名称"></el-table-column>
        <el-table-column property="num" label="数量">
          <template slot-scope="select">
            <div class="select-container">
              <div class="but cut" @click.stop="cutNum(select.$index)">-</div>
              <span>{{select.row.num}}</span>
              <div class="but add" @click.stop="addNum(select.row)">+</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="shopDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="settle">
        <el-button type="primary" @click="settle">结算</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import Shopping from '../components/shopping'
import { addClass, removeClass } from '../common/js/dom'
import { getAllShopOfType, sellMyShop } from '../api/shop'
import { Message } from 'element-ui'
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
      vegetables: [],
      fruit: [],
      balls: createBalls(), // 用来控制小球的显示隐藏
      ballLeft: 0,
      ballTop: 0,
      outDialogShopCart: false,
      inDialogShopCart: false
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
      'userInfo',
      'myShop'
    ])
  },
  created () {
    this.dropBalls = []
    this._getAllShopType()
  },
  methods: {
    toMyHome () {
      this.$router.push('/myHome')
    },
    onMouseEnter (event) {
      // 获取到父节点
      const el = event.currentTarget.parentElement
      const cover = el.getElementsByClassName('cover')[0]
      addClass(el, 'active')
      cover.style.bottom = '0'
    },
    onMouseLeave (event) {
      // 获取到父节点
      const el = event.currentTarget.parentElement
      const bottom = -40
      const cover = el.getElementsByClassName('cover')[0]
      removeClass(el, 'active')
      cover.style.bottom = `${bottom}px`
    },
    addShopCart (item) {
      // 获得球的高度
      this.ballLeft = event.currentTarget.getBoundingClientRect().left + 115
      this.ballTop = event.currentTarget.getBoundingClientRect().top
      let shop = {
        'id': item.id,
        'name': item.name,
        'price': item.price,
        'num': 1
      }
      this.addShop(shop)
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = event.currentTarget
          ball.url = item.image
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
    },
    clickShop () {
      this.outDialogShopCart = !this.outDialogShopCart
    },
    cutNum (index) {
      this.cutShop(index)
    },
    addNum (item) {
      this.addShop(item)
    },
    shopDelete (index) {
      this.deleteShop(index)
    },
    settle () {
      this.inDialogShopCart = !this.inDialogShopCart
    },
    _sellMyShop () {
      const shopCart = this.myShop.slice()
      if (shopCart.length === 0) {
        Message({
          message: '购物箱没任何内容',
          type: 'warning'
        })
        return
      }
      sellMyShop(shopCart).then(() => {
        Message({
          message: '提交订单成功',
          type: 'success'
        })
        this.inDialogShopCart = false
        this.clickShop()
        this.cleanShop()
        window.location.reload()
      }).catch(() => {
        Message({
          message: '你不够7豆来支付这笔费用',
          type: 'error'
        })
      })
    },
    _getAllShopType () {
      getAllShopOfType(1).then((res) => {
        this.vegetables = this.vegetables.concat(res.data)
      })
        .then(() => {
          getAllShopOfType(2).then((res) => {
            this.fruit = this.fruit.concat(res.data)
          })
        })
    },
    ...mapActions([
      'addShop',
      'deleteShop',
      'cutShop',
      'cleanShop'
    ])
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
      .null
        position :absolute
        top :0
        left: 0
        width :100%
        height: 100%
        background-color: rgba(255,255,255,0.8);
        z-index: 999
        p
          text-align :center
          line-height :230px
          font-size :$font-size-large-xx
          color : $color-theme
          font-weight :900
      .item:nth-child(5)
        margin-right: 0

    .ball
      position: fixed
      z-index: 1000
      top: 0
      left: 0
      transition: all 0.88s cubic-bezier(0.275, -0.32, 0.885, 0.175)

      .inner
        width: 20px
        height: 20px
        border-radius: 50%
        transition: all 0.88s linear

      img
        width: 20px
        height: 20px
        border-radius: 50%
        animation: 0.88s shopImg

    .dialog
      .select-container
        display: flex

        .but
          display: block
          width: 20px
          height: 20px
          border-radius: 50%
          text-align: center
          line-height: 20px
          cursor: pointer

          &.cut
            background-color: $color-theme-d

          &.add
            color: white
            background-color: $color-theme

        span
          margin: 0 10px
      .settle
        margin-top :20px
        text-align :right
  .el-divider__text
    background-color: $color-background-d !important

  @keyframes shopImg
    0%
      transform: scale(2.5)
    25%
      transform: scale(1.8)
    50%
      transform: scale(1.2)
    75%
      transform: scale(0.6)
    100%
      transform: scale(0.3)
</style>
