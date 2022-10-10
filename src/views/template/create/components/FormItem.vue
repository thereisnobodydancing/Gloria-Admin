<template>
  <div class="flex">
    <p class="text-sm w-28 flex-shrink-0 leading-8">
      <span v-if="element.options.required" class="text-primary font-bold">*</span>
      <span :class="element.options.required ? 'ml-0.5' : 'ml-2'">{{ element.options.name }}</span>
    </p>
    <!-- 单行输入框 -->
    <template v-if="element.type==='input'">
      <div class="w-full">
        <n-input type="text" :placeholder="element.options.placeholder" readonly />
        <p v-if="element.options.desc" class="mt-1 text-xs text-gray-400">{{ element.options.desc }}</p>
      </div>
    </template>
    <!-- 多行输入框 -->
    <template v-if="element.type==='textarea'">
      <div class="w-full">
        <n-input type="textarea" :placeholder="element.options.placeholder" readonly />
        <p v-if="element.options.desc" class="mt-1 text-xs text-gray-400">{{ element.options.desc }}</p>
      </div>
    </template>
    <!-- 数字输入框 -->
    <template v-if="element.type==='inputNumber'">
      <div class="w-full">
        <n-input-number :placeholder="element.options.placeholder" readonly />
        <p v-if="element.options.desc" class="mt-1 text-xs text-gray-400">{{ element.options.desc }}</p>
      </div>
    </template>
    <!-- 选择器 -->
    <template v-if="element.type==='select'">
      <n-select :options="element.options.list" />
    </template>
    <!-- 单选框组 -->
    <template v-if="element.type==='radio'">
      <n-radio-group name="radiogroup" class="leading-8">
        <n-space>
          <n-radio v-for="item in element.options.list" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </template>
    <!-- 多选框组 -->
    <template v-if="element.type==='checkbox'">
      <n-checkbox-group class="mt-1">
        <n-space item-style="display: flex;">
          <n-checkbox v-for="item in element.options.list" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </template>
    <!-- 日期选择器 -->
    <template v-if="element.type==='datePicker'">
      <n-date-picker 
        :type="element.options.type" 
        :start-placeholder="datePlaceholder[element.options.type] ? datePlaceholder[element.options.type].start : null" 
        :end-placeholder="datePlaceholder[element.options.type] ? datePlaceholder[element.options.type].end : null"
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  element: Object
})

// 日期选择器有关范围的 placeholder
const datePlaceholder = {
  daterange: { start: '开始日期', end: '结束日期' },
  datetimerange: { start: '开始日期时间', end: '结束日期时间' },
  monthrange: { start: '开始月份', end: '结束月份' },
  yearrange: { start: '开始年份', end: '结束年份' },
  quarterrange: { start: '开始季度', end: '结束季度' },
}
</script>