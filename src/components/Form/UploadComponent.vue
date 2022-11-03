<!-- 上传【组件】 -->
<template>
  <div class="w-full">
    <n-upload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :list-type="props.options.type"
    >
      <n-button v-if="props.options.type==='text'">{{ props.options.btnText }}</n-button>
    </n-upload>
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