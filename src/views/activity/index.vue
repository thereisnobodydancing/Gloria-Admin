<template>
  <base-card title="活动记录" :loading="false">
  <div class="w-full h-full overflow-y-scroll">
      <div class="w-[800px] mx-auto">
        <base-infinite 
          url="/systemLog/getSystemLogs"
          :params="params"
          :size=10
        >
          <template #empty>
            <div 
              class="w-full flex flex-col items-center justify-center space-y-2" 
              :style="{height: `${clientHeight - 200}px`}"
            >
              <default-empty :width="200" :height="200" />
              <p class="text-gray-400 text-sm">数据为空</p>
            </div>
          </template>
          <template #default="slotProps">
            <div class="space-y-4 py-4">
              <div
                v-for="(item, index) in slotProps.list" 
                :key="index"
                class="shadow-sm rounded"
              >              
                <div class="w-full h-10 bg-gray-100 rounded px-4 flex items-center">
                  <p>{{ item.userName }}</p>
                  <p class="ml-auto text-gray-400 text-xs">ip：{{ item.ip }}</p>
                </div>
                <div class="p-4">
                  <p class="space-x-1">
                    <span>{{ item.operationModel }}</span>
                    <span class="text-blue-500">{{ item.operationMethod }}</span>
                  </p>
                  <p class="mt-2 text-xs text-gray-500">{{ item.createdTime }} • {{ item.result }}</p>
                </div>
              </div>
            </div>
          </template>
        </base-infinite>
      </div>
    </div>
  </base-card>
</template>

<script setup>
const clientHeight = ref(document.documentElement.clientHeight)
const params = ref({})
</script>