import Vue from 'vue'
import Loading from './components/loading'
import CreateAPI from 'vue-create-api'

Vue.use(CreateAPI)
Vue.createAPI(Loading, true)
