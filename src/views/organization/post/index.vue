<template>
  <div class="w-full h-full bg-white rounded shadow flex flex-col">
    <!-- title -->
    <div class="flex-shrink-0 w-full h-16 border-b px-6">
      <h2 class="text-lg leading-[4rem]">职位管理</h2>
    </div>
    <!-- body -->
    <div class="flex-grow w-full h-full flex">
      <!-- 左侧：职位列表 -->
      <div class="flex-shrink-0 w-64 h-full border-r relative">
        <div
          class="w-full overflow-y-scroll pl-2 pr-1"
          :style="{height: `${clientHeight - 225}px`}"
        >
          <div class="px-1.5 pt-2 pb-3 sticky top-0 bg-white z-20">
            <n-input v-model:value="postPattern" placeholder="请输入职位名称" clearable>
              <template #prefix>
                <n-icon :component="SearchIcon" />
              </template>
            </n-input>
          </div>
          <n-tree 
            block-line 
            :data="postList"
            key-field="id" 
            label-field="roleName"
            selectable
            :show-irrelevant-nodes="false"
            :pattern="postPattern"
            @update:selected-keys="handleUpdateValue"
          >
            <template #empty>
              <div 
                class="w-full flex flex-col items-center justify-center space-y-2" 
                :style="{ height: `${clientHeight - 300}px` }"
              >
                <default-empty v-if="postPattern.length === 0" />
                <search-empty v-else />
                <p class="text-xs text-gray-400">{{ postPattern.length === 0 ? '列表为空，请先创建职位' : '啥也没搜到' }}</p>
              </div>
            </template>
          </n-tree>
        </div>
        <div class="sticky bottom-0 w-full p-4 bg-white z-20 rounded">
          <n-button type="primary" size="large" block @click="showPostModal('create', '', null)">新增职位</n-button>
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
          <post-empty />
          <p class="mt-4 text-sm text-gray-400">{{ postList.length === 0 ? '先创建一个职位吧' : '选个职位看看吧'}}</p>
          <div v-if="postList.length === 0" class="mt-3">
            <n-button @click="showPostModal('create', '', null)">+新增职位</n-button>
          </div>
        </div>
        <n-spin v-else :show=rightData.showLoading>
          <div class="px-8 py-4">
            <div class="flex items-center">
              <h3 class="text-xl font-bold mr-4">{{ rightData.roleName }}</h3>
              <button class="flex items-center text-gray-500 hover:text-primary text-sm" @click="showPostModal('edit', rightData.roleName, rightData.postId)">
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
                  <template #prefix>
                    <n-icon :component="SearchIcon" />
                  </template>
                </n-input>
              </div>
              <div class="ml-auto space-x-2">
                <!-- 添加员工 -->
                <n-button @click="showAddUserModal">添加员工</n-button>
                <!-- 修改职位 -->
                <n-button :disabled="checkList.length === 0" @click="showChangePostModal">修改职位</n-button>
                <!-- 删除职位 -->
                <n-button type="primary" @click="removePost">删除职位</n-button>
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
                <n-button>+添加员工</n-button>
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
              已选{{ checkList.length }}个
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
                class="w-full h-14 px-4 rounded flex items-center cursor-pointer group hover:bg-gray-100"
              >
                <div class="flex items-center">
                  <div 
                    class="ml-4 flex-shrink-0 w-10 h-10 rounded-md "
                    :class="item.headshot ? '' : 'bg-primary py-1.5'"
                  >
                    <img v-if="item.headshot" :src="item.headshot" :alt="item.userName" width="40" height="40" class="rounded-md">
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p class="ml-4 font-bold text-base text-left">{{ item.userName }}</p>
                </div>
              </n-checkbox>
            </n-checkbox-group>
          </div>
        </div>
          </div>
        </n-spin>
      </div>
    </div>
  </div>
  <!-- 1，新增/编辑职位 -->
  <create-post-modal ref="createPostRef" @refresh="postRefresh" />
  <!-- 2，修改职位 -->
  <change-post-modal ref="changePostRef" @refresh="refreshUserModal" />
  <!-- 3、添加员工 -->
  <add-user-modal ref="addUserRef" @confirm="confirmAddUser" />
</template>

<script setup>
import api from '/src/api/index.js'
import { NIcon } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"
import { renderPrefix } from '/src/until/index.js'
import { useDialog, useMessage } from 'naive-ui'

const clientHeight = ref(document.documentElement.clientHeight)
const message = useMessage()
const dialog = useDialog()

// 获取职位
const postList = ref([])
const postPattern = ref('')
const getPostList = function() {
  api.get('/position/getCompanyPositionList').then((res) => {
    if(res.data.code === 20000) postList.value = res.data.data
    postList.value.forEach(item => item.prefix = renderPrefix('post'))
  })
}
getPostList()

// 新增、编辑职位
const createPostRef = ref()
const showPostModal = function(type, name='', id=null) {
  createPostRef.value.showModal(type, name, id)
}
const postRefresh = function(type, name) {
  getPostList()
  if(type === 'edit') {
    getUserList(rightData.postId)
    rightData.roleName = name
  }
}

// 点击左侧职位
const handleUpdateValue = function (keys, option) {
  rightData.postId = option[0].id
  rightData.roleName = option[0].roleName     // 获取部门名
  rightData.showEmpty = false                 // 关闭空状态
  getUserList(option[0].id)                   // 获取成员列表
}

// 删除职位
const removePost = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要删除该职位吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.delete('/position/deletePositionInfo', {positionId: rightData.postId}).then((res) => {
        if(res.data.code !== 20000) message.warning(res.data.msg)
        if(res.data.code === 20000) {
          message.success('删除职位成功')
          rightData.showEmpty = true
          getPostList()
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
  roleName: '',
  postId: ''
})
const userList = ref([])
// 根据职位id获取人员列表
const getUserList = function(id) {
  rightData.showLoading = true
  api.get('/position/getUserListByPositionId', {position: id}).then((res) => {
    userList.value = res.data.data
    setTimeout(() => rightData.showLoading = false, 100)
  })
}
// 选择器相关
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

/******* 修改职位 *******/
const changePostRef = ref()
const showChangePostModal = function() {
  changePostRef.value.showModal(rightData.postId, checkList.value)
}
// 刷新列表
const refreshUserModal = function() {
  checked.state = checked.indeterminate = false
  checkList.value = []
  getUserList(rightData.postId)
}


/******* 添加员工 *******/
const addUserRef = ref()
const showAddUserModal = function() {
  addUserRef.value.showModal()
}
const confirmAddUser = function(select) {
  let data = { roleId: rightData.postId, userIdList: select.ids }
  api.put('/userManage/updatePositonUser', data).then((res) => {
    if(res.data.code === 20000) message.success('添加成功')
    if(res.data.code !== 20000) message.warning(res.data.msg)
    refreshUserModal()
  })
}
</script>

<style>
.n-checkbox {
  @apply items-center
}

.n-card>.n-card__content,
.n-card>.n-card__footer {
  @apply p-0
}
</style>