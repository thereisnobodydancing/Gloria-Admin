export function useOrganizationChecked(userList, checkList, checked) {
  // 全选、不全选
  const checkAll = function (isChecked) {
    console.log(userList, checkList, checked)
    checkList.value = []
    if (isChecked) {
      checked.indeterminate = false
      checkList.value = userList.value.map(item => item.id)
    }
  }

  // 子选项的变化
  const changeCheckbox = function(arr, meta) {
    checkList.value = arr
    if(arr.length === 0) {
      checked.state = checked.indeterminate = false
      return
    }
    if(0 < arr.length < userList.value.length) {
      checked.state = false
      checked.indeterminate = true
    }
    if(arr.length === userList.value.length) {
      checked.state = true
      checked.indeterminate = false
    }
  }

  return { checkAll, changeCheckbox }
}