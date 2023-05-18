<template>
	<div>
		<b-table hover :items="tripItems" :fields="fields">
		
		<template #cell(first_image)="data">
			<img :src="data.value" height="100">
		</template>
		<template #cell(title)="data">
			<p>{{ data.value }}</p>
		</template>
		<template #cell(addr1)="data">
			<p>{{ data.value }}</p>
		</template>
		<!-- <template #cell(longitude)="data">
			<p>{{ data.value }}</p>
		</template>
		<template #cell(latitude)="data">
			<p>{{ data.value }}</p>
		</template> -->

		</b-table>
	</div>
</template>
<script>
export default {
	name: 'TripItems',
	props: {
		tripItems: {
			type: Array,
			// required: true,
		},
	},
	data() {
		return {
			fields: [
				{ key: 'first_image', label: '이미지' },
				{ key: 'title', label: '이름' },
				{ key: 'addr1', label: '주소' },
			],
			
		};
	},
	
};
</script>
