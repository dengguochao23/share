import Vue from 'vue'
import Router from 'vue-router'
import Main from '../web/main.vue'
import Home from '../web/home'
import store from '../store/index'
import Wish from '../web/wish'
import Shop from '../web/shop'
import MyHome from '../web/myHome'
import Help from '../web/help'
import Drift from '../web/drift'
import Hot from '../web/hot'
import HelpDetail from '../web/help-detail'
import Welcome from '../web/welcome'
import NotFound from '../web/not-found'
import UserDetail from '../web/user-detail'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/share/' : '/',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
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
            keepAlive: true,
            requiresAuth: true
          }
        },
        {
          path: '/hot/user/',
          name: 'HotDetail',
          components: {
            box: UserDetail
          },
          props: { box: true },
          meta: {
            keepAlive: true,
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
        },
        {
          path: '/help/detail/:gid',
          name: 'helpDetail',
          components: {
            box: HelpDetail
          },
          props: { box: true },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/drift',
          components: {
            box: Drift
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
      store.dispatch('logOut')
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
