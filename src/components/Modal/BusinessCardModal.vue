<!-- 员工名片 -->
<template>
  <n-modal v-model:show="showModal">
    <div class="p-8 relative bg-[rgba(0,0,0,0)]">
      <!-- close -->
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 right-0 h-9 w-9 cursor-pointer transition hover:text-gray-900 hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="showModal=false">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="rounded bg-white shadow-xl px-2.5 min-w-[325px]">
        <!-- info -->
        <div class="px-5 pt-[1.88rem] flex items-center space-x-5">
          <div 
            class="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl"
            :class="employeeInfo.headshot ? '' : 'py-2 bg-primary'"
          >
            <img v-if="employeeInfo.headshot" :src="employeeInfo.headshot" :alt="employeeInfo.userName" width="72" height="72" class="rounded-2xl">
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="space-y-1.5">
            <p class="text-xl">{{ employeeInfo.userName }}</p>
            <p class="text-base text-gray-500">{{ employeeInfo.companyName }}</p>
          </div>
        </div>
        <!-- 分割线 -->
        <n-divider><div class="w-1.5 h-1.5 bg-gray-300 rounded-sm" /></n-divider>
        <!-- message -->
        <div class="pt-2 pb-9 px-5">
          <div class="space-y-6">
            <!-- 邮箱 -->
            <p v-if="employeeInfo.emailNumber">
              <span class="w-24 inline-block">邮箱：</span>{{ employeeInfo.emailNumber }}
            </p>
            <!-- 联系方式 -->
            <p v-if="employeeInfo.mobile">
              <span class="w-24 inline-block">联系方式：</span>{{ employeeInfo.mobile }}
            </p>
            <!-- 职位 -->
            <p v-if="employeeInfo.role">
              <span class="w-24 inline-block">职位：</span>{{ employeeInfo.roleName }}
            </p>
            <!-- 所属部门 -->
            <p v-if="employeeInfo.sectorName">
              <span class="w-24 inline-block">所属部门：</span>{{ employeeInfo.sectorName }}
            </p>
            <!-- 员工工号 -->
            <p v-if="employeeInfo.workNumber">
              <span class="w-24 inline-block">员工工号：</span>{{ employeeInfo.workNumber }}
            </p>
            <!-- 直属主管 -->
            <p v-if="employeeInfo.leader">
              <span class="w-24 inline-block">直属主管：</span>{{ employeeInfo.leader }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import api from '/src/api/index.js'
const showModal = ref(false)
const employeeInfo = ref({})
const showCard = function(id) {
  api.get('/addressBook/structure/getEmployeeInfo', { userId: id }).then((res) => {
    if(res.data.code === 20000) {
      showModal.value = true
      Object.assign(employeeInfo.value, res.data.data)
    }
  })
}
defineExpose({
  showCard
})
</script>

<style>
.n-modal {
  @apply shadow-none
}
</style>