<!-- 后台权限分配 -->
<template>
  <base-card title="后台权限管理" :loading="showPageLoading">
    <div class="w-full h-full flex">
      <!-- 左侧：职位列表 -->
      <div class="flex-shrink-0 w-64 h-full border-r relative">
        <div
          class="w-full overflow-y-scroll pl-2 pr-1"
          :style="{height: `${clientHeight - 225}px`}"
        >
          <div class="px-1.5 pt-2 pb-3 sticky top-0 bg-white z-20">
            <n-input v-model:value="rolePattern" placeholder="请输入角色名称" clearable>
              <template #prefix><n-icon :component="SearchIcon" /></template>
            </n-input>
          </div>
          <n-tree 
            block-line 
            :data="roleList"
            key-field="id" 
            label-field="roleName"
            selectable
            :show-irrelevant-nodes="false"
            :pattern="rolePattern"
            :render-prefix="renderPrefix('role')"
            @update:selected-keys="handleUpdateValue"
          >
            <template #empty>
              <div 
                class="w-full flex flex-col items-center justify-center space-y-2" 
                :style="{ height: `${clientHeight - 300}px` }"
              >
                <default-empty v-if="rolePattern.length === 0" />
                <search-empty v-else />
                <p class="text-xs text-gray-400">{{ rolePattern.length === 0 ? '列表数据异常' : '啥也没搜到' }}</p>
              </div>
            </template>
          </n-tree>
        </div>
        <div class="sticky bottom-0 w-full p-4 bg-white z-20 rounded">
          <n-button type="primary" ghost size="large" block @click="showRoleModal('create')">新增角色</n-button>
        </div>
      </div>
      <!-- 右侧：该职位下的成员 -->
      <div class="w-full h-full">
        <!-- empty -->
        <div 
          v-if="rightData.showEmpty" 
          class="w-full h-full flex flex-col items-center justify-center"
          :style="{ height: `${clientHeight - 150}px` }"
        >
          <role-empty />
          <p class="mt-4 text-sm text-gray-400">选个角色看看吧</p>
        </div>
        <n-spin v-else :show=rightData.showLoading>
          <div class="px-8 py-4">
            <div class="flex items-center">
              <h3 class="text-lg mr-2">{{ rightData.roleName }}</h3>
              <n-dropdown 
                v-if="rightData.roleType !== 'SuperAdmin'"
                :options="rightData.sectorOptions" 
                placement="bottom-end" 
                trigger="click" 
                @select="SectorSelect"
              >
                <n-button quaternary size="small">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                  </svg>
                </n-button>
              </n-dropdown>
            </div>
            <div class="mt-4 flex items-center">
              <!-- search -->
              <div class="w-72">
                <n-input placeholder="搜索" clearable>
                  <template #prefix><n-icon :component="SearchIcon" /></template>
                </n-input>
              </div>
              <div class="ml-auto space-x-2">
                <n-button>添加员工</n-button>
                <n-button 
                  :disabled="checkList.length === 0" 
                  :type="checkList.length === 0 ? 'default' : 'primary'" 
                  ghost 
                  @click="showChangePostModal"
                >
                  变更角色
                </n-button>
              </div>
            </div>
            <div 
              v-if="userList.length === 0" 
              class="w-full flex flex-col items-center justify-center"
              :style="{ height: `${clientHeight - 330}px` }"
            >
              <user-empty />
              <p class="mt-3 text-sm text-gray-400">该职位暂未添加员工数据</p>
              <div class="mt-4">
                <n-button @click="showAddUserModal">+添加员工</n-button>
              </div>
            </div>
            <div v-else class="mt-5 space-y-2">
              <div class="w-full h-10 rounded bg-gray-100 flex items-center px-4">
                <n-checkbox 
                  v-model:checked="checked.state"
                  :indeterminate="checked.indeterminate"
                  class="w-full"
                  @update:checked="checkAll"
                >
                  已选{{ checkList.length }}人（共{{ userList.length }}人）
                </n-checkbox>
              </div>
              <div 
                class="overflow-y-scroll overflow-x-hidden" 
                :style="{ height: `${clientHeight - 330}px` }"
              >
                <n-checkbox-group 
                  v-model:value="checkList"
                  @update:value="changeCheckbox"
                >
                  <n-checkbox
                    v-for="(item, index) in userList" 
                    :key="index"
                    :value="item.id"
                    :default-checked="item.checkout"
                    class="w-full h-14 px-4 flex items-center cursor-pointer group border-b border-b-gray-100 hover:bg-gray-100"
                  >
                    <div class="ml-4 flex items-center space-x-2.5" @click.stop="showCard(item.id)">
                      <div 
                        class="flex-shrink-0 w-10 h-10 rounded-md"
                        :class="item.headshot ? '' : 'bg-primary py-1.5'"
                      >
                        <img v-if="item.headshot" :src="item.headshot" :alt="item.userName" width="40" height="40" class="rounded-md">
                        <p v-else class="text-center text-white leading-7 text-sm">{{ toNameAvatar(item.userName) }}</p>
                      </div>
                      <p class="text-base text-left">{{ item.userName }}</p>
                    </div>
                  </n-checkbox>
                </n-checkbox-group>
              </div>
            </div>
          </div>
        </n-spin>
      </div>
    </div>
  </base-card>
  <!-- 1、创建/编辑 角色 -->
  <create-role-modal ref="createRoleRef" @change="changeRole" />
  <!-- 3、添加员工 -->
  <add-user-modal ref="addUserRef" @confirm="confirmAddUser" />
  <!-- 名片 -->
  <business-card-modal ref="cardRef" />
</template>


<script setup>
import api from '/src/api/index.js'
import { NIcon } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"
import { default as EditIcon } from "@vicons/ionicons5/Pencil"
import { default as TrashIcon } from "@vicons/ionicons5/TrashOutline"
import { toNameAvatar } from '/src/until/index.js'
import { renderPrefix, renderIcon } from '/src/until/render.js'
import { useDialog, useMessage } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()
const clientHeight = ref(document.documentElement.clientHeight)
const showPageLoading = ref(true)

// 获取角色列表
const roleList = ref([])
const rolePattern = ref('')
const getRoleList = function() {
  api.get('/adminRole/getCompanyRoleList').then((res) => {
    if(res.data.code === 20000) roleList.value = res.data.data
    setTimeout(() => showPageLoading.value = false, 150)
  })
}
getRoleList()
// 点击左侧职位
const handleUpdateValue = function (keys, option) {
  if(keys.length > 0) {
    rightData.roleId = option[0].id
    rightData.roleType = option[0].roleType
    rightData.roleName = option[0].roleName     // 获取部门名
    rightData.showEmpty = false                 // 关闭空状态
    getUserList(option[0].id)                   // 获取成员列表
  }
}

// 删除职位
const removeRole = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要删除该角色吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.delete('/adminRole/deleteRoleInfo', {roleId: rightData.roleId}).then((res) => {
        if(res.data.code !== 20000) message.warning(res.data.msg)
        if(res.data.code === 20000) {
          message.success('删除角色成功')
          rightData.showEmpty = true
          getRoleList()
        }
      })
    },
    onNegativeClick: () => {}
  })
}

/***** 右侧——人员列表 *****/
const rightData = reactive({
  showLoading: false,
  showEmpty: true,
  roleType: '',
  roleName: '',
  roleId: '',
  sectorOptions: [
    {label: '编辑角色', key: 'edit', icon: renderIcon(EditIcon)}, 
    {label: '删除角色', key: 'remove', icon: renderIcon(TrashIcon)}
  ]
})
const userList = ref([])
// 根据角色id获取人员列表
const getUserList = function(id) {
  rightData.showLoading = true
  api.get('/adminRole/getUserListByRoleId', {roleId: id}).then((res) => {
    userList.value = res.data.data
    setTimeout(() => rightData.showLoading = false, 100)
  })
}

/** 创建/编辑 角色  **/
const createRoleRef = ref()
const showRoleModal = function(type, roleName, roleId) {
  createRoleRef.value.showModal(type, roleName, roleId)
}
const changeRole = function(type, data) {
  getRoleList()
  if(type === 'edit') rightData.roleName = data.roleName
}

// 下拉菜单
const SectorSelect = function(key) {
  if(key === 'edit') showRoleModal('edit', rightData.roleName, rightData.roleId)
  if(key === 'remove') removeRole()
}

/***** 选择器相关 *****/
const checked = reactive({
  state: false,
  indeterminate: false
})
const checkList = ref([])
// 全选、不全选
const checkAll = function(isChecked) {
  if(isChecked) {
    checked.indeterminate = false
    checkList.value = userList.value.map(item => item.id)
  }
  if(!isChecked) checkList.value = []
}
// 子选项的变化
const changeCheckbox = function(arr, meta) {
  checkList.value = arr
  if(arr.length === 0) {
    checked.state = checked.indeterminate = false
    return
  }
  if(0 < arr.length < userList.value.length) {
    checked.state = false
    checked.indeterminate = true
  }
  if(arr.length === userList.value.length) {
    checked.state = true
    checked.indeterminate = false
  }
}

// 刷新列表
const refreshUserModal = function() {
  checked.state = checked.indeterminate = false
  checkList.value = []
  getUserList(rightData.roleId)
}

/******* 添加员工 *******/
const addUserRef = ref()
const showAddUserModal = function() {
  addUserRef.value.showModal()
}
const confirmAddUser = function(select) {
  let data = { roleId: rightData.roleId, userIdList: select.ids }
  api.put('/adminRole/updateManageRoleUsers', data).then((res) => {
    if(res.data.code === 20000) message.success('添加成功')
    if(res.data.code !== 20000) message.warning(res.data.msg)
    refreshUserModal()
  })
}
</script>