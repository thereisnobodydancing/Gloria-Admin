<template>
  <div>
    <p class="font-bold">{{ props.list[props.active].name }}</p>
      <div class="mt-8 space-y-6">
        <!-- 标题 -->
        <div class="space-y-2">
          <div class="flex items-center">
            <p class="text-sm">标题</p>
            <p class="ml-auto text-xs text-gray-500">最多6字</p>
          </div>
          <n-input v-model:value="props.list[props.active].options.name" type="text" placeholder="请输入" maxlength="6" show-count clearable />
        </div>
        <!-- 单行输入框 || 多行输入框 || 数字输入框 -->
        <template v-if="props.list[props.active].type === 'input' || props.list[props.active].type === 'textarea' || props.list[props.active].type === 'inputNumber'">
          <!-- 提示文字 -->
          <div class="space-y-2">
            <div class="flex items-center">
              <p class="text-sm">提示文字</p>
              <p class="ml-auto text-xs text-gray-500">最多30字</p>
            </div>
            <n-input 
              v-model:value="props.list[props.active].options.placeholder" 
              type="textarea" 
              :autosize="{minRows: 1}"
              placeholder="请输入" 
              maxlength="30" 
              show-count 
              clearable 
            />
          </div>
        </template>
        <!-- 单选框组 || 多选框组 || 选择器 -->
        <template v-if="props.list[props.active].type === 'radio' || props.list[props.active].type === 'checkbox' || props.list[props.active].type === 'select'">
          <!-- 选项组 -->
          <div class="space-y-2">
            <div class="flex items-center">
              <p class="text-sm">选项组</p>
              <p class="ml-auto text-xs text-gray-500">至少2条数据</p>
            </div>
            <div
              v-for="(item, index) in props.list[props.active].options.list" 
              :key="index"
              class="flex items-center space-x-4"
            >
              <n-input v-model:value="item.label" type="text" placeholder="请输入" clearable />
              <button 
                :disabled="props.list[props.active].options.list.length <= 2"
                class="w-7 h-7 flex-shrink-0 rounded-full text-white"
                :class="props.list[props.active].options.list.length <= 2 ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary/80 hover:bg-primary'"
                @click="removeRadio(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
            <n-button 
              class="text-primary text-sm cursor-pointer"
              @click="addRadio"
            >
              添加选项
            </n-button>
          </div>
        </template>
        <!-- 日期选择器 -->
        <template v-if="props.list[props.active].type === 'datePicker'">
          <!-- 日期类型 -->
          <div class="space-y-2">
            <p class="text-sm">日期类型</p>
            <n-select v-model:value="props.list[props.active].options.type" :options="dateTypes" />
          </div>
        </template>
        <!-- 说明 -->
        <div class="space-y-2">
          <div class="flex items-center">
            <p class="text-sm">说明</p>
            <p class="ml-auto text-xs text-gray-500">最多50字</p>
          </div>
          <n-input
            v-model:value="props.list[props.active].options.desc" 
            type="textarea" 
            :autosize="{minRows: 3}"
            placeholder="请输入" 
            maxlength="50" 
            show-count 
            clearable 
          />
        </div>
        <!-- 必填 -->
        <div class="space-y-2">
          <p class="text-sm">必填</p>
          <n-switch v-model:value="props.list[props.active].options.required" />
        </div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: Array,
  active: Number
})

// 单选、多选框组添加选项
const addRadio = function() {
  props.list[props.active].options.list.push({
    label: `选项${props.list[props.active].options.list.length + 1}`, 
    value: `选项${props.list[props.active].options.list.length + 1}`
  })
}
// 单选、多选框组删除选项
const removeRadio = function(index) {
  props.list[props.active].options.list.splice(index, 1)
}

// 日期种类
const dateTypes = [
  {label: '日期', value: 'date'},
  {label: '日期时间', value: 'datetime'},
  {label: '日期范围', value: 'daterange'},
  {label: '日期时间范围', value: 'datetimerange'},
  {label: '月份', value: 'month'},
  {label: '月份范围', value: 'monthrange'},
  {label: '年份', value: 'year'},
  {label: '年份范围', value: 'yearrange'},
  {label: '季度', value: 'quarter'},
  {label: '季度范围', value: 'quarterrange'},
]
</script>