<template>
  <div 
    class="flex bg-gray-200 space-x-20 relative p-4" 
    :style="{height: height + 'px'}"
  >
    <div class="w-[210mm] h-full bg-white rounded-md mx-auto overflow-y-scroll">
      <div class="p-10 space-y-8">
        <!-- 表单名称 -->
        <div class="space-y-4">
          <div class="flex items-end space-x-5">
            <p class="text-base font-bold"><span class="text-primary">*</span>表单名称</p>
            <p class="text-gray-600 text-xs">最多10字</p>
          </div>
          <n-input v-model:value="value" type="text" placeholder="请输入表单名称" />
        </div>
        <!-- 所在分组 -->
        <div class="space-y-4">
          <p class="text-base font-bold"><span class="text-primary">*</span>所在分组</p>
          <n-select v-model:value="groupId" :options="groupOptions">
            <template #empty>
              <div class="py-2">
                <n-empty description="目前还没有分组，先创建一个吧">
                  <template #extra>
                    <n-button size="small">创建分组</n-button>
                  </template>
                </n-empty>
              </div>
            </template>
          </n-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useTemplateStore from '/src/store/template.js'

const useTemplate = useTemplateStore()
const { name, groupId, remark, templateAdministrators }  = toRefs(useTemplate)
const height = document.documentElement.clientHeight - 161

// 所在分组
const groupOptions = ref([])
</script>