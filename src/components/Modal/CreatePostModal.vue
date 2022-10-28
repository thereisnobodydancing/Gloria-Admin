<!-- 新增/编辑前台职位 -->
<template>
  <n-modal
    v-model:show="modal.show"
    :mask-closable="false"
  >
    <n-card
      :title="modal.type === 'create' ? '新增职位' : '编辑职位'"
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
          class="px-10 mt-4"
          label-width="90"
        >
        <n-form-item path="roleName" label="职位名称">
          <n-input v-model:value="form.roleName" placeholder="请输入职位名称" clearable maxlength="12" show-count />
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
import { useMessage } from 'naive-ui'

const emit = defineEmits(['refresh'])
const message = useMessage()

const modal = reactive({
  show: false,
  type: '',
  disabled: false
})
const formRef = ref()
const form = reactive({
  companyId: JSON.parse(sessionStorage.getItem('user')).companyId,
  roleName: '',
  id: null
})

const rules = {
  roleName: [{required: true, message: "职位名称不能为空"}]
}

// 弹出弹窗
const showModal = function(type, name='', id = null) {
  form.roleName = name
  form.id = id
  modal.type = type
  modal.show = true
}

const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      modal.disabled = true
      if(modal.type === 'create') addRoleData()
      if(modal.type === 'edit') editRoleData()
    } else {
      message.error("信息不完整")
    }
  })
}

// 新增职位
const addRoleData = function() {
  modal.disabled = true
  api.post('/position/addPositionInfo', form).then((res) => {
    if(res.data.code === 20000) {
      message.success('添加成功')
      emit('refresh', modal.type, form.roleName)
      modal.show = false
    }
    if(res.data.code !== 20000) message.error(res.data.msg)
    setTimeout(() => modal.disabled = false, 200)
  })
}

// 编辑职位
const editRoleData = function() {
  modal.disabled = true
  api.put('/position/updatePositionInfo', form).then((res) => {
    if(res.data.code === 20000) {
      message.success('修改成功')
      emit('refresh', modal.type, form.roleName)
      modal.show = false
    }
    if(res.data.code !== 20000) message.error(res.data.msg)
    setTimeout(() => modal.disabled = false, 200)
  })
}

defineExpose({
  showModal
})
</script>