import { defineStore } from 'pinia'
import { nanoid } from  'nanoid'
const user = JSON.parse(sessionStorage.getItem('user'))

export default defineStore('template', () => {
  /** 基础信息 **/
  const tabActive = ref('base')
  const id = ref('')
  const userId = ref(user.id)
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
  /** 表单设计 **/
  const formList = ref([])
  // 基础控件
  const baseComponents = ref([
    {
      type: 'input', 
      name: '单行输入框', 
      options: {
        id: '', 
        name: '单行文本', 
        type: 'text', 
        placeholder: '请输入', 
        showCount: false, 
        maxLength: 10, 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'textarea', 
      name: '多行输入框', 
      options: {
        id: '', 
        name: '多行文本', 
        placeholder: '请输入', 
        showCount: false, 
        maxLength: 30, 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputNumber', 
      name: '数字输入框', 
      options: {
        id: '', 
        name: '数字文本', 
        placeholder: '请输入', 
        useMin: true, 
        useMax: false, 
        min: 0, 
        max: null, 
        width: '1/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'select', 
      name: '选择器', 
      options: {
        id: '', 
        name: '选择器', 
        multiple: false,
        placeholder: '请选择',
        width: '1/3', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'radio', 
      name: '单选框组', 
      options: {
        id: '', 
        name: '单选框组', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'checkbox', 
      name: '多选框组', 
      options: {
        id: '', 
        name: '多选框组', 
        list:[{label: '选项1', value: '选项1'}, {label: '选项2', value: '选项2'}], 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'datePicker', 
      name: '日期选择器', 
      options: {
        id: '', 
        name: '选择日期',
        type: 'date', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'upload',
      name: '上传',
      options: {
        id: '',
        name: '上传',
        type: 'text',
        btnText: '点击上传',
        desc: '', 
        required: true
      }
    }
  ])
  // 增强控件
  const proComponents = ref([
    {
      type: 'inputPhone', 
      name: '电话号码', 
      options: {
        id: '', 
        name: '电话号码', 
        placeholder: '请输入11位电话号码', 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputId', 
      name: '身份证号', 
      options: {
        id: '', 
        name: '身份证号', 
        placeholder: '请输入18位身份证号', 
        width: '3/3', 
        desc: '', 
        required: true 
      }
    },
    {
      type: 'inputPrice', 
      name: '金额', 
      options: {
        id: '', 
        name: '金额', 
        placeholder: '请输入金额', 
        width: '3/3',
        currency: [{label: 'CNY-人民币元', value: '1'}],
        currencyValue: ['1'],
        showUppercase: false,
        desc: '', 
        required: true 
      }
    },
    {
      type: 'contractTerms', 
      name: '合同条款',
      options: {
        id: '',
        name: '合同条款',
        desc: '',
        required: true
      }
    },
    {
      type: 'expenseDetails', 
      name: '开销明细',
      options: {
        id: '',
        name: '开销明细',
        desc: '',
        required: true
      }
    },
    {
      type: 'itemDetails', 
      name: '物品明细',
      options: {
        id: '',
        name: '物品明细',
        showOptions: false,
        desc: '',
        required: true
      }
    },
    {
      type: 'selectPost',
      name: '选择职位',
      options: {
        id: '',
        name: '选择职位',
        multiple: false,
        placeholder: '请选择职位',
        width: '1/3', 
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectSector',
      name: '选择部门',
      options: {
        id: '',
        name: '选择部门',
        multiple: false,
        placeholder: '请选择部门',
        width: '1/3', 
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectUser',
      name: '选择成员',
      options: {
        id: '',
        name: '选择成员',
        useMax: false,
        max: 1,
        desc: '',
        required: true 
      }
    },
    {
      type: 'selectCity',
      name: '省/市/区',
      options: {
        id: '',
        name: '省/市/区',
        placeholder: '选择省/市/区',
        width: '2/3', 
        desc: '',
        required: true 
      }
    },
  ])

  /** 流程设计 **/
  const process = ref([
    {
      nodeId: `Activity_${nanoid(10)}`,  // 节点id
      nodeName: '提交',                // 节点名称
      nodeType: '5',                  // 节点类型
      showMask: false,                // 是否显示删除遮罩 【原创】
      nodeText: '流程开始',            // 节点文字部分 【原创】
      approvalMethod: 0,              // 多人审批方法（或签 会签）
      approvalUser: 0,                // 审批人类型（自选 、指定）
      approvals: [],                  // 节点指定审批人列表
      approvalOptions: [],
      approvalKeys: [],
      formReadPerm: '',               // 表单可读权限 ids
      formUpdatePerm: '',             // 表单编辑权限 ids
      // 流程【原创】
      prem: {
        readCheckAll: false,               // 表单可读全选状态
        readChedkIndeterminate: false,    // 表单可读部分选中状态
        updateCheckAll: false,            // 表单可编辑全选状态
        updateChedkIndeterminate: false,  // 表单可编辑部分选中状态
        list: []                          // { name  /  read  / update }
      },
    }
  ])
  const approvalsList = ref([
    {value: 0, label: '指定成员'},
    {value: 1, label: '发起人自选'},
    {value: 2, label: '部门主管'},
    {value: 3, label: '直属上级'},
    {value: 4, label: '角色'},
    {value: 5, label: '发起人自己'}
  ])
  
  const startNode = ref({
    nodeId: 'StartEvent_1',
    nodeName: '',
    nodeType: '0',
  })

  const endNode = ref({
    nodeId: `Event_${nanoid(10)}`,
    nodeName: '',
    nodeType: '4',
  })
  return {
    tabActive,
    id,                           // 模板id
    userId,
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
    baseComponents,
    proComponents,
    process,                      // 节点
    approvalsList,
    startNode,
    endNode
  }
},{
  persist: true // 支持持久化
})