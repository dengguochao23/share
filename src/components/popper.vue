<template>
  <div class="popper" ref="pop">
    <div @click="disable=!disable" ref="refer" class="popper__reference">
      <slot name="reference"></slot>
    </div>
    <transition name="popper">
      <div ref="arrow" class="popper__arrow" v-show="disable">
      <div class="popper_head" ref="head">
        <slot name="title"></slot>
      </div>
      <div class="poper_body">
        <slot name="body"></slot>
      </div>
      <div ref="triangle" class="triangle"></div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      disable: false
    }
  },
  props: {
    width: {
      type: Number,
      default () {
        return 100
      }
    },
    color: {
      type: String,
      default () {
        return '#1B91F3'
      }
    }
  },
  mounted () {
    this.initReference()
    this.initWidth()
  },
  methods: {
    initReference () {
      let refWidth = this.$refs.refer.scrollWidth
      let arrowWidth = this.width
      let target = (arrowWidth - refWidth) / 2
      this.$refs.arrow.style.left = `-${target - 18}px`
    },
    initWidth () {
      this.$refs.arrow.style.width = this.width + 'px'
    }
  },
  watch: {
    color (newVal) {
      this.$refs.head.style.backgroundColor = newVal
      this.$refs.triangle.style.borderColor = `transparent transparent ${newVal}`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .popper
    position: relative
    .popper__reference
      min-width: 40px
    .popper__arrow
      min-width: 100px
      position: absolute
      top :45px
      background-color: #FFFFFF;
      border-bottom-left-radius :4px
      border-bottom-right-radius :4px
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
      z-index :100
      &.popper-enter-active, &.popper-leave-active
        transition: all 0.3s
      &.popper-enter, &.popper-leave-to
        opacity :0
      .popper_head
        min-width: 40px
        text-align : center
        color: white
        font-size :$font-size-large
        border-top-left-radius :4px
        border-top-right-radius :4px
        padding :5px 15px 5px 15px
      .triangle
        width: 0
        height: 0
        margin-left: -10px
        position: absolute
        top: -6px
        left: 50%
        border-width: 0 6px 6px;
        border-style: solid;

</style>
