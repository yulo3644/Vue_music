import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '../views/recommend.vue'



Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'recommend',
    component: recommend
  },
  {
    path: '/search',
    name: 'search',
    // 懒加载
    component: () => import('../views/search.vue')
  },
  {
    path: '/hotRank',
    name: 'hotRank',
    // 懒加载
    component: () => import('../views/hotRank.vue')
  },
  {
    path: '/musicDetails/:id',
    name: 'musicDetails',
    // 懒加载
    component: () => import('../views/musicDetails.vue'),
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
