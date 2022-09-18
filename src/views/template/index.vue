<template>
  <n-card 
    title="模板管理"
    class="h-full rounded shadow"
    content-style="padding: 0"
  >
    <div class="border-t p-4">
      <div class="flex items-center justify-end">
        <n-button @click="$router.push('/template/createTemplate')">新增模板</n-button>
      </div>
    </div>
  </n-card>
</template>