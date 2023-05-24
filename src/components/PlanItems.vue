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
			@row-clicked="displayInfoWindow"
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
			size="sm"
		>
			<template #first-text><b-icon icon="chevron-double-left"></b-icon></template>
			<template #prev-text><b-icon icon="chevron-compact-left"></b-icon></template>
			<template #next-text><b-icon icon="chevron-compact-right"></b-icon></template>
			<template #last-text><b-icon icon="chevron-double-right"></b-icon></template>
		</b-pagination>
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
			this.$store.commit('addMyPlan', {
				content_id: item.content_id,
				title: item.title,
				time: '12:00',
			});
			console.log(this.$store.state.MY_PLAN);
		},
		displayInfoWindow(item) {
			//item object를 배열로 만들어서 보내기
			const marker = [item.latitude, item.longitude, item.title, item.first_image, item.addr1];
			this.$emit('display-info-window', marker);
		},
	},
};
</script>
