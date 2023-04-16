import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'

//导入全局样式
import './assets/css/global.css'
import '../node_modules/echarts/map/js/china'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
