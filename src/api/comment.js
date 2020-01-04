import instance from './base'

export function getCommentByGid (gid) {
  return instance.get(`/comment/gid=${gid}`)
}

export function writeComment (gid, star, content) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/comment/write', {
    'gid': gid,
    'content': content,
    'star': star
  })
}
