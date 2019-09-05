import Vue from "vue";
import Vuex from "vuex";

import {
  USER_CHANGE,
  USER_INFO,
  USER_PERMISSION,
  USER_MENU,
  LOGOUT
} from "@/const";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [USER_INFO]: null,
    [USER_MENU]: null
  },
  getters: {
    [USER_INFO](state) {
      if (!state[USER_INFO]) {
        let userInfo = window.localStorage.getItem(USER_INFO);
        if (userInfo) {
          try {
            userInfo = JSON.parse(userInfo);
          } catch (error) {
            userInfo = null;
          }
        }
        return userInfo;
      }
      return state[USER_INFO];
    },
    [USER_PERMISSION](state, getters) {
      let userInfo = getters[USER_INFO];
      return userInfo ? userInfo.premission : null;
    }
  },
  mutations: {
    [USER_CHANGE](state, userInfo) {
      state[USER_INFO] = userInfo;
      window.localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    },
    [USER_MENU](state, userMenu) {
      state[USER_MENU] = userMenu;
    },
    [LOGOUT](state) {
      state[USER_INFO] = {};
      state[USER_MENU] = [];
      window.localStorage.removeItem(USER_INFO);
    }
  }
});
