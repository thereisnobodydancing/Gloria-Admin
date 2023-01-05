export function useApproval() {
  // 摘要
  const getSummary = ({type, value, options}) => {
    if(!value) return '-'
    if(value) {
      // 选择成员
      if(type === 'selectUser') {
        if(!value.optionList || value.optionList.length === 0) return '-'
        if(value.optionList || value.optionList.length > 0) return value.optionList.map(item => item.name).join('、')
      }
      // 选择日期
      if(type === 'datePicker' && typeof(value) === 'object') return value.join(' 至 ')
      // 金额
      if(type === 'inputPrice') return !value.price ? '-' : `${value.price} (${value.currency})`
      // 多选框组
      if(['checkbox'].includes(type)) return value.join('、')
      // 选择器
      if(['select'].includes(type) && options.multiple) return value.join('、')
      // 特殊
      if(['selectSector', 'selectPost', 'selectAddress'].includes(type)) return value.name
      if(['contractTerms', 'expenseDetails', 'itemDetails', 'upload'].includes(type)) return '……'
      return value
    }
  }
  return {
    getSummary
  }
}