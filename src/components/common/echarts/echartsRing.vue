<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>


<script>
import echarts from "echarts";

export default {
  name: "echartsPie",
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
      required: true,
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
  methods:{
    initChart(){
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(data){
      this.chart.setOption({
        title: {
          text: data.device_type + '：' + Math.round(data.ratio * 100) + "%\n\n" + data.pv,
          textStyle: {
            color: 'black',
            fontSize: 12
          },
          left: 'center',
          top: 'center'
        },
        angleAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 100,
          startAngle: 90,
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: ['a', 'b', 'c'],
          z: 10,
        },
        polar: {
          radius: '60%',

        },
        series: [
          {
            type: 'bar',
            data: [, , data.ratio*100],
            z: 1,
            coordinateSystem: 'polar',
            barMaxWidth: 5,
            roundCap: true,
            silent: true,
            color: '#2A54D0',
            barGap: '-100%',
          },
          {
            // 浅色背景
            type: 'bar',
            data: [, , 100-data.ratio*100],
            z: 0,
            silent: true,
            coordinateSystem: 'polar',
            barMaxWidth: 5,
            roundCap: true,
            color: '#EFF3FD',
            barGap: '-100%',

          },
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
