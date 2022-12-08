<template>
  <div class="w-full h-full bg-gray-200 rounded shadow">
    <div class="w-full h-16 border-b bg-white">
      <button 
        class="px-7 h-16 flex items-center text-lg"
        @click="$router.back()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block">
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>
        <span class="ml-1 -mt-0.5 text-base">编辑</span>
      </button>
    </div>
    <!-- 发公告区域 -->
    <div class="flex justify-center bg-white border-t border-b">
      <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" />
    </div>
    <!-- content -->
    <n-spin :show="showLoading">
      <div
        class="py-4 overflow-y-scroll"
        :style="{height: `${height - 192}px`}"
      >
        <div class="bg-white w-11/12 rounded p-8 mx-auto relative">
          <!-- 1-title -->
          <div class="w-full py-6 border-b px-2">
            <input v-model="data.title" placeholder="输入标题" class="text-3xl w-full" maxlength="50">
          </div>
          <!-- 2-content -->
          <div class="border-b py-4">
            <div class="w-60 mb-2">
              <n-select 
                v-model:value="data.type" 
                :options="typeList" 
                label-field="name" 
                value-field="id" 
                placeholder="筛选：请选择公告类型" 
                clearable 
              />
            </div>
            <Editor 
              v-model="data.contents"
              :defaultConfig="editorConfig" 
              class="overflow-y-hidden min-h-[385px]"
              @onCreated="handleCreated"
            />
            <div class="ml-2">
              <h3 class="mb-4 text-lg font-bold">附件</h3>
              <base-upload
                :action="action"
                type="text"
                :file-list="data.fileList" 
                @change="changeFileUpload" 
              >
                <n-button class="mb-2">上传文件</n-button>
              </base-upload>
            </div>
          </div>
          <!-- 3-user -->
          <div class="px-2 py-4">
            <h3 class="text-lg font-bold">发送给</h3>
            <div class="mt-4 w-96">
              <n-select v-model:value="recipientType" :options="recipientList" @update:value="changeRecipientType" />
            </div>
            <div v-if="recipientType === 'select'" class="mt-4 flex flex-wrap">
              <!-- 人员表 -->
              <div
                v-for="(item, index) in recipientData.options"
                :key="index"
                class="mr-2.5 mb-2 h-8 rounded bg-gray-100 flex items-center px-1 cursor-default"
              >
                <!-- 头像 -->
                <div 
                  class="flex-shrink-0 w-[26px] h-[26px] rounded"
                  :class="{
                    'py-[3px] bg-primary': !item.picture && item.type === 'user',
                    'py-[3px] bg-blue-500': !item.picture && item.type === 'sector'
                  }"
                >
                  <img v-if="item.picture" :src="item.picture" :alt="item.name" width="26" height="26" class="rounded">
                  <svg v-if="!item.picture && item.type === 'user'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg v-if="!item.picture && item.type === 'sector'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <!-- 名字 -->
                <p class="ml-2.5 text-xs mr-3">{{ item.name }}</p>
                <!-- clear -->
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                  @click="removeRecipientOption(item.key, item.id, index)"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
              <!-- 添加 -->
              <div class="mb-1.5">
                <button 
                  class="w-8 h-8 border rounded text-gray-500 hover:border-primary hover:text-primary" 
                  @click="showUserModal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- 4-submit -->
          <div class="mt-2 px-2">
            <n-button type="primary" @click="updateAnnounce">确认修改</n-button>
          </div>
        </div>
      </div>
    </n-spin>
  </div>
  <!-- 选择可以发起申请的人员 -->
  <add-user-modal ref="addUserRef" title="选择成员" strategy="parent" @confirm="addRecipient" @cancel="cancelRecipient" />
</template>

<script setup>
import api from '/src/api/index.js'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useDialog, useMessage } from 'naive-ui'
import { useEditor } from '/src/composables/useEditor.js'

// 路由
const route = useRoute()
const router = useRouter()
// 弹出组件
const message = useMessage()
const dialog = useDialog()
const showLoading = ref(true)
// 窗口高度、上传图片地址
const height = document.documentElement.clientHeight
const action = `${import.meta.env.VITE_APP_URL}/announcement/upload`
// 编辑器相关
const { toolbarConfig, editorRef, editorConfig, handleCreated } = useEditor(message, action)
// 获取公告类型列表
let typeList = ref([])
api.get('/announcement/getAnnounceTypeList').then((res) => {
  if(res.data.code === 20000) typeList.value = res.data.data
})
// 获取公告信息
const data = reactive({
  id: route.params.id,
  title: '',
  type: null,
  contents: '',
  createdTime: '',
  fileList: [],
  recipientDTOList: null  // { recipientId: 0,  recipientType: 0}
})
api.get('/announcement/getDetails', { announceId: route.params.id }).then((res) => {
  if(res.data.code === 20000) {
    Object.assign(data, res.data.data)
    if(res.data.data.recipientDTOList && res.data.data.recipientDTOList.length > 0) {
      recipientType.value = res.data.data.recipientDTOList[0].recipientType === 1 ? 'all' : 'select'
      if(res.data.data.recipientDTOList[0].recipientType !== 1) {
        recipientData.ids = res.data.data.recipientDTOList.map(item => item.recipientId)
        recipientData.keys = res.data.data.recipientDTOList.map(item => item.key)
        recipientData.options = res.data.data.recipientDTOList.map(item => {
          return {
            checkboxDisabled: false,
            id: item.recipientId,
            key: item.key,
            list: null,
            name: item.recipientName,
            picture: item.recipientHeadShot,
            type: item.type
          }
        })
      }
    }
  }
  setTimeout(() => showLoading.value = false, 100)
})
// 上传文件
const changeFileUpload = (fileList) => data.fileList = fileList

// 选择人员、部门
const addUserRef = ref()
const recipientType = ref(null)
const recipientList = [
  { label: '全员', value: 'all' },
  { label: '指定人员/部门', value: 'select' }
]
const recipientData = reactive({
  options: [],
  keys: [],
  ids: []
})

// 1 全公司、 2 部门、 3 个人
const changeRecipientType = function(value) {
  if(value === 'all') {
    recipientData.options = recipientData.keys = recipientData.ids = []
    data.recipientDTOList = [{ recipientId: JSON.parse(sessionStorage.getItem('user')).companyId,  recipientType: 1 }]
  }
  if(value === 'select') showUserModal()
}
// 打开弹窗
const showUserModal = function() {
  addUserRef.value.showModal(recipientData.options, recipientData.keys, recipientData.ids)
}
// 添加人员、部门
const addRecipient = function({options, keys, ids}) {
  recipientData.options = options
  recipientData.keys = keys
  recipientData.ids = ids
  data.recipientDTOList = []
  options.forEach(item => {
    data.recipientDTOList.push({ 
      recipientId: item.id,  
      recipientType: item.type === 'sector' ? 2 : 3,
      recipientName: item.name,
      recipientHeadShot: item.picture,
      key: item.key,
      type: item.type
    })
  })
}
// 取消弹窗
const cancelRecipient = function() {
  if(!data.recipientDTOList || data.recipientDTOList.length === 0) {
    recipientType.value = null
  } else {
    if(data.recipientDTOList[0].recipientType === 1) recipientType.value = 'all'
  }
}
// 删除一个tag
const removeRecipientOption = function(key, id, index) {
  recipientData.keys.splice(recipientData.keys.indexOf(key), 1)
  recipientData.ids.splice(recipientData.ids.indexOf(id), 1)
  recipientData.options.splice(index, 1)
  data.recipientDTOList.splice(index, 1)
  if(recipientData.options.length === 0) recipientType.value = data.recipientDTOList = null
}

// 修改公告
const updateAnnounce = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要修改这篇公告吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      if(data.fileList.length > 0) {
        data.fileList = data.fileList.map(item => {
          return { 
            id: !isNaN(item.id) ? item.id: null,
            name: item.name,
            status: item.status,
            url: item.url 
          }
        })
      }
      api.put('/announcement/updateAnnounce', data).then((res) => {
        if(res.data.code === 20000) {
          message.success('修改成功')
          router.back()
        }
      })
    },
    onNegativeClick: () => {}
  })
}
</script>