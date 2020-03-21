import instance from './base'

export function checkDriftByid (gid) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/drift/gid=${gid}`)
}

export function createDriftFromHelper (gid, name, shareId, count) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/drift/create/helper', {
    'gid': gid,
    'name': name,
    'uid': shareId,
    'count': count
  })
}

export function createDriftFromSharer (id, gid, name, helperId, count) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/drift/create/sharer', {
    'id': id,
    'gid': gid,
    'name': name,
    'uid': helperId,
    'count': count
  })
}

export function cancalDriftByid (gid) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post(`/drift/cancal/gid=${gid}`)
}

export function pending (p, t) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.get(`/drift/pending/page=${p}&&type=${t}`)
}

export function handlePending (id, gid, youare, pending) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/drift/handle', {
    'id': id,
    'gid': gid,
    'youare': youare,
    'pending': pending
  })
}
