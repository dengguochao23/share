<template>
  <div class="user-detail">
    <div class="detail-container">
      <div class="user">
        <div class="cover"></div>
        <div class="user-info">
          <el-avatar shape="square" :size="100"
                     :src="data.image"></el-avatar>
          <p class="nickname">{{data.nickname}}</p>
          <p class="room">房号：{{data.building}}幢{{data.unit}}单元{{data.room}}</p>
          <p class="mobile">电话：{{data.mobile || '无'}}</p>
          <p class="email">邮箱：{{data.email || '无'}}</p>
          <div class="have">
            <div class="item">
              <p class="name">物品</p>
              <p class="num">{{data.goods}}</p>
            </div>
            <div class="item">
              <p class="name">7豆</p>
              <p class="num">{{data.count}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="goods">
        <p class="title">{{data.nickname}}的物品</p>
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="onSelect"
        >
          <el-table-column
            prop="time"
            label="登记日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="大类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="subsname"
            label="类别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user.nickname"
            label="用户"
            width="180">
          </el-table-column>
          <el-table-column
            prop="specification"
            label="规格">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getGoodsByUid } from '../api/goods'
import { createGoods } from '../common/js/goods'
import { noramlArray } from '../common/js/util'

export default {
  data () {
    return {
      tableData: []
    }
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this._getAllGoodByUid(this.data.id)
  },
  methods: {
    onSelect (row) {
      this.$router.push({ name: 'helpDetail', params: { gid: row.gid } })
    },
    _getAllGoodByUid (uid) {
      getGoodsByUid(uid).then((res) => {
        let normalGoods = noramlArray(createGoods)
        this.tableData = normalGoods(res.data)
      })
    }
  },
  watch: {
    data (newData) {
      this._getAllGoodByUid(newData.id)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .user-detail
    width: $width-container
    margin: 0px auto
    padding-top: 20px
    .detail-container
      margin-bottom: 100px
      .user
        position :relative
        width :100%
        height: 350px
        .cover
          width :100%
          height :350px
          position :absolute
          top :0
          left :0
          background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578227426715&di=c769c33650a89ca0b7b849a87515acba&imgtype=0&src=http%3A%2F%2Fimages.china.cn%2Fattachement%2Fjpg%2Fsite1000%2F20140709%2F00e04c3600081526f96d2a.jpg")
          background-position:center bottom
          background-repeat:no-repeat;
          background-attachment:fixed
          background-size: 100%;
        .user-info
          width :100%
          height :350px
          position :absolute
          top :0
          left :0
          background-image :linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.4) 100%);
          background-position-x: initial
          background-position-y: initial;
          background-size: initial;
          background-repeat-x: initial;
          background-repeat-y: initial;
          background-attachment: initial;
          background-origin: initial;
          background-clip: initial;
          background-color: initial;
          display :flex
          flex-direction :column
          align-items :center
          justify-content :center
          color :white
          font-size :$font-size-medium
          .nickname
            font-size :$font-size-large-x
            margin :10px auto
            font-weight :700
          .have
            margin :10px auto
            width : 200px
            display :flex
            justify-content :center
            margin-top :15px
            font-size :$font-size-large-x
            .item
              flex :1
              width :60px
              height :60px
              text-align :center
              .name
                color :$color-theme
      .goods
        padding :20px
        background-color: white
        margin-top :30px
        box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
        border-radius: 5px
        .title
          font-size :$font-size-large-x
          color :$color-theme
</style>
