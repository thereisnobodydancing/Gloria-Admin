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
    <div
      class="py-4 overflow-y-scroll"
      :style="{height: `${height - 192}px`}"
    >
      <div class="bg-white w-11/12 rounded p-8 mx-auto relative">
        <div class="w-full py-6 border-b px-2">
          <input v-model="data.title" placeholder="输入标题" class="text-3xl w-full" maxlength="50">
        </div>
        <div class="w-60 py-4">
          <n-select v-model:value="data.type" :options="typeList" label-field="name" value-field="id" placeholder="筛选：请选择公告类型" clearable />
        </div>
        <Editor 
          v-model="data.contents"
          :defaultConfig="editorConfig" 
          class="overflow-y-hidden min-h-[385px]"
          @onCreated="handleCreated"
        />
        <div class="ml-2">
          <h3 class="mb-4 text-lg font-bold">附件：</h3>
          <base-upload
            :file-list="data.fileList"
            :action="action" 
            type="text" 
            @change="changeFileUpload" 
          >
            <n-button class="mb-2">上传文件</n-button>
          </base-upload>
        </div>
        <div class="mt-4 border-t p-4">
          <n-button type="primary">确认修改</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '/src/api/index.js'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useDialog, useMessage } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const height = document.documentElement.clientHeight
const action = `${import.meta.env.VITE_APP_URL}/announcement/upload`

// 编辑器相关
const toolbarConfig = {} 
const editorRef = shallowRef()
const editorConfig = { 
  placeholder: '在这里输入内容...',
  autoFocus: false,
  readOnly: false,
  MENU_CONF: {}
}
// 行高
editorConfig.MENU_CONF['lineHeight'] = {
  lineHeightList: ['0.5', '0.75', '1', '1.25', '1.5', '2']
}
// 上传图片
editorConfig.MENU_CONF['uploadImage'] = {
  server: action,
  fieldName: 'file',
  maxFileSize: 256000,
  maxNumberOfFiles: 10,
  headers: {
    Authorization: sessionStorage.getItem("token")
  },
  customInsert(res, insertFn) {
    if(res.code === 20000) insertFn(import.meta.env.VITE_APP_URL + res.data.url, '图片', '')
    if(res.code !== 20000) message.error(res.msg)
  },
  onError(file, err, res) {
    if(file.size > 256000) {
      message.error('图片大小不得超过250KB')
      return
    }
    message.error(`${file.name} 上传出错`)
  }
}
const handleCreated = (editor) => {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

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
  fileList: []
})
api.get('/announcement/getDetails', { announceId: route.params.id }).then((res) => {
  if(res.data.code === 20000) Object.assign(data, res.data.data)
})
</script>