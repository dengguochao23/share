import instance from './base'

export function login (info) {
  return instance.post('/token', {
    'account': info.account,
    'secret': info.secret,
    'type': info.type
  })
}
