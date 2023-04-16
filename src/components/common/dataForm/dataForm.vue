<template>
  <div>
<!--    <el-button @click="dataLine()">test</el-button>-->
    <!--访问曲线-->
    <div style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="tabBar">
        tabbar
<!--        <el-button @click="isShow = !isShow">切换</el-button>-->
      </div>
      <div style="display: flex;margin-top: 20px" v-show="isShow">
        <div style="width: 150px">
          <div class="legendItem">访问次数:{{line.pv}}</div>
          <div class="legendItem">访问人数:{{line.uv}}</div>
          <div class="legendItem">IP数:{{line.ip}}</div>
        </div>
        <echarts-line :chart-data="lineChartData"/>
      </div>
      <div v-show="!isShow">
        <el-table>
          111
        </el-table>
      </div>
    </div>
    <!--访问地区-->
    <div style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="tabBar">
        访问地区
      </div>
      <div style="display: flex;margin-top: 20px">
        <div style="width: 150px">
          <div class="legendItem">TOP1-省份</div>
        </div>
        <echarts-china />
      </div>
    </div>
    <!--24h访问曲线-->
    <div style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="tabBar">
        24h分布
      </div>
      <div>
        <echarts-bar :chart-data="barDay"/>
      </div>
    </div>
    <!--饼图们-->
    <div style="display: flex;justify-content: space-between;flex-wrap: wrap;width:100%">
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          高频访问IP
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          一周分布
        </div>
        <div>
          <echarts-bar :chart-data="barWeek"/>
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          操作系统
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          访问浏览器
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          访问类型
        </div>
        <div>
          饼图需求有点怪怪的，看不懂
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          访问网络
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          访问设备
        </div>
      </div>
      <div style="width:50%;height:300px;margin-bottom: 48px">
        <div class="tabBar">
          访问来源
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//组件
import echartsLine from "../echarts/echartsLine";
import echartsChina from "../echarts/echartsChina";
import echartsWorld from "../echarts/echartsWorld";
import echartsBar from "../echarts/echartsBar";
//网络请求
import {getTrend} from "../../../network/visual/statistic";

const barChartData = {
  day:{
    xData:['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
    yData:['0','2','4','6','8','10']
  },
  week:{
    xData:['一','二','三','四','五','六','日'],
    yData:['0','2','4','6','8','10']
  }
}



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
    echartsLine,
    echartsChina,
    echartsWorld,
    echartsBar
  },
  data(){
    return{
      lineChartData: {},
      barDay:barChartData.day,
      barWeek:barChartData.week,
      //线图的统计数
      line:{},
      //表格和线图的显示
      isShow:true,
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
      await getTrend(code,date[0],date[1]).then(res=>{
        for(let obj of res.data.data){
          line.pv.push(parseInt(obj.pv))
          line.uv.push(parseInt(obj.uv))
          line.ip.push(parseInt(obj.ip))
          xAxis.push(obj.interval)
          ipNum = parseInt(obj.ip) + ipNum
          pvNum = parseInt(obj.pv) + pvNum
          uvNum = parseInt(obj.uv) + uvNum
        }
        this.line = {ip:ipNum,pv:pvNum,uv:uvNum}
      })
      // console.log(ipNum, pvNum, uvNum);
      return {
        line,
        xAxis
      }
    },
  },
  watch:{
    dataDate:{
      handler() {
        this.dataLine()
      },
      immediate:true
    },
  }
}
</script>

<style scoped>
.tabBar{
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
}
.legendItem{
  margin-bottom: 10px;
}
</style>
