export function useOrganizationChecked(userList) {

  const checkList = ref([])
  const checked = reactive({
    state: false,
    indeterminate: false
  })

  // 全选、不全选
  const checkAll = function (isChecked) {
    alert(isChecked)
    checkList.value = []
    if (isChecked) {
      checked.indeterminate = false
      checkList.value = userList.map(item => item.id)
    }
  }

  // 子选项的变化
  const changeCheckbox = function(arr, meta) {
    checkList.value = arr
    if(arr.length === 0) {
      checked.state = checked.indeterminate = false
      return
    }
    if(0 < arr.length < userList.length) {
      checked.state = false
      checked.indeterminate = true
    }
    if(arr.length === userList.length) {
      checked.state = true
      checked.indeterminate = false
    }
  }

  return { checkList, checked, checkAll, changeCheckbox }
}