<template>
  <base-card title="职位管理" :loading="showPageLoading">
    <div class="w-full h-full flex">
      <!-- 左侧：职位列表 -->
      <div class="flex-shrink-0 w-64 h-full border-r relative">
        <div
          class="w-full overflow-y-scroll pl-2 pr-1"
          :style="{height: `${clientHeight - 225}px`}"
        >
          <div class="px-1.5 pt-2 pb-3 sticky top-0 bg-white z-20">
            <n-input v-model:value="postPattern" placeholder="请输入职位名称" clearable>
              <template #prefix><n-icon :component="SearchIcon" /></template>
            </n-input>
          </div>
          <n-tree 
            block-line 
            :data="postList"
            key-field="id" 
            label-field="positionName"
            selectable
            :show-irrelevant-nodes="false"
            :pattern="postPattern"
            :render-prefix="renderPrefix('post')"
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
          <n-button type="primary" ghost size="large" block @click="showPostModal('create')">新增职位</n-button>
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
            <n-button @click="showPostModal('create')">+新增职位</n-button>
          </div>
        </div>
        <n-spin 
          v-else 
          :show="rightData.showLoading" 
          :style="{ height: `${clientHeight - 150}px` }"
        >
          <div class="px-8 py-4">
            <div class="flex items-center">
              <h3 class="text-lg mr-2">{{ rightData.positionName }}</h3>
              <n-dropdown :options="rightData.sectorOptions" placement="bottom-end" @select="SectorSelect">
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
                <n-input v-model:value="searchValue" placeholder="搜索" clearable @update:value="toSearch">
                  <template #prefix><n-icon :component="SearchIcon" /></template>
                </n-input>
              </div>
              <div class="ml-auto space-x-2">
                <n-button @click="showAddUserModal">添加员工</n-button>
                <n-button 
                  :disabled="checkList.length === 0" 
                  :type="checkList.length === 0 ? 'default' : 'primary'" 
                  ghost 
                  @click="showChangePostModal"
                >
                  变更职位
                </n-button>
              </div>
            </div>
            <div 
              v-if="rightData.showLoading === false && userList.length === 0" 
              class="w-full flex flex-col items-center justify-center"
              :style="{ height: `${clientHeight - 330}px` }"
            >
              <user-empty v-if="searchValue.length === 0" />
              <search-empty v-else :width="250" :height="250" />
              <p class="mt-3 text-sm text-gray-400">{{ searchValue.length === 0 ? '该部门暂未添加员工数据' : '啥也没搜到' }}</p>
              <div v-if="searchValue.length === 0" class="mt-4">
                <n-button @click="showAddUserModal">+添加员工</n-button>
              </div>
            </div>
            <div v-if="rightData.showLoading === false && userList.length > 0" class="mt-5 space-y-2">
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
                    class="w-full h-14 px-4 flex items-center group border-b border-b-gray-100 hover:border-b-gray-500/20 hover:bg-gray-100"
                  >
                    <div 
                      class="ml-4 flex items-center cursor-pointer" 
                      @click.stop="showCard(item.id)"
                    >
                      <div 
                        class="flex-shrink-0 w-10 h-10 rounded-md"
                        :class="{'bg-primary py-1.5': !item.headshot}"
                      >
                        <img v-if="item.headshot" :src="item.headshot" :alt="item.userName" width="40" height="40" class="rounded-md">
                        <p v-else class="text-center text-white leading-7 text-sm">{{ toNameAvatar(item.userName) }}</p>
                      </div>
                      <p class="ml-2.5 text-base text-left">{{ item.userName }}</p>
                      <button 
                        v-if="!item.userState" 
                        class="ml-4 px-1.5 text-white text-xs bg-gray-400/70 leading-5 rounded"
                      >
                        已停用
                      </button>
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
  <!-- 1，新增/编辑职位 -->
  <create-post-modal ref="createPostRef" @refresh="postRefresh" />
  <!-- 2，修改职位 -->
  <change-post-modal ref="changePostRef" @refresh="refreshUserModal" />
  <!-- 3、添加员工 -->
  <add-user-modal ref="addUserRef" @confirm="confirmAddUser" />
  <!-- 名片 -->
  <business-card-modal ref="cardRef" />
</template>

<script setup>
import api from '/src/api/index.js'
import { NIcon } from "naive-ui"
import { debounce, pickBy } from 'lodash'
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

// 获取职位
const postList = ref([])
const postPattern = ref('')
const getPostList = function() {
  api.get('/position/getCompanyPositionList').then((res) => {
    if(res.data.code === 20000) postList.value = res.data.data
    setTimeout(() => showPageLoading.value = false, 150)
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
    rightData.positionName = name
  }
}

// 点击左侧职位
const handleUpdateValue = function (keys, option) {
  if(keys.length > 0) {
    searchValue.value = ''
    rightData.postId = option[0].id
    rightData.positionName = option[0].positionName     // 获取部门名
    rightData.showEmpty = false                 // 关闭空状态
    getUserList(option[0].id)                   // 获取成员列表
  }
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
  positionName: '',
  postId: '',
  sectorOptions: [
    {label: '编辑职位', key: 'edit', icon: renderIcon(EditIcon)}, 
    {label: '删除职位', key: 'remove', icon: renderIcon(TrashIcon)}
  ]
})
const userList = ref([])
// 根据职位id获取人员列表
const getUserList = function(id, searchValue='', loading=true) {
  rightData.showLoading = loading
  api.get('/position/getUserListByPositionId', pickBy({position: id, keyWord: searchValue})).then((res) => {
    userList.value = res.data.data
    checked.indeterminate = checked.state = false
    checkList.value = []
    rightData.showLoading = false
  })
}

// 搜索
const searchValue = ref('')
const toSearch = debounce((searchValue) => getUserList(rightData.postId, searchValue), 300, {
  leading: false,  // 延长开始后调用
	trailing: true  // 延长结束前调用
})
onUnmounted(() => {
  toSearch.cancel()
})

// 下拉菜单
const SectorSelect = function(key) {
  if(key === 'edit')  showPostModal('edit', rightData.positionName, rightData.postId)
  if(key === 'remove') removePost()
}

/***** 选择器相关 *****/
const checked = reactive({
  state: false,
  indeterminate: false
})
const checkList = ref([])
// 全选、不全选
const checkAll = function (isChecked) {
  checkList.value = []
  if (isChecked) {
    checked.indeterminate = false
    checkList.value = userList.value.map(item => item.id)
  }
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
  getUserList(rightData.postId, '', false)
}


/******* 添加员工 *******/
const addUserRef = ref()
const showAddUserModal = function() {
  addUserRef.value.showModal()
}
const confirmAddUser = function(select) {
  let data = { positionId: rightData.postId, userIdList: select.ids }
  api.put('/userManage/updatePositonUser', data).then((res) => {
    if(res.data.code === 20000) message.success('添加成功')
    if(res.data.code !== 20000) message.warning(res.data.msg)
    refreshUserModal()
  })
}

/******** 名片 ********/
const cardRef = ref()
const showCard = function(id) {
  cardRef.value.showCard(id)
}
</script>