import moment from 'moment'

require('moment/locale/zh-cn')

class Comment {
  constructor ({ id, time, gid, star, uid, user, content }) {
    this.id = id
    this.time = this.normalTime(time)
    this.gid = gid
    this.star = star
    this.uid = uid
    this.user = user
    this.content = content
  }

  normalTime (time) {
    let day = moment.unix(time)
    moment.locale('zh-cn')
    return day.format('LL')
  }
}

export function createComment (data) {
  return new Comment({
    id: data.id,
    time: data.create_time,
    gid: data.gid,
    star: data.star,
    uid: data.uid,
    user: data.user,
    content: data.content
  })
}
