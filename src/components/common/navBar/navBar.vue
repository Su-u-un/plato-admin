<template>
  <el-header height="48px" style="overflow: visible">
    <div class="header">
      <div class="leftHeader">
        <!--网站logo-->
        <div class="logo">
          <i class="el-icon-cold-drink"/>
          <div>无码短链接</div>
        </div>
        <!--菜单项设置-->
        <div>
          <el-menu
            :default-active="$route.path"
            mode="horizontal"
            background-color="#2a54d0"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="/space" >我的空间</el-menu-item>
            <el-menu-item index="2">我的空间</el-menu-item>
            <el-menu-item index="3">我的空间</el-menu-item>
            <el-menu-item index="/custom">自定义域名</el-menu-item>
            <el-menu-item index="/openAPI">开放API</el-menu-item>
            <el-menu-item index="6">我的空间</el-menu-item>
          </el-menu>
        </div>
      </div>

      <div class="rightHeader">
        <!--搜索框设置-->
        <div class="searchInput">
          <el-input
            type="text"
            prefix-icon="el-icon-search"
            v-model="input"
            placeholder="请输入查找关键词"

          />
        </div>
        <!--意见反馈-->
        <div>
          <el-popover
            width="150"
            trigger="hover">
            <div class="advise">一个二维码</div>
            <el-button slot="reference">意见反馈</el-button>
          </el-popover>
        </div>
        <!--更多产品-->
        <div>
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="一些链接">
            <el-button slot="reference">更多产品</el-button>
          </el-popover>
        </div>
        <!--头像-->
        <div>
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <el-avatar :size="36" :src="circleUrl"></el-avatar>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>没有</el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>登录</el-dropdown-item>
              </router-link>
              <!--站外跳转所以是a标签，而上面的是路由跳转-->
              <a target="_blank" href="#">
                <el-dropdown-item>状态</el-dropdown-item>
              </a>
              <a target="_blank" href="#">
                <el-dropdown-item>的检测</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click.native="quitLogin">
                <span style="display:block;">Log Out</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    </el-header>
</template>

<script>
import {delToken} from "../../../utils/localStorage";

export default {
  data() {
    return {
      input: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    quitLogin() {
      this.$router.push({path: '/login'})
      this.$message.success("退出成功!")
      delToken()
    }
  },
  created() {
  },
}
</script>

<style scoped>
.header{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
}
.leftHeader{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

}
.rightHeader{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.logo{
  color: white;
  width:200px;
  display: flex;
  justify-content: center;
}
.logo i{
  font-size: 30px;
  height: 48px;
  line-height: 48px;
}
.logo div{
  font-family: fantasy ;
  font-size:20px;
  font-weight: bold;
}
.searchInput{
  align-items: center;
  width:200px
}
.el-header{
  width: 100%;
  background-color: #2a54d0;
  line-height: 48px;
  text-align: center;
  display: flex;
  padding:0;
}
.el-menu{
  position: relative;
  width: 600px;
}
.el-menu-item{
  height: 48px !important;
  line-height: 48px !important;
  text-align: center;
}
.el-menu-item.is-active{
  background-color: rgb(0,12,204) !important;
}

.el-button{
  background-color: #2c55d0;
  color: white;
  border: 0;
}
.advise{
  height: 150px;
  width: 150px;
  background-color: yellow;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  width: 100%;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.avatar-container {
  margin-right: 30px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
.menu-item{
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  height:100%;
  padding-right:16px;
  padding-left: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>
