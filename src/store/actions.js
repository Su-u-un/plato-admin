import {getLogin,register} from "@/network/account/user";
import {getImageCode,getMesCode} from "@/network/account/verify";
import {createGroup,listGroup} from "@/network/link/group"


export default {
  //图片验证码
  imageCode(){
    return getImageCode()
      .then(res=>{
        return res
      }).catch(err=>{
        return err
      })
  },
  // 短信验证码
  mesCode({ commit },info){
    const {imageCode:captcha,phone:to,code_id:captcha_id} = info
    return getMesCode(0,captcha,captcha_id,to).then(res=>{
        return res
      }).catch(err=>{
        return err
      })
  },
  //用户注册
  register({ commit },userInfo){
    const {phone, password, re_password, code} = userInfo
    return register(phone,password,re_password,code).then(res=>{
        return res
      }).catch(err=>{
        return err
      })
  },
  //用户登录
  login({ commit },userInfo){
    const { phone,password } = userInfo
    return getLogin(phone,password).then(res=> {
        return res
      }).catch(err=>{
        return err
      })
  },

  //创建分组
  createGroup({commit},title){
    return createGroup(title).then(res=> {
      return res
    }).catch(err=>{
      return err
    })
  },
  //获取分组
  linkGroup() {
    return listGroup().then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  }
};
