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
    chartData: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      chart:null
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')//选择渲染的dom和主题样式，比如这个马卡龙主题
      this.setOptions(this.chartData)
    },
    setOptions(data){
      this.chart.setOption({
        backgroundColor: "", //背景颜色
        title: {
          text: "",
          subtext: "",
          color: "#fff",
          x: "center",
        },
        //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
        visualMap: {
          // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
          type: "piecewise", // 类型为分段型
          top: "bottom",
          // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          right: 10,
          splitNumber: 6,
          seriesIndex: [0],
          itemWidth: 20, // 每个图元的宽度
          itemGap: 2, // 每两个图元之间的间隔距离，单位为px
          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            {gte: 10000, label: "10000人以上", color: "#1890FF"}, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              gte: 1000,
              lte: 9999,
              label: "1000-9999人",
              color: "#83C2FF",
            },
            {
              gte: 500,
              lte: 999,
              label: "500-999人",
              color: "#CDE5FF",
            },
            {
              gte: 100,
              lte: 499,
              label: "100-499人",
              color: "#E6F1FF",
            },
            {
              gte: 1,
              lte: 99,
              label: "1-99人",
              color: "#EBF3FF",
            },
            {lte: 0, label: "无", color: "#FAFAFA"}, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          textStyle: {
            color: "#737373",
          },
        },
        // 提示框，鼠标移入
        tooltip: {
          show: true, //鼠标移入是否触发数据
          trigger: "item", //出发方式
          formatter: function (params) {
            if(params.value){
              return params.name + ' : ' + params.value + '次';
            }else{
              return params.name + ' : ' + '0次'; }
          }
        },
        //配置地图的数据，并且显示
        series: [
          {
            name: "地图",
            type: "map", //地图种类
            map: "china", //地图类型。
            data: data,
            itemStyle: {
              normal: {
                label: {
                  show: false, //默认是否显示省份名称
                },
                areaStyle: {
                  color: "#FAFAFA", //默认的地图板块颜色
                },
                borderWidth: 1,
                borderColor: "#D9D9D9",
              },
              //地图区域的多边形 图形样式。
              emphasis: {
                label: {
                  show: false, //选中状态是否显示省份名称
                },
                areaStyle: {
                  color: "#90c31d", //选中状态的地图板块颜色
                },
              },
            },
            zoom: 1, //放大比例
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息
              show: true,
            },
            // roam: true, //支持拖拽缩放
            // scaleLimit: {
            //   //滚轮缩放的极限控制
            //   min: 0.5, //缩放最小大小
            //   max: 6, //缩放最大大小
            // },
          },
          {
            type: "scatter",
            showEffectOn: "render", //配置什么时候显示特效
            coordinateSystem: "geo", //该系列使用的坐标系
            symbolSize: 10, //标记的大小

          },
        ]
      })
    },
  },

};
</script>
<style scoped>

</style>
