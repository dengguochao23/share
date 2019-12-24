import instance from './base'

export function getMyHelp () {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/help/get`)
}

export function addMyHelp (wish) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/help/add', {
    'sid': wish.sid,
    'name': wish.name,
    'info': wish.info
  })
}

export function upDataMyHelp (wish) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/help/update', {
    'id': wish.id,
    'name': wish.name,
    'info': wish.info
  })
}

export function handleMyHelp (id, type) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post(`/help/handle`, {
    'id': id,
    'type': type
  })
}

export function getAllWish () {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/help/all`)
}
