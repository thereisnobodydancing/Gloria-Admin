<!-- 电话号输入框【组件】 -->
<template>
  <div 
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-input
      type="text"
      :status="showError ? 'error' : undefined"
      :placeholder="props.options.placeholder"
      :show-count="true"
      :maxlength="18"
      clearable
      @update:value="handleChange"
    />
    <p v-if="showError" class="text-xs text-red-600 mt-1">身份证号格式不正确</p>
    <p v-if="props.options.desc" class="mt-1 text-xs text-gray-400">{{ props.options.desc }}</p>
  </div>
  </template>
  
  <script setup>
  const props = defineProps({
    options: Object
  })
  const showError = ref(false)
  const handleChange = function(value) {
    showError.value = value.length === 0 ? false : !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
  }
  </script>