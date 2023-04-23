<template>
  <div id="app">
    <el-container
     direction="vertical">
      <nav-bar v-show="$route.meta.isshow"/>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import navBar from "./components/common/navBar/navBar";
export default {
  name: 'App',
  components:{
    navBar,
  },
  data(){
    return{
    }
  },
}
</script>

<style>
#app {

}
body{
  overflow-y: hidden;
  flex-shrink: 0;
  min-width: 1000px; /* 设置最小宽度 */
  margin: 0;
  padding: 0;
}
.el-container{
  padding: 0;
  margin: 0;
  height:100%;
}
.nav{

}
</style>
