import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend',
    component: () => import('@/views/Recommend.vue'),
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/components/recommend/playlist-detail.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/components/singer/singer-detail.vue')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('@/views/Rank.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/components/recommend/playlist-detail.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue'),
    children: [
      {
        path: 'singer/:id',
        component: () => import('@/components/singer/singer-detail.vue')
      },
      {
        path: 'playlist/:id',
        component: () => import('@/components/recommend/playlist-detail.vue')
      }
    ]
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
