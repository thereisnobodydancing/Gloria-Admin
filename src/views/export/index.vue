<!-- 导出数据 -->
<template>
  <div 
    class="w-full flex" 
    :style="{ height: `${clientHeight}px` }"
  >
    <!-- left-预览 -->
    <div class="w-2/3 h-full bg-gray-200 overflow-y-scroll flex items-center justify-center">
      <div class="w-[210mm] h-full bg-gray-100"></div>
    </div>
    <!-- right-导出 -->
    <div class="w-1/3 h-full bg-white px-5 flex flex-col relative">
      <!-- header -->
      <div class="flex-shrink-0 px-2.5 py-4 border-b text-lg">导出</div>
      <!-- content -->
      <div class="flex-grow py-5 flex">
        <div class="w-1/2 h-full border-r text-sm text-gray-600 pr-4 space-y-4">
          <!-- 审批模板 -->
          <div class="space-y-1">
            <p>审批模板：</p>
            <n-select
              v-model:value="params.templateId" 
              :options="templateList" 
              label-field="name" 
              value-field="id" 
              placeholder="筛选：请选择审批模版"
              clearable 
            />
          </div>
          <!-- 筛选日期 -->
          <div class="space-y-1">
            <p>筛选日期：</p>
            <n-date-picker 
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange" 
              clearable 
              @update:formatted-value="changeDate"
            />
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="w-full h-20 border-t flex items-center space-x-5">
        <div class="ml-auto w-28"> 
          <n-button type="primary" block size="large">导出</n-button>
        </div>
        <p class="text-sm text-gray-500">共5页</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '/src/api/index.js'

const route = useRoute()
const clientHeight = ref(document.documentElement.clientHeight)

const params = ref({
  startTime: route.query.start || '',
  endTime: route.query.end || '',
  templateId: route.query.template_id || null,
  groupId: route.query.groupId
})

// 获取分组模板列表
const templateList = ref([])
api.get('/datamanage/getTemplateListByGroup', {groupId: route.query.group_id}).then((res) => {
  if(res.data.code === 20000) templateList.value = res.data.data
})
</script>