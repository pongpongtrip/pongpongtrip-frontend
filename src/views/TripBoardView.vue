<template>
	<div class="tripboard">
		<h2 class="mt-4">공유 게시판</h2>
		<b-container>
			<div class="col-md-2 text-start">
				<button type="button" id="btn-mv-register" class="btn btn-outline-primary btn-sm">
					글쓰기
				</button>
			</div>
			<div>
				<b-form inline class="justify-content-end mb-4" @submit="onSubmit" @reset="onReset">
					<input type="hidden" name="pgno" value="1" />
					<b-form-group class="mb-2 mr-sm-2 mb-sm-0"
						><b-form-select id="key" v-model="form.key" :options="keys" required> </b-form-select
					></b-form-group>
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
					<!-- <div class="input-group input-group-sm">
						<input type="text" name="word" id="word" class="form-control" placeholder="검색어..." />
						<button id="btn-search" class="btn btn-dark" type="button">검색</button>
					</div> -->
				</b-form>
			</div>
			<div>
				<b-table hover :items="articles" :fields="fields"></b-table>
			</div>
		</b-container>
	</div>
</template>
<script>
export default {
	name: 'TripBoardView',
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
			form: {
				key: null,
			},
			keys: [
				{ text: '검색조건', value: null },
				{ text: '제목', value: 'subject' },
				{ text: '작성자', value: 'userid' },
			],
		};
	},
};
</script>
