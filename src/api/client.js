import instance from './base'

export function registers (account, secret, type, building, unit, room) {
  return instance.post('/client/register', {
    'account': account,
    'secret': secret,
    'type': type,
    'building': building,
    'unit': unit,
    'room': room
  })
}
