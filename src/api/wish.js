import instance from './base'

export function getMyWish () {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/wish/get`)
}

export function addMyWish (wish) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/wish/add', {
    'sid': wish.sid,
    'name': wish.name,
    'info': wish.info
  })
}

export function upDataMyWish (wish) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/wish/update', {
    'id': wish.id,
    'name': wish.name,
    'info': wish.info
  })
}

export function handleMyGood (id, type) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post(`/wish/handle`, {
    'id': id,
    'type': type
  })
}
