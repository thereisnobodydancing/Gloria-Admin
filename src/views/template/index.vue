<template>
  <base-card title="模板管理" :loading="showPageLoading">
    <template #title-right>
      <div class="w-full flex items-center justify-end space-x-4">
        <!-- search -->
        <div class="w-96">
          <n-input placeholder="搜索：请输入关键词" clearable @update:value="searchUpdate">
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </div>
        <n-button type="primary" @click="addTemplate">新增模板</n-button>
      </div>
    </template>
    <div class="w-full h-full p-5">
      <div class="w-full h-full">
        <n-data-table
          :loading="showTableLoading"
          :columns="columns"
          :data="templateList"
          :max-height="clientHeight - 285"
          :pagination="pagination"
        >
          <template #empty>
            <div
              v-if="!showTableLoading"
              class="w-full flex flex-col items-center justify-center space-y-2"
              :style="{height: `${clientHeight - 285}px`}"
            >
              <template v-if="!showPageLoading">
                <default-empty v-if="params.keyWord.length === 0" :width="200" :height="200" />
                <search-empty v-else :width="200" :height="200" />
                <p class="text-gray-400"> {{ params.keyWord.length === 0 ? '数据为空' : '啥也没搜到' }}</p>
              </template>
            </div>
          </template>
        </n-data-table>
      </div>
    </div>
  </base-card>
</template>


<script setup>
import api from '/src/api/index.js'
import useTemplateStore from '/src/store/template.js'
import { default as SearchIcon } from "@vicons/ionicons5/search"
import { useDialog, useMessage } from 'naive-ui'
import { pickBy, debounce } from 'lodash'
import { nanoid } from  'nanoid'
import { reactive } from 'vue'

const showPageLoading = ref(true)
const showTableLoading = ref(false)

const clientHeight = ref(document.documentElement.clientHeight)
const user = JSON.parse(sessionStorage.getItem('user'))
const useTemplate = useTemplateStore()
const { id, userId }  = toRefs(useTemplate)

const dialog = useDialog()
const message = useMessage()
const router = useRouter()

/****   新增模板  *****/
const addTemplate = function() {
  if(id.value && id.value.length > 0 && userId.value === user.id) {
    dialog.info({
      title: '提示',
      content: '发现有未提交数据，是否继续编辑？',
      positiveText: '继续',
      negativeText: '新建',
      onPositiveClick: () => router.push('/template/createTemplate'),
      onNegativeClick: () => {
        useTemplate.$reset()
        id.value = `template_${nanoid(10)}`
        router.push('/template/createTemplate')
      }
    }) 
  } else {
    useTemplate.$reset()
    id.value = `template_${nanoid(10)}`
    router.push('/template/createTemplate')
  }
}
/****   分组数据  *****/
const groupList = ref([])
api.get('/group/groupList').then((res) => {
  if(res.data.code === 20000) {
    res.data.data.forEach(item => {
      groupList.value.push({ label: item.groupName, value: item.groupName })
    })
  }
})
/****   搜索  *****/
const searchUpdate = function(text) {
  showTableLoading.value = true
  pagination.page = 1
  toSearch(text)
}
const toSearch = debounce((text) => {
  params.value.keyWord = text
  getTemplateList()
}, 300, { leading: false, trailing: true})

onUnmounted(() => {
  toSearch.cancel()
})

/****  table相关  ***/
const params = ref({ keyWord: ''})
const templateList = ref([])
const getTemplateList = function() {
  api.get('/template/getTemplateList', pickBy(params.value)).then((res) => {
    if(res.data.code === 20000) templateList.value = res.data.data
    setTimeout(() => showPageLoading.value = showTableLoading.value = false, 150)
  })
}
onMounted(() => {
  getTemplateList()
  setTimeout(() => showPageLoading.value = false, 200)
})
const columns = [
  { title: "编号", key: "id", width: '65'},
  { title: "名称", key: "name", width: '180'},
  { title: "创建时间", key: "createdTime", width: '200' },
  { 
    title: "分组", 
    key: "groupName", 
    width: '120',
    render(row) { return row.groupName ? row.groupName : '-' },
    defaultFilterOptionValues: groupList.value.map(item => item.label),
    filterOptions: groupList.value,
    filter (value, row) { if(row.groupName) return ~row.groupName.indexOf(value) }
  },
  { 
    title: "状态", 
    key: "state", 
    width: '120',
    render(row) { return row.state ? '使用中' : '停止使用' },
    defaultFilterOptionValues: [],
    filterOptions: [{label: '使用中', value: '使用中'}, {label: '停止使用', value: '停止使用'}],
    filter (value, row) {
      let str = row.state ? '使用中' : '停止使用'
      return ~str.indexOf(value)
    }
  },
  { title: "创建人", key: "createdBy", width: '120', render(row) { return row.createdBy ? row.createdBy : '-' }},
  { title: "备注", key: "remark", width: '420', render(row) { return row.remark ? row.remark : '-' }},
  { 
    title: "操作", 
    key: "address",
    width: '140',
    render(row) {
      return h('div', { class: 'flex items-center space-x-4'}, [
        h('div', { class: 'text-primary cursor-pointer hover:underline', onClick: () => updateComponentState(row)}, { default: () => row.state ? '停用' : '恢复' }),
        h('div', { class: 'text-primary cursor-pointer hover:underline', onClick: () => editComponent(row)}, { default: () => '编辑' }),
        h('div', { class: 'text-primary cursor-pointer hover:underline', onClick: () => removeComponent(row)}, { default: () => '删除' })
      ])
    }
  }
]
const pagination = reactive({
  page: 1,
  pageSize: 20,
  onChange: (page) => pagination.page = page
})
// 停用、恢复
const updateComponentState = function(row) {
  if(!row.state) changeComponentState(row.id, row.state)
  if(row.state) {
    dialog.warning({
      title: `你确定要停用该审批吗？`,
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => changeComponentState(row.id, row.state),
      onNegativeClick: () => {}
    })
  }
}
const changeComponentState = function(id, state) {
  showTableLoading.value = true
  api.put('/template/updateTemplateState', { templateId: id, state: !state }, false, false).then((res) => {
    if (res.data.code !== 20000) showTableLoading.value = false
    if (res.data.code === 20000) {
      message.success('修改成功')
      getTemplateList()
    }
  })
}
// 删除
const removeComponent = function(row) {
  dialog.warning({
    title: '警告',
    content: '删除审批后，进行中的申请将无法继续，确定要删除吗？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      showTableLoading.value = true
      api.delete('/template/delete', { templateId: row.id }).then((res) => {
        if (res.data.code !== 20000) showTableLoading.value = false
        if (res.data.code === 20000) {
          message.success('删除成功')
          getTemplateList()
        }
      })
    },
    onNegativeClick: () => {}
  })
}
// 编辑
const editComponent = function(row) {
  useTemplate.$reset()
  router.push(`/template/createTemplate?id=${row.id}`)
}
</script>

<style>
.n-data-table__pagination {
  @apply fixed bottom-8 right-8
}
td {
  @apply text-gray-500 !important
}
.n-tree-node-content__text {
  @apply text-sm
}
</style>