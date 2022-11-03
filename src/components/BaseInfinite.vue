<template>
  <n-spin :show="showSpin">
    <!-- 无内容empty -->
    <slot v-if="showEmpty" name="empty" />
    <!-- list -->
    <div v-else>
      <slot v-if="localList.length > 0" :list="localList" />
      <!-- infinite -->
      <InfiniteLoading :distance="200" @infinite="load">
        <template #spinner>
          <!-- 加载中 -->
          <span v-show="loading">
            <n-spin size="small" />
          </span>
          <!-- 没有更多了 -->
          <n-divider v-show="finished && localList.length > props.finishednum" dashed class="pt-4 pb-6 text-xs text-gray-400">
            没有更多了
          </n-divider>
        </template>
      </InfiniteLoading>
    </div>
  </n-spin>
</template>

<script setup>
import { pickBy } from 'lodash'
import api from '/src/api/index.js'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default: () => {}
  },
  size: {
    type: Number,
    default: 12
  },
  finishednum: {
    type: Number,
    default: 6
  }
})

const showSpin = ref(true)
const showEmpty = ref(false)
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(1)
const localList = ref([])

const askApi = function(more = true) {
  loading.value = true
  if(!more) {
    currentPage.value = 1
  }
  let newParams = {}
  Object.assign(newParams, props.params, { page: currentPage.value, pageSize: props.size })
  api.get(props.url, pickBy(newParams)).then((res) => {
    showEmpty.value = res.data.data.data.length === 0
    if(more) localList.value.push(...res.data.data.data); currentPage.value++
    if(!more) localList.value = res.data.data.data
    if (res.data.data.current * res.data.data.pageSize >= res.data.data.total) finished.value = true
    loading.value = showSpin.value = false
  })
  setTimeout(() => loading.value = showSpin.value = false, 300)
}

watch(props.params, (value) => {
  askApi(false)
}, {
  deep: true
})
// watch(() => props.size, value => {
//   askApi()
// })
watch(() => props.url, value => {
  askApi(false)
})

const load = function() {
  if(!finished.value) askApi()
}

defineExpose({
  askApi
})
</script>