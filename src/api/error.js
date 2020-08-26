import instance from './base'

export function sendError (errorList) {
  return instance.post('/error', {
    'res': errorList
  })
}
