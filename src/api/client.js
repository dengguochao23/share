import instance from './base'

// export function registerss (url, data) {
//   return axios({
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/v1'
//     },
//     mode: 'no-cors',
//     method: 'post',
//     url: url,
//     transformRequest: [function (data) {
//       data = JSON.stringify(data)
//       return data
//     }],
//     data: data,
//     params: {}
//   })
// }

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
