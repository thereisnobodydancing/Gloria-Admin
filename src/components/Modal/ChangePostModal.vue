<!-- 变更职位 -->
<template>
  <n-modal
    v-model:show="modal.show"
    :mask-closable="false"
  >
    <n-card
      title="修改职位"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      closable 
      style="width: 500px"
      @close="modal.show = false"
    >
      <div>
        <n-form 
          ref="formRef" 
          :model="form" 
          :rules="rules" 
          label-placement="left"
          require-mark-placement="left"
          class="pr-10 mt-4"
          label-width="90"
        >
        <n-form-item path="positionId" label="职位">
          <n-select
            v-model:value="form.positionId"
            filterable
            placeholder="请选择职位"
            label-field="positionName"
            value-field="id"
            clearable
            :options="postOptions"
          >
            <template #empty>
              <div />
            </template>
          </n-select>
        </n-form-item>
          <n-form-item>
            <div class="w-full text-right">
              <n-button attr-type="button" type="primary" :disabled="modal.disabled" @click="handleValidateClick">确定</n-button>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import { useDialog, useMessage } from 'naive-ui'

const emit = defineEmits(['refresh'])
const dialog = useDialog()
const message = useMessage()

// 表单
const formRef = ref()
const form = reactive({
  positionId: '',
  userIdList: []
})
const rules = {
  positionId: [{required: true, message: "输入并选择职位"}]
}

// 弹出Modal
const modal = reactive({
  show: false
})
const showModal = function(id, arr) {
  form.positionId = id
  form.userIdList = arr
  modal.show = true
  getPostOptions()
}

// 获取职位列表
const postOptions = ref([])
const getPostOptions = function() {
  api.get('/position/getCompanyPositionList').then((res) => {
    postOptions.value = res.data.data
  })
}

// 提交并检查表单
const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      updatePositionUser()
    } else {
      message.error("信息不完整")
    }
  })
}
// 修改职位
const updatePositionUser = function() {
  dialog.warning({
    title: '提示',
    content: '你的操作也许至关重要，确定要修改吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.put('/userManage/updatePositonUser', form).then((res) => {
        if(res.data.code === 20000) message.success('修改职位成功')
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