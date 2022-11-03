<!-- 日志管理 -->
<template>
  <base-card title="日志管理" :loading="false">
    <template #title-right>
      <div class="w-full flex justify-end space-x-4">
        <!-- select -->
        <div class="w-60">
          <n-select v-model:value="params.logType" :options="logTypeList" placeholder="筛选：请选择日志类型" clearable />
        </div>
        <!-- search -->
        <div class="w-72">
          <n-input placeholder="搜索：请输入员工姓名" clearable @update:value="searchUpdate">
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </div>
        <n-button type="primary">导出数据</n-button>
      </div>
    </template>
    <div class="w-full h-full overflow-y-scroll">
      <div class="w-[800px] h-full mx-auto">
        <base-infinite 
          url="/log/getUserLogs" 
          :params="params"
          :style="{height: `${clientHeight - 150}px`}"
        >
          <template #empty>
            <div 
              class="w-full flex flex-col items-center justify-center space-y-2" 
              :style="{height: `${clientHeight - 150}px`}"
            >
              <default-empty v-if="params.keyWord.length === 0" :width="200" :height="200" />
              <search-empty v-else :width="200" :height="200" />
              <p class="text-gray-400 text-sm"> {{ params.keyWord.length === 0 ? '数据为空' : '啥也没搜到' }}</p>
            </div>
          </template>
          <template #default="slotProps">
            {{ slotProps.list }}
          </template>
        </base-infinite>
      </div>
    </div>
  </base-card>
</template>

<script setup>
import { debounce } from 'lodash'
import { default as SearchIcon } from "@vicons/ionicons5/search"

const clientHeight = ref(document.documentElement.clientHeight)
const params = ref({
  keyWord: '',
  logType: null
})
// 日志种类
const logTypeList = [
  { label: '日报', value: 1 },
  { label: '周报', value: 2 },
  { label: '月报', value: 3 },
  { label: '年报', value: 4 },
]
// 日志搜索
const searchUpdate = debounce((text) => {
  params.value.keyWord = text
}, 300, { leading: false, trailing: true})

onUnmounted(() => {
  searchUpdate.cancel()
})
</script>