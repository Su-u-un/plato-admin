import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "@/utils/localStorage";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:()=>import('@/views/login/index')
    },
    {
      path:'/space',
      meta:{
        isshow:true
      },
      component:()=>import('@/views/space/index'),
      // children:[
      //   {
      //     path:'1',
      //
      //   }
      // ]
    },
    {
      path:'/custom',
      meta:{
        isshow:true
      },
      component:()=>import('@/views/custom')
    },
    {
      path:'/openAPI',
      meta:{
        isshow:true
      },
      component:()=>import('@/views/openAPI')
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.path==='/login')
    return next();
  //获取token
  const tokenStr= getToken()
  if(!tokenStr)
    return next('/login')
  next()
})

export default router
