import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

//module import
import memberStore from './memberStore';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		articleNo: '',
		MY_PLAN: [],
	},
	getters: {},
	mutations: {
		setArticleNo(state, value) {
			state.articleNo = value;
		},
		addMyPlan(state, item) {
			state.MY_PLAN.push(item); //index위치에 0개의 요소를제거하고 item을 추가
		},
		removeMyPlan(state, index) {
			if (index !== -1) {
				state.MY_PLAN.splice(index, 1); //인덱스에서부터 1개의 요소를 제거
			}
		},
	},
	actions: {},
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
