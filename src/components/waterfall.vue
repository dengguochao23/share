<template>
  <div class="water-fall" ref="fall">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
const GEP = 20
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.location()
    }, 50)
  },
  methods: {
    location () {
      let fallParent = this.$refs.fall
      let fallChildren = fallParent.children
      let imgWidth = 200
      let gep = GEP
      let cols = Math.floor(fallParent.clientWidth / imgWidth)
      let boxHeightArray = []
      for (let i = 0; i < fallChildren.length; i++) {
        if (i < cols) {
          boxHeightArray[i] = fallChildren[i].offsetHeight
          fallChildren[i].style.position = 'absolute'
          fallChildren[i].style.top = 0 + 'px'
          let currentGep = gep * i
          fallChildren[i].style.left = imgWidth * i + currentGep + 'px'
        } else {
          let minHeight = Math.min.apply(null, boxHeightArray)
          let minIndex = boxHeightArray.findIndex((item) => {
            return item === minHeight
          })
          fallChildren[i].style.position = 'absolute'
          fallChildren[i].style.top = minHeight + gep + 'px'
          fallChildren[i].style.left = fallChildren[minIndex].offsetLeft + 'px'
          boxHeightArray[minIndex] = boxHeightArray[minIndex] + fallChildren[i].offsetHeight + gep
        }
      }
      this.initHight(boxHeightArray)
    },
    initHight (arr) {
      let maxHeight = Math.max.apply(null, arr)
      let finallyHeight = maxHeight + 100
      this.$refs.fall.style.height = finallyHeight + 'px'
    }
  },
  watch: {
    data () {
      console.log('data')
      setTimeout(() => {
        this.location()
      }, 50)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.water-fall
  width :100%
  position :relative

</style>
