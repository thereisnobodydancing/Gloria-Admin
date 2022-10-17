<!-- 表单编辑区 -->
<template>
  <n-spin :show="showLoading">
    <div v-if="props.active" class="p-5">
      <p class="text-lg font-bold line-1">{{ process[props.active].nodeName }}</p>
      <n-tabs default-value="setUser" type="line" animated class="mt-4">
        <n-tab-pane name="setUser" :tab="`设置${process[props.active].nodeName}`">
          <div class="py-4">
            <!-- 设置审批人 -->
            <n-radio-group 
              v-model:value="process[props.active].approvalUser" 
              name="radiogroup"
              @update:value="changeApprovalUser"
            >
              <div class="flex flex-wrap">
                <n-radio v-for="item in approvalsList" :key="item.value" :value="item.value" class="block w-1/3 mb-2">
                  {{ item.label }}
                </n-radio>
              </div>
            </n-radio-group>
            <!-- 添加成员 (选择指定成员时) -->
            <template v-if="process[props.active].approvalUser === 0">
              <p class="mt-2">
                <span class="text-sm font-bold">添加成员</span>
                <span class="ml-5 text-xs text-gray-400">不能超过20人</span>
              </p>
              <div class="mt-2 flex flex-wrap">
                <div
                  v-for="(item, index) in process[props.active].approvalOptions"
                  :key="index"
                  class="mr-2.5 mb-2 h-8 rounded bg-gray-100 flex items-center px-1 cursor-default"
                >
                  <!-- 头像 -->
                  <div 
                    class="flex-shrink-0 w-[26px] h-[26px] rounded"
                    :class="item.picture ? '' : 'py-[3px] bg-primary'"
                  >
                    <img v-if="item.picture" :src="item.picture" :alt="item.name" width="26" height="26" class="rounded">
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <!-- 名字 -->
                  <p class="ml-2.5 text-xs mr-3">{{ item.name }}</p>
                  <!-- clear -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                    @click="removeApprovalOption(item.key, item.id, index)"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                  </svg>
                </div>
                <!-- 添加 -->
                <div v-if="process[props.active].approvalOptions.length < 20" class="mb-1.5">
                  <button 
                    class="w-8 h-8 border rounded text-gray-500 hover:border-primary hover:text-primary" 
                    @click="showApprovalsModal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </template>
            <!-- 添加角色 -->
            <template v-if="process[props.active].approvalUser === 4">
              <p class="mt-2 text-sm font-bold">选择角色</p>
              <n-select 
                v-model:value="process[props.active].approvals" 
                label-field="roleName"
                value-field="id"
                multiple  clearable
                :options="roleList" 
                class="mt-2"
              />
            </template>
            <!-- 多人审批时采用的审批方式 -->
            <template v-if="showMultiple">
              <p class="mt-6 text-sm font-bold">多人审批时采用的审批方式</p>
              <n-radio-group 
                v-model:value="process[props.active].approvalMethod" 
                name="radiogroup"
                class="mt-3.5 space-y-1.5"
              >
                <n-radio v-for="item in multipleList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </n-radio>
              </n-radio-group>
            </template>
          </div>
        </n-tab-pane>
        <n-tab-pane name="formRole" tab="表单操作权限">
          表单操作权限
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-spin>
  <!-- 选择指定的审批人/办理人 -->
  <add-user-modal ref="addApprovalsRef" title="选择成员" :max="20" @confirm="addApprovals" />
</template>

<script setup>
import api from '/src/api/index.js'
import useTemplateStore from '/src/store/template.js'

const props = defineProps({
  active: Number
})
const showLoading = ref(true)
setTimeout(() => showLoading.value = false, 200)
const { process }  = toRefs(useTemplateStore())
// 设置审批人
const approvalsList = [
  {value: 0, label: '指定成员'},
  {value: 1, label: '发起人自选'},
  {value: 2, label: '部门主管'},
  {value: 3, label: '直属上级'},
  {value: 4, label: '角色'},
  {value: 5, label: '发起人自己'}
]
const changeApprovalUser = function(e) {
  if(e !== 0) process.value[props.active].approvalOptions = process.value[props.active].approvalKeys = process.value[props.active].approvals = []
  if(e !== 4) process.value[props.active].approvals = []
}

/***** 添加成员 *****/
const addApprovalsRef = ref()
// 显示人员弹窗
const showApprovalsModal = function() {
  addApprovalsRef.value.showModal(process.value[props.active].approvalOptions, process.value[props.active].approvalKeys, process.value[props.active].approvals)
}
// 添加人员
const addApprovals = function({options, keys, ids}) {
  process.value[props.active].approvalOptions = options
  process.value[props.active].approvalKeys = keys
  process.value[props.active].approvals = ids
}
// 删除人员
const removeApprovalOption = function(key, id, index) {
  process.value[props.active].approvalKeys.splice(process.value[props.active].approvalKeys.indexOf(key), 1)
  process.value[props.active].approvals.splice(process.value[props.active].approvals.indexOf(id), 1)
  process.value[props.active].approvalOptions.splice(index, 1)
}

/***** 添加角色 *****/
const roleList = ref([])
api.get('/position/getCompanyPositionList').then((res) => {
  roleList.value = res.data.data
})

/**** 多人审批时采用的审批方式 *****/
const showMultiple = computed(() => {
  if(process.value[props.active].approvalUser === 0 && process.value[props.active].approvals.length > 1) return true
  if(process.value[props.active].approvalUser === 4 && process.value[props.active].approvals.length > 0) return true
  return false
})
const multipleList = [
  { value: 0, label: '会签（需所有审批人同意）' },
  { value: 1, label: '或签（一名审批人同意即可）' }
]
</script>