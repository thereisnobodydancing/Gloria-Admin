<!-- 公告管理 -->
<template>
  <base-card title="公告管理" :loading="false">
    <template #title-right>
      <div class="w-full flex justify-end space-x-4">
        <!-- select -->
        <div class="w-60">
          <n-select v-model:value="params.typeId" :options="typeList" label-field="name" value-field="id" placeholder="筛选：请选择公告类型" clearable />
        </div>
        <!-- search -->
        <div class="w-72">
          <n-input placeholder="搜索：请输入关键词" clearable @update:value="searchUpdate">
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </div>
      </div>
    </template>
    <div class="w-full h-full overflow-y-scroll">
      <base-pagination
        url="/announcement/getMyReceiveLogList"
        :params="params"
        size="10"
        :style="{height: `${clientHeight - 150}px`}"
      >
        <template #empty>
          <div class="w-full flex flex-col items-center justify-center space-y-2" :style="{height: `${clientHeight - 150}px`}">
            <default-empty v-if="params.keyWord.length === 0" :width="200" :height="200" />
            <search-empty v-else :width="200" :height="200" />
            <p class="text-gray-400 text-sm"> {{ params.keyWord.length === 0 ? '数据为空' : '啥也没搜到' }}</p>
          </div>
        </template>
        <template #default="slotProps">
          <div 
            class="w-full overflow-y-scroll p-5 space-y-3" 
            :style="{height: `${clientHeight - 220}px`}"
          >
            <div 
              v-for="(item, index) in slotProps.list" 
              :key="index"
              class="w-full h-32 cursor-pointer shadow-sm bg-gray-50/50 hover:shadow hover:bg-gray-50 p-2.5 flex items-center rounded"
            >
              <div class="w-full h-full flex flex-col items-start justify-around px-2">
                <h3 class="text-base">{{ item.title }}</h3>
                <div class="text-sm text-gray-400 w-2/3">
                  <p v-html="item.contents" class="line-1" />
                </div>
                <div class="text-xs text-gray-400 space-x-7">
                  <span>{{ item.companyName }}</span>
                  <span>{{ item.createdTime }}</span>
                  <div class="inline-block space-x-4 text-primary">
                    <button class="hover:underline">编辑</button>
                    <button class="hover:underline">删除</button>
                  </div>
                </div>
              </div>
              <div class="w-48 h-full bg-red-50 text-primary font-bold text-3xl text-center leading-[6.5rem] rounded font-serif">{{ item.type }}</div>
            </div>
          </div>
        </template>
      </base-pagination>
    </div>
  </base-card>
</template>

<script setup>
import api from '/src/api/index.js'
import { debounce } from 'lodash'
import { default as SearchIcon } from "@vicons/ionicons5/search"

const clientHeight = ref(document.documentElement.clientHeight)
const params = ref({
  keyWord: '',
  typeId: null
})

// 获取公告类型列表
let typeList = ref([])
api.get('/announcement/getAnnounceTypeList').then((res) => {
  if(res.data.code === 20000) typeList.value = res.data.data
})

const searchUpdate = debounce((text) => {
  params.value.keyWord = text
}, 300, { leading: false, trailing: true})

onUnmounted(() => {
  searchUpdate.cancel()
})
</script>