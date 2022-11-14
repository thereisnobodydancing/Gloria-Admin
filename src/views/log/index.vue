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
        <n-button type="primary" @click="exportExcel" :disabled="btnDisabled">导出数据</n-button>
      </div>
    </template>
    <div class="w-full h-full overflow-y-scroll">
      <div class="w-[800px] h-full mx-auto">
        <base-infinite 
          url="/log/getUserLogs"
          :params="params"
          :size=3
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
            <div
              v-for="(item, index) in slotProps.list" 
              :key="index"
              class="mt-7"
            >              
              <!-- 1, title -->
              <div class="flex items-center space-x-3.5">
                <!-- left: avatar -->
                <base-avatar :image="item.headShot" :name="item.logName" :width="44" :height="44" :font-size="16" />
                <!-- right: info -->
                <div class="flex-grow">
                  <p class="text-lg">{{ item.logName }}</p>
                  <p class="text-sm text-gray-400">{{ item.createdTime }}</p>
                </div>
              </div>
              <!-- 2, content -->
              <div 
                class="ml-[3.625rem] w-full py-8"
                :class="{'border-b': index < slotProps.list.length - 1}"
              >
                <!-- 周报 -->
                <div v-if="item.logType === 2">
                  <weekly-template :data="item" />
                </div>
              </div>
            </div>
          </template>
        </base-infinite>
      </div>
    </div>
  </base-card>
  <!-- 名片 -->
  <business-card-modal ref="cardRef" />
</template>

<script setup>
import api from '/src/api/index.js'
import downLoadXls from '/src/until/downLoadXls.js'
import { debounce, pickBy } from 'lodash'
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

// 导出数据
const btnDisabled = ref(false)
const exportExcel = function() {
  btnDisabled.value = true
  api.getBlob('/log/toExcel', pickBy(params.value)).then((res) => {
    downLoadXls(res)
    setTimeout(() => btnDisabled.value = false, 300)
  })
}
/******** 名片 ********/
const cardRef = ref()
const showCard = function(id) {
  cardRef.value.showCard(id)
}
</script>

