import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/espacios',
    name: 'Espacios',
    component: () => import('@/views/EspaciosView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/supervisor',
    name: 'Supervisor',
    component: () => import('@/views/SupervisorView.vue'),
    meta: { requiresAuth: true, requiresSupervisor: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresSupervisor && !authStore.isSupervisor && !authStore.isAdmin) {
    next('/')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
