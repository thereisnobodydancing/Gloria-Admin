<template>
  <div 
    class="flex bg-gray-200 space-x-20 relative pr-[25rem]" 
    :style="{height: height + 'px'}"
  >
    <!-- 左侧：流程图区域 -->
    <div class="w-full h-full p-8 flex flex-col items-center overflow-y-scroll">
      <div v-for="(item, index) in process" :key="index">
        <!-- 节点 -->
        <div
          class="w-56 h-20 rounded-md group relative cursor-pointer"
          :class="[{
            'bg-gray-600 cursor-not-allowed': item.nodeType === '0',
            'bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20': item.nodeType === '1',
            'bg-primary hover:shadow-lg hover:shadow-primary/20': item.nodeType === '2',
            'bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20': item.nodeType === '3',
          }]"
          @click="selNode(index)"
        >
          <div
            v-show="item.showMask"
            class="absolute inset-0 bg-gray-900/60 rounded-md flex items-center justify-center space-x-2"
            @click.prevent.stop=""
          >
            <n-button color="#999999" @click.prevent.stop="item.showMask = false">取消</n-button>
            <n-button type="primary" @click.prevent.stop="removeNode(index)">删除</n-button>
          </div>
          <div class="w-full h-7 rounded-t-md text-xs text-white flex items-center">
            <p class="px-2">{{ item.nodeName }}</p>
            <div 
              v-if="item.nodeType !== '0'"
              class="ml-auto px-2 hidden group-hover:block"
              @click.prevent.stop="item.showMask = true"  
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div 
            class="pl-3 text-sm text-gray-600 leading-[3.25rem] flex items-center bg-white rounded-b-md"
            :class="{'justify-center': item.nodeType === '0'}"
          >
            <p :class="{'text-gray-400': !item.approvalUser}">{{ item.nodeText }}</p>
            <svg v-if="index > 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-auto flex-shrink-0 w-6 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        <!-- 线 -->
        <flow-line :active="index" />
      </div>
      <!-- 流程结束 -->
      <div class="w-56 h-20 bg-white rounded-md cursor-not-allowed">
        <div class="w-full h-7 bg-gray-400 rounded-t-md leading-7 text-xs text-white px-2">结束</div>
        <p class="text-center text-sm text-gray-400 leading-[3.25rem]">流程结束</p>
      </div>
    </div>
    <!-- 右侧：编辑区域 -->
    <div 
      class="absolute right-0 h-full w-full bg-gray-900/20"
      :class="!active ? 'hidden' : 'block'"
      @click="active = null"
    >
    </div>
    <div 
      class="absolute right-0 h-full shadow-xl bg-white transition-all duration-300 overflow-y-scroll z-10"
      :class="!active ? 'w-0 opacity-0' : 'w-[25rem] opacity-100'"
    >
      <div v-if="active" class="p-5">
        <p class="text-lg font-bold line-1">{{ process[active].nodeName }}</p>
        <n-tabs default-value="setUser" type="line" animated class="mt-4">
          <n-tab-pane name="setUser" :tab="`设置${process[active].nodeName}`">
            <div class="p-4">
              33
            </div>
          </n-tab-pane>
          <n-tab-pane name="formRole" tab="表单操作权限">
            表单操作权限
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { nanoid } from  'nanoid'
import useTemplateStore from '/src/store/template.js'
import FlowLine from '../components/FlowLine.vue'

const height = document.documentElement.clientHeight - 155
const { process }  = toRefs(useTemplateStore())
const active = ref(null)
// 删除节点
const removeNode = function(index) {
  process.value.splice(index, 1)
}

// 选择节点
const selNode = function(index) {
  active.value = index
}
</script>