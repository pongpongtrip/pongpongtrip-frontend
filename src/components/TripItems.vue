<template>
	<div><b-table hover :items="trip_items" :fields="fields"></b-table></div>
</template>
<script>
export default {
	name: 'TripItems',
	data() {
		return {
			fields: [
				//key 값 임시로 해둠  나중에 수정 필요
				{ key: 'img', label: '이미지' },
				{ key: 'name', label: '이름' },
				{ key: 'addr', label: '주소' },
				{ key: 'long', label: '위도' },
				{ key: 'lati', label: '경도' },
				{ key: 'distance', label: '싸피와의거리' },
			],
			trip_items: [
				// 여기에 데이터 넘겨주기
				{ img: '이미지1', name: '경복궁', addr: '서울', long: 100, lati: 102, distance: 21 },
				{ img: '이미지2', name: '경복궁', addr: '서울', long: 100, lati: 102, distance: 21 },
				{ img: '이미지3', name: '경복궁', addr: '서울', long: 100, lati: 102, distance: 21 },
			],
		};
	},
};
</script>
