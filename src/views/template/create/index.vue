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
          <div class="h-8 flex items-center cursor-default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-5 cursor-pointer" @click="$router.back()">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
        <div class="px-4 py-3 text-right space-x-2">
          <n-button @click="clearTemplate">重置</n-button>
          <n-button type="primary">保存模板</n-button>
        </div>
      </template>
    </n-tabs>
  </div>
</template>

<script setup>
import useTemplateStore from '/src/store/template.js'
import { useDialog, useMessage } from 'naive-ui'
import BaseTab from './tabs/BaseTab.vue'
import FormTab from './tabs/FormTab.vue'
import FlowTab from './tabs/FlowTab.vue'
// 重置模板
const useTemplate = useTemplateStore()
const message = useMessage()
const dialog = useDialog()
const clearTemplate = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要重置已填写的模板吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      useTemplate.$reset()
      message.success('重置模板成功')
    },
    onNegativeClick: () => {}
  })
}
</script>

<style>
  .n-tabs .n-tabs-nav {
    @apply items-end
  }
  .n-tabs .n-tab-pane {
    @apply p-0
  }
  .n-tabs .n-tabs-nav-scroll-wrapper {
    @apply border-b
  }
  .n-tabs-nav-scroll-content {
    border-bottom: none !important
  }
  </style>