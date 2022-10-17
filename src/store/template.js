import { defineStore } from 'pinia'
import { nanoid } from  'nanoid'
const user = JSON.parse(sessionStorage.getItem('user'))
export default defineStore('template', () => {
  const id = ref('')
  const groupId = ref(null)
  const name = ref('')
  const remark = ref('')
  const submitType = ref('all')
  const submitUsers = ref([])
  const submitOptions = ref([])
  const submitKeys = ref([])
  const templateAdministrators = ref([user.id])
  const templateAdministratorOptions = ref([
    {
      checkboxDisabled: true,
      id: user.id,
      key: `u${user.id}`,
      list: null,
      name: user.userName,
      picture: user.headshot,
      type: 'user'
    }
  ])
  const templateAdministratorKeys = ref([`u${user.id}`])
  const formList = ref([])
  const process = ref([
    {
      nodeId: `Activity_${nanoid()}`,  // 节点id
      nodeName: '提交',                // 节点名称
      nodeType: '0',                  // 节点类型
      showMask: false,                // 是否显示删除遮罩 【原创】
      nodeText: '流程开始',            // 节点文字部分 【原创】
      approvalMethod: 0,              // 多人审批方法（或签 会签）
      approvalUser: 0,                // 审批人类型（自选 、指定）
      approvals: [],                  // 节点指定审批人列表
      approvalOptions: [],
      approvalKeys: [],
      formReadPerm: '',               // 表单查看全限
      formUpdatePerm: ''              // 表单编辑权限
    }
  ])
  return {
    id,                           // 模板id
    name,                         // 模板名称
    groupId,                      // 分组id
    remark,                       // 表单说明
    submitType,                   // 谁可以发起（全员all，指定人员select）
    submitUsers,                  // 指定提交的人员（ids）
    submitOptions,                // 选择的制定提交人员列表（options） [不用提交]
    submitKeys,                   // 选择的制定提交人员列表（keys） [不用提交]
    templateAdministrators,       // 模板管理员
    templateAdministratorOptions, // 选择的模板管理员列表（options）[不用提交]
    templateAdministratorKeys,    // 选择的模板管理员列表（keys）[不用提交]
    formList,                     // 表单
    process                       // 节点
  }
},{
  persist: true // 支持持久化
})