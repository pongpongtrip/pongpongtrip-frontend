<template>
	<div>
		<b-table @row-clicked="onRowClicked" hover :items="boardItems" :fields="fields" 
		:current-page="currentPage"
        :per-page="perPage">
		<template #cell(articleNo)="data">
			<!-- <router-link
			:to="{
				name: 'boardDetail',
				// params: { articleno: data.item.articleno },
			}"
			>{{ data.value }}
			</router-link> -->
			<span>{{ data.value }}</span>
			<!-- <span style="visibility: hidden;">{{ data.value }}</span> -->
			<!-- <p>{{ increaseIndex() }}</p> -->
		</template>
		
		<template #cell(subject)="data">
			<p>{{ data.value }}</p>
		</template>
		<template #cell(userId)="data">
			<p>{{ data.value }}</p>
		</template>
		<template #cell(hit)="data">
			<p>{{ data.value }}</p>
		</template>
		<template #cell(registerTime)="data">
			<p>{{ data.value }}</p>
		</template>

		</b-table>	

		<b-pagination
			v-model="currentPage"
			:total-rows="rows"
		:per-page="perPage"
		class="justify-content-center"
		/>
	</div>
</template>
<script>
import http from "@/api/http.js";

export default {
	name: 'BoardItems',
	props: {
		boardItems: {
			type: Array,
			// required: true,
		},
	},
	data() {
		return {
			// articles: [...this.boardItems],
			index: 0,
			currentPage: 1,
			totalPages: 0,
			perPage: 5,
			fields: [
				{ key: 'articleNo', label: '글번호' },
				{ key: 'subject', label: '제목' },
				{ key: 'userId', label: '작성자' },
				{ key: 'hit', label: '조회수' },
				{ key: 'registerTime', label: '작성일' },
			],
			
		};
	},
	methods: {
		onRowClicked: function(item, index, event) {
			console.log(item.articleNo);
			this.$store.commit('setArticleNo', item.articleNo);
			console.log(this.$store.state.articleNo);
			
			// this.$store.commit('articleNo', item.articleNo);
			this.$router.push('/tripboard/detail').catch(()=>{});
				
		},
		increaseIndex: function() {
			// if (this.index > this.rows) {
			// 	return
			// }
			this.index = this.index+1;
			return this.index;
		}
	},
	computed: {
		rows(){
			return this.boardItems.length;
    }
	}
	
};
</script>
<style scoped>
.center {
	align-content: center;
}
</style>
