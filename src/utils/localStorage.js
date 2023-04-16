const tokenKey = 'Admin_token'

//保存
export function setToken(token){
  localStorage.setItem(tokenKey,JSON.stringify(token))
}
//获取
export function getToken(){
  return JSON.parse(localStorage.getItem(tokenKey))
}
//删除
export function delToken(){
  localStorage.removeItem(tokenKey)
}
