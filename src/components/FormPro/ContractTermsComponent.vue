<!-- 合同条款 -->
<template>
  <div class="w-full space-y-2.5">
    <div
      v-for="(item, index) in list" 
      class="w-full flex space-x-3"
    >
      <p class="w-20 font-bold leading-8 text-right text-gray-500">条款 {{ index + 1 }}：</p>
      <n-input v-model:value="item.content" type="textarea" :placeholder="`请输入条款 ${index + 1}`" clearable :autosize="{ minRows: 2}" />
      <div 
        class="ml-auto flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
        :class="index > 0 ? 'text-gray-500 cursor-pointer hover:bg-red-50 hover:text-red-600' : 'text-gray-300 cursor-not-allowed'"
        @click="deleteExpenlist(index)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <n-button type="tertiary" class="block ml-20" @click="addExpenlist">+增加条款</n-button>
    <p v-if="props.options.desc" class="mt-1 text-xs text-gray-400">{{ props.options.desc }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Object
})

const list = ref([{content: ''}])

// 增加条款
const addExpenlist = function() {
  list.value.push({ content: '' })
}
// 删除条款
const deleteExpenlist = function(index) {
  if(index > 0) list.value.splice(index, 1)
}
</script>