<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>


import echarts from "echarts";

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  name: "echartsBar",
  data(){
    return{
      chart:null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)//选择渲染的dom和主题样式，比如这个马卡龙主题
      this.setOptions(this.chartData)
    },
    setOptions({xData, yData} = {}){
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisTick: {
            show: false,
            alignWithLabel: true
          }
        },
        yAxis: {
          data:yData,
          type: 'value',
          axisTick: {
            show: false
          },
        }
        ,
        series: [
          {
            name: 'Direct',
            color:'#3888fa',
            // stack: 'vistors',
            barWidth:'10%',
            type: 'bar',
            data: [2, 1, 0, 0, 0, 0, 2,2,4,1,1,1,1,0,2, 1, 0, 0, 0, 0, 2,2,4,1]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
