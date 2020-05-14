import moment from 'moment'
require('moment/locale/zh-cn')
export default class Pending {
  constructor ({ id, time, status, gid, name, content, subname, specification, detail, image, pending, youare, sharer, helper }) {
    this.id = id
    this.time = this.normalTime(time)
    this.status = status
    this.gid = gid
    this.name = name
    this.content = content
    this.subname = subname
    this.specification = specification
    this.detail = detail
    this.image = image
    this.user = this.isHelperOrSharer(youare, sharer, helper)
    this.pending = pending
    this.youare = youare
    this.req = this.normalRequester(pending, youare)
  }

  normalTime (time) {
    let day = moment.unix(time)
    moment.locale('zh-cn')
    return day.format('LL')
  }

  isHelperOrSharer (youare, sharer, helper) {
    let user = youare === 'helper' ? sharer : helper
    return user
  }

  normalRequester (pending, youare) {
    const rules = {
      1: {
        'helper': '等待对方审核',
        'sharer': '等待你审核'
      },
      2: {
        'helper': '对方审核通过',
        'sharer': '你已审核通过'
      },
      5: {
        'helper': '前往物业处领取',
        'sharer': '你的物品到达物业处'
      },
      3: {
        'helper': '你已撤销',
        'sharer': '对方已撤销'
      },
      6: {
        'helper': '你已收到物品，整个流程结束',
        'sharer': '对方已收到物品，整个流程结束'
      },
      4: {
        'helper': '对方已拒绝',
        'sharer': '你已拒绝'
      },
      7: {
        'helper': '你已评论',
        'sharer': '对方已评论'
      }
    }
    return rules[pending][youare]
  }
}

export function createPending (data) {
  return new Pending({
    id: data.id,
    time: data.create_time,
    status: data.status,
    gid: data.gid,
    name: data.name,
    content: data.good.subs.contents.name,
    subname: data.good.subs.name,
    specification: data.good.specification,
    detail: data.good.detail,
    image: data.good.image,
    pending: data.pending,
    youare: data.you_are,
    sharer: data.sharer,
    helper: data.helper
  })
}
