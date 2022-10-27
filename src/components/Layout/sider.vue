<template>
  <div class="flex-shrink-0 w-52 h-full border-r">
    <n-menu
      v-model:value="$route.meta.name"
      :options="menuOptions"
    />
  </div>
</template>

<script setup>
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

const menuOptions = [
  {label: () => h(RouterLink, {to: '/'}, {default: () => '首页'}), key: "Home", icon: renderIcon(HomeIcon)},
  {
    label: "组织架构",
    key: 'Organization',
    icon: renderIcon(OrganizationIcon),
    children: [
      {label: () => h(RouterLink, {to: '/organization/member'}, {default: () => '成员与部门'}), key: "OrganizationMember"},
      {label: () => h(RouterLink, {to: '/organization/post'}, {default: () => '职位管理'}), key: "OrganizationPost"}
    ]
  },
  {label: () => h(RouterLink, {to: '/role'}, {default: () => '权限管理'}), key: "Role", icon: renderIcon(RoleIcon)},
  {
    label: "数据管理",
    key: 'Data',
    icon: renderIcon(DataIcon),
    children: [
      {label: () => h(RouterLink, {to: '/data/leave'}, {default: () => '假勤数据'}), key: "DataLeave"},
      {label: () => h(RouterLink, {to: '/data/personnel'}, {default: () => '人事数据'}), key: "DataPersonnel"},
      {label: () => h(RouterLink, {to: '/data/operations'}, {default: () => '业务数据'}), key: "DataOperations"},
      {label: () => h(RouterLink, {to: '/data/finance'}, {default: () => '财务数据'}), key: "DataFinance"},
      {label: () => h(RouterLink, {to: '/data/administration'}, {default: () => '行政数据'}), key: "DataAdministration"},
      {label: () => h(RouterLink, {to: '/data/other'}, {default: () => '其他数据'}), key: "DataOther"},
    ]
  },
  {label: () => h(RouterLink, {to: '/account'}, {default: () => '账号管理'}), key: "Account", icon: renderIcon(AccountIcon)},
  {label: () => h(RouterLink, {to: '/log'}, {default: () => '日志管理'}), key: "Log", icon: renderIcon(LogIcon)},
  {label: () => h(RouterLink, {to: '/bulletin'}, {default: () => '公告管理'}), key: "Bulletin", icon: renderIcon(BulletinIcon)},
  {label: () => h(RouterLink, {to: '/template'}, {default: () => '模板管理'}), key: "Template", icon: renderIcon(TemplateIcon)},
]
</script>