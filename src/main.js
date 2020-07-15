import Vue from 'vue'
import router from './route/router'
import store from './store'
import './element'
import './common/stylus/index.styl'
import './common/iconfont.css'

import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
