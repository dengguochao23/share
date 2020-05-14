import Vue from 'vue'
import Router from 'vue-router'
import Main from '../web/main.vue'
import Home from '../web/home'
import store from '../store/index'
// const Hot = () => import('../web/hot.vue')
// const HotDetail = () => import('../web/user-detail.vue')
// const Wish = () => import('../web/wish.vue')
// const Shop = () => import('../web/shop.vue')
// const MyHome = () => import('../web/myHome.vue')
// const Help = () => import('../web/help.vue')
// const HelpDetail = () => import('../web/help-detail.vue')
// const Drift = () => import('../web/drift.vue')
// const NotFound = () => import('../web/not-found.vue')
// const Welcome = () => import('../web/welcome.vue')
import Hot from '../web/hot'
import HotDetail from '../web/user-detail'
import Wish from '../web/wish'
import Shop from '../web/shop'
import MyHome from '../web/myHome'
import Help from '../web/help'
import HelpDetail from '../web/help-detail'
import Drift from '../web/drift'
import NotFound from '../web/not-found'
import Welcome from '../web/welcome'
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
            requiresAuth: true
          }
        },
        {
          path: '/hot/user/',
          name: 'HotDetail',
          components: {
            box: HotDetail
          },
          props: { box: true },
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
