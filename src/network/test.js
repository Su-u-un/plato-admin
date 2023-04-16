import {account} from "./account";
import {link} from "./link";
import {visual} from "./visual";

export function getTest(code,page,size){
  return visual({
    method:'post',
    url:'/visual/v1/page',
    data:{
      'code':code,
      'page':page,
      'size':size
    }
  })
}
