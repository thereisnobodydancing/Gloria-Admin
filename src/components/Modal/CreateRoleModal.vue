<!-- 创建角色/编辑角色（权限管理） -->
<template>
  <n-modal 
    v-model:show="modal.show"
    :mask-closable="false"  
  >
    <n-card
      :title="modal.titleObj[modal.type]"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      closable 
      style="width: 600px"
      @close="closeModal"
    >
      <n-form
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-placement="left"
        require-mark-placement="left"
        class="px-10 mt-4"
        label-width="90"
      >
        <!-- 角色名称(必填) -->
        <n-form-item path="roleName" label="角色名称">
          <n-input v-model:value="form.roleName" placeholder="请输入角色名称" clearable />
        </n-form-item>
        <!-- 权限选择（必填） -->
        <n-form-item path="permIdList" label="权限选择">
          <n-transfer
            ref="transfer"
            v-model:value="form.permIdList"
            :options="flattenTree(premissionList)"
            :render-source-list="renderSourceList"
            source-filterable
          />
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import { NTree } from "naive-ui"

// 表单
const form = reactive({
  companyId: JSON.parse(sessionStorage.getItem('user')).companyId,
  roleName: '',
  permIdList: []
})
const rules = {
  roleName: [{required: true, message: '角色名称不能为空'}]
}

// 弹窗
const modal = reactive({
  show: false,
  type: 'create',
  titleObj: { create: '新增角色', edit: '编辑角色' }
})
const showModal = function(type='create', roleName='', permIdList=[]) {
  modal.type = type
  form.roleName = roleName
  form.permIdList = permIdList
  getPremissionList()
  modal.show = true
}
// 关闭Modal
const closeModal = function() {
  modal.show = false
}

// 获取后台权限列表
const premissionList = ref([])
const getPremissionList = function() {
  api.get('/permissions/getAdminPermissionList').then((res) => {
    if(res.data.code === 20000) premissionList.value = res.data.data
  })
}
const renderSourceList = function({
  onCheck,
  pattern
}) {
  return h(NTree, {
    style: "margin: 0 4px;",
    keyField: "id",
    labelField:"permName",
    childrenField:"list",
    checkable: true,
    selectable: false,
    blockLine: true,
    checkOnClick: true,
    data: premissionList.value,
    pattern,
    checkedKeys: form.permIdList,
    onUpdateCheckedKeys: (checkedKeys) => {
      console.log('ccc', checkedKeys)
      onCheck(checkedKeys)
    }
  })
}

function flattenTree(arr) {
  const result = []
  function flatten(_list = []) {
    _list.forEach((item) => {
      result.push({
        label: item.permName,
        value: item.id
      })
      if(item.list) flatten(item.list)
    })
  }
  flatten(arr)
  return result
}
defineExpose({
  showModal
})
</script>