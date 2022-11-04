<!-- 金额输入框【组件】 -->
<template>
  <div 
    :class="{
      'w-1/3': props.options.width === '1/3',
      'w-2/3': props.options.width === '2/3',
      'w-full': props.options.width === '3/3'
    }"
  >
    <n-input-group>
      <n-input-group-label 
        class="w-32"
        v-if="props.options.currency.length === 1"
      >
        {{ props.options.currency[0].label }}
      </n-input-group-label>
      <n-select 
        v-if="props.options.currency.length > 1"
        :options="props.options.currency" 
        placeholder="请选择币种" 
        :style="{ width: '200px' }" 
      />
      <n-input-number 
        v-model:value="priceValue" 
        :placeholder="props.options.placeholder" 
        class="w-full"
        clearable 
      />
    </n-input-group>
    <p v-if="props.options.showUppercase" class="mt-1 text-sm text-gray-600">{{ numToCny(priceValue) }}</p>
    <p v-if="props.options.desc" class="mt-1 text-xs text-gray-400">{{ props.options.desc }}</p>
  </div>
</template>
  
<script setup>
import { numToCny } from '/src/until/index.js'

const props = defineProps({
  options: Object
})
const priceValue = ref(0)
</script>