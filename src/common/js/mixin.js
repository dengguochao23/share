import { checkDriftByid, createDriftFromHelper, cancalDriftByid } from '../../api/drift'
import { writeComment } from '../../api/comment'
export const handle = {
  data () {
    return {
      good: {
        name: '',
        user: {
          nickname: '',
          building: 0,
          unit: 0,
          room: 0,
          star: 0
        },
        time: '',
        specification: '',
        detail: ''
      }
    }
  },
  methods: {
    onSubmitReview () {
      createDriftFromHelper(this.gid, this.good.name, this.good.user.id, 5).then((res) => {
        this.status = 1
        this.step = 1
      })
    },
    onCancalDrift (gid) {
      cancalDriftByid(gid).then((res) => {
        this.__checkDriftById(this.gid)
      })
    },
    __checkDriftById (gid) {
      checkDriftByid(gid).then((res) => {
        let good = res.data
        let pending = good.pending
        switch (pending) {
          case 1:
            this.status = 1
            this.step = 1
            break
          case 5:
            this.status = 3
            this.step = 3
            break
          case 2:
            this.status = 2
            this.step = 2
            break
          case 3:
            this.status = 0
            this.step = 0
            break
          case 4:
            this.status = 5
            this.step = 0
            break
          case 6:
            this.status = 4
            this.step = 4
            break
          case 7:
            this.status = 7
            this.step = 4
            break
        }
      }).catch((e) => {
        this.status = 0
      })
    },
    // 提交评论
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
  }
}
