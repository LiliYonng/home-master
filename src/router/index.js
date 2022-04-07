import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/MallView.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/OtherView.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/OtherView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
