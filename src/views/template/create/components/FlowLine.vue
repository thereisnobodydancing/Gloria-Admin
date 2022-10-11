<template>
  <!-- 线 -->
  <div class="flex flex-col items-center relative">
    <div class="w-px h-14 bg-gray-400/50" />
    <!-- 加号 -->
    <div class="absolute top-3.5">
      <n-popover :show="showPopover" trigger="click" placement="right-start" :show-arrow="false" @clickoutside="showPopover = false">
        <template #trigger>
          <div class="px-4">
            <div 
              class="relative w-7 h-7 rounded-full cursor-pointer py-1 bg-primary/90 hover:bg-primary hover:shadow hover:shadow-primary"
              @click="showPopover = true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mx-auto text-white">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </div>
          </div>
        </template>
        <div class="w-80 h-32 py-2 px-1 grid grid-cols-2 grid-rows-2 gap-5">
          <!-- 审批人 -->
          <button 
            class="w-full h-full rounded-md bg-gray-100 px-2 flex items-center space-x-2.5 shadow hover:shadow-md"
            @click="addNode('1', '审批人')"
          >
            <div class="w-8 h-8 bg-white rounded-md py-1 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" class="text-orange-500 w-5 h-5 mx-auto"><path d="M32 512h448v-64H32v64zm384-256h-66.56c-16.26 0-29.44-13.18-29.44-29.44v-9.46c0-27.37 8.88-53.41 21.46-77.72c9.11-17.61 12.9-38.39 9.05-60.42c-6.77-38.78-38.47-70.7-77.26-77.45C212.62-9.04 160 37.33 160 96c0 14.16 3.12 27.54 8.69 39.58C182.02 164.43 192 194.7 192 226.49v.07c0 16.26-13.18 29.44-29.44 29.44H96c-53.02 0-96 42.98-96 96v32c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-32c0-53.02-42.98-96-96-96z" fill="currentColor"></path></svg>
            </div>
            <p class="text-sm">审批人</p>
          </button>
          <!-- 抄送人 -->
          <button 
            class="w-full h-full rounded-md bg-gray-100 px-2 flex items-center space-x-2.5 shadow hover:shadow-md"
            @click="addNode('3', '抄送人')"
          >
            <div class="w-8 h-8 bg-white rounded-md py-1.5 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-blue-500 mx-auto">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </div>
            <p class="text-sm">抄送人</p>
          </button>
          <!-- 办理人 -->
          <button 
            class="w-full h-full rounded-md bg-gray-100 px-2 flex items-center space-x-2.5 shadow hover:shadow-md"
            @click="addNode('2', '办理人')"
          >
            <div class="w-8 h-8 bg-white rounded-md py-1.5 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-primary mx-auto">
                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-sm">办理人</p>
          </button>
        </div>
      </n-popover>
    </div>
    <div 
      class="bg-gray-400/50 w-3 h-3" 
      style="clip-path: polygon(0% 0%, 100% 0%, 50% 80%)"
    />
  </div>
</template>

<script setup>
// 审批人 1， 办理人2， 抄送人 3
import {nanoid} from  'nanoid'

const props = defineProps({
  active: Number
})
const emit = defineEmits(['add'])

const showPopover = ref(false)
// 添加节点
const addNode = function(type, name) {
  showPopover.value = false
  let nodeObj = {
    nodeId: `Activity_${nanoid()}`, // 节点id
    nodeName: name,                 // 节点名称
    nodeType: type,                 // 节点类型
    showMask: false,                // 是否显示删除遮罩
    approvalMethod: '',             // 多人审批方法（或签 会签）
    approvalUser: '',               // 审批人（自选 、指定）
    formReadPerm: '',               // 表单查看全限
    formUpdatePerm: ''              // 表单编辑权限
  }
  emit('add', nodeObj, props.active)
}
</script>