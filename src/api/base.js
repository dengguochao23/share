import axios from 'axios'
import router from '../route/router'
import store from '../store/index'
export let instance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? 'https://www.ifenghua.top/v1' : 'http://127.0.0.1:5000/v1'
  baseURL: 'https://www.ifenghua.top/v1'
})
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
// reject拦截器
instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('logOut')
          router.replace({
            path: '/welcome',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(error.response)
  }
)

export default instance
