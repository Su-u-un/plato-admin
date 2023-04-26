import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { getToken, } from "@/utils/localStorage";

Vue.use(Vuex);

const state = {
  // 默认navBar显示
  navBarShow: true,
  key1:0,
  //token
  token:getToken()||{},
  //含有分组的列表
  list:[],
  //含有链接的分组
  group:{}
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  // 异步操作或者复杂的操作放到actions
  actions
});
