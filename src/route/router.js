import Vue from 'vue'
import Router from 'vue-router'
import Main from '../web/main.vue'
import Welcome from '../web/welcome'
import Home from '../web/home'
import Hot from '../web/hot'
import Wish from '../web/wish'
import Shop from '../web/shop'
import MyHome from '../web/myHome'
import Help from '../web/help'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'main',
      component: Main,
      redirect: '/home',
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
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/wish',
          components: {
            box: Wish
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shop',
          components: {
            box: Shop
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/help',
          components: {
            box: Help
          },
          meta: {
            requiresAuth: true
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
