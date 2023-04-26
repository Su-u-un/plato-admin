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
          <el-button :loading="loading"  type="primary" @click="handleLogin()">登录</el-button>
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
              @click="getMesCode()"
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
              @click="handleRegister()"
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
import {setToken} from "@/utils/localStorage";

export default {
  name: "oneLogin",
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
      //登录中
      loading:false,
      //注册表单
      registerForm:{
        phone:'',
        password:'',
        re_password:'',
        code:'',
        imageCode:'',
        //识别码
        code_id:'',
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
    // this.$store.commit("setNavBarShow", false);
  },
  mounted() {
    this.turnImage()
  },
  methods:{
    //切换表单
    turnForm(){
      this.turn = !this.turn
    },
    //切换图片
    turnImage(){
      this.$store.dispatch('imageCode').then(res=>{
        this.imageCode = this.imageCodePrefix + res.data.data.img
        this.registerForm.code_id = res.data.data.captcha_id
      }).catch(err=>{
        console.log(err);
      })
    },
    //清空表单
    resetForm(e){
      this.$refs[e].resetFields()
    },
    //发送短信验证码
    getMesCode(){
      if(this.registerForm.phone === ''||this.registerForm.imageCode === ''){
        this.$message.error('请输入手机号并填写验证码')
      }else{
      this.$store.dispatch('mesCode',this.registerForm).then(res=>{
        //通过返回值判断验证码正误，错误就刷新验证码
        if(res.data.code === 0){
          this.$message.success('发送成功，请注意查收')
          //正确就开放注册按键
          this.isSuccess = false
        }else if(res.data.code === 24002) {
          this.$message.error('验证码发送过快');
        }
        else{
          this.$message.error('图片验证码错误，请重新输入');
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
    }
    },
    //登录按钮
    handleLogin(){
      // validate进行校验，传入两个参数，成功和不成功返回的字段
      this.$refs.loginRef.validate(valid=>{
        if(valid){
          this.loading = true
          this.$store.dispatch('login',this.loginForm).then(res=>{
            if (res.data.code === 0) {
              this.$store.commit('SET_TOKEN', res.data.data)
              setToken(res.data.data)
              this.$router.push({path: '/space',});
              this.$message.success("登录成功!")
            }
            else
              this.$message.error('账号或密码错误');
            this.loading = false
          }).catch(err=>{
            console.log(err);
            this.loading = false
          })
        }
        else {
          this.$message.error("error!");
          return false
        }
      })
    },
    //注册按钮
    handleRegister(){
      this.$refs.registerRef.validate(valid=>{
        if(this.registerForm.password === ''||this.registerForm.re_password === ''){
          this.$message.error('请输入密码并确认密码')
        }else{
        if(valid){
          this.$store.dispatch('register',this.registerForm).then(res=>{
            if(res.data.code === 0) {
              this.$message.success('注册成功，请返回登录')
              //图片更新
              this.turnImage()
              //切换界面
              this.turn = !this.turn
              //重置表单
              this.resetForm('registerRef')
            }
            if(res.data.code === 240003) {
              this.$message.error('验证码错误');
            }
            if(res.data.code === 250001){
              this.$message.error('账号已存在，请返回登录');
              //图片更新
              this.turnImage()
              //切换界面
              this.turn = !this.turn
              //重置表单
              this.resetForm('registerRef')
            }
          }).catch(err=>{
            console.log(err);
          })
        }
        //报错说明表单校验错误，有的框框不对
        else
          this.$message.error("error!");
      }})
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
