<template>
  <div>
    <p class="font-bold">{{ props.data.name }}</p>
    <div class="mt-8 space-y-6">

      <!-- 1-标题(通用) -->
      <div class="space-y-2">
        <div class="flex items-center">
          <p class="text-sm">标题</p>
          <p class="ml-auto text-xs text-gray-500">最多6字</p>
        </div>
        <n-input v-model:value="props.data.options.name" type="text" placeholder="请输入" maxlength="6" show-count clearable />
      </div>

      <!-- 2-显示类型（单行输入框专用） -->
      <template v-if="props.data.type === 'input'">
        <div class="space-y-2">
          <p class="text-sm">显示类型</p>
          <n-select v-model:value="props.data.options.type" :options="inputTypeList" />
        </div>
      </template>

      <!-- 3-提示文字（单行输入框 || 多行输入框 || 数字输入框 || 电话号码 || 身份证号 || 金额 || 选择器 || 职位选择 || 选择部门 || 省市区） -->
      <template v-if="['input', 'textarea', 'inputNumber', 'inputPhone', 'inputId', 'inputPrice', 'select', 'selectPost', 'selectSector', 'selectCity'].includes(props.data.type)">
        <div class="space-y-2">
          <div class="flex items-center">
            <p class="text-sm">提示文字</p>
            <p class="ml-auto text-xs text-gray-500">最多30字</p>
          </div>
          <n-input 
            v-model:value="props.data.options.placeholder" 
            type="textarea" 
            :autosize="{minRows: 3}"
            placeholder="请输入" 
            maxlength="30"
            show-count
            clearable 
          />
        </div>
      </template>

      <!-- 4-限制文字长度(单行输入框 || 多行输入框) -->
      <template v-if="['input', 'textarea'].includes(props.data.type)">
        <div class="space-y-2">
          <p class="text-sm">限制文字长度</p>
          <div class="flex items-center space-x-4">
            <n-switch v-model:value="props.data.options.showCount" />
            <n-input-number 
              v-model:value="props.data.options.maxLength" 
              :disabled="props.data.options.showCount === false" 
              :min="1"
            />
          </div>
        </div>
      </template>

      <!-- 5-最大值、最小值（数字输入框） -->
      <template v-if="['inputNumber', 'inputPrice'].includes(props.data.type)">
        <div class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm">设置最小值</p>
            <div class="flex items-center space-x-4">
              <n-switch v-model:value="props.data.options.useMin" />
              <n-input-number
                v-model:value="props.data.options.min"
                :disabled="props.data.options.useMin === false" 
              />
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm">设置最大值</p>
            <div class="flex items-center space-x-4">
              <n-switch v-model:value="props.data.options.useMax" />
              <n-input-number 
                v-model:value="props.data.options.max" 
                :disabled="props.data.options.useMax === false" 
              />
            </div>
          </div>
        </div>
      </template>

      <!-- 6-选项组（单选框组 || 多选框组 || 选择器） -->
      <template v-if="['radio', 'checkbox', 'select'].includes(props.data.type)">
        <div class="space-y-2">
          <div class="flex items-center">
            <p class="text-sm">选项组</p>
            <p class="ml-auto text-xs text-gray-500">至少2条数据</p>
          </div>
          <div
            v-for="(item, index) in props.data.options.list" 
            :key="index"
            class="flex items-center space-x-4"
          >
            <n-input v-model:value="item.label" type="text" placeholder="请输入" clearable />
            <button 
              :disabled="props.data.options.list.length <= 2"
              class="w-7 h-7 flex-shrink-0 rounded-full text-white"
              :class="props.data.options.list.length <= 2 ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary/80 hover:bg-primary'"
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

      <!-- 7-日期类型（日期选择器） -->
      <template v-if="props.data.type === 'datePicker'">
        <!-- 日期类型 -->
        <div class="space-y-2">
          <p class="text-sm">日期类型</p>
          <n-select v-model:value="props.data.options.type" :options="dateTypes" />
        </div>
      </template>

      <!-- 8-组件宽度（单行输入框 || 多行输入框 || 数字输入框 || 选择器 || 电话号 || 身份证号 || 金额 || 选择职位 || 选择部门 || 省市区） -->
      <template v-if="['input', 'textarea', 'inputNumber', 'select', 'inputPhone', 'inputId', 'inputPrice', 'selectPost', 'selectSector', 'selectCity'].includes(props.data.type)">
        <div class="space-y-2">
          <p class="text-sm">组件宽度</p>
          <n-select v-model:value="props.data.options.width" :options="widthList" />
        </div>
      </template>

      <!-- 9-上传类型（上传） -->
      <template v-if="props.data.type === 'upload'">
        <div class="space-y-2">
          <p class="text-sm">组件类型</p>
          <n-select v-model:value="props.data.options.type" :options="uploadTypeList" />
        </div>
      </template>

      <!-- 10-多选（选择器 || 选择职位 || 选择部门 -->
      <template v-if="['select', 'selectPost', 'selectSector'].includes(props.data.type)">
        <div class="space-y-2">
          <p class="text-sm">多选</p>
          <n-switch v-model:value="props.data.options.multiple" />
        </div>
      </template>

      <!-- 11-上限（选择成员） -->
      <template v-if="props.data.type === 'selectUser'">
        <div class="space-y-2">
          <p class="text-sm">
            <span>人数上限</span>
            <span class="text-gray-400/80">（默认无上限）</span>
          </p>
          <div class="flex items-center space-x-4">
            <n-switch v-model:value="props.data.options.useMax" />
            <n-input-number 
              v-model:value="props.data.options.max" 
              :disabled="props.data.options.useMax === false" 
            />
          </div>
        </div>
      </template>

      <!-- 12-币种\显示大写（金额） -->
      <template v-if="props.data.type === 'inputPrice'">
        <div class="space-y-2">
          <p class="text-sm">币种</p>
          <n-select 
            v-model:value="props.data.options.currencyValue" 
            multiple 
            filterable
            :options="currencyList"
            @update:value="currencyUpdate" 
          >
            <template #action>
              <n-checkbox @update:checked="checkedUpdate">全选（{{currencyList.length}}）</n-checkbox>
            </template>
          </n-select>
          <span class="text-xs text-gray-500">选择多币种后，提交人可在该范围内自选</span>
        </div>
        <n-checkbox v-model:checked="props.data.options.showUppercase">
          <p class="text-sm text-gray-500">显示大写数字</p>
        </n-checkbox>
      </template>

      <!-- 说明 -->
      <div class="space-y-2">
        <div class="flex items-center">
          <p class="text-sm">说明</p>
          <p class="ml-auto text-xs text-gray-500">最多50字</p>
        </div>
        <n-input
          v-model:value="props.data.options.desc" 
          type="textarea" 
          :autosize="{minRows: 5}"
          placeholder="请输入" 
          maxlength="50" 
          show-count 
          clearable 
        />
      </div>

      <!-- 必填 -->
      <div class="space-y-2">
        <p class="text-sm">必填</p>
        <n-switch v-model:value="props.data.options.required" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { template } from 'lodash';

const props = defineProps({
  data: Object,
})

// 显示类型
const inputTypeList = [
  { label: '文本类型', value: 'text' },
  { label: '密码类型', value: 'password' }
]

// 输入框宽度
const widthList = [
  { label: '1/3', value: '1/3' },
  { label: '2/3', value: '2/3' },
  { label: '3/3', value: '3/3' }
]

// 单选、多选框组添加选项
const addRadio = function() {
  props.data.options.list.push({
    label: `选项${props.data.options.list.length + 1}`, 
    value: `选项${props.data.options.list.length + 1}`
  })
}
// 单选、多选框组删除选项
const removeRadio = function(index) {
  props.data.options.list.splice(index, 1)
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

const uploadTypeList = [
  { label: '上传文件', value: 'text' },
  { label: '上传图片', value: 'image-card' }
]

// 币种
const currencyList = [
  {label: 'CNY-人民币元', value: '1'},
  {label: 'JPY-日元', value: '2'},
  {label: 'HKD-港元', value: '3'},
  {label: 'USD-美元', value: '4'},
  {label: 'EUR-欧元', value: '5'},
  {label: 'GBP-英镑', value: '6'},
  {label: 'CAD-加拿大元', value: '7'},
  {label: 'SGD-新加坡元', value: '8'},
  {label: 'AUD-澳大利亚元', value: '9'},
  {label: 'KRW-韩元', value: '10'},
  {label: 'TWD-新台币', value: '11'},
  {label: 'THB-泰铢', value: '12'},
  {label: 'RUB-俄罗斯卢布', value: '13'},
  {label: 'INR-印度卢比', value: '14'},
  {label: 'IDR-印尼盾', value: '15'},
  {label: 'PHP-菲律宾比索', value: '16'},
  {label: 'MYR-马来西亚令吉', value: '17'},
  {label: 'VND-越南盾', value: '18'}
]
const currencyUpdate = function(value, option) {
  props.data.options.currency = option
}
const checkedUpdate = function(checked) {
  props.data.options.currency = checked ? currencyList : []
  props.data.options.currencyValue = checked ? currencyList.map(item => item.value) : []
}
</script>