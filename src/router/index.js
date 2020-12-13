import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer.vue')
  },
  {
    path: '/rank',
    component: () => import('@/views/Rank.vue')
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
