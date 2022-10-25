<template>
  <n-spin
    :show="loading" 
    class="w-full text-center relative"
    :style="{height: props.height + 'px'}"
  >
    <slot v-if="localList.length > 0" :list="localList" />
    <div 
      v-if="localList.length === 0 && !loading"
      class="flex items-center justify-center"
      :style="{height: props.height - 75 + 'px'}"
    >
      <n-empty size="large" :description="description" />
    </div>
    <div 
      v-if="localList.length > 0"
      class="bottom-0 z-50 px-7 py-4 w-full flex justify-end bg-white"
      :class="props.useSticky ? 'sticky' : 'absolute'"
    >
      <n-pagination 
        v-model:page="currentPage" 
        :page-count="Math.ceil(total/props.size)" 
        @update:page="handleCurrentChange"
      />
    </div>
  </n-spin>
</template>

<script setup>
import { pickBy } from 'lodash'
import api from '/src/api/index.js'

const  props = defineProps({
  height: {
    type: Number,
    default: 400
  },
  size: {
    type: Number,
    default: 8
  },
  url: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default: () => {}
  },
  description: {
    type: String,
    default: '无数据'
  },
  auto: {
    type: Boolean,
    default: true
  },
  useSticky: {
    type: Boolean,
    default: false
  }
})
const loading = ref(false)
const currentPage = ref(1)
const localList = ref([])
const total = ref(0)

const askApi = function(more = true) {
  loading.value = true
  let newParams = {}
  if(!more) currentPage.value = 1
  Object.assign(newParams, props.params, { page: currentPage.value, pageSize: props.size })
  api.get(props.url, pickBy(newParams)).then((res) => {
    if(res.data.code === 20000) {
      total.value = res.data.data.total
      localList.value = res.data.data.data ? res.data.data.data : []
    } else {
      total.value = 0
      localList.value = []
    }
    setTimeout(() => loading.value = false, 200)
  })
}
onMounted(() => {
  if(props.auto) askApi()
})
watch(() => props.params, (value) => {
  askApi(false)
}, {
  deep: true
})

watch(() => props.size, value => {
  askApi()
})

watch(() => props.url, value => {
  askApi(false)
})

const  handleCurrentChange = function(page) {
  askApi()
}

defineExpose({
  askApi
})
</script>