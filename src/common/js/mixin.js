import { checkDriftByid, createDrift, cancalDriftByid } from '../../api/drift'
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
      createDrift(this.gid, this.good.name, this.good.user.id, 5).then((res) => {
        this.status = 1
        this.step = 1
      })
    },
    onCancalDrift () {
      cancalDriftByid(this.gid).then((res) => {
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
            this.status = 4
            this.step = 4
            break
          case 3:
            this.status = 0
            this.step = 0
            break
          case 4:
            this.status = 5
            this.step = 0
        }
      }).catch((e) => {
        this.status = 0
      })
    }
  }
}
