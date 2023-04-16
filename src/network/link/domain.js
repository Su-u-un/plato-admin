import {link} from "../link";

//请求域名列表
export function domain(){
  return link({
    method:'get',
    url:'/domain/v1/list'
  })
}
