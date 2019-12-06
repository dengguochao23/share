<template>
  <div class="tabs" ref="tabs">
    <slot></slot>
    <ul class="list">
      <li class="list-item" :class="{active:current===index}" @click.stop="onScroll(index)" v-for="(item,index) in tabs" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
const EXCTRASCROLL = 111 + 15
export default {
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      scrollTop: [],
      current: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
      window.addEventListener('scroll', this.handleScroll)
    }, 500)
  },
  methods: {
    initScroll () {
      this.scrollTop = []
      let childs = this.$refs.tabs.children
      for (let i = 0; i < childs.length - 1; i++) {
        let top = childs[i].offsetTop - EXCTRASCROLL
        if (i === 0) {
          top = 0
        }
        this.scrollTop.push(top)
      }
    },
    handleScroll (e) {
      let scrollTop = e.target.scrollingElement.scrollTop
      const maxScrollTop = this.scrollTop[this.scrollTop.length - 1]
      for (let i = 0; i < this.scrollTop.length; i++) {
        if (scrollTop >= maxScrollTop) {
          this.current = this.scrollTop.length - 1
          break
        } else if (scrollTop >= 0 && scrollTop < this.scrollTop[0]) {
          this.current = 0
          break
        } else if (this.scrollTop[i] > scrollTop && scrollTop >= this.scrollTop[i - 1]) {
          this.current = i - 1
          break
        }
      }
    },
    onScroll (index) {
      window.removeEventListener('scroll', this.handleScroll)
      let scrollTarget = this.scrollTop[index]
      window.scrollTo({ top: scrollTarget, left: 0, behavior: 'smooth' })
      this.current = index
      setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll)
      }, 2000)
    },
    refresh () {
      this.initScroll()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/index.styl"
.tabs
  .list
    position :fixed
    top :150px
    left :50px
    list-style :none
    .list-item
      min-width :40px
      padding :5px 10px 5px 10px
      height :30px
      cursor :pointer
      &.active
        background-color: $color-theme
        color: white
</style>
