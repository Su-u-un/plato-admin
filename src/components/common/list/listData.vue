<template>
  <el-container style="height:100%;">
    <el-main>
      <div class="dataCard">
        <!--短链添加-->
        <div class="addShortLink">
          <div style="display: flex">
            <el-input
              style="margin-right: 10px"
              type="text"
              v-model="link"
              placeholder="请输入http://或https://"
              :clearable=true
              >
            </el-input>
            <el-button style="margin-right: 10px" type="primary" @click="createLink()">创建短链</el-button>
            <el-dialog title="创建短链" :visible.sync="dialogCreateLink" class="dialogClass">
              <div class="dialogBody">
                <div class="dialogTabbar">
                  <div class="tabBarItem" :class="{active:this.normal}" @click="normalSkip()">普通跳转</div>
                  <div class="tabBarItem" :class="{active:this.random}" @click="randomSkip()">随机跳转</div>
                  <div class="tabBarItem" :class="{active:this.uniapp}" @click="uniappSkip()">小程序短链</div>
                </div>
                <div v-show="this.normal">
                  <el-form
                    ref="normal"
                    :model="form"
                    :rules="formRules"
                    label-width="80px"
                    label-position="top">
                    <el-form-item label="跳转链接" prop="original_url">
                      <el-input v-model="form.original_url"></el-input>
                    </el-form-item>
                    <el-form-item label="短链标题" prop="title">
                      <el-input  v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="短链分组" prop="name">
                      <el-select v-model="form.name">
                        <el-option
                          v-for="(item,index) in list"
                          :key="index"
                          :label="item.title"
                          :value="item.id"
                        @change="form.group_id=item.id"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="短链有效期" prop="temporaryExpired">
                      <el-radio-group v-model="form.temporaryExpired" >
                        <el-radio  label="forever"  @change="isShow=!isShow">永久</el-radio>
                        <el-radio  label="date" @change="isShow=!isShow">自定义</el-radio>
                      </el-radio-group>
                    </el-form-item >
                    <el-form-item v-show=isShow prop="date">
                      <el-date-picker
                        v-model="form.date"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="选择到期日"
                        :picker-options="pickerOptions1"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitLink(form,expired)">创建</el-button>
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-show="this.random">
                  <el-input v-model="link"></el-input>
                </div>
                <div v-show="this.uniapp">
                  小程序链接的栏目
                </div>
              </div>
            </el-dialog>

            <el-button>批量创建</el-button>
            <el-button>小程序链接</el-button>
          </div>
        </div>
        <!--短链组数据-->
        <div class="linkData">
          <el-table
            :data="tableData"
            ref="tableRef"
            fit
            height="700"
            style="width: 100%;overflow: auto">
            <!--多选框表头-->
            <el-table-column type="selection"/>
            <!--短链信息-->
            <el-table-column>
              <!--表头嵌套模板-->
              <template slot="header">
                <el-tooltip
                  effect="dark"
                  content="设置排序"
                  placement="top"
                  :open-delay="2000">
                  <el-dropdown placement="bottom">
                    <span class="el-dropdown-link">
                      短链信息<i class="el-icon-arrow-down el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  @click.native="handleSort('create_time')">创建时间</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
              </template>
              <!--单元格嵌套模板-->
              <template v-slot="{row}">
                <div  style="display: flex;">
                  <div>
                    svg
                  </div>
                  <div>
                    <div >
                      {{row.title}}
                    </div>
                    <div>
                      {{ row.create_time }}
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <!--短链接网址-->
            <el-table-column label="短链接网址">
              <template v-slot="{row}">
                <div style="display: flex;">
                  <div>
                    http://{{row.domain}}/{{row.code}}
                    <div>
                      {{ row.original_url }}
                    </div>
                  </div>
                  <div>
                    二维码和复制
                  </div>
                </div>
              </template>
            </el-table-column>
            <!--访问次数-->
            <el-table-column>
              <!--表头嵌套模板-->
              <template slot="header">
                <el-tooltip
                  effect="dark"
                  content="设置排序"
                  placement="top"
                  :open-delay="2000">
                  <el-dropdown placement="bottom">
                    <span>
                      访问次数<i class="el-icon-arrow-down el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  @click="handleSort('pv')">今日访问次数</el-dropdown-item>
                      <el-dropdown-item  @click="handleSort('')">累计访问次数</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
              </template>
              <!--单元格嵌套模板-->
              <template v-slot="{row}">
                <div>
                  <span>今日：{{row.pv }}</span>
                  <span>累计：无</span>
                </div>
              </template>
            </el-table-column>
            <!--访问人数-->
            <el-table-column>
              <!--表头嵌套模板-->
              <template slot="header">
                <el-tooltip
                  effect="dark"
                  content="设置排序"
                  placement="top"
                  :open-delay="2000">
                  <el-dropdown placement="bottom">
                    <span class="el-dropdown-link">
                      访问人数<i class="el-icon-arrow-down el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  @click.native="handleSort('uv')">今日访问人数</el-dropdown-item>
                      <el-dropdown-item  @click.native="handleSort('')">累计访问人数</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
              </template>
              <!--单元格嵌套模板-->
              <template v-slot="{row}">
                <div>
                  <span>今日：{{row.uv }}</span>
                  <span>累计：无</span>
                </div>
              </template>
            </el-table-column>
            <!--IP数-->
            <el-table-column>
              <!--表头嵌套模板-->
              <template slot="header">
                <el-tooltip
                  effect="dark"
                  content="设置排序"
                  placement="top"
                  :open-delay="2000">
                  <el-dropdown placement="bottom">
                    <span class="el-dropdown-link">
                      IP数<i class="el-icon-arrow-down el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  @click.native="handleSort('ip')">今日IP数</el-dropdown-item>
                      <el-dropdown-item  @click.native="handleSort('')">累计IP数</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
              </template>
              <!--单元格嵌套模板-->
              <template v-slot="{row}">
                <div>
                  <span>今日：{{row.ip }}</span>
                  <span>累计：无</span>
                </div>
              </template>
            </el-table-column>
            <!--查看图表、编辑-->
            <el-table-column
              label="操作">
              <template v-slot="{row}">
                <el-button type="text" size="small"  @click=showDialog(row)>查看</el-button>
                <el-button type="text" size="small">没写</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--弹出的数据表-->
        <el-dialog :visible.sync="Visible" >
          <div slot="title">
            {{this.dialogData.title}}
          </div>
          <div>
            <div style="display: flex">
              <div>
                <div class="tabbarItem" :class="{active:formContent}" @click="contentSkip()">数据图表</div>
                <div class="tabbarItem" :class="{active:formHistory}" @click="historySkip()">访问记录</div>
              </div>
              <div>
                <el-date-picker
                  v-model="dialogDate"
                  value-format="timestamp"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
            </div>
            <!--数据图表-->
            <data-form
              class="content"
              v-show="formContent"
              :data-code="this.dialogData.code"
              :data-date="this.dialogDate"/>
            <div v-show="formHistory">
              访问记录
              <div class="foot">
                页码
              </div>
            </div>
          </div>
        </el-dialog>
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
    </el-main>
  </el-container>
</template>

<script>
//组件
import dataForm from "../dataForm/dataForm";
//网络请求
import {createLink, pageLink} from "../../../network/link/shortLink";
import {getTrend} from "../../../network/visual/statistic"

export default {
  name: "listData",
  props:{
    list:[]
  },
  components:{
    dataForm
  },
  data(){
    //url的校验规则
    var checkUrl=(rule, value, callback) => {
      if(!value){
        callback(new Error("请输入http://或https://开头的链接或应用跳转链接"))
      }else{
        if(!(value.substring(0,7) === "http://"||value.substring(0,8) === "https://")){
          callback(new Error("请输入http://或https://开头的链接或应用跳转链接"))
        } else {
          callback()
        }
      }
    };
    //日期选择器的校验
    var checkDate=(rule,value,callback)=>{
      if(this.form.temporaryExpired==="forever"){
        callback()
      }else{
        if(!value){
          callback(new Error("请输入自定义日期"))
        }
      }
    }
    return{
      link:'',
      //自定义的日期显示
      isShow:false,
      //是否打开创建短链的表单
      dialogCreateLink:false,
      //上传的真正日期
      expired:'',
      //创建短链表单
      form: {
        name:'',
        group_id:'',
        title: '',
        original_url:'',
        domain_id:1,
        temporaryExpired:'forever',
        //日期
        date:''
      },
      //校验规则
      formRules:{
        original_url: {required:true,validator:checkUrl,trigger:'blur'},
        title:{required:true,message:'请输入短链标题',trigger: 'blur'},
        temporaryExpired: {required:true,message:'请选择到期日',trigger: 'blur'},
        date:{validator:checkDate,trigger:'blur'}
      },
      //控制dialog的显示
      Visible: false,
      //dialog的宽度自适应
      dialogWidth:1000,
      //dialog的数据
      dialogData:{},
      //dialog的日期选择
      dialogDate:[],
      normal:true,
      random:false,
      uniapp:false,
      formContent:true,
      formHistory:false,
      //当前分组的短链总数
      link_sum: 0,
      //页面条数
      pageSize:10,
      //开始的页面和前往第x页
      currentPage: 1,
      //表格数据
      tableData:[],
      //创建短链日期选择器的规则
      pickerOptions1: {
        //禁用状态
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        //快捷日期
        shortcuts: [{
          text: '7天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
          text: '30天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }, {
          text: '60天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 60);
            picker.$emit('pick', date);
          }
        }]
      },
      //查看数据日期范围的选择器规则
      pickerOptions2:{
        disabledDate:(time)=>{
          return time.getTime() < (Date.parse(this.dialogData.create_time)-3600 * 1000 * 24) ||time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            picker.$emit('pick', [start,end]);

          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            end.setTime(end.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick',  [start, end]);
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods:{
    // //dialog自适应宽度
    // setDialogWidth() {
    //   var val = document.body.clientWidth
    //   const def = 1000 // 默认宽度
    //   if (val < def) {
    //     this.dialogWidth = def + 'px'
    //   }
    // },
    //页面跳转事件
    handleCurrentChange(val) {
      this.pageLink(val,this.pageSize,this.$store.state.group.id)
    },
    //页数改变事件
    handleSizeChange(val) {
      this.pageLink(this.currentPage,val,this.$store.state.group.id)
    },
    //列表排序事件
    handleSort(val){
      this.$nextTick(() => {
        console.log(this.$refs.table);
        this.$refs.tableRef.sort(val, 'descending');
      });

    },
    //创建短链按钮
    createLink(){
      this.form.name = this.$store.state.group.title
      this.form.group_id = this.$store.state.group.id
      if(this.link){
        if(this.link.substring(0,7) === "http://"||this.link.substring(0,8) === "https://"){
          this.form.original_url=this.link
          this.dialogCreateLink = true
        }
        else {
          this.$message.warning('请输入http://或https://开头的链接或应用跳转链接')
        }
      }
      else {
        this.dialogCreateLink = true
        this.form.original_url=this.link
      }
    },
    //确定短链按钮
    submitLink({group_id, title,  original_url, domain_id}={},expired){
      if(this.form.temporaryExpired === 'forever'){
        this.expired = ''
      }else{
        this.expired = this.form.date
      }
      createLink(group_id, title, original_url, domain_id, expired).then(res=>{
        this.$message.success('创建短链成功')
        //刷新表单
        this.pageLink(this.currentPage,this.pageSize,this.$store.state.group.id)
        //清空表单
        this.$refs['normal'].resetFields()
        this.dialogCreateLink = false
      }).catch(err=>{
        console.log(err);
      })
    },
    //请求分页数据
    async pageLink(page,size,group_id){
      //定义一个接受分页数据的临时数组
      let n = new Array(size)
      let test = []
      //数组内填充相应的对象
      await pageLink(page,size,group_id).then(res=>{
        test = res.data.data.items
      })
      if(test.length !== 0){
        this.link_sum = test.length
        for(let i =0;i < test.length;i++){
          const {ipNum,pvNum,uvNum} = await this.todayTrend(test[i].code)
          n[i]={
            code:test[i].code,
            domain:test[i].domain,
            create_time:test[i].create_time,
            original_url:test[i].original_url,
            title:test[i].title,
            ip:ipNum,
            uv:pvNum,
            pv:uvNum
          }
        }
      }
      this.tableData = n
    },
    //今日的访问数据
    async todayTrend(code){
      const start=new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      const end=new Date().getTime()
      let ipNum = 0
      let pvNum = 0
      let uvNum = 0
      await getTrend(code,start,end).then(res=>{
        for(let obj of res.data.data){
          ipNum = parseInt(obj.ip) + ipNum
          pvNum = parseInt(obj.pv) + pvNum
          uvNum = parseInt(obj.uv) + uvNum
        }
        // console.log(ipNum, pvNum, uvNum);
      })
      // console.log(ipNum, pvNum, uvNum);
      return {
        ipNum, pvNum, uvNum
      }
    },
    //弹出数据详情列表
    showDialog(val){
      this.Visible = true
      this.dialogData = val
      //这里需要加一个判断，关于时间选择器默认最近七天这回事
      //所以判断他的创建日期和七天的时间戳，谁更大，如果创建时间大，就把start定做创建日期
      const end = new Date()
      let start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      if(start < Date.parse(this.dialogData.create_time)){
        start = Date.parse(this.dialogData.create_time)
      }
      this.dialogDate = [start,end]
    },
    normalSkip(){
      if(!this.normal){
        this.normal = !this.normal
        this.random = false
        this.uniapp = false
      }

    },
    randomSkip(){
      if(!this.random){
        this.random = !this.random
        this.normal = false
        this.uniapp = false
      }
    },
    uniappSkip(){
      if(!this.uniapp){
        this.uniapp = !this.uniapp
        this.random = false
        this.normal = false
      }
    },
    contentSkip(){
      // console.log(this.dialogDate);
      if(!this.formContent){
        this.formContent = !this.formContent
        this.formHistory = false
      }
    },
    historySkip(){
      if(!this.formHistory){
        this.formHistory = !this.formHistory
        this.formContent = false
      }
    }
  },
  watch:{
    '$store.state.group'(){
      this.form.name = this.$store.state.group.title
      this.form.group_id = this.$store.state.group.id
      this.link_sum = this.$store.state.group.link_sum - 0

      //改变就更新分页
      this.pageLink(this.currentPage,this.pageSize,this.$store.state.group.id)
    },
  },
  // mounted() {
  //   window.onresize = () => {
  //     return (() => {
  //       this.setDialogWidth()
  //     })()
  //   }
  // }
}
</script>

<style scoped>
/deep/ .el-dialog{

  width:1000px !important;
}
.dataCard{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
}
.addShortLink{
  padding: 16px;
}
.el-container {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
.linkData{
  width:100%;
  height: 100%;
}

.dialogTabbar{
  display: flex;
  width:100%
}
.dialogBody{
  height:500px;
  overflow: auto;
}
.dialogClass /deep/ .el-dialog__body{
  padding: 0 !important;
}
.tabBarItem{
  padding:8px 16px;
  margin-left: 16px;
  cursor: pointer;
}
.footer{
  margin-top: 15px;
  padding: 0;
}
.active{
  background-color: pink;
}
/*去除el-table的x滚动条*/
/deep/.el-table--scrollable-x ::-webkit-scrollbar {
  display: none;
}
</style>
