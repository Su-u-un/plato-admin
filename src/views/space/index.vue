<template>
    <el-container class="space">
      <!--左侧列表-->
      <el-aside class="aside" width="200px">
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
                <el-button type="primary" size="mini" @click=createGroup()>确定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <!--可拖拽列表-->
        <div style="height:100%">
          <div class="groupList">
            <group-list :key="key"/>
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
      <link-table :list="group" class="main"/>
    </el-container>
</template>

<script>
//组件
import groupList from "./components/groupList";
import linkTable from "./components/linkTable";

export default {
  name: "space",
  data(){
    return{
      title:'',
      count:'',
      dialogCreateGroup:false,
      group:[],
      //改变key更新左侧列表
      key:0,
    }
  },
  components: {
    groupList,
    linkTable,
  },
  methods:{
    createGroup(){
      this.dialogCreateGroup = false
      this.$store.dispatch('createGroup',this.title).then(res=>{
        if(res.data.code === 0){
          this.$message.success('创建成功')
          this.linkGroup()
          this.key+=1
        }
        else
          this.$message.error('error');
      }).catch(err=>{
        console.log(err);
      })
    },
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

<style scoped>
.space{
  padding: 0;
  margin: 0;
  height:100%;
  width: 100%;
}
.aside {
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
}
.main{
 width: 100%;
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
