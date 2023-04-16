import {link} from "../link";
//创建分组
export function createGroup(title){
  return link({
    method:'post',
    url:'/group/v1',
    header:{'Content-Type':'application/json'},
    data:{
      'title': title
    }
  })
}
//删除分组
export function delGroup(group_id){
  return link({
    method:'delete',
    //注意，在url中带参数的形式，需要用esc键下面的飘`
    url:`/group/v1/${group_id}`,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
  })
}
//更新分组
export function updateGroup(id,title){
  return link({
    method:'put',
    url:'/group/v1',
    headers:{'Content-Type':'application/json'},
    data:{
      'id':id,
      'title':title
    }
  })
}
//分组列表
export function listGroup(){
  return link({
    method:'get',
    url:'/group/v1/list'
  })
}
//分组详情,
//被我拿分组列表代替用了。。
export function dataLink(group_id){
  return link({
    method:'get',
    //注意，在url中带参数的形式，需要用esc键下面的飘`
    url:`/group/v1/${group_id}`,
    params:group_id
  })
}
