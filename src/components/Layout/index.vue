
<template>
  <div class="relative text-gray-900 pt-16 w-full h-screen">
    <!-- 头部栏 -->
    <layout-header/>
    <n-space vertical>
      <n-layout has-sider>
        <!-- 侧边栏 -->
        <layout-sider/>
        <!-- 内容 -->
        <n-layout :style="{maxHeight: height + 'px'}">
          <div class="w-full h-full bg-gray-100 p-4">
            <router-view />
          </div>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup>
import LayoutHeader from './header.vue'
import LayoutSider from './sider.vue'

const height = document.documentElement.clientHeight
</script>