import {account} from "../account";

//图片验证码
export function getImageCode(){
  return account({
    method:'get',
    url:'/notify/v1/captcha',
    headers:{'content-type':'application/json;charset=UTF-8'},
  })
}
//短信验证码
export function getMesCode(type,captcha,captcha_id,to){
  return account({
    method:'post',
    url:'/notify/v1/send-code',
    headers:{'Content-Type':'application/json'},
    data:{
      'type':type,
      'captcha':captcha,
      'captcha_id':captcha_id,
      'to':to
    }
  })
}
//验证token是否过期
export function tokenVerify(token){
  return account({
    method:'post',
    url:'/account/v1/test-token-verify',
    param:token
  })
}
