<template>
  <div class="listAll">
    <transition-group name="drag" class="list" tag="ul">
      <li
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart($event,index)"
        draggable="true"
        v-for="(item, index) in this.$store.state.list"
        :key="item.title"
        :id="item.id"
        class="list-item el-dropdown-menu__item"
        @click="dataLink(item)"
        :class="{isActive:dragId===item.id}"
        >
        <div>
          {{ item.title }}
        </div>
        <div style="font-size: 8px">
          {{item.link_sum}}
        </div>
      </li>
    </transition-group>
  </div>
</template>



<script>

export default {
  name:'list',
  data() {
    return {
      dragIndex: "",
      enterIndex: "",
      dragId:this.$store.state.list[0].id,
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
  },
};
</script>
<style scoped>
.listAll{
  height: 100%;
}
.list {
  margin: 0;
  list-style: none;
  padding-left: 0;
  border: 0;

}
.drag-move {
  transition: transform 0.3s;
}
.list-item {
  cursor: pointer;
  width:100%;
  line-height: 50px;
  text-align: center;
  padding: 0 !important;
  display: flex;
  justify-content: space-around;
}
.isActive{
  background-color: rgb(236, 245, 255);
}
</style>
