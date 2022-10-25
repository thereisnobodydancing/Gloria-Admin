<!-- 添加员工(组织架构-成员与部门) -->
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
      @close="modal.show = false"
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
        <!-- 姓名(必填) -->
        <n-form-item path="userName" label="姓名">
          <n-input v-model:value="form.userName" placeholder="请输入姓名" clearable />
        </n-form-item>
         <!-- 职位(必选) -->
        <n-form-item path="role" label="职位">
          <div class="w-full flex items-center space-x-2">
            <n-select
              v-model:value="form.role"
              filterable
              placeholder="请选择职位"
              label-field="roleName"
              value-field="id"
              clearable
              :options="roleOptions"
            >
              <template #empty>
                <div v-if="roleOptions.length === 0" class="text-center space-y-2">
                  <p>您还没有添加职位，请先去添加职位吧！</p>
                  <n-button @click="showRoleModal">新增职位</n-button>
                </div>
                <div v-else>没有搜索到啊</div>
              </template>
            </n-select>
            <n-button @click="showRoleModal">新增职位</n-button>
          </div>
        </n-form-item>
        <!-- 手机号（必填） -->
        <n-form-item path="mobile" label="手机号">
          <n-input v-model:value="form.mobile" placeholder="请输入手机号" maxlength="11" clearable />
        </n-form-item>
        <!-- 上级领导 -->
        <n-form-item path="parentId" label="上级领导">
          <n-select
            v-model:value="form.parentId"
            filterable
            placeholder="请输入并选择上级领导"
            label-field="userInfo"
            value-field="userId"
            clearable
            :options="parentOptions"
            @search="searchParent"
          >
            <template #empty>
              <div />
            </template>
          </n-select>
        </n-form-item>
        <!-- 座机号 -->
        <n-form-item path="landlineNumber" label="座机号">
          <n-input v-model:value="form.landlineNumber" placeholder="请输入座机号" clearable />
        </n-form-item>
        <!-- 工号 -->
        <n-form-item path="workNumber" label="工号">
          <n-input v-model:value="form.workNumber" placeholder="请输入工号" clearable />
        </n-form-item>
        <!-- 邮箱 -->
        <n-form-item path="emailNumber" label="邮箱">
          <n-input v-model:value="form.emailNumber" placeholder="请输入邮箱" clearable />
        </n-form-item>
        <n-form-item>
          <button 
            attr-type="button" 
            class="ml-auto w-24 h-9 bg-primary text-white rounded hover:opacity-80"
            :disabled="modal.disabled"
            @click="handleValidateClick"
          >
            确定
          </button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>
  <!-- 新增职位 -->
  <create-post-modal ref="createPostRef" @refresh="getRoleOptions" />
</template>

<script setup>
import api from '/src/api/index.js'
import { debounce } from 'lodash'
import { useDialog, useMessage, NIcon } from 'naive-ui'
import { reactive } from 'vue';

const emit = defineEmits(['refresh'])
const message = useMessage()
const dialog = useDialog()

const modal = reactive({
  show: false,
  titleObj: {
    create: '添加员工',
    edit: '编辑员工'
  },
  type: '',
  btnDisabled: false
})

// 弹出弹窗
const showModal = function(id, type, userId) {
  getRoleOptions()
  modal.type = type
  if(type === 'create') formInit()
  if(type === 'edit') getFormData(userId)
  form.sectorId = id
  modal.show = true
}

/***** 表单 *****/
const formRef = ref()
const form = reactive({
  companyId: JSON.parse(sessionStorage.getItem('user')).companyId,
  sectorId: '',       // 部门id
  userName: '',       // 姓名
  role: null,         // 角色（职位）
  parentId: null,       // 上级领导id
  mobile: '',         // 手机号
  landlineNumber: '', // 座机号
  workNumber: '',     // 工号
  emailNumber: '',    // 邮箱
  headshot: '',       // 头像
  id: ''              // 用户id
})

/****** 验证表单 ******/
// 校验手机号
const checkMobile = function(rule, value) {
  if(value.length > 0) {
    if(!/^1[3456789]\d{9}$/.test(value)) {
      return new Error("手机号格式不正确")
    } else {
      return true
    }
  }
}
const rules = {
  userName: [{required: true, message: "姓名不能为空"}],
  role: [{required: true, message: '职位不能为空'}],
  mobile: [
    {required: true, message: "手机号不能为空"},
    { validator: checkMobile, min: 11, max: 11, message: "手机号格式错误" }
  ],
  landlineNumber: [{required: false}],
  workNumber: [{required: false}],
  emailNumber: [{required: false}],
}

// 表单初始化
const formInit = function() {
  form.userName = form.mobile = form.landlineNumber = form.workNumber = form.emailNumber = form.headshot = ''
  form.role = null
}
// 获取表单数据（编辑模式）
const getFormData = function(id) {
  form.id = id
  api.get('/addressBook/structure/getEmployeeInfo', {userId: id}).then((res) => {
    form.userName = res.data.data.userName
    form.role = res.data.data.role
    form.mobile = res.data.data.mobile
    form.landlineNumber = res.data.data.landlineNumber
    form.workNumber = res.data.data.workNumber
    form.emailNumber = res.data.data.emailNumber
  })
}

/*********** 角色（职位）相关 **********/
// 获取角色（职位）列表
const roleOptions = ref([])
const getRoleOptions = function() {
  api.get('/position/getCompanyPositionList').then((res) => {
    roleOptions.value = res.data.data
  })
}
// 新增角色（职位）
const createPostRef = ref()
const showRoleModal = function() {
  createPostRef.value.showModal('create')
}

/*********** 上级领导 **********/
const parentOptions = ref([])
const getParentOptions = function(name) {
  api.get('/addressBook/structure/getParentUserList', { userName: name }).then((res) => {
    if(res.data.code === 20000) parentOptions.value = res.data.data
  })
}
// const searchParent = function(name) {
//   getParentOptions(name)
// }
const searchParent = debounce((name) => getParentOptions(name), 300, {
  leading: false,  // 延长开始后调用
	trailing: true  // 延长结束前调用
})


/*********** 提交验证表单 **********/
const handleValidateClick = function(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      modal.disabled = true
      if(modal.type === 'create') confirmAddUser()
      if(modal.type === 'edit') confirmEditUser()
    } else {
      message.error("信息不完整")
    }
  })
}

// 添加员工
const confirmAddUser = function() {
  api.put('/userManage/addUser', form).then((res) => {
    if(res.data.code !== 20000) message.error(res.data.msg)
    if(res.data.code === 20000) {
      message.success('添加成功')
      modal.show = false
      emit('refresh')
    }
    setTimeout(() => modal.disabled = false, 300)
  })
}

// 编辑员工
const confirmEditUser = function() {
  dialog.warning({
    title: '提示',
    content: '你的操作也许至关重要，确定要修改吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.put('/userManage/updateUser', form).then((res) => {
        if(res.data.code !== 20000) message.error(res.data.msg)
        if(res.data.code === 20000) {
          message.success('编辑成功')
          modal.show = false
          emit('refresh')
        }
        setTimeout(() => modal.disabled = false, 300)
      })
    },
    onNegativeClick: () => {}
  })
}

defineExpose({
  showModal
})
</script>