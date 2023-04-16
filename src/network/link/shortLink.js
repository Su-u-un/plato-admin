import {link} from "../link";

//新建短链
export function createLink(group_id, title, original_url, domain_id, expired){
  return link({
    method:'post',
    url:'/link/v1',
    header:{'Content-Type':'application/json'},
    data:{
      'group_id':group_id,
      'title':title,
      'original_url':original_url,
      'domain_id':domain_id,
      //永久就传空
      'expired':expired
    }
  })
}

//分页查询
export function pageLink(page,size,group_id){
  return link({
    method:'post',
    url:'/link/v1/page',
    header:{'Content-Type':'application/json'},
    data:{
      'page':page,
      'size':size,
      'group_id':group_id
    }
  })
}
