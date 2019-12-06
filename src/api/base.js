import axios from 'axios'
import router from '../route/router'

export let instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/v1'
})

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5000'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log(token)
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
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(error.response)
  }
)

export default instance
