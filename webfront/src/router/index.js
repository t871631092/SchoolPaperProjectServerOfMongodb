import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'userManage',
    component: () => import('../views/UserManage.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/Info.vue')
  }]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
