import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import adminLogin from '@/components/core/adminLogin.vue'
import admin from '@/components/core/admin.vue'
import login from '@/components/core/login.vue'
import index from '@/components/core/index.vue'
import register from '@/components/core/register.vue'
import userManger from '@/components/admin/userManger.vue'
import productManger from '@/components/admin/productManger.vue'
import productDetail from '@/components/home/productDetail.vue';
import orderInformation from '@/components/home/orderInformation.vue'
import orderCenter from '@/components/home/orderCenter.vue'
import orderManger from '@/components/admin/orderManger.vue'
import orderDetail from '@/components/admin/orderDetail.vue'
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
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId') || Number(localStorage.getItem('authority')) > 2) {
              router.push('/adminlogin')
            } else {
              next();
            }
          },
          children: [
            {
              path: '/userManger',
              component: userManger
            },
            {
              path: '/productManger',
              component: productManger
            },
            {
              path: '/orderManger',
              component: orderManger
            },

          ]
        },

        {
          path: '/index',
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId')) {
              router.push('/login')
            } else {
              next();
            }
          },
          component: index,
        },
        {
          path: '/productdetail',
          name: 'ProductDetail',
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId')) {
              router.push('/login')
            } else {
              next();
            }
          },
          component: productDetail
        },
        {
          path: '/order',
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId')) {
              router.push('/login')
            } else {
              next();
            }
          },
          component: orderInformation
        },
        {
          path: '/ordercenter',
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId')) {
              router.push('/login')
            } else {
              next();
            }
          },
          component: orderCenter
        },
        {
          path: '/orderdetail',
          beforeEnter:(to,form,next)=>{
            if (!localStorage.getItem('userId')) {
              router.push('/login')
            } else {
              next();
            }
          },
          component: orderDetail
        },

      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    }
  ]
})

export default router
