import Vue from 'vue'
import router from './route/router'
import store from './store'
import '../theme/index.css'
import './element'
import './common/stylus/index.styl'
import './common/iconfont.css'
import App from './App.vue'
import { performaceData } from './common/js/util'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('load', function () {
  setTimeout(() => {
    performaceData()
  }, 2000)
})
