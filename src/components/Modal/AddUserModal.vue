<!-- 添加员工（按组织架构） -->
<template>
  <n-modal 
    v-model:show="modal.show"
    :mask-closable="false"
  >
    <n-card
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      closable
      style="width: 700px"
      @close="closeModal"
    >
      <div class="w-full h-[600px] flex">
        <!-- left -->
        <div class="flex-shrink-0 border-r w-1/2 min-h-full px-5 pb-5">
          <!-- 搜索 -->
          <n-input v-model:value="modal.pattern" placeholder="搜索" clearable>
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
          <!-- 树列表 -->
          <div class="mt-4 w-full h-[530px] overflow-y-scroll">
            <n-tree
              :checked-keys="select.keys"
              :show-irrelevant-nodes="modal.showIrrelevantNodes"
              block-line
              cascade
              checkable
              :data="modal.options"
              :pattern="modal.pattern"
              check-strategy="child"
              children-field="list"
              label-field="name"
              @update:checked-keys="handleChedkedKeysChange"
            />
          </div>
        </div>
        <!-- right -->
        <div class="flex-shrink-0 w-1/2 min-h-full px-5 pb-5 space-y-4">
          <p v-if="props.multiple" class="text-sm">已选择（{{ select.options.length }}）</p>
          <p v-else class="text-sm">{{ props.rightTitle }}</p>
          <div class="w-full h-[490px] overflow-y-scroll">
            <div 
              v-if="select.options.length > 0"
              class="flex flex-wrap"
            >
              <div
                v-for="(item, index) in select.options"
                :key="index"
                class="mb-2.5 mr-2.5 h-[34px] rounded bg-gray-100 flex items-center px-1 cursor-default"
              >
                <!-- 头像 -->
                <div 
                  class="flex-shrink-0 w-[26px] h-[26px] rounded"
                  :class="item.picture ? '' : 'py-[3px] bg-primary'"
                >
                  <img v-if="item.picture" :src="item.picture" :alt="item.name" width="26" height="26" class="rounded">
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <!-- 名字 -->
                <p class="ml-2.5 text-xs">{{ item.name }}</p>
                <!-- clear -->
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  class="ml-3 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                  @click="removeOption(item.key, item.id, index)"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div v-else class="h-full flex items-center justify-center">
              <n-empty size="large" />
            </div>
          </div>
          <div class="flex space-x-4">
            <button 
              class="ml-auto w-16 h-8 border border-primary text-primary text-sm rounded"
              @click="closeModal"
            >
              取消
            </button>
            <button 
              class="w-16 h-8 bg-primary text-white text-sm rounded hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed"
              :disabled="modal.btnDisabled"
              @click="confirm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
import { default as SearchIcon} from "@vicons/ionicons5/search"

const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({
  title: {
    type: String,
    default: '添加成员'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  rightTitle: {
    type: String,
    default: '选择一位部门负责人'
  }
})

const modal = reactive({
  show: false,
  options: [],
  pattern: '',
  showIrrelevantNodes: true,
  btnDisabled: true    
})

const select = reactive({
  keys: [],     // 选中项的key数组
  ids: [],      // 选中项的id数组
  options: []   // 选中项的内容数组
})
// 获取左侧options
const getOptions = function() {
  api.get('/addressBook/structure/getSectorAndUser').then((res) => {
    modal.options = res.data.data
  })
}

// 弹出Modal
const showModal = function(options=[], keys=[], ids=[]) {
  getOptions()
  modal.btnDisabled = props.multiple ? options.length === 0 : options.length !== 1
  select.options = options
  select.keys = keys.length > 0 ? keys : []
  select.ids = ids.length > 0 ? ids : []
  modal.show = true
}

// 	节点勾选项发生变化时的回调函数
const handleChedkedKeysChange = function(keys, option) {
  modal.btnDisabled = props.multiple ? option.length === 0 : option.length !== 1
  select.options = option
  select.keys = option.map(item => { if(item.type === 'user') return item.key })
  select.ids = option.map(item => { if(item.type === 'user') return item.id })
}

// 右侧删除一个
const removeOption = function(key, id, index) {
  select.keys.splice(select.keys.indexOf(key), 1)
  select.ids.splice(select.ids.indexOf(id), 1)
  select.options.splice(index, 1)
  modal.btnDisabled = props.multiple ? select.options.length === 0 : select.options.length !== 1
}

// 初始化数据
const initModal = function() {
  modal.pattern = ''
  select.keys = select.ids = select.options = []
}

// 关闭Modal
const closeModal = function() {
  emit('cancel')
  modal.show = false
  initModal()
}

// 确定
const confirm = function() {
  emit('confirm', select)
  modal.show = false
  initModal()
}

defineExpose({
  showModal,
  initModal
})
</script>