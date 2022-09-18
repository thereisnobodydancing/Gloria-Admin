<template>
  <div 
    class="flex bg-gray-200 space-x-12" 
    :style="{height: height + 'px'}"
  >
    <!-- 左侧：菜单栏部分 -->
    <div class="flex-shrink-0 w-[300px] bg-white p-5 space-y-10">
      <!-- 基础控件 -->
      <div>
        <p class="text-sm text-gray-500 pb-4">基础控件</p>
        <draggable
          :list="menu1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{ element }">
            <button 
              class="w-full h-10 bg-gray-100 text-sm rounded hover:font-bold"
            >
              {{ element.name }}
            </button>
          </template>
        </draggable>
      </div>
      <!-- 增强控件 -->
      <div>
        <p class="text-sm text-gray-500 pb-4">增强控件</p>
        <draggable
          :list="menu2"
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{ element }">
            <button 
              class="w-full h-10 bg-gray-100 text-sm rounded hover:font-bold"
            >
              {{ element.name }}
            </button>
          </template>
        </draggable>
      </div>
    </div>
    <!-- 中间：表单生成部分 -->
    <div class="w-[800px] py-4">
      <div class="w-full h-full rounded-xl bg-white">
        <div class="h-11 rounded-t-xl bg-gray-300 px-6 flex items-center space-x-3">
          <div v-for="i in 3" :key="i" class="w-3 h-3 bg-gray-500 rounded-full" />
        </div>
        <div class="p-2">
          <draggable
            :list="list"
            group="people"
            @change="log"
            item-key="name"
            ghost-class="ghost"
            class="w-full overflow-y-scroll border-dotted border-2 rounded-xl p-4"
            :style="{height: height-130 + 'px'}"
          >
          <template #header>
            <div v-if="list.length === 0" class="text-gray-400">点击或拖拽左侧控件至此处</div>
          </template>
            <template #item="{ element }">
              <div class="space-y-4">
                <!-- 单选框 -->
                <div 
                  v-if="element.id === 1" 
                  class="flex items-center cursor-pointer p-3 rounded hover:border hover:border-primary group hover:relative"
                  @click="active = element.id"
                >
                  <p class="flex-shrink-0 w-32">{{ element.name }}：</p>
                  <input type="text" placeholder="请输入" readonly class="border w-full text-sm py-2 px-4 rounded-md cursor-pointer"/>
                  <div 
                    class="hidden group-hover:block absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-lg transition hover:scale-125"
                    
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
const height = document.documentElement.clientHeight - 161
const menu1 = [
  { name: '单行输入框', id: 1 },
  { name: '多行输入框', id: 2 },
  { name: '单选框', id: 3 },
  { name: '多选框', id: 4 },
  { name: '日期', id: 5 },
  { name: '日期区间', id: 6 },
  { name: '省市区', id: 7 },
  { name: '说明文字', id: 8 },
]
const menu2 = [
  { name: '图片上传', id: 9 },
  { name: '文件上传', id: 10 },
  { name: '成员选择', id: 11 },
]
const list = ref([])
// const active = ref(0)
const log = function(e) {
  console.log(e)
}
</script>

<style>
.ghost {
  @apply border-2 border-primary
}
</style>