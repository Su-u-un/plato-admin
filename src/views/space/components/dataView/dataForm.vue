<template>
  <div>
    <!--访问曲线-->
    <div style="background:#fff;margin-top:30px;">
      <nav-bar>
        访问曲线
        <template v-slot:right>
          <el-button @click="lineIsShow = !lineIsShow">切换为列表</el-button>
        </template>
      </nav-bar>
      <div style="display: flex;margin-top: 20px" v-show="lineIsShow">
        <div style="width: 150px">
          <div class="legendItem">访问次数:{{line.pv}}</div>
          <div class="legendItem">访问人数:{{line.uv}}</div>
          <div class="legendItem">IP数:{{line.ip}}</div>
        </div>
        <echarts-line :chart-data="lineChartData"/>
      </div>
      <div v-show="!lineIsShow">
        <el-table :data="lineTable" height="450">
          <el-table-column label="时间" prop="interval"></el-table-column>
          <el-table-column label="访问次数" prop="pv"></el-table-column>
          <el-table-column label="访问人数" prop="uv"></el-table-column>
          <el-table-column label="访问IP数" prop="ip"></el-table-column>
        </el-table>
      </div>
    </div>
    <!--访问地区-->
    <div style="background:#fff;margin-top:30px;">
      <nav-bar>
        访问地区
        <template v-slot:right>
          <el-button @click="regionIsShow = !regionIsShow">切换显示uv</el-button>
        </template>
      </nav-bar>
      <div style="display: flex;margin-top: 20px">
        <div style="width: 150px">
          <div class="legendItem">TOP1-省份</div>
        </div>
        <echarts-china :chart-data="dataChinaPv" v-if="regionIsShow"/>
        <echarts-china :chart-data="dataChinaUv" v-else/>
      </div>
    </div>
    <!--24h访问曲线-->
    <div style="height:300px;background:#fff;margin-top:30px;">
      <nav-bar>
          24h分布
      </nav-bar>
      <div>
<!--        <echarts-bar :chart-data="barChartData"/>-->
      </div>
    </div>
    <!--饼图们-->
    <div style="display: flex;justify-content: space-between;flex-wrap: wrap;width:100%">
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          高频访问IP
        </nav-bar>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          一周分布
        </nav-bar>
        <div>
<!--          <echarts-bar />-->
        </div>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          操作系统
        </nav-bar>
        <div>
          <echarts-bar1 :chart-data="os"/>
        </div>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          访问浏览器
        </nav-bar>
        <div>
          <echarts-bar1 :chart-data="browser"/>
        </div>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          访问类型
        </nav-bar>
        <div>

        </div>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          访问网络
        </nav-bar>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          访问设备
        </nav-bar>
        <div class="row">
          <echarts-ring :chart-data="device[0]"/>
          <echarts-ring :chart-data="device[1]"/>
        </div>
      </div>
      <div style="width:400px;height:300px;margin-bottom: 48px">
        <nav-bar>
          访问来源
        </nav-bar>
      </div>
    </div>
  </div>
</template>

<script>
//组件
import navBar from "@/views/space/components/dataView/components/viewNavBar";
import echartsLine from "../../../../components/common/echarts/echartsLine";
import echartsChina from "../../../../components/common/echarts/echartsChina";
import echartsRing from "../../../../components/common/echarts/echartsRing";
import echartsBar1 from "../../../../components/common/echarts/echartsBar1";


//网络请求
import {getTrend,getRegion,getType} from "@/network/visual/statistic";

export default {
  name: "dataForm",
  props:{
    dataCode:{
      type:String,
      required: true
    },
    dataDate:{
      type:Array,
      required: true
    }
  },
  components:{
    navBar,
    echartsLine,
    echartsChina,
    echartsRing,
    echartsBar1
  },
  data(){
    return{
      //线图数据
      lineChartData: {},
      //线图表格数据
      lineTable:[],
      //线图的统计数
      line:{},
      //表格和线图的显示
      lineIsShow:true,

      //中国地区数据Pv
      dataChinaPv:[],
      //中国地区Uv
      dataChinaUv:[],
      //省份uv和pv的切换
      regionIsShow:true,

      //访问设备
      device:[
        {
          device_type:'电脑',
          ratio:0,
          pv:'0次'
        },
        {
          device_type:'移动设备',
          ratio:0,
          pv:'0次'
        }
      ],
      //访问浏览器
      browser:[
        {
          name:'微信内嵌浏览器',
          ratio:0,
          pv:0
        },
        {
          name:'Chrome浏览器',
          ratio:0,
          pv:0
        },
        {
          name:'Safari浏览器',
          ratio:0,
          pv:0
        }
      ],
      //操作系统
      os:[
        {
          name:'Windows',
          ratio:0,
          pv:0
        },
        {
          name:'iOS',
          ratio:0,
          pv:0
        },
        {
          name:'Android',
          ratio:0,
          pv:0
        }
      ]
    }
  },
  methods:{
    //访问曲线数据请求
    async dataLine(){
      this.lineChartData = await this.lineTrend(this.dataCode,this.dataDate)
    },
    //请求ipuvpv
    //得到这段日期间的每天的访问数据
    async lineTrend(code,date){
      let line = {
        pv:[],
        uv:[],
        ip:[]
      }
      let xAxis = []
      //用于统计
      let ipNum = 0
      let pvNum = 0
      let uvNum = 0
      let n = []
      await getTrend(code,date[0],date[1]).then(res=>{
        if(res.data.data!==0){
          for(let obj of res.data.data){
            //左侧统计
            line.pv.push(parseInt(obj.pv))
            line.uv.push(parseInt(obj.uv))
            line.ip.push(parseInt(obj.ip))
            //统计图数据
            xAxis.push(obj.interval)
            ipNum = parseInt(obj.ip) + ipNum
            pvNum = parseInt(obj.pv) + pvNum
            uvNum = parseInt(obj.uv) + uvNum
            //列表数据
            n.push({
              interval:obj.interval,
              ip:obj.ip,
              pv:obj.pv,
              uv:obj.uv
            })
          }
          this.line = {ip:ipNum,pv:pvNum,uv:uvNum}
          this.lineTable = n
        }
      })
      // console.log(ipNum, pvNum, uvNum);
      return {
        line,
        xAxis
      }
    },

    //访问地区请求
    async dataRegion(){
      let temp = await this.regionTrend(this.dataCode,this.dataDate)
      this.dataChinaPv = temp.pv
      this.dataChinaUv = temp.uv
    },
    //请求地区uvpv
    async regionTrend(code,date){
      let pv = []
      let uv = []
      await getRegion(code,date[0],date[1]).then(res=>{
        for (let obj of res.data.data) {
          pv.push({
            name: obj.province.slice(0,2),
            value: parseInt(obj.pv),
          });
          uv.push({
            name: obj.province.slice(0,2),
            value: parseInt(obj.uv),
          });
        }
      })
      return {pv,uv};
    },

    //浏览器指纹处理
    async dataType(){
      let temp = await this.fingerPrint(this.dataCode,this.dataDate)
      //处理访问设备的信息
      for(let obj of temp.device_stats){
        if(obj.device_type === 'Computer'){
          this.device[0].ratio = obj.pv_ratio
          this.device[0].pv = obj.pv+'次'
        }
        if(obj.device_type === 'Mobile'){
          this.device[1].ratio = obj.pv_ratio
          this.device[1].pv = obj.pv+'次'
        }
      }
      //处理访问浏览器的信息
      for(let obj of temp.browser_stats){
        if(obj.browser === 'Chrome'){
          this.browser[1].ratio = obj.pv_ratio
          this.browser[1].pv = parseInt(obj.pv)
        }
        if(obj.browser === 'Wechat'){
          this.browser[0].ratio = obj.pv_ratio
          this.browser[0].pv = parseInt(obj.pv)
        }
        if(obj.browser === 'Safari'){
          this.browser[0].ratio = obj.pv_ratio
          this.browser[0].pv = parseInt(obj.pv)
        }
      }
      //处理访问系统的信息
      for(let obj of temp.os_stats){
        if(obj.os === 'Windows'){
          this.os[0].ratio = obj.pv_ratio
          this.os[0].pv = parseInt(obj.pv)
        }
        if(obj.browser === 'iOS'){
          this.os[1].ratio = obj.pv_ratio
          this.os[1].pv = parseInt(obj.pv)
        }
        if(obj.browser === 'Android'){
          this.os[2].ratio = obj.pv_ratio
          this.os[2].pv = parseInt(obj.pv)
        }
      }
    },
    //请求浏览器指纹
    async fingerPrint(code,date){
      let temp = []
      await getType(code,date[0],date[1]).then(res=>{
        temp = res.data.data
      })
      return temp
    },
  },
  watch:{
    dataDate:{
      handler() {
        this.dataLine()
        this.dataRegion()
        this.dataType()
      },
      immediate:true
    },
  }
}
</script>

<style scoped>
.legendItem{
  margin-bottom: 10px;
}
</style>
