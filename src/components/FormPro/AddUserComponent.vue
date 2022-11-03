<!-- 选择职位【组件】 -->
<template>
  <div class="w-full">
    <button
      aria-label="添加成员"
      class="w-10 h-10 rounded-md border border-dashed border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
      @click="showModal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </button>
  </div>
</template>
  
<script setup>
import api from '/src/api/index.js'

const props = defineProps({
  options: Object
})

const showModal = function() {

}
</script>