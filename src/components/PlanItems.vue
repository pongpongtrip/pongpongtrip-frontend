<template>
	<div>
		<b-table
			hover
			:items="planItems"
			:fields="fields"
			:per-page="perPage"
			:current-page="currentPage"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
		>
			<template #cell(first_image)="data">
				<img :src="data.value" height="100" />
			</template>
			<template #cell(title)="data">
				<div align="end" style="height: 100px">
					<p align="center">{{ data.value }}</p>
					<b-button variant="primary" size="sm" @click="addToMyPlan(data.item)">추가</b-button>
				</div>
			</template>
		</b-table>
		<b-pagination
			v-model="currentPage"
			:total-rows="planItems.length"
			:per-page="perPage"
			align="center"
		></b-pagination>
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
			perPage: 5,
		};
	},
	methods: {
		addToMyPlan(item) {
			console.log(item);
			this.$store.commit('addMyPlan', { content_id: item.content_id, title: item.title });
			console.log(this.$store.state.MY_PLAN);
		},
	},
};
</script>
