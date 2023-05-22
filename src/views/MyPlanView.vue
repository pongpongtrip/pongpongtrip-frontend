<template>
	<div class="myplan">
		
		<b-sidebar id="sidebar-1" title="1day Trip Plan" shadow v-model="showSidebar" class="sidebar">
			<div class="px-3 py-2">
				<b-list-group>
					<b-form @submit="onSubmitMyPlan">
						<b-list-group-item v-for="(item, index) in myPlanItems" :key="index">
							<!-- 내용 출력 -->
							<b-form-group>
								<b-form-timepicker
									v-model="timeValues[index]"
									size="sm"
									locale="en"
									placeholder="Select time"
									required
								></b-form-timepicker>
							</b-form-group>
							<div class="m-2">
								{{ item.title }}
							</div>
							<div style="text-align: end">
								<b-button size="sm" variant="outline-danger" @click="removeMyPlan(item)"
									>삭제</b-button
								>
							</div>
						</b-list-group-item>
					</b-form>
				</b-list-group>
				<b-button class="m-2" type="submit" variant="primary" block @click="onSubmitMyPlan"
					>일정 등록</b-button
				>
			</div>
		</b-sidebar>
		
		<b-container>
			<h2 class="mt-4">나만의 여행 계획</h2>
			<!--form  start-->
			<b-form inline class="justify-content-md-center" @submit="onSubmit" @reset="onReset">
				<b-form-group id="search-area" class="mb-2 mr-sm-2 mb-sm-0">
					<b-form-select
						id="search-area"
						v-model="form.sido_code"
						:options="sido_codes"
						required
					></b-form-select>
				</b-form-group>

				<b-form-group id="search-content-id" class="mb-2 mr-sm-2 mb-sm-0">
					<b-form-select
						id="search-content-id"
						v-model="form.content_type_id"
						:options="content_type_ids"
						required
					></b-form-select>
				</b-form-group>
				<b-form-group id="search-keyword" class="mb-2 mr-sm-2 mb-sm-0">
					<b-form-input
						id="search-keyword"
						v-model="form.search_keyword"
						type="search"
						placeholder="검색어"
						required
					></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="primary" class="mb-2 mr-sm-2 mb-sm-0">검색</b-button>
				<b-button variant="secondary" v-b-toggle.sidebar-1>일정</b-button>
			</b-form>
			<!--form  end-->

			<div class="row w-100 mt-4">
				<!-- kakao map start -->
				<div style="width: 700px; height: 700px">
					<KaKaoMap :markerItems="this.markers" />
				</div>
				<!-- kakao map end -->
				<div class="col">
					<h2>관광지 목록</h2>
					<plan-items :plan-items="planItems"></plan-items>
				</div>
			</div>
		</b-container>
	</div>
</template>

<script>
import http from '@/api/httpDefault.js';
import PlanItems from '@/components/PlanItems.vue';
import KaKaoMap from '@/components/KaKaoMap.vue';

export default {
	name: 'MyPlanView',
	components: {
		PlanItems,
		KaKaoMap,
	},
	data() {
		return {
			planItems: [],
			markers: [],
			form: {
				sido_code: 0,
				content_type_id: 0,
				search_keyword: '',
			},
			sido_codes: [
				{ text: '검색 할 지역 선택', value: 0 },
				{ text: '서울', value: 1 },
				{ text: '인천', value: 2 },
				{ text: '대전', value: 3 },
				{ text: '대구', value: 4 },
				{ text: '광주', value: 5 },
				{ text: '부산', value: 6 },
				{ text: '울산', value: 7 },
				{ text: '세종특별자치시', value: 8 },
				{ text: '경기도', value: 31 },
				{ text: '강원도', value: 32 },
				{ text: '충청북도', value: 33 },
				{ text: '충청남도', value: 34 },
				{ text: '경상북도', value: 35 },
				{ text: '경상남도', value: 36 },
				{ text: '전라북도', value: 37 },
				{ text: '전라남도', value: 38 },
				{ text: '제주도', value: 39 },
			],
			content_type_ids: [
				{ text: '관광지 유형', value: 0 },
				{ text: '관광지', value: 12 },
				{ text: '문화시설', value: 14 },
				{ text: '축제공연행사', value: 15 },
				{ text: '여행코스', value: 25 },
				{ text: '레포츠', value: 28 },
				{ text: '숙박', value: 32 },
				{ text: '쇼핑', value: 38 },
				{ text: '음식점', value: 39 },
			],
			timeValues: [],
			showSidebar: false,
		};
	},
	computed: {
		myPlanItems() {
			console.log(this.$store.state.MY_PLAN);
			this.openSidebar();
			return this.$store.state.MY_PLAN;
		},
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			alert(JSON.stringify(this.form));
			http.post(`/attraction/search`, JSON.stringify(this.form)).then((response) => {
				console.log(response.data);

				// 받아온 데이터를 가공하여 tripItems에 할당
				this.tripItems = response.data;
				let marks = [];

				for (let i = 0; i < response.data.length; i++) {
					let a = response.data[i].latitude;
					let b = response.data[i].longitude;
					this.markers.push([a, b]);
				}

				// 받아온 데이터를 가공하여 tripItems에 할당
				this.planItems = response.data;
			});
		},
		onReset(event) {
			event.preventDefault();
			// Reset our form values
			this.form.sido_code = 0;
			this.form.content_type_id = 0;
			this.form.search_keyword = '';
		},
		removeMyPlan(item) {
			const index = this.$store.state.MY_PLAN.indexOf(item);
			console.log(index);
			this.$store.commit('removeMyPlan', index);
		},
		onSubmitMyPlan(event) {
			event.preventDefault();

			// Get the timepicker values from the timeValues array
			const timepickerValues = this.timeValues.map((time) => (time ? time.toString() : ''));

			// Include the timeValues in your API call or further processing
			const myPlanData = {
				myPlan: this.$store.state.MY_PLAN,
				timeValues: timepickerValues,
			};

			console.log(myPlanData);

			// http.post('/', JSON.stringify(myPlanData)).then((response) => {
			// 	// back으로 데이터 보내는 부분 작성
			// });
		},
		getTimepickerValue(contentId) {
			const timepicker = this.$refs[`timepicker_${contentId}`][0];
			return timepicker ? timepicker.value : null;
		},
		openSidebar() {
			this.showSidebar = true;
		},
	},
};
</script>
<style>

</style>