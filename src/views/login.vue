<template>
  <div class="login_container">
    <div class="login_box">
      <!--登录界面-->
      <el-form
        class="login_form"
        label-width="70px"
        :model="loginForm"
        :rules="formRules"
        ref="loginRef"
        autocomplete=”off”
        v-show="turn">
        <!--手机号-->
        <el-form-item label="手机号" prop="phone">
          <el-input
            prefix-icon="el-icon-phone"
            placeholder="请输入手机号"
            v-model="loginForm.phone"
          />
        </el-form-item>
        <!--密码-->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login(loginForm)">登录</el-button>
          <el-button type="info" @click="resetForm('loginRef')">清空</el-button>
        </el-form-item>
      </el-form>
      <!--注册界面-->
      <el-form
        class="register_form"
        :model="registerForm"
        :rules="formRules"
        ref="registerRef"
        autocomplete=”off”
        v-show="!turn">
        <el-form-item label="+86" prop="phone">
          <el-input
            placeholder="手机号"
            v-model="registerForm.phone"
            style="width:280px"
          />
        </el-form-item>
        <el-form-item prop="imageCode">
          <div style="display: flex">
            <el-input
              placeholder="图片验证码"
              v-model="registerForm.imageCode"
              style="width:100%"
            />
            <img :src="imageCode" @click="turnImage" height="40px" style="cursor: pointer" alt="换一张" title="换一张">
            <el-button
              @click="getMesCode(registerForm,code_id)"
              style="padding: 12px 10px"
              type="info"
              :disabled="isClick">
              <span v-if="isTime">获取短信验证码</span>
              <span v-else>重新发送{{second}}秒</span>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex">
            <el-input
              placeholder="短信验证码"
              v-model="registerForm.code"
            />
            <el-button
              type="success"
              @click="register(registerForm)"
              :disabled="isSuccess">点击注册</el-button>
          </div>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="registerForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item prop="re_password">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="registerForm.re_password"
            show-password
          />
        </el-form-item>
      </el-form>
      <!--切换登录注册-->
      <div>
        <div v-show="turn">
          没有账户，<button @click="turnForm">立即注册</button>
        </div>
        <div v-show="!turn">
          已有账户，<button @click="turnForm">立即登录</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {getImageCode,getMesCode} from "../network/account/verify"
import {register,getLogin} from "../network/account/user";
import {setToken} from "../utils/localStorage";

export default {
  name: "login",
  data(){
    //手机号校验规则
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入绑定的手机号码"))
      } else if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"))
      } else {
        callback()
      }
    };
    //注册密码校验规则
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    };
    return{
      //登录表单
      loginForm:{
        phone:'15159706152',
        password:'123456'
      },
      //注册表单
      registerForm:{
        phone:'',
        password:'',
        re_password:'',
        code:'',
        imageCode:''
      },
      //表单校验
      formRules:{//一个属性对应一个表单项，用prop匹配表单项，应用其规则
        phone:[//一个对象对应一条规则，不对就提示
          {required:true,trigger:'blur',validator:checkPhone}
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码最少6位数', trigger: 'blur' }
        ],
        re_password:[
          {required: true,message:'请确认密码', trigger: 'blur',},
          {validator:checkPwd,trigger: 'blur'},
        ],
        imageCode:[
          {required:true,message:'请输入验证码',trigger:'change'},
          {len:4,message:'请输入正确的验证码'}
        ]
      },
      //图片验证码
      imageCode:'',
      //前缀
      imageCodePrefix:'data:image/jpeg;base64,',
      //识别码
      code_id:'',
      //获取验证码的防抖
      //时间到了没，到了就显示获取字样
      isTime:true,
      //可以按了没有，时间到了就能按
      isClick:false,
      //计时
      second:60,
      //发送成功就可以点击注册按钮
      isSuccess:true,
      //表单切换
      turn:true
    }
  },
  beforeCreate() {
    // 进入首页隐藏navBar
    this.$store.commit("setNavBarShow", false);
  },
  mounted() {
    getImageCode().then(res=>{
      this.imageCode = this.imageCodePrefix + res.data.data.img
      this.code_id = res.data.data.captcha_id
    })
    // this.imageCode = this.imageCodePrefix+'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'
  },
  methods:{
    //切换表单
    turnForm(){
      this.turn = !this.turn
    },
    //切换图片
    turnImage(){
      getImageCode().then(res=>{
        this.imageCode = this.imageCodePrefix + res.data.data.img
        this.code_id = res.data.data.captcha_id
      }).catch(err=>{
        console.log(err);
      })
    },
    //清空表单
    resetForm(e){
      this.$refs[e].resetFields()
    },
    //发送短信验证码
    getMesCode({imageCode,phone}={},code_id){
      getMesCode('0',imageCode,code_id,phone).then(res=>{
        //通过返回值判断验证码正误，错误就刷新验证码
        if(res.data.code === 0){
          this.$message.success('发送成功，请注意查收')
          this.isSuccess = !this.isSuccess
        }
        else{
          this.$message.error('验证码错误，请重新输入');
          this.turnImage()
        }
      }).catch(err=>{
        console.log(err);
      })
      //进行计时60秒的防抖
      this.second=60;
      this.isClick = !this.isClick;
      this.isTime = !this.isTime;
      let timer = setInterval(()=>{
        this.second--
        if(this.second === 0){
          clearInterval(timer)
          this.isTime = !this.isTime;
          this.isClick = !this.isClick;
        }
      },1000)
    },
    //登录按钮
    login({phone,password} = {}){
      this.$refs.loginRef.validate(valid=>{
        if(valid){
          getLogin(phone,password).then(res=> {
            if (res.data.code === 0) {
              this.$store.commit('SET_TOKEN', res.data.data)
              setToken(res.data.data)
              this.$router.push({
                path: '/space',
              });
              this.$message.success("登录成功!")
            }
            else
              this.$message.error('账号或密码错误');
          }).catch(err=>{
            console.log(err);
          })
        }
        else
          this.$message.error("error!");
      })
    },
    //注册按钮
    register({phone, password, re_password, code} = {}){
      this.$refs.registerRef.validate(valid=>{
        if(valid){
          register(phone,password,re_password,code).then(res=>{
            // console.log(res);
            if(res.data.code === 0)
              this.$message.success('注册成功，请返回登录')
            else
              this.$message.error('账号已存在，请返回登录');
            //重置表单
            this.resetForm('registerRef')
            //图片更新
            this.turnImage()
            //切换界面
            this.turn = !this.turn
          }).catch(err=>{
            console.log(err);
          })
        }
        //报错说明表单校验错误，有的框框不对
        else
          this.$message.error("error!");
      })
    }
  }
}
</script>

<style scoped>
  .login_container{
    background-color: #2f3c4c;
    height:100%
  }
  .login_box{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: white;
    border-radius: 4px;
    height:300px;
    width:500px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .login_btn{
    display: flex;
    justify-content: flex-end;/*靠右*/
  }
  .login_form{
    position: absolute;
    bottom:40px;
    left: 60px;
    width:350px;
  }
  .register_form{
    position: absolute;
    top:3px;
    left:10px;
    width: 330px;
  }
</style>
