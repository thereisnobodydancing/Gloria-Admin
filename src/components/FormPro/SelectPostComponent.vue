<!-- 选择职位【组件】 -->
<template>
  <div
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-select 
      :options="postList" 
      label-field="roleName"
      value-field="id" 
      filterable
      :multiple="props.options.multiple"
      :placeholder="props.options.placeholder"
      clearable
    />
    <p
      v-if="props.options.desc" 
      class="mt-1 text-xs text-gray-400"
    >
      {{ props.options.desc }}
    </p>
  </div>
</template>
  
<script setup>
import api from '/src/api/index.js'

const props = defineProps({
  options: Object
})

const postList = ref([])
api.get('/position/getCompanyPositionList').then((res) => {
  postList.value = res.data.data
})
</script>