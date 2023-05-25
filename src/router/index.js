import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HotPlaceView from '@/views/HotPlaceView.vue';
import MyPlanView from '@/views/MyPlanView.vue';
import TripSearchView from '@/views/TripSearchView.vue';
import TripBoardView from '@/views/TripBoardView.vue';
import LoginView from '@/components/member/LoginView.vue';
import MemberInfoView from '@/components/member/MemberInfoView.vue';
import RegistView from '@/components/member/RegistView.vue';
import MypageView from '@/components/member/MypageView.vue';
import MemberUpdateView from '@/components/member/MemberUpdateView.vue';
import MemberList from '@/components/admin/MemberList.vue';
import TripBoardWrite from '@/views/TripBoardWrite.vue';
import TripBoardDetail from '@/views/TripBoardDetailView.vue';
import TripModify from '@/views/TripBoardModifyView.vue';

import store from "@/store";

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
	}
	
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
	if (router.history.current.name !== 'login') {
		router.push({ name: "login" });
	}
	console.log(router)  
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};


Vue.use(VueRouter);

const routes = [
	// {
	// 	path: '/index.html',
	// 	redirect: "/"
	// },
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/hotplace',
		name: 'hotplace',
		component: HotPlaceView,
	},
	{
		path: '/myplan',
		name: 'myplan',
		beforeEnter: onlyAuthUser,
		component: MyPlanView,
	},
	{
		path: '/tripsearch',
		name: 'tripsearch',
		component: TripSearchView,
	},
	{
		path: '/tripboard',
		name: 'tripboard',
		beforeEnter: onlyAuthUser,
		component: TripBoardView,
		
	},
	{
		path: '/tripboard/write',
		name: 'boardwrite',
		beforeEnter: onlyAuthUser,
		component: TripBoardWrite,
		props: true,
	},
	{
		path: '/tripboard/detail',
		name: 'boardDetail',
		beforeEnter: onlyAuthUser,
		component: TripBoardDetail,
	},
	{
		path: '/tripboard/modify',
		name: 'boardModify',
		beforeEnter: onlyAuthUser,
		component: TripModify,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
	},
	{
		path: '/memberinfo',
		name: 'memberinfo',
		beforeEnter: onlyAuthUser,
		component: MemberInfoView,
	},
	{
		path: '/memberupdate',
		name: 'memberupdate',
		beforeEnter: onlyAuthUser,
		component: MemberUpdateView,
	},
	{
		path: '/memberlist',
		name: 'memberlist',
		beforeEnter: onlyAuthUser,
		component: MemberList,
	},
	{
		path: '/regist',
		name: 'regist',
		component: RegistView,
	},
	{
		path: '/mypage',
		name: 'mypage',
		beforeEnter: onlyAuthUser,
		component: MypageView,
	},
];

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
