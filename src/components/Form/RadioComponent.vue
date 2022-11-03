<!-- 单选框【组件】 -->
<template>
  <div class="w-full">
    <n-radio-group name="radiogroup" class="leading-8">
      <n-space>
        <n-radio 
          v-for="item in props.options.list" 
          :key="item.value" 
          :value="item.value"
        >
          {{ item.label }}
        </n-radio>
      </n-space>
    </n-radio-group>
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