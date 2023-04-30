<template>
  <div class="addGroup">
    <div class="name">
      短链分组<span>共<slot/>组</span>
    </div>
    <i class="el-icon-plus mouse" @click="dialogCreateGroup = true"/>

    <!--弹窗-->
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
</template>

<script>
export default {
  name: "addGroup",
  data(){
    return{
      title:'',
      dialogCreateGroup:false,
    }
  },
  methods:{
    createGroup(){
      this.dialogCreateGroup = false
      this.$store.dispatch('createGroup',this.title).then(res=>{
        if(res.data.code === 0){
          this.$message.success('创建成功')
        }
        else
          this.$message.error('error');
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.addGroup{
  display: flex;
  height:60px;
  top:0;
  justify-content: space-between;
  padding:0 20px;
  .name{
    font-size: 16px;
    line-height: 60px;
    span{
      margin-left: 5px;
      font-size: 12px;
    }
  }
  i{
    height: 24px;
    width: 24px;
    line-height: 60px;
  }
}
</style>
