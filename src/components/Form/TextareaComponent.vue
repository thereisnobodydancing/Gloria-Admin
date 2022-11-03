<!-- 多行输入框【组件】 -->
<template>
  <div 
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-input 
      type="textarea" 
      :placeholder="props.options.placeholder" 
      :show-count="props.options.showCount" 
      :maxlength="props.options.maxLength" 
      readonly 
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
  const props = defineProps({
    options: Object
  })
  </script>