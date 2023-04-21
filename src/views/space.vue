<template>
    <el-container >
      <!--左侧列表-->
      <el-aside width="200px" style="display: flex;flex-direction: column">
        <!--添加分组-->
        <div class="addGroup">
          <div>
            短链分组<span>&nbsp&nbsp&nbsp共{{count}}组</span>
          </div>
          <div style="background-color: white;height: 70px;line-height: 70px;">
            <el-button
              type="text"
              class="el-icon-plus"
              @click="dialogCreateGroup = true"
            />
            <el-dialog title="新建链接分组" :visible.sync="dialogCreateGroup">
              <el-form v-model="title" >
                <el-form-item label="分组名称">
                  <el-input
                    v-model="title"
                    autocomplete="off"
                    placeholder="请输入分组组名"/>
                </el-form-item>
              </el-form>
              <div slot="footer">
                <el-button size="mini" @click="dialogCreateGroup = false">取消</el-button>
                <el-button type="primary" size="mini" @click=createGroup(title)>确定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <!--可拖拽列表-->
        <div style="height:100%">
          <div class="groupList">
            <list :list="group"/>
          </div>
        </div>
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
      <ListData :list="group"/>
    </el-container>
<!--  <test></test>-->
</template>

<script>
//组件
import NavBar from "../components/common/navBar/navBar";
import List from "../components/common/list/list";
import ListData from "../components/common/list/listData";
//网络请求
import {createGroup,listGroup} from "@/network/link/group"


export default {
  name: "space",
  data(){
    return{
      title:'',
      count:'',
      dialogCreateGroup:false,
      group:[]
    }
  },
  components: {
    NavBar,
    List,
    ListData,
  },
  methods:{
    createGroup(title){
      this.dialogCreateGroup = false
      createGroup(title).then(res=>{
        listGroup().then(res=>{
          // console.log(res);
          this.count = res.data.data.length
          this.group = res.data.data
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  //钩子函数
  created() {
    //进界面前就拿到分组的基本数据
    listGroup().then(res=>{
      // console.log(res);
      this.count = res.data.data.length
      this.group = res.data.data
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>
.el-container{
  padding: 0;
  margin: 0;
  height:100%;
}
.el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
}
.addGroup{
  display: flex;
  height:70px;
  top:0;
  justify-content: space-around;
  padding-right: 10px;
  padding-left: 20px;
}
.addGroup div{
  font-size: 16px;
  line-height: 70px;
}
.addGroup span{
  font-size: 12px;
}
.btn{

}
.el-button{
  width:30px;
  height:30px;
  font-size: 20px;
  padding: 0;
}
.groupItem{
  height:40px;
  line-height: 40px;

}
.groupItem:hover{
}
</style>
