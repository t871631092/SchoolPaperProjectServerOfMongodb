import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        // redirect:'/login'
        component: () => import('../views/Home.vue')
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
      },
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
