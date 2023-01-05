<template>
  <base-card :title="props.title" :loading="showPageLoading">
    <template #title-right>
      <div class="ml-auto flex items-center space-x-4">
        <!-- 筛选：申请时间 -->
        <n-date-picker 
          format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange" 
          clearable 
          @update:formatted-value="changeDate"
        />
        <!-- 筛选：审批模板 -->
        <div class="w-80">
          <n-select
            v-model:value="params.templateId" 
            :options="templateList" 
            label-field="name" 
            value-field="id" 
            placeholder="筛选：请选择审批模版"
            clearable 
          />
        </div>
        <!-- 导出数据 -->
        <n-button 
          type="primary"
          @click="toExport"
        >
          导出数据
        </n-button>
      </div>
    </template>
    <!-- 表单 -->
    <div 
      class="w-full py-3 pl-3 pr-2" 
      :style="{ height: `${clientHeight - 145}px` }"
    >
      <base-pagination
        ref="basePaginationRef"
        url="/datamanage/getProcessFileList"
        :params="params"
        :size="20"
      >
        <template #empty>
          <div
            class="w-full flex flex-col items-center justify-center space-y-2" 
            :style="{height: `${clientHeight - 150}px`}"
          >
            <default-empty :width="200" :height="200" />
            <p class="text-xs text-gray-400">数据为空</p>
          </div>
        </template>
        <template #default="slotProps">
          <div 
            class="overflow-y-scroll reactive" 
            :style="{height: `${clientHeight - 230}px`}"
          >
            <table :bordered="false">
              <thead>
                <tr>
                  <th class="w-28">审批编号</th>
                  <th>审批类型</th>
                  <th>申请人</th>
                  <th>申请时间</th>
                  <th>审批结果</th>
                  <th>审批状态</th>
                  <th class="w-40">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slotProps.list" :key="index">
                  <!-- 审批编号 -->
                  <td class="w-28">{{ item.id || '-' }}</td>
                  <!-- 审批类型 -->
                  <td>{{ item.stitle }}</td>
                  <!-- 申请人 -->
                  <td>{{ item.userName || '-' }}</td>
                  <!-- 申请时间 -->
                  <td>{{ item.createdTime }}</td>
                  <!-- 审批结果 -->
                  <td>{{ item.approvalResult || '-' }}</td>
                  <!-- 审批状态 -->
                  <td>{{ item.approvalState || '-' }}</td>
                  <!-- 操作 -->
                  <td class="w-40">
                    <n-button text type="primary" class="hover:underline" @click="showDetail(item)">查看详情</n-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </base-pagination>
    </div>
  </base-card>
  <approval-modal ref="approvalRef"/>
</template>

<script setup>
import api from '/src/api/index.js'

const router = useRouter()
const route = useRoute()

const clientHeight = ref(document.documentElement.clientHeight)
const props = defineProps({
  title: String,
  groupId: Number
})

const showPageLoading = ref(false)
const params = ref({
  startTime: '',
  endTime: '',
  templateId: null,
  groupId: props.groupId
})

// 筛选时间
const changeDate = (formattedValue) => {
  if(formattedValue) {
    params.value.startTime = formattedValue[0]
    params.value.endTime = formattedValue[1]
  } else {
    params.value.startTime = params.value.endTime = ''
  }
}
// 获取分组模板列表
const templateList = ref([])
api.get('/datamanage/getTemplateListByGroup', {groupId: props.groupId}).then((res) => {
  if(res.data.code === 20000) templateList.value = res.data.data
})

// 查看详情
const approvalRef = ref()
const showDetail = (data) => {
  approvalRef.value.drawer.show = true
  approvalRef.value.drawer.data = data
  approvalRef.value.drawer.form = JSON.parse(data.form)
  approvalRef.value.drawer.state = new Array(JSON.parse(data.form).length).fill(false)
}

const toExport = () => {
  const to = router.resolve(`/export?group_id=${props.groupId}&template_id=${params.value.templateId}&start=${params.value.startTime}&end=${params.value.endTime}`)
  window.open(to.href, "_blank");
}
</script>

<style>
table {
  @apply w-full table-fixed !important
}
thead tr th {
  @apply sticky top-0 text-left leading-10 py-2 px-4 bg-gray-100 rounded-sm text-sm z-10 !important
}
td {
  @apply text-gray-500 border-b border-gray-100 leading-10 px-4 py-2.5
}
</style>