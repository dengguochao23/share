<template>
  <div class="hot">
    <div class="hot-container">
      <p class="title">
        热门住户
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="onSelect"
        class="hot-list"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="building"
          label="幢"
          width="180">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单元"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room"
          label="房号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods"
          label="拥有物品数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="count"
          label="7豆数量"
          width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllUser } from '../api/user'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this._getAllUser()
  },
  methods: {
    onSelect (row) {
      console.log(this.userInfo.id)
      if (this.userInfo.id === row.id) {
        this.$router.push('/myHome')
      } else {
        this.$router.push({ name: 'HotDetail', params: { data: row } })
      }
    },
    _getAllUser () {
      getAllUser().then((res) => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/index.styl"
  .hot
    width: $width-container
    margin: 0px auto
    padding-top :20px
    .hot-container
      border-top: 5px solid $color-theme
      background-color: $color-background
      box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
      border-radius: 5px
      padding: 10px
      margin-bottom :100px
      .title
        font-size :$font-size-large-xx
      .hot-list
        padding :30px
</style>
