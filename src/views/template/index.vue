<template>
  <n-card 
    title="模板管理"
    class="h-full rounded shadow"
    content-style="padding: 0"
  >
    <div class="border-t p-4">
      <div class="flex items-center justify-end">
        <n-button @click="addTemplate">新增模板</n-button>
      </div>
    </div>
  </n-card>
</template>


<script setup>
import useTemplateStore from '/src/store/template.js'
import { useDialog } from 'naive-ui'
import { nanoid } from  'nanoid'

const useTemplate = useTemplateStore()
const { id }  = toRefs(useTemplate)
const dialog = useDialog()
const router = useRouter()


const addTemplate = function() {
  if(id.value) {
    dialog.info({
      content: '发现有未提交数据，是否继续编辑？',
      positiveText: '继续',
      negativeText: '新建',
      onPositiveClick: () => router.push('/template/createTemplate'),
      onNegativeClick: () => {
        useTemplate.$reset()
        id.value = `template_${nanoid()}`
        router.push('/template/createTemplate')
      }
    }) 
  } else {
    id.value = `template_${nanoid()}`
    router.push('/template/createTemplate')
  }
}
</script>