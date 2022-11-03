<!-- 账号管理 -->
<template>
  <base-card title="账号管理" :loading="showPageLoading">
    <template #title-right>
      <div class="w-full flex justify-end space-x-4">
        <!-- select -->
        <div class="w-72">
          <n-tree-select
            :options="sectorList"
            placeholder="筛选数据：请选择部门"
            children-field="list"
            key-field="sectorId"
            label-field="sectorName"
            clearable
            filterable
            @update:value="sectorUpdate"
          />
        </div>
        <!-- search -->
        <div class="w-96">
          <n-input placeholder="搜索：请输入关键词" clearable @update:value="searchUpdate">
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </div>
      </div>
    </template>
    <div class="w-full h-full p-5">
      <div class="w-full h-full">
        <n-data-table
          remote
          :loading="showTableLoading"
          :columns="columns"
          :data="accountList"
          :max-height="clientHeight - 285"
          :pagination="pagination"
        >
          <template #empty>
            <div 
              v-if="!showTableLoading"
              class="w-full flex flex-col items-center justify-center space-y-2" 
              :style="{height: `${clientHeight - 285}px`}"
            >
              <default-empty v-if="params.keyWord.length === 0" :width="200" :height="200" />
              <search-empty v-else :width="200" :height="200" />
              <p class="text-gray-400"> {{ params.keyWord.length === 0 ? '数据为空' : '啥也没搜到' }}</p>
            </div>
          </template>
        </n-data-table>
      </div>
    </div>
  </base-card>
  <!-- 离职提示 -->
  <dimission-dialog-modal ref="dimissionDialogRef" @refresh="showTableLoading = true && getAccountList()" />
</template>


<script setup>
import api from '/src/api/index.js'
import { pickBy, debounce } from 'lodash'
import { NIcon, useDialog, useMessage } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"

const dialog = useDialog()
const message = useMessage()
const showPageLoading = ref(true)
const showTableLoading = ref(false)
const clientHeight = ref(document.documentElement.clientHeight)

// 获取公司部门列表
const sectorList = ref([])
api.get('/addressBook/structure/getSectorList').then((res) => {
  if(res.data.code === 20000) sectorList.value = res.data.data
})
const sectorUpdate = function(id) {
  showTableLoading.value = true
  params.value.page = pagination.page = 1
  params.value.sectorId = id
  getAccountList()
}

// 搜索
const searchUpdate = function(text) {
  showTableLoading.value = true
  params.value.page = pagination.page = 1
  toSearch(text)
}
const toSearch = debounce((text) => {
  params.value.keyWord = text
  getAccountList()
}, 300, { leading: false, trailing: true})

onUnmounted(() => {
  toSearch.cancel()
})

const columns = [
  { title: "编号", key: "id", width: '80'},
  { title: "账号创建时间", key: "createdTime", width: '200' },
  { title: "所有人", key: "userName", width: '100', ellipsis: {tooltip: true}},
  { title: "工号", key: "workNumber", width: '180', render(row) { return row.workNumber ? row.workNumber : '-' }},
  { title: "手机号", key: "mobile", width: '180', render(row) { return row.mobile ? row.mobile : '-' }},
  { title: "邮箱", key: "emailNumber", width: '220', render(row) { return row.emailNumber ? row.emailNumber : '-' }},
  { title: "职位", key: "roleName", width: '150', ellipsis: {tooltip: true}, render(row) { return row.roleName ? row.roleName : '-' }},
  { title: "所属部门", key: "sectorName", width: '150', ellipsis: {tooltip: true}},
  { title: "上级部门", key: "parentSector", width: '150', ellipsis: {tooltip: true}, render(row) { return row.parentSector ? row.parentSector : '-' }},
  { 
    title: "账号存续", 
    key: "address",
    width: '120',
    render(row) {
      return h('div', { class: 'flex items-center space-x-4'}, [
        h('div', { class: 'text-primary cursor-pointer hover:underline', onClick: () => updateAccountState(row)}, { default: () => row.userState ? '停用' : '恢复' }),
        h('div', { class: 'text-primary cursor-pointer hover:underline', onClick: () => removeAccount(row)}, { default: () => '删除' })
      ])
    }
  }
]
// 获取表格数据
const accountList = ref([])
const params = ref({
  keyWord: '',
  page: 1,
  pageSize: 20,
  sectorId: null
})
const pagination = reactive({
  page: params.value.page,
  pageSize: params.value.pageSize,
  itemCount: 0,
  onUpdatePage: (page) => {
    showTableLoading.value = true
    params.value.page = pagination.page = page
    getAccountList()
  }
})
const getAccountList = function() {
  api.get('/userManage/getCompanyUserList', pickBy(params.value)).then((res) => {
    if(res.data.code === 20000) {
      pagination.itemCount = res.data.data.total
      accountList.value = res.data.data.data ? res.data.data.data : []
    }
    if(res.data.code !== 20000) {
      pagination.itemCount = 0
      accountList.value = []
    }
    setTimeout(() => showPageLoading.value = showTableLoading.value = false, 150)
  })
}
onMounted(() => {
  getAccountList()
  setTimeout(() => showPageLoading.value = false, 200)
})

// 修改账号状态
const updateAccountState = function(row) {
  if(!row.userState) changeAccountState(row.id)
  if(row.userState) {
    dialog.warning({
      title: `你确定要停用${row.userName}的账号吗？`,
      content: '停用后，该帐号将无法访问',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => changeAccountState(row.id),
      onNegativeClick: () => {}
    })
  }
}
const changeAccountState = function(id) {
  showTableLoading.value = true
  api.put('/userManage/updateUserState', { userId: id }, false, false).then((res) => {
    if (res.data.code === 20000) {
      message.success('修改成功')
      getAccountList()
    }
    if (res.data.code !== 20000) message.warning(res.data.msg)
  })
}

// 删除账号
const dimissionDialogRef = ref()
const removeAccount = function(row) {
  dimissionDialogRef.value.showModal(row.id, row.userName)
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