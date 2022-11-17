
<template>
  <div class="flex-shrink-0 w-full h-16 bg-white border-b flex items-center px-5 z-20">
    <!-- logo -->
    <img :src="logoImg" alt="logo" width="101" height="36">
    <!-- avatar -->
    <div class="ml-auto p-1 rounded-lg hover:bg-gray-600/10">
      <n-dropdown 
        :options="options" 
        trigger="hover" 
        placement="bottom-end"
        @select="handleSelect"
      >
        <div class="flex items-center cursor-pointer">
          <base-avatar :image="user.headshot" :name="user.userName" :width="36" :height="36" :radius="999" />
          <div class="ml-3">{{ user.userName }}</div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup>
import logoImg from '/src/assets/logo.png'
import { NIcon } from "naive-ui"
import { default as HomeOutIcon} from "@vicons/ionicons5/HomeOutline"
import { default as ReaderOutIcon} from "@vicons/ionicons5/ReaderOutline"
import { default as LogOutIcon} from "@vicons/ionicons5/LogOutOutline"
import { useDialog, useMessage } from 'naive-ui'

const router = useRouter()
const dialog = useDialog()
const message = useMessage()
const user = JSON.parse(sessionStorage.getItem('user'))
const renderIcon = function (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const options = ref([
  {label: '首页', key: "HomeOut", icon: renderIcon(HomeOutIcon)},
  {label: '退出登录', key: "LogOut", icon: renderIcon(LogOutIcon)}
])
if(user.roleType === 'SuperAdmin') options.value.splice(1, 0, {label: '活动记录', key: "ReaderOut", icon: renderIcon(ReaderOutIcon)})
// 退出登录
const LogOut = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要退出登录吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      ['token', 'user'].forEach(item => sessionStorage.removeItem(item))
      router.replace('/login')
      message.success('已成功退出登录')
    },
    onNegativeClick: () => {}
  })
}
const handleSelect = function(key) {
  if(key === 'HomeOut') router.push('/')
  if(key === 'ReaderOut') router.push('/activity')
  if(key === 'LogOut') LogOut()
}
</script>

<style>
.n-button--warning-type {
  @apply bg-[#f0a020]
}
</style>