<template>
  <div>
    <n-upload
      v-model:file-list="fList"
      :action="props.action"
      :accept="props.accept"
      :headers="headers"
      :list-type="props.type"
      :max="max"
      @finish="onFinish"
      @change="onChange"
      @preview="handlePreview"
    >
      <slot />
    </n-upload>
    <!-- image-card模式下的预览图片 -->
    <n-modal
      v-model:show="modal.show"
      preset="card"
      class="w-[600px]"
    >
      <img :src="modal.previewImgUrl" class="w-full">
    </n-modal>
  </div>
</template>

<script setup>
const emit = defineEmits(['change'])
const props = defineProps({
  // 请求提交的地址
  action: {
    type: String,
    required: true
  },
  // 接受的文件类型
  accept: {
    type: String,
    default: undefined
  },
  // 文件列表的内建样式 text、image 和 image-card
  type: {
    type: String,
    default: 'image-card'
  },
  fileList: {
    type: Array,
    default: () => [{}]
  },
  max: {
    type: Number,
    default: undefined
  }
})
const headers = {
  Authorization: sessionStorage.getItem("token")
}
const fList = ref(props.fileList)
watch(() => props.fileList, (value) => {
  fList.value = value
}, {
  deep: true
})

const modal = reactive({
  show: false,
  previewImgUrl: ''
})

// 文件上传结束的回调
const onFinish = function({file, event}) {
  file.url = import.meta.env.VITE_APP_URL + JSON.parse(event.target.response).data.url
}
// 	组件状态变化的回调
const onChange = function({file, fileList, event}) {
  if(file.url) {
    let arr = []
      fileList.forEach((item, index) => {
        arr[index] = {}
        arr[index].id = item.id
        arr[index].name = item.name
        arr[index].url = item.url
        arr[index].status = 'finished'
      })
      emit('change', arr)
  }
}
// 预览图片
const handlePreview = function (file) {
  if(props.type === 'image-card') {
    modal.previewImgUrl = file.url
    modal.show = true
  }
}
defineExpose({
})
</script>