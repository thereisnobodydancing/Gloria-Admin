<template>
  <div class="flex-shrink-0 w-52 h-full border-r">
    <n-menu
      v-model:value="$route.meta.name"
      :options="menuOptions"
    />
  </div>
</template>

<script setup>
import api from '/src/api/index.js'
import { RouterLink } from "vue-router"
import { NIcon } from "naive-ui"
import { default as HomeIcon} from "@vicons/ionicons5/HomeOutline"
import { default as OrganizationIcon} from "@vicons/ionicons5/PeopleOutline"
import { default as RoleIcon} from "@vicons/ionicons5/KeyOutline"
import { default as DataIcon} from "@vicons/ionicons5/BarChartOutline"
import { default as AccountIcon} from "@vicons/ionicons5/IdCardOutline"
import { default as LogIcon} from "@vicons/ionicons5/CreateOutline"
import { default as BulletinIcon} from "@vicons/ionicons5/MegaphoneOutline"
import { default as TemplateIcon} from "@vicons/ionicons5/BrowsersOutline"

const renderIcon = function (icon, color='') {
  return () => h(NIcon, { color: color }, { default: () => h(icon) })
}

const menuOptions = ref([
  {
    label: () => h(RouterLink, {to: '/'}, {default: () => '首页'}), 
    key: "Home", 
    icon: renderIcon(HomeIcon),
    children: null
  }
])
const menuOptions2 = [
  {
    label: "组织架构",
    key: 'Organization',
    icon: renderIcon(OrganizationIcon),
    children: [
      { label: () => h(RouterLink, {to: '/organization/member'}, {default: () => '成员与部门'}), key: "OrganizationMember", icon: null, children: null},
      { label: () => h(RouterLink, {to: '/organization/post'}, {default: () => '职位管理'}), key: "OrganizationPost", icon: null, children: null}
    ]
  },
  {
    label: () => h(RouterLink, {to: '/role'}, {default: () => '权限管理'}), 
    key: "Role", 
    icon: renderIcon(RoleIcon),
    children: null
  },
  {
    label: "数据管理",
    key: 'Data',
    icon: renderIcon(DataIcon),
    children: [
      {label: () => h(RouterLink, {to: '/data/leave'}, {default: () => '假勤数据'}), key: "DataLeave", icon: null, children: null},
      {label: () => h(RouterLink, {to: '/data/personnel'}, {default: () => '人事数据'}), key: "DataPersonnel", icon: null, children: null},
      {label: () => h(RouterLink, {to: '/data/operations'}, {default: () => '业务数据'}), key: "DataOperations", icon: null, children: null},
      {label: () => h(RouterLink, {to: '/data/finance'}, {default: () => '财务数据'}), key: "DataFinance", icon: null, children: null},
      {label: () => h(RouterLink, {to: '/data/administration'}, {default: () => '行政数据'}), key: "DataAdministration", icon: null, children: null},
      {label: () => h(RouterLink, {to: '/data/other'}, {default: () => '其他数据'}), key: "DataOther", icon: null, children: null},
    ]
  },
  {
    label: () => h(RouterLink, {to: '/account'}, {default: () => '账号管理'}), 
    key: "Account", 
    icon: renderIcon(AccountIcon),
    children: null
  },
  {
    label: () => h(RouterLink, {to: '/log'}, {default: () => '日志管理'}), 
    key: "Log", 
    icon: renderIcon(LogIcon),
    children: null
  },
  {
    label: () => h(RouterLink, {to: '/bulletin'}, {default: () => '公告管理'}), 
    key: "Bulletin", 
    icon: renderIcon(BulletinIcon),
    children: null
  },
  {
    label: () => h(RouterLink, {to: '/template'}, {default: () => '模板管理'}), 
    key: "Template", 
    icon: renderIcon(TemplateIcon),
    children: null
  },
]

api.get('/permissions/navigation').then((res) => {
  if(res.data.code === 20000) {
    sessionStorage.setItem('sr', JSON.stringify(res.data.data))    // sr --- sider role
    menuOptions2.forEach(item => {
      if(res.data.data[item.key] || [!item.children && item.children.length > 0 && item.children.find(i => res.data.data[i.key])]) {
        menuOptions.value.push({
          label: item.label, 
          key: item.key,
          icon: item.icon,
          children: item.children ? item.children.filter(i => res.data.data[i.key]) : item.children
        })
      }
    })
  }
})
</script>