<template>
  <div class="w-full h-full bg-white rounded shadow flex flex-col">
    <!-- title -->
    <div class="flex-shrink-0 w-full h-16 border-b px-6">
      <h2 class="text-lg leading-[4rem]">成员与部门</h2>
    </div>
    <!-- body -->
    <div class="flex-grow w-full h-full flex">
      <!-- 左侧：部门列表 -->
      <div class="flex-shrink-0 w-64 h-full border-r relative">
        <div 
          class="w-full overflow-y-scroll pl-2 pr-1" 
          :style="{ height: `${clientHeight - 225}px` }"
        >
          <div class="px-1.5 pt-2 pb-3 sticky top-0 bg-white z-20">
            <n-input v-model:value="sectorPattern" placeholder="请输入部门名称" clearable>
              <template #prefix><n-icon :component="SearchIcon" /></template>
            </n-input>
          </div>
          <n-tree 
            block-line 
            :data="sectorList" 
            children-field="list" 
            key-field="sectorId" 
            label-field="sectorName"
            selectable 
            :show-irrelevant-nodes="false"
            :pattern="sectorPattern"
            @update:selected-keys="handleUpdateValue"
          >
            <template #empty>
              <div 
                class="w-full flex flex-col items-center justify-center space-y-2" 
                :style="{ height: `${clientHeight - 300}px` }"
              >
                <default-empty v-if="sectorPattern.length === 0" />
                <search-empty v-else />
                <p class="text-xs text-gray-400">{{ sectorPattern.length === 0 ? '列表为空，请先创建部门' : '啥也没搜到' }}</p>
              </div>
            </template>
          </n-tree>
        </div>
        <div class="sticky bottom-0 w-full p-4 bg-white z-20 rounded">
          <n-button type="primary" size="large" block @click="showCreateSectorModal('create')">新建部门</n-button>
        </div>
      </div>
      <!-- 右侧：成员列表 -->
      <div class="w-full h-full">
        <div 
          v-if="rightData.showEmpty" 
          class="w-full h-full flex flex-col items-center justify-center"
          :style="{ height: `${clientHeight - 150}px` }"
        >
          <sector-empty />
          <p class="mt-4 text-sm text-gray-400">{{ sectorList.length === 0 ? '先创建一个部门吧' : '选个部门看看吧' }}</p>
          <div v-if="sectorList.length === 0" class="mt-3">
            <n-button @click="showCreateSectorModal('create')">+新建部门</n-button>
          </div>
        </div>
        <n-spin v-else :show=rightData.showLoading>
          <div class="px-8 py-4">
            <div class="flex items-center">
              <h3 class="text-xl font-bold mr-4">{{ rightData.fullName }}</h3>
              <button 
                class="flex items-center text-gray-500 hover:text-primary text-sm"
                @click="showCreateSectorModal('edit')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span class="ml-0.5">编辑部门</span>
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
                <n-button @click="addUser('create', '')">添加员工</n-button>
                <!-- 移除员工 -->
                <n-button :disabled="checkList.length === 0" @click="showChangeSectorModal">变更部门</n-button>
                <!-- 删除部门 -->
                <n-button type="primary" @click="deleteSector">删除部门</n-button>
              </div>
            </div>
            <div 
              v-if="userList.length === 0" 
              class="w-full flex flex-col items-center justify-center"
              :style="{ height: `${clientHeight - 330}px` }"
            >
              <user-empty />
              <p class="mt-3 text-sm text-gray-400">该部门暂未添加员工数据</p>
              <div class="mt-4">
                <n-button @click="addUser('create', '')">+添加员工</n-button>
              </div>
            </div>
            <div v-else>
              <div class="mt-5 space-y-2">
                <div class="w-full h-10 rounded bg-gray-100 flex items-center px-4">
                  <n-checkbox 
                    v-model:checked="checked.state"
                    :disabled="checked.disabled"
                    :indeterminate="checked.indeterminate"
                    class="flex-grow" 
                    @update:checked="checkAll"
                  >
                    已选{{ checkList.length }}个
                  </n-checkbox>
                  <div class="ml-auto flex-shrink-0 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                </div>
                <div class="overflow-y-scroll overflow-x-hidden" :style="{ height: `${clientHeight - 330}px` }">
                  <n-checkbox-group v-model:value="checkList" @update:value="changeCheckbox">
                    <div 
                      v-for="(item, index) in userList" 
                      :key="index"
                      class="w-full h-14 px-4 rounded group flex items-center"
                      :class="[
                        item.userState === true ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed',
                        { 
                          'bg-gray-50': item.position.isTop && !item.position.isSectorHead, 
                          'bg-red-50 hover:bg-primary/10': item.position.isSectorHead
                        }
                      ]"
                    >
                      <n-checkbox 
                        :value="item.id" 
                        :default-checked="item.checkout" 
                        :disabled="!item.userState"
                        class="flex-grow flex items-center"
                      >
                        <div class="w-full flex items-center">
                          <div 
                            class="ml-4 flex-shrink-0 w-10 h-10 rounded-md "
                            :class="item.headshot ? '' : 'bg-primary py-1.5'"
                          >
                            <img v-if="item.headshot" :src="item.headshot" :alt="item.userName" width="40" height="40" class="rounded-md">
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div class="ml-4">
                            <div class="flex items-center">
                              <p class="text-base min-w-[40px]">{{ item.userName }}</p>
                              <button v-if="item.position.isSectorHead" class="ml-4 px-1.5 text-white text-xs bg-primary leading-5 rounded">部门负责人</button>
                              <button v-if="!item.userState" class="ml-4 px-1.5 text-white text-xs bg-gray-400 leading-5 rounded">已停用</button>
                            </div>
                            <p class="text-sm text-gray-400 text-left">{{ item.role }}</p>
                          </div>
                        </div>
                      </n-checkbox>
                      <div v-if="item.userState === true" class="ml-auto hidden group-hover:flex items-center text-sm">
                        <!-- 修改员工信息 -->
                        <!-- 置顶 -->
                        <button 
                          v-if="!item.position.isSectorHead" 
                          :disabled="settingTopDisabled"
                          class="h-8 rounded hover:bg-gray-200 disabled:text-gray-400"
                          :class="item.position.isTop ? 'w-16' : 'w-12'"
                          @click="settingTop(item.id, item.position.isTop)"
                        >
                          {{ item.position.isTop ? '取消置顶' : '置顶' }}
                        </button>
                        <!-- 上移 -->
                        <n-tooltip v-if="item.position.up && !item.position.isSectorHead" placement="top-start" trigger="hover">
                          <template #trigger>
                            <button :disabled="moveDisabled" class="w-8 h-8 rounded hover:bg-gray-200" @click="move(item.id, 'up')">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mx-auto">
                                <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                              </svg>
                            </button>
                          </template>
                          上移
                        </n-tooltip>
                        <!-- 下移 -->
                        <n-tooltip v-if="item.position.down && !item.position.isSectorHead" placement="top-start" trigger="hover">
                          <template #trigger>
                            <button :disabled="moveDisabled" class="w-8 h-8 rounded hover:bg-gray-200" @click="move(item.id, 'down')">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mx-auto">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                              </svg>
                            </button>
                          </template>
                          下移
                        </n-tooltip>
                        <button 
                          class="w-16 h-8 rounded"
                          :class="item.position.isSectorHead ? 'text-black hover:bg-gray-400/20' : 'hover:bg-gray-200'"
                          @click="addUser('edit', item.id)"
                        >
                          编辑
                        </button>
                        <!-- 操作离职 -->
                        <button 
                          class="w-20 h-8 rounded text-primary"
                          :class="item.position.isSectorHead ? 'hover:bg-primary/10' : 'hover:bg-red-100'"
                          @click="deleteUser(item.id, item.userName)"
                        >
                          操作离职
                        </button>
                      </div>
                    </div>
                  </n-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </n-spin>
      </div>
    </div>
  </div>
  <!-- 创建部门/编辑部门 -->
  <create-sector-modal ref="createSectorRef" @refresh="sectorRefresh" />
  <!-- 变更部门 -->
  <change-sector-modal ref="changeSectorRef" @refresh="getUserList(rightData.sectorId)" />
  <!-- 添加员工/编辑员工 -->
  <register-user-modal ref="addUserRef" @refresh="getUserList(rightData.sectorId)" />
</template>


<script setup>
import api from '/src/api/index.js'
import { NIcon } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"
import { renderPrefix } from '/src/until/index.js'
import { useDialog, useMessage } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()
// const user = JSON.parse(sessionStorage.getItem('user'))
const clientHeight = ref(document.documentElement.clientHeight)


/***** 左侧——侧边栏部门列表 *****/
const sectorList = ref([])
const sectorPattern = ref('')
// 获取左侧部门列表
const getSectorList = function () {
  api.get('/addressBook/structure/getSectorList').then((res) => {
    if (res.data.code === 20000 && res.data.data.length > 0) {
      sectorList.value = res.data.data
      setIcon(sectorList.value, 1)
    }
  })
}
getSectorList()
// 为左侧部门列表渲染icon
const setIcon = function (list, leave) {
  list.forEach((item, index) => {
    if (item.list && item.list.length > 0) {
      item.prefix = leave === 1 ? renderPrefix('sector') : renderPrefix('sector_sub')
      setIcon(item.list, leave + 1)
    } else {
      item.prefix = leave === 1 ? renderPrefix('sector') : renderPrefix('sector_sub')
    }
  })
}
// 点击左侧部门
const handleUpdateValue = function (keys, option) {
  rightData.sectorId = option[0].sectorId
  rightData.fullName = option[0].sectorName   // 获取部门名
  rightData.showEmpty = false                 // 关闭空状态
  getUserList(option[0].sectorId)             // 获取成员列表
}

/***** 右侧——人员列表 *****/
const rightData = reactive({
  showLoading: false,
  showEmpty: true,
  sectorId: '',
  fullName: '',
})
const userList = ref([])
const getUserList = function (id) {
  rightData.showLoading = true
  api.get('/addressBook/structure/getSectorEmployeeList', { sectorId: id }).then((res) => {
    userList.value = res.data.data
    checked.disabled = res.data.data.filter(item => item.userState).length === 0
    checked.indeterminate = checked.state = false
    checkList.value = []
    setTimeout(() => rightData.showLoading = false, 100)
  })
}

/*** 选择器相关 ***/
// 全选
const checked = reactive({
  disabled: false,
  state: false,         // 是否为全选中状态
  indeterminate: false  // 是否为半选中状态
})
// 子选择器列表
const checkList = ref([])
// 全选、不全选
const checkAll = function (isChecked) {
  checkList.value = []
  if (isChecked) {
    checked.indeterminate = false
    userList.value.forEach(item => {
      if(item.userState) checkList.value.push(item.id) 
    })
  }
}
// 子选项的变化
const changeCheckbox = function (arr, meta) {
  checkList.value = arr
  if (arr.length === 0) {
    checked.state = checked.indeterminate = false
    return
  }
  if (0 < arr.length < userList.value.length) {
    checked.state = false
    checked.indeterminate = true
  }
  if (arr.length === userList.value.length) {
    checked.state = true
    checked.indeterminate = false
  }
}

/****** 新建部门/编辑部门 ******/
const createSectorRef = ref()
// 打开Modal，把菜单栏options传过去
const showCreateSectorModal = function (type) {
  if (type === 'create') createSectorRef.value.showModal(sectorList.value, type, {})
  if (type === 'edit') {
    api.get('/addressBook/structure/getSectorDetail', { sectorId: rightData.sectorId }).then((res) => {
      createSectorRef.value.showModal(sectorList.value, type, res.data.data)
    })
  }
}
// 操作完成后
const sectorRefresh = function (type, data) {
  if (type === 'create') getSectorList()
  if (type === 'edit') {
    getSectorList()
    getUserList(rightData.sectorId)
    rightData.fullName = data.sectorName
  }
}

/****** 变更部门 ******/
const changeSectorRef = ref()
const showChangeSectorModal = function () {
  changeSectorRef.value.showModal(checkList.value, sectorList.value)
}

/****** 删除部门 ******/
const deleteSector = function () {
  dialog.warning({
    title: '您确定要删除部门吗？',
    content: '部⻔删除后不可恢复',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.delete('/addressBook/structure/deleteSectorStructure', { sectorId: rightData.sectorId }).then((res) => {
        if (res.data.code === 20000) {
          message.success('删除成功')
          getSectorList()
          rightData.showEmpty = true
        }
        if (res.data.code !== 20000) message.warning(res.data.msg)
      })
    },
    onNegativeClick: () => { }
  })
}

/****** 添加员工/编辑员工 ******/
const addUserRef = ref()
const addUser = function (type, userId) {
  addUserRef.value.showModal(rightData.sectorId, type, userId)
}

/****** 操作离职 ******/
const deleteUser = function (id, name) {
  dialog.warning({
    title: `你确定要将${name}的账号设为离职吗？`,
    content: '离职后，该帐号将无法访问',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.put('/userManage/deleteUser', { userId: id }, false, false).then((res) => {
        if (res.data.code === 20000) {
          message.success('离职操作成功')
          getUserList(rightData.sectorId)
        }
        if (res.data.code !== 20000) message.warning(res.data.msg)
      })
    },
    onNegativeClick: () => { }
  })
}

/*** 列表置顶操作 ***/
const settingTopDisabled = ref(false)
const settingTop = function (id, isTop) {
  settingTopDisabled.value = true
  // 置顶
  if (!isTop) {
    let data = { userId: id }
    api.post('/userManage/settingTop', data, true).then((res) => {
      if (res.data.code !== 20000) message.warning(res.data.msg)
      if (res.data.code === 20000) message.success('置顶成功')
      getUserList(rightData.sectorId)
      setTimeout(() => settingTopDisabled.value = false, 200)
    })
  }
  // 取消置顶
  if (isTop) {
    let data = { userId: id }
    api.post('/userManage/removeTop', data, true).then((res) => {
      if (res.data.code !== 20000) message.warning(res.data.msg)
      if (res.data.code === 20000) message.success('取消置顶成功')
      getUserList(rightData.sectorId)
      setTimeout(() => settingTopDisabled.value = false, 200)
    })
  }
}
// 上下移
const moveDisabled = ref(false)
const move = function (id, direct) {
  moveDisabled.value = true
  api.put('/userManage/move', { userId: id, direct: direct }, false, false).then((res) => {
    if (res.data.code !== 20000) message.warning(res.data.msg)
    if (res.data.code === 20000) message.success('操作成功')
    getUserList(rightData.sectorId)
    setTimeout(() => moveDisabled.value = false, 200)
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