<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="95"
    :width="250"
    show-trigger
    :style="{height: height + 'px'}"
  >
    <div class="pb-12">
      <n-menu
        v-model:value="$route.meta.name"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </div>
  </n-layout-sider>
</template>

<script setup>
import { RouterLink } from "vue-router"
import { NIcon } from "naive-ui"
import { default as HomeIcon} from "@vicons/ionicons5/HomeOutline"
import { default as CubeIcon} from "@vicons/ionicons5/CubeOutline"
const height = document.documentElement.clientHeight - 64
const renderIcon = function (icon, color='') {
  return () => h(NIcon, { color: color }, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: () => h(RouterLink, {to: '/'}, {default: () => '首页'}), key: "Home", icon: renderIcon(HomeIcon)
  },
    {
    label: "模板管理",
    key: 'Template',
    type: "group",
    children: [
      {label: () => h(RouterLink, {to: '/template'}, {default: () => '模板管理'}), key: "Template", icon: renderIcon(CubeIcon)},
    ]
  }
  // {
  //   label: "通用管理",
  //   key: 'Base',
  //   type: "group",
  //   children: [
  //     {label: () => h(RouterLink, {to: '/base/log'}, {default: () => '日志'}), key: "BaseLog", icon: renderIcon(CreateIcon)},
  //     {label: () => h(RouterLink, {to: '/base/bulletin'}, {default: () => '公告'}), key: "BaseBulletin", icon: renderIcon(MegaphoneIcon)}
  //   ]
  // }
]
</script>