import {
  SET_NAVBAR_SHOW
} from "./types";

export default {
  // 设置navBar显示和隐藏
  [SET_NAVBAR_SHOW](state, bol) {
    state.navBarShow = bol;
  },
  updateIndex(state,key1){
    state.key1 = key1
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
};
