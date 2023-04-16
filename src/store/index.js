import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { getToken, setToken, delToken } from "../utils/localStorage";

Vue.use(Vuex);

const state = {
  // 默认navBar显示
  navBarShow: true,
  key1:0,
  list:[
    [
      {
        key:1,
        id:1,
        name:'默认分组',
        linkname:'腾讯',
        create:'2002/03/12',
        link:'https://sourl.cn/ydfFEi',
        nowtimes:1,
        alltimes:6,
        person:4,
        allperson:8,
        ip:3,
        allip:4
      },
      {
        key:1,
        id:2,
        name:'默认分组',
        linkname:'百度',
        create:'2002/03/12',
        link:'https://sourl.cn/V2vVLi',
        nowtimes:2,
        alltimes:2,
        person:5,
        allperson:5,
        ip:2,
        allip:2
      }
    ],
    [
      {
        key:2,
        id:1,
        name:'分组1',
        linkname:'谷歌',
        create:'2002/03/12',
        link:'https://sourl.cn/V2vVLi',
        nowtimes:3,
        alltimes:7,
        person:2,
        allperson:3,
        ip:5,
        allip:5
      }
    ]
  ],
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
