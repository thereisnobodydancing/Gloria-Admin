<template>
  <div 
    class="flex bg-gray-200 space-x-20" 
    :style="{height: height + 'px'}"
  >
    <!-- 左侧：菜单栏部分 -->
    <div class="flex-shrink-0 w-[300px] bg-white p-5 space-y-10">
      <!-- 基础控件 -->
      <div>
        <p class="text-sm text-gray-500 pb-4">基础控件</p>
        <draggable
          :list="menu1"
          :sort="false"
          animation=200
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          chosen-class="chosen"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{element}">
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
          :sort="false"
          animation=200
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          chosen-class="chosen"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{element}">
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
    <div class="w-[800px] mx-auto py-4">
      <div class="w-full h-full rounded-xl bg-white">
        <div class="h-10 rounded-t-xl bg-gray-300 px-6 flex items-center space-x-3">
          <div v-for="i in 3" :key="i" class="w-3 h-3 bg-gray-500 rounded-full" />
        </div>
        <div class="p-3">
          <draggable
            :list="list"
            group="people"
            item-key="name"
            ghost-class="ghost"
            chosen-class="chosen"
            class="w-full overflow-y-scroll border-dotted border-2 rounded-xl p-4"
            :style="{height: height-100 + 'px'}"
            @add="addList"
            @choose="chooseList"
            @update="updateList"
          >
          <template #header>
            <div v-if="list.length === 0" class="text-gray-400">点击或拖拽左侧控件至此处</div>
          </template>
            <template #item="{element, index}">
              <div class="space-y-4">
                <div
                  class="flex p-3 rounded cursor-pointer"
                  :class="{'border border-primary relative' : active === index}"
                >
                  <p class="flex-shrink-0 w-28 text-sm leading-8">{{ element.name }}：</p>
                  <!-- 单行输入框 -->
                  <div v-if="element.id === 1" class="w-full">
                    <n-input placeholder="请输入" readonly />
                  </div>
                  <!-- 多行输入框 -->
                  <div v-if="element.id === 2" class="w-full">
                    <n-input placeholder="请输入" type="textarea" readonly />
                  </div>
                  <!-- 删除按钮 -->
                  <div 
                    v-show="active === index"
                    class="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white rounded-lg transition hover:scale-125"
                    @click="removeItem(index)"
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
    <!-- 右侧仪表盘 -->
    <div 
      class="absolute right-0 h-full bg-white transition-all duration-300"
      :class="list.length === 0 || active === null ? 'w-0' : 'w-[300px]'"
    >
      333
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

// 当前选中的
const active = ref(null)

// 删除一个内容
const removeItem = function(index) {
  list.value.splice(index, 1)
  active.value = null
}
// 添加单元的回调函数
const addList = function({newIndex}) {
  active.value = list.value.length === 1 ? 0 : newIndex
}
// 选择单元时的回调函数
const chooseList = function({oldIndex}) {
  if(active.value !== oldIndex ) active.value = oldIndex
}
// 排序发生变化时的回调函数
const updateList = function({newIndex}) {
  active.value = newIndex
}
</script>

<style>
.ghost {
  @apply bg-red-100 rounded-md
}
.chosen {
  @apply border border-primary rounded-md
}
</style>