import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Main from '../web/main'
import Error from '../common/js/error'

const Home = () => import(/* webpackChunkName: "home" */ '../web/home')
const MyHome = () => import(/* webpackChunkName: "home" */ '../web/myHome')
const Shop = () => import(/* webpackChunkName: "shop" */ '../web/shop.vue')
const NotFound = () => import(/* webpackChunkName: "notFound" */ '../web/not-found')
const Help = () => import(/* webpackChunkName: "help" */'../web/help')
const HelpDetail = () => import(/* webpackChunkName: "help" */'../web/help-detail')
const Drift = () => import(/* webpackChunkName: "drift" */'../web/drift')
const Welcome = () => import(/* webpackChunkName: "welcome" */'../web/welcome')
const Hot = () => import(/* webpackChunkName: "hot" */'../web/hot')
const UserDetail = () => import(/* webpackChunkName: "hot" */'../web/user-detail')
const Wish = () => import(/* webpackChunkName: "wish" */ '../web/wish')
const error = new Error()
error.init()
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/share/' : '/',
  routes: [
    {
      path: '*',
      component: NotFound,
      meta: {
        requiresAuth: true
      }
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
            keepAlive: true,
            requiresAuth: true
          }
        },
        {
          path: '/myHome',
          components: {
            box: MyHome
          },
          meta: {
            keepAlive: true,
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
            requiresAuth: true
          }
        },
        {
          path: '/wish',
          components: {
            box: Wish
          },
          meta: {
            keepAlive: true,
            requiresAuth: true
          }
        },
        {
          path: '/shop',
          components: {
            box: Shop
          },
          meta: {
            keepAlive: true,
            requiresAuth: true
          }
        },
        {
          path: '/help',
          components: {
            box: Help
          },
          meta: {
            keepAlive: true,
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
            keepAlive: true,
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
      store.dispatch('getUser').then(() => {
        next()
      }).catch(() => {
        store.dispatch('logOut')
        next({
          path: '/welcome',
          query: {
            redirect: to.fullPath
          }
        })
      })
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
  // 异常数据发送
  error.report()
})
export default router
