import { defineStore } from 'pinia'
import { nanoid } from  'nanoid'

export default defineStore('template', () => {
  const name = ref('')
  const remark = ref('')
  const formList = ref([])
  const process = ref([
    { 
      nodeId: `Activity_${nanoid()}`,  // 节点id
      nodeName: '提交',                // 节点名称
      nodeType: '0',                  // 节点类型
      showMask: false,                // 是否显示删除遮罩 【原创】
      nodeText: '提交人：全员可提交',   // 节点文字部分 【原创】
      approvalMethod: '',             // 多人审批方法（或签 会签）
      approvalUser: '',               // 审批人（自选 、指定）
      approvals: '',                  // 节点指定审批人
      formReadPerm: '',               // 表单查看全限
      formUpdatePerm: ''              // 表单编辑权限
    }
  ])
  return {
    name,       // 模板名称
    remark,     // 备注
    formList,   // 表单
    process     // 节点
  }
},{
  persist: true // 支持持久化
})