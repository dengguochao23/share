<template>
  <div class="main">
    <div class="head">
      <div class="head-top">
        <div class="top-container">
          <div class="head-left">
            <p><i class="el-icon-position"></i>光大世纪城</p>
            <div class="client" v-if="isLog">
              <p>您好，</p>
              <p> {{userInfo.account}} </p>
              <p>的业主</p>
              <p @click="toLogout" style="margin-left: 20px;">登出</p>
            </div>
            <div class="client" v-else>
              <p>登陆</p>
              <p>|</p>
              <p>注册</p>
            </div>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="container">
          <el-image style="height: 81px;width: 153px" :src="require('../common/img/logo.png')"></el-image>
          <div class="nav">
            <p class="nav-item" @click="home">首页</p>
            <p class="nav-item" :class="{active:select===1}" @click="hot">热心住户</p>
            <p class="nav-item" :class="{active:select===2}" @click="wish">心愿墙</p>
            <p class="nav-item" :class="{active:select===3}" @click="shop">兑换商城</p>
          </div>
          <div class="weather">
            <div class="temp">{{temp.degree}}°</div>
            <div class="weather-info">
              <span class="name">{{temp.weather}}</span>
              <poppers
                :width="254"
                :color="color"
              >
                <div slot="title" class="title">
                  空气质量指数为{{air.aqi}}{{air.aqi_name}}
                </div>
                <div class="body" slot="body">
                  <div class="single">
                    <p style="margin-top: 23px">{{air['pm2.5']}}</p>
                    <p>PM2.5</p>
                  </div>
                  <div class="single">
                    <p style="margin-top: 23px">{{air.pm10}}</p>
                    <p>PM10</p>
                  </div>
                  <div class="single">
                    <p style="margin-top: 23px">{{air.so2}}</p>
                    <p>SO2</p>
                  </div>
                  <div class="single">
                    <p style="margin-top: 23px">{{air.no2}}</p>
                    <p>NO2</p>
                  </div>
                  <div class="single">
                    <p style="margin-top: 23px">{{air.o3}}</p>
                    <p>O3</p>
                  </div>
                  <div class="single">
                    <p style="margin-top: 23px">{{air.co}}</p>
                    <p>CO</p>
                  </div>
                </div>
                <div slot="reference" class="air" ref="air">
                  <div class="circle" ref="circle"></div>
                  <span>{{air.aqi}}{{air.aqi_name}}</span>
                </div>
              </poppers>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="box" name="box"></router-view>
    <foot></foot>
  </div>
</template>

<script type="text/ecmascript-6">
import { getWeather } from '../api/weather'
import { mapGetters, mapActions } from 'vuex'
import Poppers from '../components/popper'
import Foot from '../components/foot'
export default {
  data () {
    return {
      select: 0,
      temp: {},
      air: {},
      color: ''
    }
  },
  computed: {
    isLog () {
      return this.userInfo.account !== 'undefined'
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.normalAir()
  },
  methods: {
    home () {
      this.$router.push('/home')
      this.select = 0
    },
    hot () {
      this.$router.push('/hot')
      this.select = 1
    },
    wish () {
      this.$router.push('/wish')
      this.select = 2
    },
    shop () {
      this.$router.push('/shop')
      this.select = 3
    },
    normalAir () {
      getWeather().then((res) => {
        let data = res.data
        this.temp = data.temp
        this.air = data.air
        let aqiName = this.air['aqi_name']
        switch (aqiName) {
          case '良':
            this.$refs.air.style.background = '#f0cc35'
            this.color = '#f0cc35'
            this.$refs.circle.style.backgroundPosition = '-216px -21px'
            break
          case '优':
            this.$refs.air.style.background = '#91BF5C'
            this.color = '#91BF5C'
            this.$refs.circle.style.backgroundPosition = '-216px 0px'
            break
          case '轻度污染':
            this.color = '#F1AB62'
            this.$refs.air.style.background = '#F1AB62'
            this.$refs.circle.style.backgroundPosition = '-216px -42px'
            break
        }
      })
    },
    toLogout () {
      this.logout()
      this.$router.push('/welcome')
    },
    ...mapActions({
      logout: 'logOut'
    })
  },
  components: {
    Poppers,
    Foot
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .main
    width: 100%
    .head
      width: 100%
      border-bottom: 1px solid $color-background-d
      position: fixed
      top: 0
      left: 0
      right: 0
      background-color: #F9F9F9
      z-index :999
      .head-top
        background-color: #F9F9F9
        height: 31px
        border-bottom: 1px solid #F2F2F2

        .top-container
          width: $width-container
          margin: 0 auto

          .head-left
            display: flex
            line-height: 31px
            justify-content: space-between

            .client
              display: flex
              justify-content: space-between

      .head-bottom
        background-color: $color-background
        height: 80%
        box-shadow: 0px 5px 8px rgba(0, 0, 0, .1)

        .container
          width: $width-container
          display: flex
          margin: 0 auto

          .nav
            margin-left: 140px
            display: flex
            width: 450px
            justify-content: space-around

            .nav-item
              width: 75px
              height: 75px
              line-height: 75px
              margin-top: 3px
              text-align: center

            .nav-item:hover
              color: $color-theme
              cursor: pointer

            .active
              border-bottom: 3px solid $color-theme

          .weather
            margin-left: 140px
            display: flex
            height: 50px
            margin-top: 15px
            align-items: flex-end

            .temp
              font-size: 50px
              line-height: 50px
              color: $color-theme

            .weather-info
              display: flex
              align-items: flex-end

              .name
                font-size: $font-size-large-xx
                margin-right: 30px

              .air-info
                .title
                  width: 254px
                  text-align: center
                  font-size: $font-size-large-xx

              .air
                display: flex
                align-items: center
                height: 24px
                line-height: 24px
                font-size: $font-size-medium
                background-color: #91BF5C
                padding: 3px 10px 3px 10px
                border-radius: 16px

                &.el-popper
                  padding: 0px

                .circle
                  width: 18px
                  height: 18px
                  border-radius: 18px
                  margin-right: 8px
                  background-color: #fff
                  background-image: url("https://mat1.gtimg.com/pingjs/ext2020/weather/2017/images/sprites/sprite-7d98dbada9.png")
                  background-position: -216px 0px
                  background-size: 234px 212px !important

              .body
                display: flex
                flex-direction: row
                flex-wrap: wrap
                justify-content: center

                .single
                  width: 84px
                  height: 84px
                  font-size: $font-size-medium
                  text-align: center

    .box
      margin-top :111px
      overflow :hidden
</style>
