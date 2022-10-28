// 生成名字头像
export const toNameAvatar = (name) => {
  if(!isNaN(Number(name))) {
    if(name.length <= 3) return name
    if(name.length > 3) return name.slice(0, 3)
  } else {
    if(name.length <= 2) return name
    if(name.length > 2) return name.slice(-2)
  }
}