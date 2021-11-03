import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentHome from '../views/StudentHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StudentHome',
    component: StudentHome
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/studentlogin',
    name: 'StudentLogin',
    component: () => import('../views/StudentLogin.vue')
  },
  {
    path: '/StudentCreateAccount',
    name: 'StudentCreateAccount',
    component: () => import('../views/StudentCreateAccount.vue')
  },
  {
    path: '/AdminViewStudent/:id',
    name: 'AdminViewStudent',
    component: () => import('../views/AdminViewStudent.vue')
  },
  {
    path: '/AdminViewStudentSearch',
    name: 'AdminViewStudentSearch',
    component: () => import('../views/AdminViewStudentSearch.vue')
  },
  {
    path: '/StudentBuySession',
    name: 'StudentBuySession',
    component: () => import('../views/StudentBuySession.vue')
  },
  {
    path: '/StudentHistory',
    name: 'StudentHistory',
    component: () => import('../views/StudentHistory.vue')
  },
  {
    path: '/StudentSchedulePage',
    name: 'StudentSchedulePage',
    component: () => import('../views/StudentSchedulePage.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
