<!-- 选择部门【组件】 -->
<template>
  <div
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-tree-select
      :options="sectorList"
      placeholder="请选择部门"
      children-field="list"
      key-field="sectorId"
      label-field="sectorName"
      :multiple="props.options.multiple"
      :cascade="props.options.multiple"
      :checkable="props.options.multiple"
      filterable
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

const sectorList = ref([])
api.get('/addressBook/structure/getSectorList').then((res) => {
  if(res.data.code === 20000) sectorList.value = res.data.data
})
</script>