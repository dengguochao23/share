<template>
  <div class="drift">
    <div class="drift-container">
      <p class="title">我的足迹</p>
      <div class="head">
        <div class="selected">
          <el-radio-group v-model="select" @change="onSelect">
            <el-radio :label="'all'">全部</el-radio>
            <el-radio :label="'helper'">我是求助者</el-radio>
            <el-radio :label="'sharer'">我是分享者</el-radio>
          </el-radio-group>
        </div>
        <div class="search">
          <el-input v-model="searchInput" placeholder="请输入你要搜索的内容"></el-input>
          <el-button @click="onSearch" type="primary"><i class="iconfont iconsousuo"></i></el-button>
        </div>
      </div>
      <div class="section">
        <div class="info"><p>信息</p></div>
        <div class="specification"><p>规格</p></div>
        <div class="user"><p>用户</p></div>
        <div class="pending"><p>状态</p></div>
        <div class="control"><p>控制</p></div>
      </div>
      <ul v-if="pending.length>0" class="list">
        <li v-for="(item,index) in pending" :key="index" class="single">
          <div class="single-container">
            <div class="single-head"><i class="iconfont iconbangzhu"></i><span style="margin-right: 30px">你是{{item.youare==='helper'?'求助者':'分享者'}}</span>{{item.time}}
            </div>
            <div class="item">
              <div class="img">
                <el-image style="width: 100px;height: 100px" :src="imgSrc"></el-image>
              </div>
              <div class="intro">
                <p class="name">名字：<span class="text">{{item.name}}</span></p>
                <p class="sub">分类： <span class="text">{{item.subname}}</span></p>
                <p class="content">大类： <span class="text">{{item.content}}</span></p>
              </div>
              <div class="specification">
                <div class="text">{{item.specification}}</div>
              </div>
              <div class="user">
                <popers
                  :width="150"
                >
                  <div slot="title" class="title"><p>用户信息</p>
                  </div>
                  <div slot="body" class="body">
                    <p>{{item.user.building}}栋{{item.user.unit}}单元{{item.user.room}}</p>
                    <p>{{item.user.mobile}}</p>
                  </div>
                  <div class="nickname" slot="reference">{{item.user.nickname}}<i class="iconfont iconyonghu"></i></div>
                </popers>
              </div>
              <div class="status">{{item.req}}</div>
              <div class="control">
                <div class="helper" v-if="item.youare==='helper'">
                  <el-button style="margin: 0 ;width: 100px" v-if="item.pending===1" type="danger" @click.stop="onCancalDrift(item.id)">撤销</el-button>
                  <el-button style="margin: 0 ;width: 100px" v-if="item.pending===6" @click.stop="onOpenComment(item.gid)">评价</el-button>
                </div>
                <div class="sharer" v-else>
                  <div v-if="item.pending==1">
                    <el-button style="margin: 0 ;width: 100px;margin-bottom: 15px" type="primary" @click.stop="onSubmitReview(item.id,item.gid,item.youare,2)">审核通过</el-button>
                    <el-button style="margin: 0; width: 100px" type="danger" @click.stop="onSubmitReview(item.id,item.gid,item.youare,4)">审核不通过</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <el-pagination
          style="text-align: center;margin-top: 20px"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size=4
          @next-click="onNextPage"
          @prev-click="onPrevPage"
          @current-change="onCurrentPage"
        >
          >
        </el-pagination>
      </ul>
      <nothing v-else></nothing>
    </div>
    <el-dialog title="我要评论" :visible.sync="dialogFormComment">
      <el-form
        :label-position="'left'"
        style="width: 600px" ref="comment"
        :model="comment"
        label-width="100px"
        :hide-required-asterisk="true"
        :rules="rules"
        rel="comment"
      >
        <el-form-item label="物品评分" prop="star">
          <el-rate
            style="line-height:50px"
            v-model="comment.star"
          >
          </el-rate>
        </el-form-item>
        <el-form-item label="物品评价" prop="content">
          <el-input autosize type="textarea" v-model="comment.content" placeholder="请输入你对物品的评价"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="but" type="primary" @click.stop="onSubmitComment('comment')">提交</el-button>
      <el-button class="but" @click="dialogFormComment=!dialogFormComment">取消</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Nothing from '../components/nothing'
import Popers from '../components/popper'
import { createPending } from '../common/js/pending'
import { pending, handlePending } from '../api/drift'
import { handle } from '../common/js/mixin'
import { Message } from 'element-ui'
import { noramlArray } from '../common/js/util'
const normalPending = noramlArray(createPending)
export default {
  mixins: [handle],
  data () {
    return {
      imgSrc: 'http://pic.sooshong.com/picture/userpic2/2015-4-14/68923320154141548138.jpg',
      searchInput: '',
      pending: [],
      select: 'all',
      pendingTemp: '',
      total: 0,
      comment: {
        star: 0,
        content: ''
      },
      dialogFormComment: false,
      rules: {
        star: [{ required: true, message: '请输入货品的名字' }],
        content: [{ required: true, message: '请输入内容' }]
      },
      gid: 0
    }
  },
  created () {
    this._pending(1, 'all')
  },
  methods: {
    onSearch () {
      Message({
        message: '以后考虑增加',
        type: 'warning'
      })
    },
    onSelect (label) {
      this.pending = []
      switch (label) {
        case 'all':
          this.select = 'all'
          this._pending(1, 'all')
          break
        case 'helper':
          this.select = 'helper'
          this._pending(1, 'helper')
          break
        case 'sharer':
          this.select = 'sharer'
          this._pending(1, 'sharer')
          break
      }
    },
    onCurrentPage (page) {
      this._pending(page, this.select)
    },
    onPrevPage (page) {
      this._pending(page, this.select)
    },
    onNextPage (page) {
      this._pending(page, this.select)
    },
    // pending 的数据处理
    _pending (page, type) {
      pending(page, type).then((res) => {
        this.pending = normalPending(res.data.data)
        this.total = res.data.total
      })
    },
    // 审核通过或者不通过
    onSubmitReview (id, gid, youare, pending) {
      handlePending(id, gid, youare, pending).then((res) => {
        Message({
          message: '处理成功',
          type: 'success'
        })
        this.pending = []
        this._pending(1, this.select)
      })
    },
    // 评语
    onOpenComment (gid) {
      this.dialogFormComment = true
      this.gid = gid
    }
  },
  components: {
    Nothing,
    Popers
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .drift
    width: $width-container
    margin: 0 auto
    padding-top: 20px

    .drift-container
      border-top: 5px solid $color-theme
      background-color: $color-background
      border-radius: 5px
      padding: 30px
      margin-bottom: 100px
      box-shadow: 2px 2px 4px rgba(0, 0, 0, .12)

      .title
        font-size: $font-size-large-xx
        color: $color-theme

      .head
        display: flex
        justify-content: space-between
        height: 50px
        align-items: center

        .selected
          color: green

        .search
          width: 450px
          display: flex

      .section
        display :flex
        margin-top :20px
        justify-content: flex-start
        padding: 10px 35px 10px 35px
        .info
          width: 450px
          text-align :center
        .specification
          text-align :center
          width :140px
        .user
          text-align :center
          width :150px
        .pending
          text-align :center
          width :180px
        .control
          flex :1
          text-align :center
      .list
        list-style: none
        margin-top: 10px
        .single
          display: flex
          justify-content: flex-start
          border-radius: 4px
          border: 1px solid $color-theme
          margin-bottom: 20px
          padding: 10px 35px 20px 35px
          box-shadow: 0px 0px 4px #787878;

          .single-container
            flex: 1

            .single-head
              border-bottom: 1px solid #d2d2d2
              height: 40px
              line-height: 40px

            .item
              padding: 20px
              display: flex
              .img
                border: 1px solid black
              .intro
                margin-left: 30px
                width: 300px
                border-right: 1px solid #d2d2d2

                .text
                  color: $color-theme

              .specification
                width: 140px
                text-align: center
                border-right: 1px solid #d2d2d2
                word-wrap: break-word
                word-break: break-all
                overflow: hidden

                .text
                  width: 130px

              .user
                width: 150px
                text-align: center
                word-wrap: break-word
                word-break: break-all
                overflow: visible
                border-right: 1px solid #d2d2d2
                .title
                  font-size :$font-size-medium
                  color :white
                .nickname
                  width :150px
                .body
                  font-size :$font-size-medium
                  color: $color-text-desc
                  overflow: hidden
                  height :50px
              .status
                width: 180px
                text-align: center
                border-right: 1px solid #d2d2d2

              .control
                flex: 1px
                text-align center
                margin-left: 20px
</style>
