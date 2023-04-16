import axios from "axios"

export function account(config){
  const accountInstance = axios.create({
    baseURL:'http://10.10.26.139:8091/api',
    timeout:5000,
  })

  //2、axios的拦截器
  accountInstance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })

  return accountInstance(config)
}
