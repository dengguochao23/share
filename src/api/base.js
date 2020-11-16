import axios from 'axios'
import router from '../route/router'
import store from '../store/index'
export let instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://www.ifenghua.top/v1' : 'http://127.0.0.1:5000/v1'
})
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
let pendingList = []
const removePending = (config, c) => {
  const arr = config.url
  const flagUrl = arr + '&' + config.method // 将每次存储在请求队列中的元素关键值
  if (pendingList.indexOf(flagUrl) !== -1) {
    if (c) {
      // cancelToken 实例化函数
      c()
    } else {
      // cancelToken不存在时，把队列中删掉
      pendingList.splice(pendingList.indexOf(flagUrl), 1)
    }
  } else {
    // 如果请求没有在列表中，把他放入列表中
    if (c) {
      pendingList.push(flagUrl)
    }
  }
}
// reject拦截器 先
// You can also create a cancel token by passing an executor function to the CancelToken constructor:
const CancelToken = axios.CancelToken
instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }
    if (config.method === 'post' && process.env.NODE_ENV === 'production') {
      config.cancelToken = new CancelToken(function executor (c) {
        // An executor function receives a cancel function as a parameter
        removePending(config, c)
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// respone拦截器 后
instance.interceptors.response.use(
  response => {
    if (response.config.method === 'post' && process.env.NODE_ENV === 'production') {
      removePending(response.config)
    }
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
