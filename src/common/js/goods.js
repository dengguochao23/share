import moment from 'moment'
require('moment/locale/zh-cn')
class Goods {
  constructor ({ time, gid, name, image, specification, detail, subsname, user, fromAdmin, status }) {
    this.time = this.normalTime(time)
    this.gid = gid
    this.name = name
    this.image = image
    this.specification = specification
    this.detail = detail
    this.subsname = subsname
    this.user = user
    this.fromAdmin = this.normalAdmin(fromAdmin)
    this.status = this.noramalStatus(status)
  }

  normalAdmin (admin) {
    const rules = {
      0: '待审核',
      1: '审核通过',
      2: '审核不通过'
    }
    return rules[admin]
  }

  noramalStatus (status) {
    const rules = {
      1: '使用中',
      0: '暂停中'
    }
    return rules[status]
  }
  normalTime (time) {
    let day = moment.unix(time)
    moment.locale('zh-cn')
    return day.format('LL')
  }
}

export function createGoods (data) {
  return new Goods({
    time: data.create_time,
    gid: data.gid,
    name: data.name,
    image: data.image,
    specification: data.specification,
    detail: data.detail,
    subsname: data.subs['name'],
    user: data.user,
    fromAdmin: data.from_admin,
    status: data.from_user
  })
}
