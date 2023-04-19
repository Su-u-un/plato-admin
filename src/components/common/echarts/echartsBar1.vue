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
      type: Array,
      required: true
    }
  },
  name: "echartsBar1",
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)//选择渲染的dom和主题样式，比如这个马卡龙主题
      this.setOptions(this.chartData)
    },
    setOptions(data){
      this.chart.setOption(
        {
          grid: {
            top: 20, // 设置条形图的边距
            bottom: 0,
          },
          xAxis: {
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'category',
              inverse: true,
              data: [data[0].name,data[1].name,data[2].name],
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  verticalAlign: 'bottom',
                  fontSize: 14,
                  fontFamily: 'PingFang SC',
                  align: 'left',
                  padding: [0, 0, 15, 10],
                },
                formatter: (name,index) => {
                  return `${name}：${data[index].ratio*100}%`
                },
              },
              offset: 0,
            },
            {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                padding: [0, 15, 15, 0],
                verticalAlign: "bottom",
                align: "right",
                textStyle: {
                  color:'black',
                  fontSize: 14,
                  fontFamily: 'PingFang SC',
                },
                formatter:(a)=>{
                  return `${a}次`
                }
              },

              data: [data[0].pv,data[1].pv,data[2].pv]
            }
          ],
          series: [
            {
              // 内
              type: 'bar',
              barWidth: 14,
              barCateGoryGap: 20,
              legendHoverLink: false,
              silent: true,
              itemStyle: {
                normal: {
                  barBorderRadius:10,
                  color: '#2A54D0'
                },
              },
              label: {
                normal: {
                  show: false,
                },
              },
              data: [data[0].pv,data[1].pv,data[2].pv],
              z: 2,
              animationEasing: 'elasticOut',
            },
            {
              name: '外框',
              type: 'bar',
              silent: true,
              barCateGoryGap: 20,
              barGap: '-100%', // 设置外框粗细
              data: ['100','100','100'],
              barWidth: 14,
              itemStyle: {
                normal: {
                  barBorderRadius:10,
                  color: '#EFF3FD'
                },
              },
              z: 0,
            },
          ],
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
