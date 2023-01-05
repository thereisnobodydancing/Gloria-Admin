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
  // 导出数据 export
  {
    path: '/export',
    name: 'Export',
    component:() => import('../views/export/index.vue'),
    meta: { name: 'Export', common: true }
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

      /** ------组织架构------ **/
      // 成员与部门
      {
        path: '/organization/member',
        name: 'OrganizationMember',
        component:() => import('../views/organization/member/index.vue'),
        meta: { name: 'OrganizationMember'}
      },
      // 职位管理
      {
        path: '/organization/post',
        name: 'OrganizationPost',
        component:() => import('../views/organization/post/index.vue'),
        meta: { name: 'OrganizationPost'}
      },

      /** ------权限管理------ **/
      {
        path: '/role',
        name: 'Role',
        component:() => import('../views/role/index.vue'),
        meta: { name: 'Role'}
      },
      /** ------数据管理------ **/
      // 假勤数据（Leave）
      {
        path: '/data/leave',
        name: 'DataLeave',
        component:() => import('../views/data/leave/index.vue'),
        meta: { name: 'DataLeave'}
      },
      // 人事数据（Personnel）
      {
        path: '/data/personnel',
        name: 'DataPersonnel',
        component:() => import('../views/data/personnel/index.vue'),
        meta: { name: 'DataPersonnel'}
      },
      // 业务数据（Operations）
      {
        path: '/data/operations',
        name: 'DataOperations',
        component:() => import('../views/data/operations/index.vue'),
        meta: { name: 'DataOperations'}
      },
      // 财务数据（Finance）
      {
        path: '/data/finance',
        name: 'DataFinance',
        component:() => import('../views/data/finance/index.vue'),
        meta: { name: 'DataFinance'}
      },
      // 行政数据（Administration）
      {
        path: '/data/administration',
        name: 'DataAdministration',
        component:() => import('../views/data/administration/index.vue'),
        meta: { name: 'DataAdministration'}
      },
      // 其他数据（Other）
      {
        path: '/data/other',
        name: 'DataOther',
        component:() => import('../views/data/other/index.vue'),
        meta: { name: 'DataOther'}
      },
      /** ------账号管理------ **/
       {
        path: '/account',
        name: 'Account',
        component:() => import('../views/account/index.vue'),
        meta: { name: 'Account'}
      },

      /** ------日志管理------ **/
      {
        path: '/log',
        name: 'Log',
        component:() => import('../views/log/index.vue'),
        meta: { name: 'Log'}
      },

       /** ------公告管理------ **/
       // 公告列表
      {
        path: '/bulletin',
        name: 'Bulletin',
        component:() => import('../views/bulletin/index.vue'),
        meta: { name: 'Bulletin'}
      },
      // 公告详情
      {
        path: '/bulletin/detail/:id',
        name: 'BulletinDetail',
        component:() => import('../views/bulletin/detail/index.vue'),
        meta: { name: 'Bulletin'}
      },
      // 编辑公告
      {
        path: '/bulletin/edit/:id',
        name: 'BulletinEdit',
        component:() => import('../views/bulletin/edit/index.vue'),
        meta: { name: 'Bulletin'}
      },
      /** ------模板管理------ **/
      {
        path: '/template',
        name: 'Template',
        component:() => import('../views/template/index.vue'),
        meta: { name: 'Template'}
      },
      // 创建模板
      {
        path: '/template/createTemplate',
        name: 'TemplateCreate',
        component:() => import('../views/template/create/index.vue'),
        meta: { name: 'Template'}
      },
      // 活动记录 activity
      {
        path: '/activity',
        name: 'Activity',
        component:() => import('../views/activity/index.vue'),
        meta: { name: 'Activity', common: true }
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

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  if(!window.sessionStorage.getItem("token")) return next('/login')
  if(!to.meta.common && !JSON.parse(window.sessionStorage.getItem('sr'))[to.meta.name]) return next('/404')
  next()
})

export default router