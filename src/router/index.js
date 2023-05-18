import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HotPlaceView from '@/views/HotPlaceView.vue';
import MyPlanView from '@/views/MyPlanView.vue';
import TripSearchView from '@/views/TripSearchView.vue';
import TripBoardView from '@/views/TripBoardView.vue';
import LogInView from '@/components/member/LogInView.vue';
import MemberInfoView from '@/components/member/MemberInfoView.vue';
import RegistView from '@/components/member/RegistView.vue';
import MemberUpdateView from '@/components/member/MemberUpdateView.vue';
import MemberList from '@/components/admin/MemberList.vue';
import TripBoardWrite from '@/views/TripBoardWrite.vue';
import TripBoardDetail from '@/views/TripBoardDetailView.vue';
import TripModify from '@/views/TripBoardModifyView.vue';

Vue.use(VueRouter);

const routes = [
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
		component: TripBoardView,
		
	},
	{
		path: '/tripboard/write',
		name: 'boardwrite',
		component: TripBoardWrite,
	},
	{
		path: '/tripboard/detail',
		name: 'boardDetail',
		component: TripBoardDetail,
	},
	{
		path: '/tripboard/modify',
		name: 'boardModify',
		component: TripModify,
	},
	{
		path: '/login',
		name: 'login',
		component: LogInView,
	},
	{
		path: '/memberinfo',
		name: 'memberinfo',
		component: MemberInfoView,
	},
	{
		path: '/memberupdate',
		name: 'memberupdate',
		component: MemberUpdateView,
	},
	{
		path: '/memberlist',
		name: 'memberlist',
		component: MemberList,
	},
	{
		path: '/regist',
		name: 'regist',
		component: RegistView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
