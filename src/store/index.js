import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

//module import
import memberStore from "./memberStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleNo: '',
  },
  getters: {
  },
  mutations: {
    setArticleNo(state, value) {
      state.articleNo = value;
    }
  },
  actions: {
  },
  modules: {
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
