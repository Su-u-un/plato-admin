<template>
  <div :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
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
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)//选择渲染的dom和主题样式，比如这个马卡龙主题
      this.setOptions(this.chartData)
    },
    setOptions({ xAxis,line } = {}) {//对象的解构赋值
      this.chart.setOption({
        xAxis: {
          data: xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          // left: 40,
          // right: 40,
          bottom: 0,
          top: 20,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          max: function(data) {//取最大值向上取整为最大刻度
            return data.max ===1 ? 4 : Math.pow(Math.ceil(Math.sqrt(data.max)),2)
          }
        },
        legend: {
          data: ['访问次数', '访问人数', 'IP数']
        },
        series: [{
          name: '访问次数',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: line.pv,
          animationDuration: 2800,//渲染速度
          animationEasing: 'cubicInOut'//渲染方式
        },
        {
          name: '访问人数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2//折线粗细
              },
              // areaStyle: {
              //   color: '#f3f8ff'
              // }
            }
          },
          data:line.uv,
          animationDuration: 2800,//渲染速度
          animationEasing: 'quadraticOut'//渲染方式
        },
        {
          name: 'IP数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#bebe07',
              lineStyle: {
                color: '#bebe07',
                width: 2
              },
              // areaStyle: {
              //   color: '#f3f8ff'
              // }
            }
          },
          data: line.ip,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
