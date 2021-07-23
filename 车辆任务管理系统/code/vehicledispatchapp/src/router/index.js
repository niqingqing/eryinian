import Vue from 'vue'
import VueRouter from 'vue-router'
import CarApplicationSend from '../views/CarApplication/CarApplicationSend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CarApplicationSend',
    component: CarApplicationSend
  },
  {
    path: '/CarApplicationCancel',
    name: 'CarApplicationCancel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CarApplication/CarApplicationCancel.vue')
  },
  {
    path: '/CarApplicationAdd',
    name: 'CarApplicationAdd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CarApplication/CarApplicationAdd.vue')
  },
  {
    path: '/CarApplicationSend',
    name: 'CarApplicationSend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CarApplication/CarApplicationSend.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
