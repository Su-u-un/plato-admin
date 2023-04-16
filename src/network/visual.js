import axios from "axios"
import {getToken} from "../utils/localStorage";

export function visual(config){
  const visualInstance = axios.create({
    baseURL:'http://10.10.26.139:8093/api',
    timeout:5000,
  })

  //拿到store里的token
  const token = getToken();

  //2、axios的发送请求拦截器
  visualInstance.interceptors.request.use(config=>{
    //在请求头中添加token
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },err=>{
    return err
  })

  return visualInstance(config)
}
