import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { getToken, setToken, delToken } from "@/utils/localStorage";

Vue.use(Vuex);

const state = {
  // 默认navBar显示
  navBarShow: true,
  key1:0,
  //token
  token:getToken()||{},
  //点击分组传入listData的group_id
  group:{}
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  // 异步操作或者复杂的操作放到actions
  actions
});
