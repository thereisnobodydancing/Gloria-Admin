<!-- 变更部门（组织架构-成员与部门） -->
<template>
  <n-modal 
    v-model:show="modal.show"
    :mask-closable="false"  
  >
  <n-card
    title="变更部门"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
    closable 
    style="width: 600px"
    @close="modal.show = false"
  >
    <n-form 
      ref="formRef"
      :model="form"
      :rules="rules" 
      label-placement="left"
      require-mark-placement="left"
      class="px-10 mt-4"
      label-width="80"
    >
      <n-form-item path="sectorId" label="选择部门">
        <n-tree-select
          :options="modal.options"
          placeholder="请选择要变更的部门" 
          children-field="list"
          key-field="sectorId"
          label-field="sectorName"
          @update:value="handleUpdateParent"
          clearable
        />
      </n-form-item>
      <n-form-item>
        <button 
          attr-type="button" 
          class="ml-auto w-24 h-9 bg-primary text-white rounded hover:opacity-80"
          @click="handleValidateClick"
        >
          确定
        </button>
      </n-form-item>
    </n-form>
  </n-card>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import { useDialog, useMessage } from 'naive-ui'

const emit = defineEmits(['refresh'])
const dialog = useDialog()
const message = useMessage()

const modal = reactive({
  show: false,
  options: []
})
const showModal = function(list, options) {
  form.userIdList = list
  modal.options = options
  modal.show = true
}

/***** 表单 *****/
const formRef = ref()
const form = reactive({
  sectorId: '',       // 部门id
  userIdList: []
})
const rules = {
  sectorId: [{required: true, message: '部门不能为空'}]
}
const handleUpdateParent = function(value, option) {
  form.sectorId = value
}

// 验证表单
const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateSectorUser()
    } else {
      message.error("信息不完整")
    }
  })
}

// 批量修改部门成员
const updateSectorUser = function() {
  dialog.warning({
    title: '确定要变更部门吗？',
    content: '你的操作也许至关重要',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.put('/userManage/updateSectorUser', form).then((res) => {
        if(res.data.code === 20000) message.success('变更部门成功')
        emit('refresh')
        modal.show = false
      })
    },
    onNegativeClick: () => {}
  })
}

defineExpose({
  showModal
})
</script>