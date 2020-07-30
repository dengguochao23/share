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
        <water-fall :data="wishes" ref="fall">
          <div class="item" v-for="(item, index) in wishes" :key="index">
            <div class="img">
              <el-avatar shape="square" :size="160" :src="item.user.image"></el-avatar>
            </div>
            <div class="type">
              <span>{{item.subsname}}</span>
            </div>
            <p class="name">{{item.name}}</p>
            <div class="info">{{item.info}}</div>
            <div class="bottom">
              <span class="nickname">{{item.user.nickname}}</span>
              <el-button size="small" type="primary" circle @click.stop="onSelectMyHelp(item,item.name)"><i class="iconfont iconbangzhu icon"></i></el-button>
            </div>
          </div>
        </water-fall>
        <el-pagination
          style="text-align: center;margin-top: 20px"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size = 10
          @next-click="onNextPage"
          @prev-click="onPrevPage"
          @current-change="onCurrentPage"
        >
          ></el-pagination>
      </div>
      <nothing v-else></nothing>
    </div>
    <drawer ref="draw" :goods="goods" :helper="helper" @select="createDriftFromSharer"></drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import WaterFall from '../components/waterfall'
import { getAllSubs } from '../api/goods'
import { getAllWish, getAllWishBySid, checkMyGood } from '../api/help'
import { createDriftFromSharer } from '../api/drift'
import { createHelps } from '../common/js/help'
import { createGoods } from '../common/js/goods'
import Nothing from '../components/nothing'
import Drawer from '../components/drawer'
import { loading } from '../components/loading'
import { Message } from 'element-ui'
import { noramlArray } from '../common/js/util'
export default {
  data () {
    return {
      selectValue: '',
      options: [],
      value: '',
      page: 1,
      total: 5,
      wishes: [],
      helper: {},
      goods: []
    }
  },
  created () {
    this._getAllWish(this.page)
    this._getAllSubs()
  },
  methods: {
    onSelect (sid) {
      getAllWishBySid(sid, this.page).then((res) => {
        this.total = res.data.total
        this.page = res.data.page
        let normalWishes = noramlArray(createHelps)
        this.wishes = normalWishes(res.data.data)
      })
    },
    _getAllSubs () {
      getAllSubs().then((res) => {
        this.options = res.data
      })
    },
    _getAllWish (page) {
      loading(true)
      getAllWish(page).then((res) => {
        this.total = res.data.total
        this.page = res.data.page
        let normalWishes = noramlArray(createHelps)
        this.wishes = normalWishes(res.data.data)
        loading(false)
      })
    },
    onSelectMyHelp (helper, name) {
      this.helper = helper
      checkMyGood(name).then((res) => {
        let normalGoods = noramlArray(createGoods)
        this.goods = normalGoods(res.data)
      }).catch((rej) => {
        this.goods = []
      })
      this.$refs.draw.show()
    },
    createDriftFromSharer (good, use) {
      let gid = good.gid
      let name = good.name
      let uid = use.user.id
      let count = 5
      let id = this.helper.id
      createDriftFromSharer(id, gid, name, uid, count).then((res) => {
        Message({
          message: '送出成功',
          type: 'success'
        })
      }).catch((rej) => {
        Message({
          message: '不用重复送出，你有送出同一件东西给别人了',
          type: 'error'
        })
      })
    },
    onNextPage (page) {
      this._getAllWish(page)
    },
    onPrevPage (page) {
      this._getAllWish(page)
    },
    onCurrentPage (page) {
      this._getAllWish(page)
    }
  },
  components: {
    WaterFall,
    Nothing,
    Drawer
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .wish
    padding-top: 20px
    width: $width-container
    margin: 0 auto
    .wish-container
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
            margin:0px 0px 10px 20px
          .name
            width :60%
            margin:0px 0px 10px 20px
            color: $color-theme
          .info
            width :60%
            margin:0px 0px 0px 20px
          .bottom
            width :80%
            margin :20px auto
            display:flex
            justify-content: space-between
            align-items :center
            .nickname
              font-size :$font-size-small
</style>
