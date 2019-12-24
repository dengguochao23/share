<template>
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
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    step: {
      type: Number,
      default () {
        return 0
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
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
