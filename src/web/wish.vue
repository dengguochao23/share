<template>
  <div class="wish">
    <div class="wish-container">
      <p class="title">他人的求助</p>
      <div class="select">
        <span style="margin-right: 20px">你可快速选择:</span>
        <el-select v-model="value" placeholder="请选择" @change="onSelect">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="wish-wrapper" v-if="wishes.length>0">
        <water-fall ref="fall">
          <div class="item" v-for="(item, index) in wishes" :key="index">
            <div class="img">
              <el-avatar shape="square" :size="160"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
            <div class="type">
              <span>{{item.subsname}}</span>
            </div>
            <p class="name">{{item.name}}</p>
            <div class="info">{{item.info}}</div>
            <div class="bottom">
              <span class="nickname">{{item.user.nickname}}</span>
              <el-button size="small" type="primary" circle><i class="iconfont iconbangzhu icon"></i></el-button>
            </div>
          </div>
        </water-fall>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import WaterFall from '../components/waterfall'
import { getAllSubs } from '../api/goods'
import { getAllWish } from '../api/help'
import { createHelps } from '../common/js/help'
export default {
  data () {
    return {
      selectValue: '',
      options: [],
      value: '',
      totalNum: 5,
      wishes: []
    }
  },
  created () {
    this._getAllWish()
    this._getAllSubs()
  },
  methods: {
    onSelect (val) {
      console.log(val)
      const instance = this.$createLoading({
        $props: {
          visible: true
        }
      })
      instance.show()
    },
    _getAllSubs () {
      getAllSubs().then((res) => {
        this.options = res.data
      })
    },
    _getAllWish () {
      getAllWish().then((res) => {
        this.wishes = this.noramlWish(res.data)
        console.log(this.wishes)
      })
    },
    noramlWish (data) {
      let temp = []
      data.forEach((d) => {
        temp.push(createHelps(d))
      })
      return temp
    }
  },
  components: {
    WaterFall
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .wish
    padding-top: 20px

    .wish-container
      margin: 0 auto
      width: $width-container
      border-top: 5px solid $color-theme
      background-color: $color-background
      border-radius: 5px
      padding: 30px
      margin-bottom: 100px
      box-shadow: 2px 2px 4px rgba(0, 0, 0, .12)
      .title
        font-size: $font-size-large-xx
        color: $color-theme
      .select
        margin-top :30px
      .wish-wrapper
        width :100%
        margin-top :30px
        .item
          width :200px
          border-radius: 4px
          border: 1px solid $color-theme
          box-shadow: 0px 0px 4px #787878
          .img
            margin:20px 0px 10px 20px
          .type
            width :60%
          .name
            width :60%
            color: $color-theme
          .info
            width :60%
          .bottom
            width :80%
            margin :20px auto
            display:flex
            justify-content: space-between
            align-items :center
            .nickname
              font-size :$font-size-small
</style>
