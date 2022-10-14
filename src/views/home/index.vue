<template>
  {{ useTemplate }}
  <div>
    <p>名字</p>
    {{ name }}
  </div>
  <div>
    <p class="text-primary">备注</p>
    {{ remark }}
  </div>
  <div>
    <p class="text-blue-500">表单</p>
    {{ formList }}
  </div>
  <div>
    <p class="text-red-500">工作流</p>
    {{ process }}
  </div>
  <n-button @click="useTemplate.$reset()">重置</n-button>
</template>

<script setup>
import useTemplateStore from '/src/store/template.js'
const useTemplate = useTemplateStore()
const { name, remark, formList, process }  = toRefs(useTemplate)
</script>

<style>

</style>