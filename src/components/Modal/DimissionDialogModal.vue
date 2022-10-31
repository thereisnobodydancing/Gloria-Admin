<!-- 离职提示 -->
<template>
  <n-modal v-model:show="modal.show" preset="dialog" title="Dialog" style="width: 500px" >
    <template #header>
      <div class="py-1 text-base">确定要将{{ modal.name }}的账号设为离职吗？</div>
    </template>
    <div class="px-8 pt-4">
      <div class="flex space-x-2 mb-1">
        <div class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
        <p class="-mt-2 leading-6 text-gray-600">离职后，该账号将无法使用光大OA访问本企业，账号下资源会被删除。</p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
        <p class="leading-6 text-gray-600">可先通过暂停账号阻止成员登录，完成交接后再操作离职</p>
      </div>
      <n-checkbox v-model:checked="modal.checked" size="medium" label="我已阅读并知晓以上风险" class="mt-4"/>
    </div>
    <template #action>
      <div class="flex items-center space-x-2">
        <n-button @click="modal.show = false">取消</n-button>
        <n-button type="primary" :disabled="!modal.checked" @click="confirmModal">确认</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import { useMessage } from 'naive-ui'

const emit = defineEmits(['refresh'])
const message = useMessage()

const modal = reactive({
  show: false,
  id: '',
  name: '',
  checked: false,
})

const showModal = function(id, name) {
  modal.checked = false
  modal.id = id
  modal.name = name
  modal.show = true
}

const confirmModal = function() {
  api.put('/userManage/deleteUser', { userId: modal.id }, false, false).then((res) => {
    if (res.data.code === 20000) {
      message.success('离职操作成功')
      emit('refresh')
      modal.show = false
    }
    if (res.data.code !== 20000) message.warning(res.data.msg)
  })
}

defineExpose({
  showModal
})
</script>