<template>
  <div 
    class="flex bg-gray-200 space-x-20 relative p-4" 
    :style="{height: height + 'px'}"
  >
    <div class="w-[210mm] h-full bg-white rounded-md mx-auto overflow-y-scroll">
      <div class="p-10 space-y-8">
        <!-- 表单名称 -->
        <div class="space-y-4">
          <p class="text-base font-bold">
            <span class="text-primary">*</span>
            <span class="ml-0.5">表单名称</span>
            <span class="ml-5 text-gray-500 text-xs font-normal">最多10字</span>
          </p>
          <n-input v-model:value="name" type="text" placeholder="请输入表单名称" maxlength="10" show-count clearable />
        </div>
        <!-- 所在分组 -->
        <div class="space-y-4">
          <p class="text-base font-bold"><span class="text-primary mr-0.5">*</span>所在分组</p>
          <n-select v-model:value="groupId" :options="groupList" label-field="groupName" value-field="id" />
        </div>
        <!-- 表单说明 -->
        <div class="space-y-4">
          <p class="text-base font-bold">
            <span>表单说明</span>
            <span class="ml-5 text-gray-500 text-xs font-normal">最多100字</span>
          </p>
          <n-input v-model:value="remark" type="textarea" placeholder="请输入表单说明" :autosize="{minRows: 3}" maxlength="100" show-count clearable />
        </div>
        <!-- 谁可以发起 -->
        <div class="space-y-4">
          <p class="text-base font-bold"><span class="text-primary mr-0.5">*</span>谁可以发起</p>
          <n-select v-model:value="submitType" :options="submitList" @update:value="changeSubmitType" />
          <div v-if="submitType === 'select'" class="flex items-center flex-wrap">
            <!-- 人员表 -->
            <div
              v-for="(item, index) in submitOptions"
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
                @click="removeSubmitOption(item.key, item.id, index)"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- 添加 -->
            <div class="mb-1.5">
              <button 
                class="w-8 h-8 border rounded text-gray-500 hover:border-primary hover:text-primary" 
                @click="showSubmitUserModal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- 模板管理员 -->
        <div class="space-y-4">
          <!-- title -->
          <p class="text-base font-bold">
            <span class="text-primary mr-0.5">*</span>
            <span>模板管理员</span>
            <span class="ml-5 text-gray-500 text-sm font-normal">可编辑模板并导出数据</span>
          </p>
          <!-- content -->
          <!-- 添加状态 -->
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in templateAdministratorOptions"
              :key="index"
              class="mr-6 mb-8 w-10 h-10 rounded-md cursor-pointer relative"
              @click="showCard(item.id)"
            >
              <base-avatar :image="item.picture" :name="item.name" :width="40" :height="40" />
              <div 
                v-if="item.id !== user.id"
                class="absolute -top-3 -right-4" 
                @click.prevent.stop="removeTemplateAdministratorOption(item.key, item.id, index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-gray-300 hover:text-red-500">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="mt-1 text-xs text-gray-500 line-1">{{ item.name }}</p>
            </div>
            <button
              aria-label="添加成员"
              class="w-10 h-10 rounded-md border border-dashed border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
              @click="showTemplateAdministratorModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 选择可以发起申请的人员 -->
  <add-user-modal ref="addSubmitUserRef" title="选择成员" @confirm="addSubmitUser" @cancel="cancelSubmitUser" />
  <!-- 选择模板管理员 -->
  <add-user-modal ref="addTemplateAdministratorRef" title="添加模板管理员" @confirm="addTemplateAdministrator" />
  <!-- 名片 -->
  <business-card-modal ref="cardRef" />
</template>

<script setup>
import api from '/src/api/index.js'
import useTemplateStore from '/src/store/template.js'
import BusinessCardModal from '/src/components/Modal/BusinessCardModal.vue'
import { toNameAvatar } from '/src/until/index.js'

const user = JSON.parse(sessionStorage.getItem('user'))
const useTemplate = useTemplateStore()
const { 
  name,                         // 模板名称
  groupId,                      // 分组id
  remark,                       // 表单说明
  submitType,                   // 谁可以发起（全员all，指定人员select）
  submitUsers,                  // 指定提交的人员
  submitOptions,                // 选择的制定提交人员列表（options） [不用提交]
  submitKeys,                   // 选择的制定提交人员列表（keys） [不用提交]
  templateAdministrators,       // 模板管理员
  templateAdministratorOptions, // 选择的模板管理员列表（options）[不用提交]
  templateAdministratorKeys     // 选择的模板管理员列表（keys）[不用提交]
}  = toRefs(useTemplate)
const height = document.documentElement.clientHeight - 145

/******** 所在分组 *******/
const groupList = ref([])
api.get('/group/groupList').then((res) => {
  if(res.data.code === 20000) groupList.value = res.data.data
})

/******** 谁可以发起 *******/
onMounted(() => submitType.value = submitUsers.value.length > 0 ? 'select' : 'all')
const addSubmitUserRef = ref()
const submitList = [
  { label: '全员', value: 'all' },
  { label: '指定人员', value: 'select' }
]
// 显示人员弹窗
const showSubmitUserModal = function() {
  addSubmitUserRef.value.showModal(submitOptions.value, submitKeys.value, submitUsers.value)
}
// 切换下拉选项
const changeSubmitType = function(value) {
  if(value === 'all') submitOptions.value = submitKeys.value = submitUsers.value = []
  if(value === 'select') showSubmitUserModal()
}
// 添加人员
const addSubmitUser = function({options, keys, ids}) {
  submitOptions.value = options
  submitKeys.value = keys
  submitUsers.value = ids
}
// 点击取消
const cancelSubmitUser = function() {
  if(submitUsers.value.length === 0) submitType.value = 'all'
}
// 删除人员
const removeSubmitOption = function(key, id, index) {
  submitKeys.value.splice(submitKeys.value.indexOf(key), 1)
  submitUsers.value.splice(submitUsers.value.indexOf(id), 1)
  submitOptions.value.splice(index, 1)
  if(submitOptions.value.length === 0) submitType.value = 'all'
}

/******** 模板管理员 *******/
const addTemplateAdministratorRef = ref()
// 初始化（默认管理员类别中有登录人）
const initTemplateAdministrator = function(arr) {
  if(!arr.includes(user.id)) {
    templateAdministratorOptions.value.unshift({
      checkboxDisabled: true,
      id: user.id,
      key: `u${user.id}`,
      list: null,
      name: user.userName,
      picture: user.headshot,
      type: 'user'
    })
    templateAdministratorKeys.value.unshift(`u${user.id}`)
    templateAdministrators.value.unshift(user.id)
  }
}
initTemplateAdministrator(templateAdministrators.value)
// 显示人员弹窗
const showTemplateAdministratorModal = function() {
  addTemplateAdministratorRef.value.showModal(templateAdministratorOptions.value, templateAdministratorKeys.value, templateAdministrators.value, [user.id])
}
// 添加人员
const addTemplateAdministrator = function({options, keys, ids}) {
  templateAdministratorOptions.value = options
  templateAdministratorKeys.value = keys
  templateAdministrators.value = ids
  initTemplateAdministrator(ids)
}
// 删除人员
const removeTemplateAdministratorOption = function(key, id, index) {
  templateAdministratorKeys.value.splice(templateAdministratorKeys.value.indexOf(key), 1)
  templateAdministrators.value.splice(templateAdministrators.value.indexOf(id), 1)
  templateAdministratorOptions.value.splice(index, 1)
}

/******** 名片 ********/
const cardRef = ref()
const showCard = function(id) {
  cardRef.value.showCard(id)
}

</script>

<style>
.n-card > .n-card__content, .n-card > .n-card__footer {
  @apply p-0
}
</style>