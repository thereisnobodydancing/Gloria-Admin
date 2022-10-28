<!-- 创建部门/编辑部门（组织架构-成员与部门） -->
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
        <!-- 部门名称(必填) -->
        <n-form-item path="sectorName" label="部门名称">
          <n-input v-model:value="form.sectorName" placeholder="请输入部门名称" clearable maxlength="12" show-count />
        </n-form-item>
        <!-- 部门负责人 -->
        <n-form-item path="sectorHead" label="部门负责人">
          <n-input 
            v-model:value="sectorHeadName" 
            type="text" 
            placeholder="请选择部门负责人" 
            readonly 
            clearable 
            @clear.stop="clearHeadName"
            @click="showSelUserModal" 
          />
        </n-form-item>
        <!-- 上级部门 -->
        <n-form-item path="parentId" label="上级部门">
          <n-tree-select
            :options="modal.parentOptions"
            :default-value="form.parentId"
            placeholder="选择上级部门" 
            children-field="list"
            key-field="sectorId"
            label-field="sectorName"
            @update:value="handleUpdateParent"
            clearable
          />
        </n-form-item>
        <!-- button -->
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
  <!-- 选择部门负责人 -->
  <add-user-modal ref="addUserRef" :max="1" right-title="请选择一位部门负责人" :multiple="false" @confirm="changeHead" />
</template>

<script setup>
import api from '/src/api/index.js'
import AddUserModal from '/src/components/Modal/AddUserModal.vue'
import { useDialog, useMessage } from 'naive-ui'

const emit = defineEmits(['refresh'])
const message = useMessage()
const dialog = useDialog()

const modal = reactive({
  show: false,
  type: '',
  titleObj: {
    create: '新建部门',
    edit: '编辑部门'
  },
  btnDisabled: false,
  parentOptions: []
})
// 弹出Modal
const showModal = function(options, type, obj) {
  init(options, type, obj)
  modal.show = true
}

// 初始化
const init = function(options, type, obj) {
  modal.parentOptions = options
  modal.type = type
  if(type === 'create') {
    addUserRef.value.initModal()
    sectorHeadName.value = form.sectorHead = form.sectorName = ''
    form.parentId = 0
    addUser.options = addUser.keys = addUser.ids = []
  }
  if(type === 'edit') {
    form.id = obj.id
    form.sectorName = obj.sectorName
    form.sectorHead = obj.sectorHead
    form.parentId = obj.parentId
    sectorHeadName.value = obj.sectorHeadName
    if(obj.sectorHead) {
      addUser.ids=[obj.sectorHead]
      addUser.keys=['u' + obj.sectorHead]
      addUser.options=[{
        checkboxDisabled: false,
        id: obj.sectorHead,
        key: 'u' + obj.sectorHead,
        list: null,
        name: obj.sectorHeadName,
        picture: "",
        type: "user",
      }]
    }
  }
}

const sectorHeadName = ref('')
/***** 表单 *****/
const formRef = ref()
const form = reactive({
  companyId: JSON.parse(sessionStorage.getItem('user')).companyId,        // 公司id
  id: null,               // 要修改的部门id
  sectorName: '',         // 部门名称
  sectorHead: '',         // 部门负责人id
  parentId: 0,            // 上级部门id
})

const rules = {
  sectorName: [{required: true, message: '部门名称不能为空'}]
}

// 验证表单
const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      if(modal.type === 'create') confirmCreateSector()
      if(modal.type === 'edit') confirmEditSector()
    } else {
      message.error("信息不完整")
    }
  })
}

/******* 选择部门负责人 *******/
const addUserRef = ref()
const addUser = reactive({
  keys: [],     // 选中项的key数组
  ids: [],      // 选中项的id数组
  options: []   // 选中项的内容数组
})
const showSelUserModal = function() {
  addUserRef.value.showModal(addUser.options, addUser.keys, addUser.ids)
}
const changeHead = function({options, keys, ids}) {
  sectorHeadName.value = options[0].name
  form.sectorHead = options[0].id
  addUser.options = options
  addUser.keys = keys
  addUser.ids = ids
}
// 清空部门负责人
const clearHeadName = function() {
  form.sectorHead = sectorHeadName.value = ''
  addUser.options = addUser.keys = addUser.ids = []
  addUserRef.value.initModal()
}

/** 选择上级部门 **/
const handleUpdateParent = function(value, option) {
  form.parentId = value
}

// 新建部门
const confirmCreateSector = function() {
  modal.btnDisabled = true
  if(!form.sectorName) { message.warning('请填写部门名称'); return }
  if(!form.parentId) form.parentId = 0
  api.put('/addressBook/structure/addSectorStructure', form).then((res) => {
    if(res.data.code !== 20000) message.warning(res.data.msg)
    if(res.data.code === 20000) {
      message.success('新建部门成功')
      emit('refresh', 'create', form)
      modal.show = false
    }
    setTimeout(() => modal.btnDisabled = false, 300)
  })
}

// 编辑部门
const confirmEditSector = function() {
  dialog.warning({
    title: '提示',
    content: '你的操作也许至关重要，确定要修改吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      if(!form.parentId) form.parentId = 0
      api.put('/addressBook/structure/updateSectorStructure', form).then((res) => {
        if(res.data.code !== 20000) message.error(res.data.msg)
        if(res.data.code === 20000) {
          message.success('编辑成功')
          modal.show = false
          emit('refresh', 'edit', form)
        }
        setTimeout(() => modal.disabled = false, 300)
      })
    },
    onNegativeClick: () => {}
  })
}

// 关闭Modal
const closeModal = function() {
  addUser.options = addUser.keys = addUser.ids = []
  addUserRef.value.initModal()
  modal.show = false
}

defineExpose({
  showModal
})
</script>