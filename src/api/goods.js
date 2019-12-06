import instance from './base'

// 拿到所有子目录和主目录
export function getAllSubs () {
  return instance.get(`/goods/get/subs`)
}

export function addMyGood (good) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/goods/add/good', {
    'cid': good.cid,
    'sid': good.sid,
    'name': good.name,
    'specification': good.specification,
    'detail': good.detail
  })
}

export function getMyGoods () {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/goods/get/mygood`)
}

export function upDataMyGood (good) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/goods/update/good', {
    'gid': good.gid,
    'specification': good.specification,
    'detail': good.detail
  })
}

export function handleMyGood (gid, type) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post(`/goods/handle/good`, {
    'gid': gid,
    'type': type
  })
}
