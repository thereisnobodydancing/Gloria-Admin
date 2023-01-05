export function useDateData() {
  const datePlaceholder = {
    daterange: { start: '开始日期', end: '结束日期' },
    datetimerange: { start: '开始日期时间', end: '结束日期时间' },
    monthrange: { start: '开始月份', end: '结束月份' },
    yearrange: { start: '开始年份', end: '结束年份' },
    quarterrange: { start: '开始季度', end: '结束季度' },
  }
  const dateFeature = {
    date: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    month: 'yyyy-MM',
    monthrange: 'yyyy-MM',
    year: 'yyyy',
    yearrange: 'yyyy',
    quarter: 'yyyy-第Q季',
    quarterrange: 'yyyy-第Q季'
  }
  return {
    datePlaceholder,
    dateFeature
  }
}