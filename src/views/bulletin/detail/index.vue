<template>
  <div class="w-full h-full bg-white rounded shadow">
    <div class="w-full h-16 border-b">
      <button 
        class="px-7 h-16 flex items-center text-lg"
        @click="$router.back()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block">
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>
        <span class="ml-1 -mt-0.5 text-base">返回上一页</span>
      </button>
    </div>
    <!-- 内容 -->
    <div 
      class="overflow-y-scroll"
      :style="{height: `${height - 153}px`}"
    >
      <!-- title -->
      <div class="p-7 border-b border-gray-100">
        <div class="flex items-center text-base space-x-4">
          <p class="text-gray-400">公告  发表于：{{ data.createdTime }} </p>
          <p class="text-gray-400">类型：{{ data.typeName }}</p>
          <button class="text-primary hover:underline" @click="$router.push(`/bulletin/edit/${route.params.id}`)">编辑</button>
          <button class="text-primary hover:underline" @click.stop="removeBulletin()">删除</button>
        </div>
        <h2 class="mt-8 text-3xl font-bold text-center line-clamp-1">{{ data.title }}</h2>
      </div>
      <!-- content -->
      <div 
        class="px-7 p-9"  
        :style="{height: `${height - 305}px`}"
      >
        <div v-html="data.contents" />
        <div 
          v-if="data.fileList.length > 0"
          class="mt-14"
        >
          <p class="text-lg font-bold">附件：</p>
          <n-upload
            v-model:file-list="data.fileList"
            :show-remove-button="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '/src/api/index.js'
import { useDialog, useMessage } from 'naive-ui'

const height = document.documentElement.clientHeight
const message = useMessage()
const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const data = ref({
  contents: '',
  createdTime: '',
  fileList: [],
  type: null,
  typeName: '',
  title: ''
})
api.get('/announcement/getDetails', { announceId: route.params.id }).then((res) => {
  if(res.data.code === 20000) Object.assign(data.value, res.data.data)
})

// 删除公告
const removeBulletin = function() {
  dialog.warning({
    title: '提示',
    content: '你确定要删除这篇公告吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      api.delete('/announcement/deleteAnnounce', {announceId: route.params.id}).then((res) => {
        if(res.data.code !== 20000) message.warning(res.data.msg)
        if(res.data.code === 20000) {
          message.success('删除公告成功')
          router.back()
        }
      })
    },
    onNegativeClick: () => {}
  })
}
</script>