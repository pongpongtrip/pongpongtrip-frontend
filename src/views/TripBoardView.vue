<template>
	<div class="tripboard">
		<h2 class="mt-4">공유 게시판</h2>
		<b-container>
			<div class="col-md-2 text-start">
				<router-link tag="p" to="/tripboard/write">
					<button type="button" id="btn-mv-register" class="btn btn-outline-primary btn-sm">
						글쓰기
					</button>
				</router-link>
			</div>
			<div>
				<b-form
					inline
					class="justify-content-end mb-4"
					@submit.prevent="searchArticles"
					@reset="onReset"
				>
					<input type="hidden" name="pgno" value="1" />
					<b-form-group class="mb-2 mr-sm-2 mb-sm-0"
						><b-form-select
							id="key"
							v-model="form_search.search_key"
							:options="search_keys"
							required
						>
						</b-form-select
					></b-form-group>
					<b-form-group id="search-keyword" class="mb-2 mr-sm-2 mb-sm-0">
						<b-form-input
							id="search-keyword"
							v-model="form_search.search_keyword"
							type="search"
							placeholder="검색어"
							required
						></b-form-input>
					</b-form-group>
					<b-button type="submit" variant="primary">검색</b-button>
				</b-form>
			</div>
			<div>
				<!-- <b-table hover :items="articles" :fields="fields"></b-table> -->
				<board-items :board-items="articles"></board-items>
			</div>
		</b-container>
	</div>
</template>
<script>
import http from '@/api/httpDefault.js';
import BoardItems from '@/components/BoardItems.vue';
export default {
	name: 'TripBoardView',
	components: {
		BoardItems,
	},
	data() {
		return {
			fields: [
				{ key: 'articleNo', label: '글번호' },
				{ key: 'subject', label: '제목' },
				{ key: 'userId', label: '작성자' },
				{ key: 'hit', label: '조회수' },
				{ key: 'registerTime', label: '작성일' },
			],
			articles: [],
			form_search: {
				search_key: '',
				search_keyword: '',
			},
			search_keys: [
				{ text: '검색조건', value: '' },
				{ text: '제목', value: 'subject' },
				{ text: '작성자', value: 'userid' },
			],
		};
	},
	created() {
		http.get(`/board/list`).then((response) => {
			console.log(response.data);
			this.articles = response.data;
		});
	},
	methods: {
		onSubmit: function () {
			console.log('submit');
		},
		onReset: function () {
			console.log('onReset');
		},
		searchArticles() {
			if (this.form_search.search_key === 'userid') {
				const key = this.form_search.search_keyword;
				http.get(`/board/list/userid/${key}`).then(({ data }) => {
					this.articles = data;
				});
			}

			if (this.form_search.search_key === 'subject') {
				const key = this.form_search.search_keyword;
				http.get(`/board/list/subject/${key}`).then(({ data }) => {
					this.articles = data;
				});
			}
		},
	},
};
</script>
