import {account} from "../account";

export function register(phone,password,re_password,code){
  return account({
    method:'post',
    url:'/account/v1/register',
    headers:{'Content-Type':'application/json'},
    data:{
      'phone':phone,
      'password':password,
      're_password':re_password,
      'code':code
    }
  })
}

export function getLogin(phone,password){
  return account({
    method:'post',
    url:'account/v1/login',
    headers:{'Content-Type':'application/json'},
    data:{
      'phone':phone,
      'password':password
    }
  })
}
