<template>
  <transition name="draw">
    <div class="drawer" v-if="visable">
      <div class="cover" @click.stop="hide"></div>
      <div class="drawer-container">
        <div class="head">他人的求助</div>
        <div class="helper">
          <p class="text">求助者： {{helper.user.nickname}}</p>
          <p class="text">求助物品： {{helper.name}}</p>
          <P class="text">求助信息： {{helper.info}}</P>
        </div>
        <el-divider>你可借的东西</el-divider>
        <div v-if="goods.length>0">
          <div class="radio" v-for="(item,index) in goods" @click="onSelect(item, helper)" :key="index">
            <div class="left">
              <p class="name">{{item.name}}</p>
              <p>类别：{{item.subsname}}</p>
              <p class="spe">型号：{{item.specification}}</p>
              <p>上传时间：{{item.time}}</p>
            </div>
            <div class="right">
              <p>立<br>即<br>送<br>出</p>
            </div>
          </div>
        </div>
        <div v-else>
          <nothing></nothing>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Nothing from '../components/nothing'
export default {
  data () {
    return {
      visable: false
    }
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    },
    helper: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    hide () {
      this.visable = false
    },
    show () {
      this.visable = true
    },
    onSelect (good, helper) {
      this.$emit('select', good, helper)
    }
  },
  components: {
    Nothing
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .drawer
    position: fixed
    top: 0
    right: 0px
    width: 400px
    height: 100%
    z-index: 1000
    overflow: auto
    background-color: white
    &.draw-enter-active, &.draw-leave-active
      transition: all 0.3s

    &.draw-enter, &.draw-leave-to
      right: -400px

    .cover
      position: fixed
      top: 0
      left: 0
      width: 100%
      height : 100%
      opacity: 0.5
      background-color: black
      animation: mycover 0.3s
      -webkit-animation: mycover 0.3s
      z-index: -1000
    .drawer-container
      z-index: 2000
      background-color: #fff
      padding :20px
      min-height :100%
      .head
        font-size : $font-size-large
        color : $color-theme
        margin-bottom :30px
      .helper
        margin-bottom :30px
        .text
          margin-bottom :10px
      .radio
        display: flex
        width: 300px
        border-radius :5px
        min-height: 100px
        margin-bottom :20px
        align-items: center
        color :white
        background-color: $color-theme
        cursor :pointer
        .left
          flex :1
          padding :10px
          .name
            font-size :$font-size-large-x
          .spe
            width :250px
            word-wrap :break-word
        .right
          background-color: $color-theme
          width :25px

  @keyframes mycover
    0%
      opacity: 0
    100%
      opacity: 0.5
</style>
