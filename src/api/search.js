import instance from './base'

export function searchGood (name, page) {
  instance.defaults.auth = { username: window.localStorage.getItem('token') }
  return instance.post('/search/goods/', {
    'n': name,
    'p': page
  })
}
