<!--创建分组-->
<template>
  <n-modal 
    v-model:show="modal.show"
    :mask-closable="false"
  >
    <n-card
      title="新建分组"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      closable 
      style="width: 600px;"
      @close="modal.show = false"
    >
      <n-input v-model:value="modal.data.groupName" type="text" placeholder="请输入分组名称" />
    </n-card>
  </n-modal>
</template>

<script setup>
const modal = reactive({
  show: false,
  data: {
    groupName: ''
  }
})
const showModal = function() {
  modal.show = true
}
defineExpose({
  showModal
})
</script>