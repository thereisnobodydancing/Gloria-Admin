<!-- 物品明细 -->
<template>
  <div class="w-full space-y-6">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="mt-2 space-y-4"
    >
      <div class="flex items-center">
        <p class="font-bold text-sm">物品明细 {{ index+1 }}</p>
        <button 
          v-if="index > 0"
          class="ml-auto text-primary text-sm"
          @click="removeItem(index)"
        >
          删除
        </button>
      </div>
      <div class="ml-2 space-y-2">
        <!-- 物品名称 -->
        <div class="w-full flex items-center">
          <p class="text-sm text-gray-400 w-20 flex-shrink-0 leading-8">物品名称：</p>
          <n-input placeholder="请输入物品名称" clearable />
        </div>
        
        <!-- 物品数量 -->
        <div class="w-full flex items-center">
          <p class="text-sm text-gray-400 w-20 flex-shrink-0 leading-8">物品数量：</p>
          <n-input-number placeholder="请输入物品数量" clearable class="w-full" />
        </div>
      </div>
    </div>
    <div class="px-20">
      <n-button type="tertiary" @click="list.push({})">+增加物品明细</n-button>
      <p v-if="props.options.desc" class="mt-2 text-xs text-gray-400">{{ props.options.desc }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Object
})
const list = ref([{}])
const removeItem = function(index) {
  list.value.splice(index, 1)
}
</script>