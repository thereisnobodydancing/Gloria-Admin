<template>
  <n-card 
    title="模板管理"
    class="h-full rounded"
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

const user = JSON.parse(sessionStorage.getItem('user'))
const useTemplate = useTemplateStore()
const { id, userId }  = toRefs(useTemplate)
const dialog = useDialog()
const router = useRouter()


const addTemplate = function() {
  if(id.value && userId.value === user.id) {
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
    useTemplate.$reset()
    id.value = `template_${nanoid()}`
    router.push('/template/createTemplate')
  }
}
</script>