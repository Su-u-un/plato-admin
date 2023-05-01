import {getLogin,register} from "@/network/account/user";
import {getImageCode,getMesCode} from "@/network/account/verify";

import {createGroup,listGroup,delGroup,dataLink} from "@/network/link/group"
import {createLink, pageLink} from "@/network/link/shortLink";

import {getTrend,getPage,getRegion,getType,getTop} from "@/network/visual/statistic"


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
  mesCode( commit ,info){
    const {imageCode:captcha,phone:to,code_id:captcha_id} = info
    return getMesCode(0,captcha,captcha_id,to).then(res=>{
        return res
      }).catch(err=>{
        return err
      })
  },
  //用户注册
  register( commit ,userInfo){
    const {phone, password, re_password, code} = userInfo
    return register(phone,password,re_password,code).then(res=>{
        return res
      }).catch(err=>{
        return err
      })
  },
  //用户登录
  login( commit ,userInfo){
    const { phone,password } = userInfo
    return getLogin(phone,password).then(res=> {
        return res
      }).catch(err=>{
        return err
      })
  },

  //创建分组
  createGroup(commit,title){
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
  },
  //删除分组
  delGroup(commit,group_id){
    return delGroup(group_id).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },

  //创建短链
  createLink(commit,info){
    const {group_id, title,  original_url, domain_id,date:expired} = info
    return createLink(group_id, title, original_url, domain_id, expired).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
  //请求短链数据
  pageLink(commit,info){
    const {page,size,group_id} = info
    return pageLink(page,size,group_id).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },

  //访问记录
  getPage(commit,info){
    const {code,page,size} = info
    return getPage(code,page,size).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
  //访问趋势图
  getTrend(commit,info){
    const {code,start,end} = info
    return getTrend(code,start,end).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
  //区域PvUv
  getRegion(commit,info){
    const {code,start,end} = info
    return getRegion(code,start,end).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
  //设备操作系统等来源
  getType(commit,info){
    const {code,start,end} = info
    return getType(code,start,end).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
  //访问来源top榜
  getTop(commit,info){
    const {code,start,end,n} = info
    return getTop(code,start,end,n).then(res=>{
      return res
    }).catch(err=>{
      return err
    })
  },
};
