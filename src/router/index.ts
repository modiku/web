import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import adminLogin from '@/components/core/adminLogin.vue'
import admin from '@/components/core/admin.vue'
import login from '@/components/core/login.vue'
import index from '@/components/core/index.vue'
import register from '@/components/core/register.vue'
import userManger from '@/components/admin/userManger.vue'
import productManger from '@/components/admin/productManger.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Layout,
      path: '/',
      children: [
        {
          path: '/adminlogin',
          component: adminLogin
        },
        {
          path: '/admin',
          component: admin,
          children: [
            {
              path: '/userManger',
              component:userManger
            },
            {
              path: '/productManger',
              component:productManger
            },
          ]
        },
        {
          path: '/login',
          component: login
        },
        {
          path: '/index',
          component: index
        },
        {
          path: '/register',
          component: register
        }
      ]
    }
  ]
})

export default router
