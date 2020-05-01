<template>
  <div class="shopping" ref="shopping" :class="{'active': target === true}">
    <div class="container">
      <div class="icon-wrapper">
        <i class="iconfont icongouwuchekong icon"></i>
      </div>
      <div v-show="total.length>0" class="total">
        <p>{{total.length}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      scrollTop: 0
    }
  },
  props: {
    total: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    target () {
      return this.scrollTop >= 519
    }
  },
  mounted () {
    this.$refs.shopping.style.bottom = `100px`
    this.$refs.shopping.style.top = `auto`
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll (e) {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop >= 519) {
        this.$refs.shopping.style.top = `1096px`
        this.$refs.shopping.style.bottom = `auto`
      } else {
        this.$refs.shopping.style.bottom = `100px`
        this.$refs.shopping.style.top = `auto`
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .shopping
    position: fixed
    right: 45px
    &.active
      position: absolute
      right: 45px
    .container
      width: 80px
      height: 80px
      border-radius: 50%
      background-color: $color-theme
      color: white
      position :relative
      .icon
        font-size: $font-size-large-xx
        position: absolute
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      .total
        position: absolute
        top: 0px
        right :0px
        display: block
        color: black
        background-color: red
        width: 30px
        height: 30px
        font-size :$font-size-medium
        border-radius :50%
        text-align :center
        line-height: 30px
        color :white
</style>
