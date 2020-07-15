<template>
  <div class="guide" v-if="visable">
    <div class="cover">
      <div class="intro" ref="intro">
        <p>{{intro}}</p>
        <div class="but">
          <el-button size="mini" style="margin-right: 10px" @click="hide">退出</el-button>
          <el-button-group>
            <el-button size="mini" @click="lessStep">上一步</el-button>
            <el-button size="mini" @click="addStep">下一步</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
let allIntroSteps = ''
export default {
  data () {
    return {
      // 控制显示
      visable: false,
      // 窗口显示内容
      intro: '无',
      // 步数
      step: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.animation(allIntroSteps[0]['left'], allIntroSteps[0]['top'])
    }, 50)
  },
  methods: {
    // 入口文件，必须用这个
    start (that) {
      this.visable = !this.visable
      allIntroSteps = this._intro(that)
      this.step += 1
      document.querySelector('html').style.overflowY = 'hidden'
    },
    hide () {
      this.visable = !this.visable
      // 当关闭窗口的时候 还原所有样式
      if (!this.visable) {
        allIntroSteps.forEach((step) => {
          step.el.style.zIndex = step.zIndex
        })
        document.querySelector('html').style.overflowY = 'auto'
      }
      window.localStorage.setItem('guide', true)
    },
    // 收集各个节点
    _intro (that) {
      let temp = []
      let parent = that.$parent.$el
      let steps = parent.querySelectorAll('*[data-intro]')
      let standardWidth = window.innerWidth / 2
      let standarHeight = window.innerHeight / 2
      for (let i = 0; i < steps.length; i++) {
        let step = steps[i]
        let t = {
          'zIndex': document.defaultView.getComputedStyle(step, null).zIndex,
          'top': step.getBoundingClientRect().top > standarHeight ? standarHeight + 100 : step.offsetHeight + 50,
          'left': step.getBoundingClientRect().left > standardWidth ? standardWidth - 300 : step.getBoundingClientRect().left + 100,
          'el': step,
          'w': step.scrollWidth,
          'h': step.offsetHeight,
          'scroll': step.getBoundingClientRect().top > standarHeight ? step.getBoundingClientRect().top : 0,
          'content': step.getAttribute('data-intro')
        }
        temp.push(t)
      }
      return temp
    },
    // 运行脚步
    addStep () {
      let step = this.step
      step++
      if (step > allIntroSteps.length) {
        this.hide()
      } else {
        this.step = step
      }
    },
    lessStep () {
      let step = this.step
      step--
      if (step <= 0) {
        step = 1
      } else {
        this.step = step
      }
    },
    // 动画
    animation (left, top) {
      this.$refs.intro.style.left = left + 'px'
      this.$refs.intro.style.top = top + 'px'
    }
  },
  watch: {
    // 监测步数的变化来改变样式
    step (newStep) {
      this.intro = allIntroSteps[newStep - 1].content
      for (let i = 0; i < allIntroSteps.length; i++) {
        let step = allIntroSteps[i]
        if (newStep === i + 1) {
          step.el.style.zIndex = 9999
          this.animation(step.left, step.top)
          if (step.scroll > 0) {
            window.scrollTo({ top: step.scroll - 200, left: 0, behavior: 'smooth' })
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        } else {
          step.el.style.zIndex = step.zIndex
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .guide
    .cover
      position: fixed
      top: 0
      left: 0
      width :100%
      height :100%
      background: rgba(5, 5, 5, 0.5)
      z-index :998
      .intro
        min-width :300px
        min-height :170px
        z-index :998
        background-color: white
        border :2px solid $color-theme
        border-radius :5px
        display :flex
        flex-direction :column
        justify-content :space-around
        align-items :center
        padding :15px
        position :absolute
        transition : all 0.8s
</style>
