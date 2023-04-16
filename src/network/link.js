import axios from "axios"
import router from "../router";
import {delToken, getToken} from "../utils/localStorage";

export function link(config){
  const linkInstance = axios.create({
    baseURL:'http://10.10.26.139:8092/api',
    // timeout:5000,
  })

  //拿到store里的token
  const token = getToken();

  //2、axios的发送请求拦截器
  linkInstance.interceptors.request.use(config=>{
    //在请求头中添加token
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },err=>{
    return err
  })

  //3、axios的响应拦截器
  linkInstance.interceptors.response.use(config=>{
    return config
  },err=>{
    if(err.response.status === 401){
      //删除本地token
      delToken()
      router.push('/login')
    }else if(err.response.status === 400){
      console.log('传入的参数错误')
    }
    return err
  })


  return linkInstance(config)
}
