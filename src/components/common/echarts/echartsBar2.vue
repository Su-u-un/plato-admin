<template>
  <div :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require('echarts/theme/macarons')

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Array,
      required: true
    },
    xAxis:{
      type:Array,
      required: true
    }
  },
  data(){
    return{
      chart:null,
    }
  },
  watch: {
    chartData: {
      deep: true,
      immediate:true,
      handler(val) {
        this.setOptions(val,this.xAxis)
        console.log(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods:{
    initChart(){
      this.chart = echarts.init(this.$el,'macarons')
      this.setOptions(this.chartData,this.xAxis)
    },
    setOptions(pv,xAxis){
      this.chart.setOption(
          {
            tooltip:{
              trigger: 'item',
              position:'top'
            },
            grid:{
              bottom:80
            },
            xAxis: {
              data: xAxis,
              axisTick: 'none'
            },
            yAxis: {
              axisTick: 'none',
              max:function (data){
                return data.max ===1 ? 4 : Math.pow(Math.ceil(Math.sqrt(data.max)),2)
              }
            },
            series: {
              type: 'bar',
              barWidth:4,
              showBackground:true,
              data: pv,
              itemStyle: {
                normal: {
                  barBorderRadius:4,
                  color: '#3665e0'
                },
              },
            }
          }
      )
    }
  }
}
</script>

<style scoped>

</style>
