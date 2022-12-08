<template>
  <n-spin :show="showLoading">
    <div class="w-full h-full bg-white">
      <n-tabs
        v-model:value="tabActive" 
        justify-content="center" 
        tab-style="padding: 12px 16px"
        type="line" 
        size="large"
      >
        <template #prefix>
          <div class="px-4 py-3">
            <div class="h-8 flex items-center cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-5 cursor-pointer" @click="$router.back()">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <p class="text-gray-500">{{ route.query.id ? name : '新增模板' }}</p>
            </div>
          </div>
        </template>
        <!-- 基础设置 -->
        <n-tab-pane name="base" tab="① 基础设置">
          <base-tab/>
        </n-tab-pane>
        <!-- 表单设计 -->
        <n-tab-pane name="form" tab="② 表单设计">
          <form-tab/>
        </n-tab-pane>
        <!-- 流程设计 -->
        <n-tab-pane name="flow" tab="③ 流程设计">
          <flow-tab/>
        </n-tab-pane>
        <template #suffix>
          <div class="px-4 py-3 text-right space-x-3">
            <n-popover 
              ref="popoverRef"
              :disabled="!warningData.show || warningData.list.length === 0"
              placement="bottom-end" 
              trigger="click"
            >
              <template #trigger>
                <span 
                  class="text-sm text-red-500"
                  :class="!warningData.show || warningData.list.length === 0 ? 'opacity-0 cursor-default' : 'cursor-pointer'"
                >
                  {{ warningData.num }}项不完善
                </span>
              </template>
              <div class="w-80 h-64 space-y-2.5">
                <div class="px-1 py-1.5 space-y-1.5">
                  <p class="text-base">内容不完善</p>
                  <p class="text-gray-400">以下内容不完善，请修改后发布</p>
                </div>
                <div class="w-full h-44 overflow-y-scroll space-y-2 pb-1">
                  <div 
                    v-for="(item, index) in warningData.list" :key="index"
                    class="w-full h-11 bg-gray-100 flex items-center px-4"
                  >
                    <p class="flex-shrink-0 w-16 line-1">{{ item.name }}</p>
                    <p class="flex-grow mx-1 text-gray-400 line-1">{{ item.text }}</p> 
                    <p 
                      v-if="item.type !== tabActive"
                      class="flex-shrink-0 ml-auto text-primary cursor-pointer"
                      @click="tabActive = item.type"
                    >
                      去修改
                    </p>
                  </div>
                </div>
              </div>
            </n-popover>
            <n-button @click="clearTemplate">重置</n-button>
            <n-button type="primary" :disabled="submitBtnDisabled" @click="submitTemplate">保存模板</n-button>
          </div>
        </template>
      </n-tabs>
    </div>
  </n-spin>
  <n-modal 
    :show="SuccessModal.show" 
    :mask-closable="false" 
    @after-leave="useTemplate.$reset(); $router.go(-1)"
  >
    <n-card
      style="width: 600px; position: fixed; top: 100px; left: 50%; margin-left: -200px;"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
    <template #header>
      <div class="flex items-center space-x-2">
        <div class="w-7 h-7 rounded-full text-primary font-bold border-2 border-primary flex items-center justify-center">✓</div>
        <p>{{ route.query.id ? '审批修改成功' : '审批创建成功' }}</p>
      </div>
    </template>
      <div class="pb-12 text-center">
        审批{{ route.query.id ? '修改' : '创建' }}成功，将自动返回审批类表 （{{ SuccessModal.timeout / 1000 }} 秒）
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import useTemplateStore from '/src/store/template.js'
import { useDialog, useMessage } from 'naive-ui'
import BaseTab from './tabs/BaseTab.vue'
import FormTab from './tabs/FormTab.vue'
import FlowTab from './tabs/FlowTab.vue'
import { reactive } from 'vue'

const message = useMessage()
const dialog = useDialog()
const useTemplate = useTemplateStore()
const {
  id,
  tabActive,              // tab实时位置
  name,                   // 模板名称*
  groupId,                // 所在分组*
  remark,                 // 表单说明*
  submitType,             // 谁可以发起*
  submitUsers,            // 指定提交的人员*
  submitOptions,
  submitKeys,
  templateAdministrators, // 模板管理员*
  templateAdministratorOptions,
  formList,               // 表单模板信息（要转json）*
  process,                // 流程模板信息*
  startNode,
  endNode
}  = toRefs(useTemplate)
const route = useRoute()
const showLoading = ref(false)

/***** 编辑模板 *****/
if(route.query.id && id.value.length === 0) {
  api.get('/template/getTemplateDetail', {templateId: route.query.id}).then((res) => {
    if(res.data.code === 20000) {
      id.value = res.data.data.id
      name.value = res.data.data.name
      groupId.value = res.data.data.groupId
      remark.value = res.data.data.remark
      // 谁可以发起
      submitType.value = res.data.data.submitType ? res.data.data.submitType : 'all'
      submitUsers.value = res.data.data.submitUsers ? res.data.data.submitUsers.map(item => item.id) : []
      submitKeys.value = res.data.data.submitUsers ? res.data.data.submitUsers.map(item => `u${item.id}`) : []
      submitOptions.value = res.data.data.submitUsers ? res.data.data.submitUsers.map(item => {
        return {
          checkboxDisabled: false,
          id: item.id,
          key: `u${item.id}`,
          list: null,
          name: item.userName,
          picture: item.headshot,
          type: 'user'
        }
      }) : []
      // 模板管理员
      templateAdministrators.value = res.data.data.templateAdministrators.map(item => item.id)
      templateAdministratorOptions.value = res.data.data.templateAdministrators.map((item, index) => {
        return {
          checkboxDisabled: index === 0,
          id: item.id,
          key: `u${item.id}`,
          list: null,
          name: item.userName,
          picture: item.headshot,
          type: 'user'
        }
      })
      // 表单设计
      formList.value = res.data.data.form ? JSON.parse(res.data.data.form) : []
      // 流程设计
      let approvalTemplate = JSON.parse(res.data.data.process)
      startNode.value = approvalTemplate[0]
      endNode.value = approvalTemplate[approvalTemplate.length - 1]
      process.value = approvalTemplate.slice(1, approvalTemplate.length - 1)
    }
  })
}

/***** 模板错误提示 *****/
const popoverRef = ref()
const warningData = reactive({
  show: false,
  num: null,
  warninglist: [],
  list: []
})
const updateWarningData = function() {
  let noRead = false
  let noMember = false
  let noRule = false
  process.value.forEach((item, index) => {
    if(!route.query.id && index > 0 || route.query.id && index > 0 && index < process.value.length - 1) {
      noRead = item.formReadPerm.length === 0
      noMember = item.approvalUser === 0 && item.approvals.length === 0
      noRule = item.approvalUser === 4 && item.approvals.length === 0
    }
  })
  warningData.warninglist = [
    { type: 'base', name: '基础设置', text: '名称为空，请填写', show: !name.value },
    { type: 'base',name: '基础设置', text: '分组为空，请选择', show: !groupId.value },
    { type: 'form',name: '表单设计', text: '至少需要一个控件', show: formList.value.length === 0},
    // { type: 'flow',name: '流程设计', text: '至少需要一个审批节点', show: !process.value.find(item => item.nodeType === '1')},
    { type: 'flow',name: '流程设计', text: '至少添加一名成员', show: noMember},
    { type: 'flow',name: '流程设计', text: '至少添加一个角色', show: noRule},
    { type: 'flow',name: '流程设计', text: '至少设置一个控件可读', show: noRead}
  ]
  warningData.list = warningData.warninglist.filter(item => item.show === true)
  warningData.num = warningData.list.filter(item => item.show === true).length
}
updateWarningData()
watch(() => [name.value, groupId.value, formList.value, process.value], () => {
  updateWarningData()
}, { deep: true })

/***** 重置模板 *****/
const clearTemplate = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要重置已填写的模板吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onNegativeClick: () => {},
    onPositiveClick: () => {
      useTemplate.$reset()
      message.success('重置模板成功')
    }
  })
}

/***** 保存模板 *****/
const SuccessModal = reactive({
  show: false,
  timeout: 4000
})
const countdown = () => {
  if (SuccessModal.timeout <= 1e3) {
    SuccessModal.show = submitBtnDisabled.value = false;
  } else {
    SuccessModal.timeout -= 1e3;
    setTimeout(countdown, 1e3);
  }
}
const submitBtnDisabled = ref(false)
const submitTemplate = function() {
  showLoading.value = true
  if(warningData.list.length > 0) {
    warningData.show = true
    setTimeout(() => {
      showLoading.value = false
      popoverRef.value.setShow(true)
    }, 200)
    return
  } else {
    submitBtnDisabled.value = true
    let data = {
      id: route.query.id ? route.query.id : null,
      groupId: groupId.value,
      name: name.value,
      submitType: submitType.value,
      submitUsers: submitUsers.value,
      form: JSON.stringify(formList.value),
      process: JSON.stringify([].concat( startNode.value, process.value, endNode.value)),
      templateAdministrators: templateAdministrators.value,
      remark: remark.value
    }
    api.post(`${route.query.id ? '/template/updateTemplate' : '/template/create'}`, data).then((res) => {
      if(res.data.code !== 20000) submitBtnDisabled.value = false
      if(res.data.code === 20000) {
        setTimeout(() => {
          SuccessModal.show = true
          SuccessModal.timeout = 4e3
          countdown()
        }, 100)
      }
      showLoading.value = false
    })
  }
}

onUnmounted(() => {
  if(route.query.id) useTemplate.$reset()
})
</script>

<style>
.n-tabs .n-tabs-nav {
  @apply items-end
}
.n-tabs .n-tab-pane {
  @apply p-0
}
.n-tabs .n-tabs-nav-scroll-wrapper {
  @apply border-b
}
.n-tabs-nav-scroll-content {
  border-bottom: none !important
}
</style>