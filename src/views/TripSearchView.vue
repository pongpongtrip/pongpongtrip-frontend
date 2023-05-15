<template>
	<div class="tripsearch">
		<b-container>
			<h2 class="mt-4">전국 관광지 정보</h2>
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
				<b-button type="submit" variant="primary">검색</b-button>
			</b-form>
			<!--form  end-->

			<!-- kakao map start -->
			<KaKaoMap />
			<!-- kakao map end -->

			<h2 class="mt-4">관광지 목록</h2>
			<trip-items></trip-items>
		</b-container>
	</div>
</template>

<script>
import TripItems from '@/components/TripItems.vue';
import KaKaoMap from '@/components/KaKaoMap.vue';

export default {
	name: 'TripSearchView',
	components: {
		TripItems,
		KaKaoMap,
	},
	data() {
		return {
			form: {
				sido_code: 0,
				content_type_id: 0,
				search_keyword: '',
			},
			sido_codes: [
				{ text: '검색 할 지역 선택', value: 0 },
				{ text: '서울', value: null },
				{ text: '인천', value: null },
				{ text: '대전', value: null },
				{ text: '대구', value: null },
				{ text: '광주', value: null },
				{ text: '부산', value: null },
				{ text: '울산', value: null },
				{ text: '세종특별자치시', value: null },
				{ text: '경기도', value: null },
				{ text: '강원도', value: null },
				{ text: '충청북도', value: null },
				{ text: '충청남도', value: null },
				{ text: '경상북도', value: null },
				{ text: '경상남도', value: null },
				{ text: '전라북도', value: null },
				{ text: '전라남도', value: null },
				{ text: '제주도', value: null },
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
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			alert(JSON.stringify(this.form));
		},
		onReset(event) {
			event.preventDefault();
			// Reset our form values
			this.form.sido_code = 0;
			this.form.content_type_id = 0;
			this.form.search_keyword = '';
		},
	},
};
</script>
