<template>
	<div>
		<b-table hover :items="planItems" :fields="fields" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
			<template #cell(first_image)="data">
				<img :src="data.value" height="100">
			</template>
			<template #cell(title)="data">
				<p>{{ data.value }}</p>
			</template>	
		</b-table>
		<b-pagination v-model="currentPage" :total-rows="planItems.length" :per-page="perPage" align="center"></b-pagination>
	</div>
</template>

<script>
	export default {
	name: 'PlanItems',
	props: {
		planItems: {
			type: Array,
		},
	},
	data() {
		return {
		fields: [
			{ key: 'first_image', label: '이미지' },
			{ key: 'title', label: '이름' },
		],
		sortBy: null,
		sortDesc: false,
		currentPage: 1,
		perPage: 5
		};
	},
	};
</script>
