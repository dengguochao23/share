<template>
  <div class="help-detail">
    <div class="detail-container">
      <div class="control">
        <div class="status">
          <p class="good-name">求助物品：{{good.name}}</p>
          <div class="status-container" v-if="status===0">
            <p class="title">提交审核</p>
            <el-button class="but" @click.stop="onSubmitReview" type="primary">确定提交</el-button>
          </div>
          <div class="status-container" v-if="status===1">
            <p class="title">用户审核</p>
            <el-button @click.stop="onCancalDrift" class="but" type="danger">撤销</el-button>
          </div>
          <div class="status-container" v-if="status===3">
            <p class="title">物品领取</p>
          </div>
          <div class="status-container" v-if="status===4">
            <p class="title">完成</p>
            <el-button class="but" type="primary" @click.stop="onOpenComment(gid)">请你评价</el-button>
          </div>
          <div class="status-container" v-if="status===5">
            <p class="title">拒绝你的申请</p>
          </div>
          <div class="status-container" v-if="status===7">
            <p class="title">已经评论</p>
          </div>
        </div>
        <div class="process">
          <Process :step="step"></Process>
        </div>
        <p class="back" @click.stop="onBack">返回上一级</p>
      </div>
      <div class="good">
        <div class="user">
          <el-avatar shape="square" :size="100"
                     src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <p class="nickname">{{good.user.nickname}}</p>
          <p class="room">{{good.user.building}}栋{{good.user.unit}}单元{{good.user.room}}号</p>
          <el-rate
            v-model="good.user.star"
            disabled
            show-score
            text-color="#ff9900"
            class="star"
          ></el-rate>
        </div>
        <div class="good-info">
          <p class="title">更新时间</p>
          <p class="text">{{good.time}}</p>
          <p class="title">规格</p>
          <p class="text">{{good.specification}}</p>
          <p class="title">详情</p>
          <p class="text">{{good.detail}}</p>
        </div>
      </div>
      <div class="comment">
        <ul v-if="comments.length>0">
          <li class="item" v-for="(item,index) in comments" :key="index">
            <div class="user">
              <el-avatar shape="square" :size="50"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <p class="nickname">{{item.user.nickname}}</p>
              <p class="room">{{item.user.building}}栋{{item.user.unit}}单元{{item.user.room}}</p>
            </div>
            <div class="comment-text">
              <el-rate
                v-model="item.star"
                disabled
                show-score
                text-color="#ff9900"
                class="star"
              ></el-rate>
              <p class="time">{{item.time}}</p>
              <p class="text">{{item.content}}</p>
            </div>
          </li>
        </ul>
        <div v-else class="nothing">
          <p>暂无评论</p>
        </div>
      </div>
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
import { getGoodByGid } from '../api/goods'
import { createGoods } from '../common/js/goods'
import { createComment } from '../common/js/comment'
import { handle } from '../common/js/mixin'
import { writeComment, getCommentByGid } from '../api/comment'
import Process from '../components/process'
export default {
  mixins: [handle],
  data () {
    return {
      star: 2,
      step: 0,
      status: 0,
      comment: {
        star: '',
        content: ''
      },
      comments: [],
      dialogFormComment: false,
      rules: {
        star: [{ required: true, message: '请输入货品的名字' }],
        content: [{ required: true, message: '请输入内容' }]
      }
    }
  },
  props: {
    gid: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  created () {
    this.goodDetail(this.gid)
    this.__checkDriftById(this.gid)
    this.__getGoodComment(this.gid)
  },
  methods: {
    onBack () {
      this.$router.back()
    },
    goodDetail (gid) {
      if (typeof gid === 'string') {
        this.$router.push('/home')
      }
      getGoodByGid(gid).then((res) => {
        this.good = createGoods(res.data)
      }).catch((e) => {
        this.onBack()
      })
    },
    __getGoodComment (gid) {
      getCommentByGid(gid).then((res) => {
        this.comments = this.normalComment(res.data)
        console.log(this.comments)
      })
    },
    normalComment (data) {
      let temp = []
      data.forEach((d) => {
        temp.push(createComment(d))
      })
      return temp
    },
    onOpenComment (gid) {
      this.dialogFormComment = true
      this.gid = gid
    },
    onSubmitComment (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          writeComment(this.gid, this.comment.star, this.comment.content).then((res) => {
            this.dialogFormComment = false
            this.__checkDriftById(this.gid)
          })
        }
      })
    }
  },
  components: {
    Process
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/index.styl"
  .help-detail
    width: $width-container
    margin: 0px auto
    padding-top: 20px

    .detail-container
      border-top: 5px solid $color-theme
      margin-bottom: 100px

      .control
        background-color: $color-background
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .1)
        border-radius: 10px
        display: flex
        height: 300px
        position: relative

        .status
          border-right: 1px dashed $color-text-desc
          width: 300px
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center

          .good-name
            margin-bottom: 20px
            color: $color-text-desc
            font-size: $font-size-medium-x

          .status-container
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center

            .title
              font-size: $font-size-large-xx
              margin-bottom: 25px

            .but
              width: 100px
              margin: 0
              margin-bottom: 15px

        .process
          flex: 1

        .back
          cursor: pointer
          position: absolute
          left: 230px
          bottom: 10px
          font-size: $font-size-small

      .good
        margin-top: 30px
        background-color: $color-background
        box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
        border-radius: 5px
        display: flex
        height: 300px

        .user
          border-right: 1px dashed $color-text-desc
          width: 300px
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center

          .nickname
            margin-top: 10px
            margin-bottom: 20px

          .room
            margin-bottom: 20px

        .good-info
          flex: 1
          padding: 30px 50px

          .title
            margin-bottom: 15px
            font-size: $font-size-large

          .text
            color: $color-text-desc
            font-size: $font-size-medium
            margin-bottom: 30px

      .comment
        margin-top: 30px
        background-color: $color-background
        box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
        border-radius: 5px
        display: flex
        padding : 20px 20px 0 20px
        .nothing
          margin-bottom :20px
        .item
          display: flex
          margin-bottom: 20px
          .user
            width: 180px
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center

          .comment-text
            flex: 1

            .time
              font-size: $font-size-medium
              margin-top: 5px

            .text
              margin-top: 5px
              font-size: $font-size-medium
</style>
