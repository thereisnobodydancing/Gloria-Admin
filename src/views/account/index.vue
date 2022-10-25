<!-- 账号管理 -->
<template>
  <div class="w-full h-full bg-white rounded shadow flex flex-col">
    <!-- title -->
    <div class="flex-shrink-0 w-full h-16 border-b px-6">
      <h2 class="text-lg leading-[4rem]">账号管理</h2>
    </div>
    <!-- body -->
    <div class="flex-grow w-full h-full p-5">
      <!-- menu -->
      <div class="flex justify-end space-x-4">
        <!-- select -->
        <div class="w-72">
          <n-select
            v-model:value="selectedValues"
            multiple
            filterable
            placeholder="筛选数据：请选择部门"
            :options="options"
          />
        </div>
        <!-- search -->
        <div class="w-96">
          <n-input placeholder="搜索：请输入关键词" clearable>
            <template #prefix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { NIcon } from "naive-ui"
import { default as SearchIcon } from "@vicons/ionicons5/search"
</script>