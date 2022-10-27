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
          <n-button type="primary" size="large" block @click="showRoleModal('create')">新增角色</n-button>
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
              <h3 class="text-xl font-bold mr-4">{{ rightData.roleName }}</h3>
              <button 
                v-if="rightData.roleType !== 'SuperAdmin'"
                class="flex items-center text-gray-500 hover:text-primary text-sm" 
                @click="showPostModal('edit', rightData.roleName, rightData.roleId)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span class="ml-0.5">编辑职位</span>
              </button>
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
                <n-button>修改职位</n-button>
                <n-button v-if="rightData.roleType !== 'SuperAdmin'" type="primary">删除职位</n-button>
              </div>
            </div>
          </div>
        </n-spin>
      </div>
    </div>
  </base-card>
  <!-- 创建/编辑 角色 -->
  <create-role-modal ref="createRoleRef" />
</template>


<script setup>
import api from '/src/api/index.js'
import { NIcon } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"
import { renderPrefix } from '/src/until/render.js'
import { useDialog, useMessage } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()
const clientHeight = ref(document.documentElement.clientHeight)
const showPageLoading = ref(true)

api.get('/permissions/getAdminPermissionList')

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

/***** 右侧——人员列表 *****/
const rightData = reactive({
  showLoading: false,
  showEmpty: true,
  roleType: '',
  roleName: '',
  roleId: ''
})
const userList = ref([])
// 根据职位id获取人员列表
const getUserList = function(id) {
  rightData.showLoading = true
  api.get('/adminRole/getUserListByRoleId', {position: id}).then((res) => {
    userList.value = res.data.data
    setTimeout(() => rightData.showLoading = false, 100)
  })
}

/** 创建/编辑 角色  **/
const createRoleRef = ref()
const showRoleModal = function(type) {
  createRoleRef.value.showModal(type)
}
</script>