import {visual} from "../visual";

//访问记录
export function getPage(code,page,size){
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

//区域PV,UV
export function getRegion(code,start,end){
  return visual({
    method:'post',
    url:'/visual/v1/region',
    header:{'Content-Type':'application/json'},
    data:{
      'code':code,
      'start':start,
      'end':end,
    }
  })
}

//设备、操作系统等等
export function getType(code,start,end){
  return visual({
    method:'post',
    url:'/visual/v1/type',
    header:{'Content-Type':'application/json'},
    data:{
      'code':code,
      'start':start,
      'end':end,
    }
  })
}
//访问趋势图(24h的pvuvip数据）
export function getTrend(code,start,end){
  return visual({
    method:'post',
    url:'/visual/v1/trend',
    header:{'Content-Type':'application/json'},
    data:{
      'code':code,
      'start':start,
      'end':end,
    }
  })
}
