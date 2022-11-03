<template>
  <n-spin
    :show="loading" 
    class="w-full text-center relative"
    :style="{height: props.height + 'px'}"
  >
    <slot v-if="localList.length === 0 && !loading" name="empty" />
    <slot v-if="localList.length > 0" :list="localList" />
    <div 
      v-if="localList.length > 0"
      class="sticky bottom-0 z-50 px-4 pb-4 pt-6 w-full flex justify-end bg-white/80"
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
import api from '/src/api/index.js'
import { pickBy } from 'lodash'

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
  auto: {
    type: Boolean,
    default: true
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
  setTimeout(() => loading.value = false, 300)
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