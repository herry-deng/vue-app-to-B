import Vue from 'vue';
import Vuex from 'vuex';
import {setCookie, getUserCookie, removeUserCookie} from '../utils/userCookie.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 切换菜单的闭合状态 false 代表不闭合 ，true闭合
    collapsed: false,
    //  初始化 储存用户信息
    user: getUserCookie(),
    // 存储菜单路由
    menuRoutes: [],
  },
  mutations: {  // 改变状态的方法
    changeCollapsed(state){
      state.collapsed  = !state.collapsed
    },
    setUserInfo(state, userInfo){
      state.user = userInfo;
    },
    logout(state){
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email:''
      };
    },
    changeMenuRoutes(state,routes){
      state.menuRoutes = routes;
    }
  },
  actions: {
    changeCollapsed({commit}){
      commit('changeCollapsed')
    },
    setUserInfo({commit}, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({commit}){
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({commit}, routes){
      commit('changeMenuRoutes',routes);
    }
  },
  modules: {
  }
})
