<template>
  <div class="w-full h-full bg-white">
    <n-tabs
      default-value="flow" 
      justify-content="center" 
      tab-style="padding: 12px 16px"
      type="line" 
      size="large"
    >
      <template #prefix>
        <div class="px-4 py-3">
          <div class="h-8 flex items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <p>新增模板</p>
          </div>
        </div>
      </template>
      <!-- 基础设置 -->
      <n-tab-pane name="base" tab="① 基础设置">
        <base-tab/>
      </n-tab-pane>
      <!-- 表单设计 -->
      <n-tab-pane name="form" tab="② 表单设计">
        <form-tab/>
      </n-tab-pane>
      <!-- 流程设计 -->
      <n-tab-pane name="flow" tab="③ 流程设计">
        <flow-tab/>
      </n-tab-pane>
      <template #suffix>
        <div class="px-4 py-3 text-right">
          <button 
            class="w-28 h-10 bg-primary text-sm text-white rounded-md hover:opacity-80"
          >
            保存模板
          </button>
        </div>
      </template>
    </n-tabs>
  </div>
</template>

<script setup>
import BaseTab from './tabs/BaseTab.vue'
import FormTab from './tabs/FormTab.vue'
import FlowTab from './tabs/FlowTab.vue'
</script>

<style>
  .n-tabs .n-tabs-nav {
    @apply items-end
  }
  .n-tabs .n-tab-pane {
    @apply p-0
  }
  .n-tabs .n-tabs-nav-scroll-wrapper {
    @apply px-6 border-b
  }
  .n-tabs-nav-scroll-content {
    border-bottom: none !important
  }
  </style>