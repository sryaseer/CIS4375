import Vue from 'vue'
import VueRouter from 'vue-router'
import Home2 from '../views/Home2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home2',
    component: Home2
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
    path: '/eventlist',
    name: 'EventList',
    component: () => import('../views/EventList.vue')
  },
  {
    path: '/createstudentaccount',
    name: 'CreateStudentAccount',
    component: () => import('../views/CreateStudentAccount.vue')
  },
  {
    path: '/AdminViewStudent',
    name: 'AdminViewStudent',
    component: () => import('../views/AdminViewStudent.vue')
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
