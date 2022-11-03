<!-- 日期选择器【组件】 -->
<template>
  <div class="w-full">
    <n-date-picker
      :type="props.options.type" 
      :start-placeholder="datePlaceholder[props.options.type] ? datePlaceholder[props.options.type].start : null" 
      :end-placeholder="datePlaceholder[props.options.type] ? datePlaceholder[props.options.type].end : null"
    />
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
const datePlaceholder = {
  daterange: { start: '开始日期', end: '结束日期' },
  datetimerange: { start: '开始日期时间', end: '结束日期时间' },
  monthrange: { start: '开始月份', end: '结束月份' },
  yearrange: { start: '开始年份', end: '结束年份' },
  quarterrange: { start: '开始季度', end: '结束季度' },
}
</script>