<!-- 省，市，区【组件】 -->
<template>
  <div
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-cascader
      :placeholder="props.options.placeholder"
      :options="cityList"
      :show-path="true"
      check-strategy="child"
      :filterable="true"
      label-field="name"
      value-field="id"
      children-field="addressVOList"
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

const cityList = ref([])
api.get('/template/getAddress').then((res) => {
  cityList.value = res.data.data
})
</script>