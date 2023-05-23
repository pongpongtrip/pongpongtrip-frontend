<template>
  <div>
    <b-table
      hover
      :items="tripItems"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(first_image)="data">
        <img :src="data.value" height="100" />
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
    <b-pagination
      v-model="currentPage"
      :total-rows="tripItems.length"
      :per-page="perPage"
      align="center"
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
  name: "TripItems",
  props: {
    tripItems: {
      type: Array,
      // required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "first_image", label: "이미지" },
        { key: "title", label: "이름" },
        { key: "addr1", label: "주소" },
      ],
      currentPage: 1,
      perPage: 10,
    };
  },
};
</script>
