<template>
  <div>
<!--    <el-button @click="pageData">11</el-button>-->
    <el-table :data="tableData">
      <!--访问时间-->
      <el-table-column
        label="访客时间"
        prop="start"/>
      <!--访问IP-->
      <el-table-column
        label="访问IP"
        prop="ip"/>
      <!--访客地区-->
      <el-table-column label="访问地区">
        <template v-slot="{row}">
          <div>{{row.country}}-{{ row.province }}-{{ row.city }}</div>
        </template>
      </el-table-column>
      <!--浏览器指纹-->
      <el-table-column label="设备信息">
        <template v-slot="{row}">
          <div>{{ row.os }}-{{ row.browser_type }}-{{ row.device_type }}-</div>
        </template>
      </el-table-column>
      <!--访问来源-->
      <el-table-column label="访问来源" prop="referer"/>
    </el-table>
    <!--页码-->
    <el-footer>
      <el-pagination
        class="footer"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total=link_sum
        layout=" prev,pager,next,sizes,jumper">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import {getPage} from "../../../network/visual/statistic";


export default {
  name: "dataList",
  props:{
    dataCode:{
      type:String,
      required:true
    },
    //这里面监听变化加个刷新吧，让人觉得是根据日期变化的
    dataDate:{
      type:Array,
      required: true
    }
  },
  data(){
    return{
      //表格数据
      tableData:[],
      //页面记录总数,
      link_sum:0,
      //页面条数
      pageSize:10,
      //开始的页面和前往第x页
      currentPage: 1,
    }
  },
  methods:{
    handleCurrentChange(val) {
      this.pageLink(val,this.pageSize,this.$store.state.group.id)
    },
    //页数改变事件
    handleSizeChange(val) {
      this.pageLink(this.currentPage,val,this.$store.state.group.id)
    },
    //处理访问记录
    async pageData(){
      let temp = await this.getPage(this.dataCode,this.currentPage,this.pageSize)
      if(temp.items.length !== 0) {
        this.link_sum = temp.items.length
        this.tableData = temp.items
      }
    },
    //请求访问记录
    async getPage(code,page,size){
      let temp ={}
      await getPage(code,page,size).then(res=>{
        temp=res.data.data
      })
      return temp
    }
  },
  watch:{
    dataDate:{
      handler() {
        this.pageData()
      },
      immediate:true
    },
  }
}
</script>

<style scoped>

</style>
