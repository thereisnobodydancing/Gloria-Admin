<!-- 多选框【组件】 -->
<template>
  <div class="w-full">
    <n-checkbox-group class="mt-1">
      <n-space item-style="display: flex;">
        <n-checkbox 
          v-for="item in props.options.list" 
          :key="item.value" 
          :value="item.value"
        >
          {{ item.label }}
        </n-checkbox>
      </n-space>
    </n-checkbox-group>
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