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
      style="width: 650px"
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
          <n-input v-model:value="form.roleName" placeholder="请输入角色名称" clearable maxlength="12" show-count />
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
        <n-form-item>
          <button 
            attr-type="button" 
            class="ml-auto w-24 h-9 bg-primary text-white rounded hover:opacity-80"
            :disabled="modal.btnDisabled"
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
import { NTree, useDialog, useMessage } from "naive-ui"

const emit = defineEmits(['change'])
const message = useMessage()
const dialog = useDialog()

// 弹窗
const modal = reactive({
  show: false,
  type: 'create',
  btnDisabled: false,
  titleObj: { create: '新增角色', edit: '编辑角色' }
})
const showModal = function(type='create', roleName='', roleId=null) {
  initForm()
  getPremissionList()
  if(type === 'edit' && roleId) {
    getRolePremissList(roleId)
    form.id = +roleId
  }
  modal.type = type
  form.roleName = roleName
  modal.show = true
}

const initForm = function() {
  form.id = null
  form.roleName = ''
  form.permIdList = []
}
// 关闭Modal
const closeModal = function() {
  modal.show = false
}

// 表单
const formRef = ref()
const form = reactive({
  id: null,
  companyId: JSON.parse(sessionStorage.getItem('user')).companyId,
  roleName: '',
  permIdList: []
})
const rules = {
  roleName: [{required: true, message: '角色名称不能为空', trigger: ['blur', 'change'],}],
  permIdList:[{type: 'array', required: true, message: '至少选择一项权限', trigger: ['blur', 'change'],}]
}

// 获取后台权限列表
const premissionList = ref([])
const getPremissionList = function() {
  api.get('/permissions/getAdminPermissionList').then((res) => {
    if(res.data.code === 20000) premissionList.value = res.data.data
  })
}
// 编辑状态下，根据角色id获取角色的权限列表
const getRolePremissList = function(id) {
  api.get('/permissions/getAdminRolePermissions', { roleId: id }).then((res) => {
    if(res.data.code === 20000) form.permIdList = res.data.data
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
    multiple: true,
    cascade: true,
    checkStrategy: "child",
    data: premissionList.value,
    pattern,
    showIrrelevantNodes: false,
    defaultExpandAll: true,
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
      if(!item.list) result.push({ label: item.permName, value: item.id })
      if(item.list) flatten(item.list)
    })
  }
  flatten(arr)
  return result
}

// 验证表单
const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if(errors) message.error("信息不完整")
    if (!errors) {
      if(modal.type === 'create') confirmCreateRole()
      if(modal.type === 'edit') confirmEditRole()
    }
  })
}

// 新增角色
const confirmCreateRole = function() {
  modal.btnDisabled = true
  api.post('/adminRole/addAdminRoleInfo', form).then((res) => {
    if(res.data.code !== 20000) message.warning(res.data.msg)
    if(res.data.code === 20000) {
      message.success('新增角色成功')
      emit('change', 'create', form)
      modal.show = false
    }
    setTimeout(() => modal.btnDisabled = false, 150)
  })
}
// 编辑角色
const confirmEditRole = function() {
  api.put('/adminRole/updateRoleInfo', form).then((res) => {
    if(res.data.code !== 20000) message.warning(res.data.msg)
    if(res.data.code === 20000) {
      message.success('编辑角色成功')
      emit('change', 'edit', form)
      modal.show = false
    }
    setTimeout(() => modal.btnDisabled = false, 150)
  })
}

defineExpose({
  showModal
})
</script>

<style>
.n-transfer {
  @apply h-96
}
</style>