
<template>
  <div class="flex-shrink-0 w-full h-16 bg-white border-b flex items-center px-5 z-20">
    <!-- logo -->
    <img :src="logoImg" alt="logo" width="101" height="36">
    <!-- avatar -->
    <div class="ml-auto p-1 rounded-lg hover:bg-gray-100">
      <n-dropdown 
        :options="options" 
        trigger="click" 
        placement="bottom-end"
        @select="handleSelect"
      >
        <div class="flex items-center cursor-pointer">
          <img v-if="user.headshot" :src="user.headshot" alt="avatar" width="36" height="36" class="rounded-full">
          <div v-else class="w-9 h-9 rounded-full bg-primary py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
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
import { HomeOutline as HomeOutIcon, LogOutOutline as LogOutIcon } from "@vicons/ionicons5"
import { useDialog, useMessage } from 'naive-ui'

const router = useRouter()
const dialog = useDialog()
const message = useMessage()
const user = JSON.parse(sessionStorage.getItem('user'))
const renderIcon = function (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const options = [
  { label: '首页', key: "HomeOut", icon: renderIcon(HomeOutIcon)},
  { label: '退出登录', key: "LogOut", icon: renderIcon(LogOutIcon) }
]
// 退出登录
const LogOut = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要退出登录吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      sessionStorage.removeItem('token')
      router.replace('/login')
      message.success('已成功退出登录')
    },
    onNegativeClick: () => {}
  })
}
const handleSelect = function(key) {
  if(key === 'HomeOut') router.push('/')
  if(key === 'LogOut') LogOut()
}
</script>

<style>
.n-button--warning-type {
  @apply bg-[#f0a020]
}
</style>