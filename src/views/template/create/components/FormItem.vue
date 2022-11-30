<template>
  <div class="flex">
    <!-- 标题 -->
    <p
      v-if="element.type !== 'itemDetails'" 
      class="text-sm w-28 flex-shrink-0 leading-8"
    >
      <span v-if="element.options.required" class="text-primary font-bold">*</span>
      <span :class="element.options.required ? 'ml-0.5' : 'ml-2'">{{ element.options.name }}</span>
    </p>
    
    <!-- 基础控件 base -->
    <!-- 单行输入框 -->
    <input-component 
      v-if="element.type==='input'" 
      :options="element.options" 
    />
    <!-- 多行输入框 -->
    <textarea-component 
      v-if="element.type==='textarea'" 
      :options="element.options" 
    />
    <!-- 数字输入框 -->
    <input-number-component
      v-if="element.type==='inputNumber'" 
      :options="element.options" 
    />
    <!-- 选择器 -->
    <select-component 
      v-if="element.type==='select'" 
      :options="element.options" 
    />
    <!-- 单选框 -->
    <radio-component 
      v-if="element.type==='radio'" 
      :options="element.options" 
    />
    <!-- 多选框 -->
    <checkbox-component 
      v-if="element.type==='checkbox'" 
      :options="element.options" 
    />
    <!-- 日期选择器 -->
    <date-picker-component
      v-if="element.type==='datePicker'" 
      :options="element.options" 
    />
    <!-- 上传 -->
    <upload-component 
      v-if="element.type==='upload'" 
      :options="element.options" 
    />

    <!-- 增强控件 pro -->
    <!-- 电话号码 -->
    <input-phone-component
      v-if="element.type==='inputPhone'" 
      :options="element.options" 
    />
    <!-- 身份证号 -->
    <input-id-component
      v-if="element.type==='inputId'" 
      :options="element.options" 
    />
    <!-- 金额 -->
    <input-price-component
      v-if="element.type==='inputPrice'" 
      :options="element.options"
    />
    <!-- 开销明细 -->
    <expense-details-component
      v-if="element.type==='expenseDetails'" 
      :options="element.options"
    />
    <!-- 物品明细 -->
    <item-details-component
      v-if="element.type==='itemDetails'" 
      :options="element.options"
    />
    <!-- 合同条款 -->
    <contract-terms-component
      v-if="element.type==='contractTerms'" 
      :options="element.options"
    />
    <!-- 选择职位 -->
    <select-post-component
      v-if="element.type==='selectPost'" 
      :options="element.options" 
    />
    <!-- 选择部门 -->
    <select-sector-component
      v-if="element.type==='selectSector'" 
      :options="element.options" 
    />
    <!-- 选择成员 -->
    <select-user-component
      v-if="element.type==='selectUser'" 
      :options="element.options" 
    />
    <!-- 选择省市区 -->
    <select-city-component
      v-if="element.type==='selectCity'" 
      :options="element.options" 
    />
  </div>
</template>

<script setup>
const props = defineProps({
  element: Object
})
</script>