import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import adminLogin from '@/components/core/adminLogin.vue'
import admin from '@/components/core/admin.vue'
import login from '@/components/core/login.vue'
import index from '@/components/core/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
       component:Layout,
       path:'/',
       children:[
          {
            path:'/adminlogin',
            component:adminLogin
          },
          {
            path:'/admin',
            component:admin
          },
          {
            path:'/login',
            component:login
          },
          {
            path:'/index',
            component:index
          }
       ]
     }
  ]
})

export default router
