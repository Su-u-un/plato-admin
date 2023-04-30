<template>
    <el-container>
      <!--左侧列表-->
      <el-aside class="aside" width="200px">
        <!--添加分组-->
        <add-group>{{count}}</add-group>
        <!--可拖拽列表-->
        <group-list :key="key"/>
        <!--回收站-->
        <div style="border-top: 1px #e9ebf0 solid">
          <el-button
            icon="el-icon-delete"
            style="width:100% ;
            height: 100%;
            padding: 15px 0;
            border: 0;
            font-size: 16px">
            回收站
          </el-button>
        </div>
      </el-aside>
      <!--右侧界面-->
      <link-table/>
    </el-container>
</template>

<script>
//组件
import groupList from "./components/groupList";
import linkTable from "./components/linkTable";
import addGroup from "@/views/space/components/addGroup";

export default {
  name: "oneSpace",
  data(){
    return{
      count:'',
      //改变key更新左侧列表
      key:0,
    }
  },
  components: {
    addGroup,
    groupList,
    linkTable,
  },
  methods:{
    //请求分组数据
    linkGroup(){
      this.$store.dispatch('linkGroup').then(res=>{
        // console.log(res);
        this.count = res.data.data.length
        this.$store.state.list = res.data.data
        this.$store.state.group = res.data.data[0]
        this.key+=1
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  //钩子函数
  created() {
    //进界面前就拿到分组的基本数据
    this.linkGroup()
  }
}
</script>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
}
.addGroup{
  display: flex;
  height:60px;
  top:0;
  justify-content: space-between;
  padding:0 20px;
  div{
    font-size: 16px;
    line-height: 60px;
  }
  span{
    font-size: 12px;
  }
}
</style>
