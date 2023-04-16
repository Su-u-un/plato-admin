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
      required: true
    }
  },
}
</script>

<style scoped>

</style>
