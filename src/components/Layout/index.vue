
<template>
  <div class="relative text-gray-900 w-full h-screen flex flex-col">
    <!-- header: 头部栏 -->
    <layout-header />

    <div class="flex-grow w-full h-full flex" >
      <!-- sider: 菜单栏 -->
      <layout-sider/>
      <!-- body: 内容 -->
      <div class="flex-grow w-full h-full px-2.5 pt-2.5 pb-3 bg-gray-100">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutHeader from './header.vue'
import LayoutSider from './sider.vue'
</script>