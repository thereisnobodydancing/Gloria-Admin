<!-- 开销明细 -->
<template>
  <div class="w-full space-y-2.5">
    <div v-for="(item, index) in expenseList" :key="index">
      <div class="flex items-center space-x-4">
        <div class="w-3/4">
          <n-input v-model:value="item.expenseUse" placeholder="请输入开销用途" clearable />
        </div>
        <div class="w-1/4">
          <n-input v-model:value="item.amountSpent" type="number" placeholder="请输入开销金额" clearable @input="inputPrice" />
        </div>
        <div 
          class="ml-auto flex-shrink-0 p-1 rounded-full"
          :class="index > 0 ? 'text-gray-500 cursor-pointer hover:bg-red-50 hover:text-red-600' : 'text-gray-300 cursor-not-allowed'"
          @click="deleteExpenlist(item.amountSpent, index)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
    <n-button type="tertiary" class="block" @click="addExpenlist">+增加明细</n-button>
    <p v-if="totalExpenses" class="mt-1 text-sm text-gray-500 space-x-10">
      <span>开销总计：{{ totalExpenses }}</span>
      <span>大写金额：{{ numToCny(totalExpenses) }}</span>
    </p>
    <p v-if="props.options.desc" class="mt-1 text-xs text-gray-400">{{ props.options.desc }}</p>
  </div>
</template>

<script setup>
import { numToCny } from '/src/until/index.js'

const props = defineProps({
  options: Object
})
const totalExpenses = ref('')     // 总计
const expenseList = ref([
  { expenseUse: '',  amountSpent: '' }
])

// 获取开销总计、大写金额
const getTotalExpenses = function() {
  let sum = expenseList.value.reduce((sum, item) => +sum + +item.amountSpent, 0)
  totalExpenses.value = sum + ''
}

// 增加明细
const addExpenlist = function() {
  expenseList.value.push({ expenseUse: '',  amountSpent: '' })
}

// 删除明细
const deleteExpenlist = function(price, index) {
  if(index > 0) {
    expenseList.value.splice(index, 1)
    if(price) getTotalExpenses()
  }
}

// 输入开销金额
const inputPrice = function() {
  getTotalExpenses()
}
</script>