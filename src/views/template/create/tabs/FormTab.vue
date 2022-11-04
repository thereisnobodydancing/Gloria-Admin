<template>
  <div 
    class="flex bg-gray-200 space-x-20 relative" 
    :style="{height: height + 'px'}"
  >
    <!-- 左侧：菜单栏部分 -->
    <div class="flex-shrink-0 w-[300px] bg-white p-5 space-y-8 shadow-xl">
      <!-- 基础控件 -->
      <div class="space-y-4">
        <p class="text-sm text-gray-500">基础控件</p>
        <draggable
          :list="baseComponents"
          :sort="false"
          animation=200
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          chosen-class="chosen"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{element}">
            <button
              class="w-full h-10 bg-gray-100 text-sm rounded shadow hover:bg-primary/10 hover:shadow-primary/20 hover:shadow-md"
              :class="{'border-l-2 border-primary bg-primary/10 shadow-primary/20 shadow-md': active !== null && element.type === formList[active].type }"
              @click="selMenu(element)"
            >
              {{ element.name }}
            </button>
          </template>
        </draggable>
      </div>
      <!-- 增强控件 -->
      <div class="space-y-4">
        <p class="text-sm text-gray-500">增强控件</p>
        <draggable
          :list="proComponents"
          :sort="false"
          animation=200
          :group="{ name: 'people', pull: 'clone', put: false }"
          item-key="name"
          ghost-class="ghost"
          chosen-class="chosen"
          class="grid grid-cols-2 gap-4"
        >
          <template #item="{element}">
            <button 
              class="w-full h-10 bg-gray-100 text-sm rounded shadow hover:bg-primary/10 hover:shadow-primary/20 hover:shadow-md"
              :class="{'border-l-2 border-primary bg-primary/10 shadow-primary/20 shadow-md': active !== null && element.type === formList[active].type }"
              @click="selMenu(element)"
            >
              {{ element.name }}
            </button>
          </template>
        </draggable>
      </div>
    </div>
    <!-- 中间：表单渲染区 -->
    <div class="min-w-[600px] max-w-[1280px] w-1/2 mx-auto py-4">
      <base-pc-mockup>
        <draggable
          id="formId"
          :list="formList"
          group="people"
          item-key="name"
          ghost-class="ghost"
          chosen-class="chosen"
          class="w-full overflow-y-scroll rounded-xl space-y-2 pl-2 pr-1 py-4 bg-gray-50/20"
          :style="{height: height-100 + 'px'}"
          @add="addList"
          @choose="chooseList"
          @update="updateList"
        >
          <template #header>
            <div 
              v-if="formList.length === 0" 
              class="text-gray-500/60 px-2"
            >
              点击或拖拽左侧控件至此处
            </div>
          </template>
          <template #item="{element, index}">
            <div 
              class="px-4 py-2 cursor-pointer border rounded"
              :class="active === index ? 'border-primary relative' : 'border-white'"
            >
              <!-- 删除按钮 -->
              <div 
                v-show="active === index"
                class="absolute bottom-1 right-1 w-6 h-6 rounded bg-primary/80 hover:bg-primary py-1 text-white z-20"
                @click="removeItem(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <!-- 表单组件渲染 -->
              <form-item :element="element" />
            </div>
          </template>
        </draggable>
      </base-pc-mockup>
    </div>
    <!-- 右侧：属性编辑区 -->
    <div 
      class="absolute right-0 h-full shadow-xl bg-white transition-all duration-300 overflow-y-scroll pb-4"
      :class="formList.length === 0 || active === null ? 'w-0' : 'w-[300px]'"
    >
      <div v-if="formList.length > 0 && active !== null" class="p-4">
        <form-config :data="formList[active]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { nanoid } from  'nanoid'
import FormItem from '../components/FormItem.vue'
import FormConfig from '../components/FormConfig.vue'
import useTemplateStore from '/src/store/template.js'

const height = document.documentElement.clientHeight - 145

// 中间：组件渲染区 const formList = ref([])
const { formList, baseComponents, proComponents }  = toRefs(useTemplateStore())
// 当前选中的
const active = ref(null)
// 点击左侧菜单
const selMenu = function(item) {
  formList.value.push(item)
  formList.value[formList.value.length - 1].options.id = `${formList.value[formList.value.length - 1].type}_${nanoid()}`
  initComponents()
  active.value = formList.value.length - 1
  const centerHTML = document.querySelector('#formId')
  nextTick(() => centerHTML.scrollTop = centerHTML.scrollHeight)
}
// 删除一个内容
const removeItem = function(index) {
  formList.value.splice(index, 1)
  active.value = null
}
// 添加单元的回调函数 [要么从0开始，要么变成你的指数]
const addList = function({newIndex}) {
  const index = formList.value.length === 1 ? 0 : newIndex
  if(!formList.value[index].options.id) formList.value[index].options.id = `${formList.value[index].type}_${nanoid()}`
  initComponents()
  active.value = index
}
// 选择单元时的回调函数 [如果你的身边没有我，我就奋不顾身奔向你]
const chooseList = function({oldIndex}) {
  if(active.value !== oldIndex ) active.value = oldIndex
}
// 排序发生变化时的回调函数 [无论你走到哪里，我都不离不弃]
const updateList = function({newIndex}) {
  active.value = newIndex
}
// 【生命归还】
const initComponents = function() {
  baseComponents.value = [
    {
      type: 'input', 
      name: '单行输入框', 
      options: {
        id: '', 
        name: '单行文本', 
        type: 'text', 
        placeholder: '请输入', 
        showCount: false, 
        maxLength: 10, 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'textarea', 
      name: '多行输入框', 
      options: {
        id: '', 
        name: '多行文本', 
        placeholder: '请输入', 
        showCount: false, 
        maxLength: 30, 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputNumber', 
      name: '数字输入框', 
      options: {
        id: '', 
        name: '数字文本', 
        placeholder: '请输入', 
        useMin: true, 
        useMax: false, 
        min: 0, 
        max: null, 
        width: '1/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'select', 
      name: '选择器', 
      options: {
        id: '', 
        name: '选择器', 
        multiple: false,
        placeholder: '请选择',
        width: '1/3', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'radio', 
      name: '单选框组', 
      options: {
        id: '', 
        name: '单选框组', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'checkbox', 
      name: '多选框组', 
      options: {
        id: '', 
        name: '多选框组', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'datePicker', 
      name: '日期选择器', 
      options: {
        id: '', 
        name: '选择日期',
        type: 'date', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'upload',
      name: '上传',
      options: {
        id: '',
        name: '上传',
        type: 'text',
        btnText: '点击上传',
        desc: '', 
        required: true
      }
    }
  ]
  proComponents.value = [
    {
      type: 'inputPhone', 
      name: '电话号码', 
      options: {
        id: '', 
        name: '电话号码', 
        placeholder: '请输入11位电话号码', 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputId', 
      name: '身份证号', 
      options: {
        id: '', 
        name: '身份证号', 
        placeholder: '请输入18位身份证号', 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputPrice', 
      name: '金额', 
      options: {
        id: '', 
        name: '金额', 
        placeholder: '请输入金额', 
        width: '3/3',
        currency: [{label: 'CNY-人民币元', value: '1'}],
        currencyValue: ['1'],
        showUppercase: false,
        desc: '', 
        required: true 
      }
    },
    {
      type: 'selectPost',
      name: '选择职位',
      options: {
        id: '',
        name: '选择职位',
        placeholder: '请选择职位',
        multiple: false,
        width: '1/3', 
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectSector',
      name: '选择部门',
      options: {
        id: '',
        name: '选择部门',
        multiple: false,
        placeholder: '请选择部门',
        width: '1/3', 
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectUser',
      name: '选择成员',
      options: {
        id: '',
        name: '选择成员',
        useMax: false,
        max: 1,
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectCity',
      name: '省/市/区',
      options: {
        id: '',
        name: '省/市/区',
        placeholder: '选择省/市/区',
        width: '2/3', 
        desc: '',
        required: true 
      }
    },
  ]
}
</script>

<style>
.ghost {
  @apply bg-red-100 rounded-md
}
.chosen {
  @apply border border-primary rounded
}
</style>