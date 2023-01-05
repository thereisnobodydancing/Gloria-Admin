<template>
  <n-drawer v-model:show="drawer.show" :width="600" placement="right" class="p-0">
    <n-drawer-content>
      <!-- header -->
      <template #header>
        <div class="flex items-center space-x-2.5">
          <div 
            class="flex-shrink-0 w-11 h-11 rounded cursor-pointer"
            @click="showCard(4)"
          >
            <base-avatar :image="drawer.data.headshot" :name="drawer.data.userName" :width="44" :height="44" :font-size="16" />
          </div>
          <div class="w-full flex-grow">
            <p class="text-lg">{{ drawer.data.stitle }}</p>
            <p class="text-sm text-gray-500">
              <span>{{ drawer.data.createdTime }}</span>
              <span class="ml-5 text-primary">当前状态：{{ drawer.data.approvalState }}</span>
            </p>
          </div>
        </div>
      </template>
      <!-- content -->
      <div class="space-y-8 pt-2 pb-4">
        <div v-for="(item, index) in drawer.form" :key="index">
          <!-- 只显示可读信息 -->
          <div class="w-full flex items-center justify-between">
            <p class="text-sm text-gray-400">{{ item.options.name }}</p>
          </div>
          <!-- 只读状态 -->
          <div>
            <template v-if="!['upload', 'contractTerms', 'expenseDetails', 'itemDetails', 'selectUser'].includes(item.type)">
              <p class="text-base text-gray-600">{{ getSummary(item)}}</p>
            </template>
            <!-- 上传 -->
            <template v-if="item.type === 'upload'">
              <n-upload
                v-model:file-list="item.value"
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :list-type="item.options.type"
                class="mt-2"
                disabled
              >
                <n-button v-if="item.options.type==='text'">{{ item.options.btnText }}</n-button>
              </n-upload>
            </template>
            <!-- 合同条款 -->
            <template v-if="item.type === 'contractTerms'">
              <div v-for="(i, idx) in item.value" class="mt-2.5 flex text-gray-600 text-sm">
                <p class="flex-shrink-0 font-bold">条款{{ idx + 1 }}：</p>
                <p class="bg-gray-100 w-full py-2.5 px-2.5 rounded">{{ i.content }}</p>
              </div>
            </template>
            <!-- 开销明细 -->
            <template v-if="item.type === 'expenseDetails'">
              <n-table :bordered="false" :single-line="false" size="small" class="mt-2">
                <thead>
                  <tr>
                    <th class="w-2/3">开销用途</th>
                    <th>开销金额</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, idx) in item.value.expenseList">
                    <td>{{ i.expenseUse }}</td>
                    <td>{{ i.amountSpent }}</td>
                  </tr>
                </tbody>
              </n-table>
              <p class="mt-2 text-sm text-gray-400 space-x-8">
                <span>合计：{{ item.value.total }}</span>
                <span>大写金额：{{ numToCny(item.value.total) }}</span>
              </p>
            </template>
            <!-- 物品明细 -->
            <template v-if="item.type === 'itemDetails'">
              <n-table :bordered="false" :single-line="false" size="small" class="mt-2">
                <thead>
                  <tr>
                    <th class="w-2/3">物品名称</th>
                    <th>物品数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, idx) in item.value">
                    <td>{{ i.name }}</td>
                    <td>{{ i.num }}</td>
                  </tr>
                </tbody>
              </n-table>
            </template>
            <!-- 选择成员 -->
            <template v-if="item.type === 'selectUser'">
              <div class="mt-2 w-full flex flex-wrap">
                <div
                  v-for="(i, idx) in item.value.optionList"
                  :key="idx"
                  class="mr-6 mb-8 w-10 h-10 rounded-md cursor-pointer hover:opacity-90 relative"
                  :class="{'bg-primary': !i.picture}"
                  @click="showCard(i.id)"
                >
                  <!-- 头像 -->
                  <base-avatar :image="i.picture" :name="i.name" />
                  <p class="mt-1 text-xs text-gray-500 line-1">{{ i.name }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- 审批流程 -->
        <div class="space-y-2">
          <p class="text-sm text-gray-400">审批流程</p>
          <div class="space-y-8">
            <div v-for="(item, index) in approvalsInfo" class="space-y-2">
              <p class="font-bold text-sm">{{ item.nodeName }}: </p> 
              <div class="space-y-8">
                <div v-for="(user, idx) in item.userApprovalInfoList" :key="idx">
                  <div class="flex space-x-4">
                    <div 
                      class="flex-shrink-0 w-11 h-11 cursor-pointer"  
                      @click="showCard(user.userId)"
                    >
                      <base-avatar :image="user.headShot" :name="user.userName" :width="44" :height="44" />
                      <p class="text-xs text-gray-500 mt-1 line-1">{{ user.userName }}</p>  
                    </div>
                    <div class="text-gray-500 space-y-1">
                      <div class="text-sm">
                        <!-- 提交节点 -->
                        <p v-if="item.nodeType === 5">提交申请</p>
                        <!-- 审批节点 -->
                        <div v-if="item.nodeType === 1 || item.nodeType === 2">
                          <p v-if="user.endTime">
                            <span v-if="user.result" class="text-teal-500">（审批通过）</span>
                            <span v-else class="text-primary">（审批拒绝）</span>
                            <span>审批意见：{{ user.comment || '暂无' }}</span>  
                          </p>
                          <p v-else class="text-sm">审批中…</p>
                        </div>
                        <!-- 抄送节点 -->
                        <p v-if="item.nodeType === 3">完成抄送</p>
                      </div>
                      <p v-if="user.endTime" class="text-xs">{{ user.endTime }}</p>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div> 
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
  <!-- 名片 -->
  <business-card-modal ref="cardRef" />
</template>

<script setup>
import api from '/src/api/index.js'
import { useApproval } from '/src/composables/useApproval.js'
import { numToCny } from '/src/until/index.js'

const drawer = reactive({
  show: false,
  data: {},
  form: [],
  state: []
})

const { getSummary } = useApproval()
// 审批流程
const approvalsInfo = ref([])
watch(() => drawer.data, newData => {
  console.log(newData)
  api.get('/datamanage/getApprovalsInfo', {requestId: newData.id}).then((res) => {
    approvalsInfo.value = res.data.data
  })
})

/******** 名片 ********/
const cardRef = ref()
const showCard = function(id) {
  cardRef.value.showCard(id)
}

defineExpose({
  drawer
})
</script>

<style>
.n-tree-node-content__text {
  @apply text-sm !important
}
</style>