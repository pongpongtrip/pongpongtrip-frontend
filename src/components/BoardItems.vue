<template>
	<div>
		<b-table @row-clicked="onRowClicked" hover :items="boardItems" :fields="fields">
		<template #cell(articleNo)="data">
			<!-- <router-link
			:to="{
				name: 'boardDetail',
				// params: { articleno: data.item.articleno },
			}"
			>{{ data.value }}
			</router-link> -->
			<p>{{ data.value }}</p>
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
	</div>
</template>
<script>
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
			console.log(item),
			console.log(index),
				console.log(event)
		},
	}
	
};
</script>
