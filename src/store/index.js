import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})
