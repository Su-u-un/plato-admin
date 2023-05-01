<template>
  <div class="h1">
    <transition-group name="drag" class="list" tag="ul">
      <li
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart($event,index)"
        draggable="true"
        v-for="(item, index) in this.$store.state.list"
        :key="item.title"
        :id="item.id"
        class="list-item"
        @click="dataLink(item)"
        :class="{isActive:dragId===item.id}">
        <div style="display: flex;padding: 0 20px">
          <div class="flex1 row">
            <span>
              {{ item.title }}
            </span>
          </div>
          <div class="f8 normal" style="justify-content: flex-end">
            {{item.link_sum}}
          </div>
          <div class="hover" style="justify-content: flex-end">
            <el-dropdown placement="left">
              <i class="el-icon-more el-dropdown-link" title="更多操作"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item @click.native="dialogDel=true">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="确认删除" :visible.sync="dialogDel">
              是否删除？
              <template slot="footer">
                <el-button @click="dialogDel=false">取消</el-button>
                <el-button type="warning" @click="delGroup(item.id)">删除</el-button>
              </template>
            </el-dialog>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name:'groupList',
  data() {
    return {
      dragIndex: "",
      enterIndex: "",
      dragId:this.$store.state.list[0].id,
      dialogDel:false
    };
  },
  methods: {
    //关于拖拽的函数
    dragstart(e,index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      if (this.dragIndex !== index) {
        const moving = this.$store.state.list[this.dragIndex];
        this.$store.state.list.splice(this.dragIndex, 1);
        this.$store.state.list.splice(index, 0, moving);
        this.dragIndex = index;
      }
    },
    dragover(e) {
      e.preventDefault();
    },
    dataLink(val){
      //点击样式
      this.dragId = val.id
      //点了就传给vuex,得到这组数据，数据里有id链接数等等
      // vuex监听这组数据，在右侧渲染。
      this.$store.state.group = val
    },
    handleDelete(){
      this.dialogDel = true
    },
    delGroup(id){
      this.$store.dispatch("delGroup",id).then(res=>{
        if(res.data.code===0)
          this.$message.info("删除成功")
        else
          this.$message.error("error")
      })
      this.dialogDel = false
    }
  },
};
</script>
<style scoped lang="scss">
.drag-move {
  transition: transform 0.3s;
}
.list-item {
  cursor: pointer;
  width:100%;
  line-height: 50px;
  text-align: center;
  padding: 0 !important;
}
.normal{
  overflow: hidden;
  width:14px;
}
.hover{
  overflow: hidden;
  width: 0;
}
.list-item:hover{
  background-color: #f7f7f7;
  .normal{
    width: 0;
  }
  .hover{
    width: 14px;
    align-items: center;
  }
  transition: none;
}
.isActive{
  background-color: rgb(236, 245, 255);
}
</style>
