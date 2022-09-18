import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout/index.vue'
const routes= [
  {
    path: '/',
    redirect: '/main'
  },
  /** -----登录页----- **/
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/login/index.vue'),
    meta: { name: 'Login', common: true }
  },
  /** ----- 业务管理（首页） ----- **/
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    children: [
      /** -------首页------- **/
      {
        path: '/home',
        name: 'Home',
        component:() => import('../views/home/index.vue'),
        meta: { name: 'Home', common: true }
      },
      /** ------模板管理------ **/
      {
        path: '/template',
        name: 'Template',
        component:() => import('../views/template/index.vue'),
        meta: { name: 'Template'}
      },
      {
        path: '/template/createTemplate',
        name: 'TemplateCreate',
        component:() => import('../views/template/create/index.vue'),
        meta: { name: 'Template'}
      },
      /** --------404-------- **/
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component:() => import('../views/404/index.vue'),
        meta: { name: 'NotFound', common: true }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach((to,from,next) => {
//   if(to.path === '/login') return next()
//   if(!window.sessionStorage.getItem("token")) return next('/login')
//   if(!to.meta.common && !JSON.parse(window.sessionStorage.getItem('sr'))[to.meta.name]) return next('/404')
//   next()
// })

export default router