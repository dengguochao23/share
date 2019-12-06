import Vue from 'vue'
import Router from 'vue-router'
import Main from '../web/main.vue'
import Welcome from '../web/welcome'
import Home from '../web/home'
import Hot from '../web/hot'
import Wish from '../web/wish'
import Shop from '../web/shop'
import MyHome from '../web/myHome'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'main',
      component: Main,
      redirect: '',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home',
          components: {
            box: Home
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/myHome',
          components: {
            box: MyHome
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/hot',
          components: {
            box: Hot
          }
        },
        {
          path: '/wish',
          components: {
            box: Wish
          }
        },
        {
          path: '/shop',
          components: {
            box: Shop
          }
        }
      ]
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      store.dispatch('getUser')
      next()
    } else {
      // store.dispatch('logOut')
      next({
        path: '/welcome',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
