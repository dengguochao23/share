import moment from 'moment'

require('moment/locale/zh-cn')

class Wishes {
  constructor ({ time, id, name, info, sid, subsname, user, status }) {
    this.time = this.normalTime(time)
    this.id = id
    this.name = name
    this.info = info
    this.sid = sid
    this.subsname = subsname
    this.user = user
    this.status = this.noramalStatus(status)
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

export function createHelps (data) {
  return new Wishes({
    time: data.create_time,
    id: data.id,
    name: data.name,
    info: data.info,
    sid: data.subs['id'],
    subsname: data.subs['name'],
    user: data.user,
    status: data.from_user
  })
}
