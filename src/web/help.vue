<template>
  <div class="help">
    <div class="help-container">
      <div class="search">
        <el-input v-model="searchInput" placeholder="请输入你要搜索的内容"></el-input>
        <el-button @click="onSearch" type="primary"><i class="iconfont iconsousuo"></i></el-button>
      </div>
      <div class="list">
        <p class="title">所有你可以求助的物品</p>
        <div class="result">
          <div>搜索关键字为<span class="name">{{resultName}}</span></div>
          <div class="total">{{totalNum}}个</div>
        </div>
        <el-divider></el-divider>
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
        <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        layout="prev, pager, next"
        :total="totalNum"
        :page-size = 4
        @next-click="onNextPage"
        @prev-click="onPrevPage"
        @current-change="onCurrentPage"
      >
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { searchGood } from '../api/search'
import { createGoods } from '../common/js/goods'
export default {
  data () {
    return {
      searchInput: '',
      tableData: [],
      page: 1,
      resultName: '空',
      totalNum: 0
    }
  },
  methods: {
    onCurrentPage (val) {
      this.page = val
      this.__searchGood(this.searchInput, this.page)
    },
    onPrevPage () {
      this.page--
      this.__searchGood(this.searchInput, this.page)
    },
    onNextPage () {
      this.page++
      this.__searchGood(this.searchInput, this.page)
    },
    onSearch () {
      this.__searchGood(this.searchInput, this.page)
    },
    __searchGood (name, page) {
      searchGood(name, page).then((res) => {
        this.tableData = []
        let data = res.data
        this.resultName = data.name
        this.totalNum = data.total
        console.log(data.total)
        this.tableData = this.normalResult(data.data)
      })
    },
    normalResult (data) {
      let temp = []
      data.forEach((d) => {
        temp.push(createGoods(d))
      })
      return temp
    },
    onSelect (row) {
      this.$router.push({ name: 'helpDetail', params: { gid: row.gid } })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .help
    width: $width-container
    margin: 0px auto
    padding-top :20px
    .help-container
      border-top: 5px solid $color-theme
      background-color: $color-background
      box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
      border-radius: 5px
      padding: 10px
      margin-bottom :100px
      .search
        display :flex
        width : 50%
        margin :20px auto
        align-items :center
      .list
        margin-top :50px
        padding :20px 50px 20px 50px
        .title
          font-size :$font-size-large-xx
        .result
          margin-top :20px
          display :flex
          color :$color-text-desc
          justify-content :space-between
          .name
            color :$color-theme

</style>
