<template>
	<div id="kakao">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">

				<!-- kakao map start -->
				<div id="map" class="mt-3" style="width: 100%; height: 700px"></div>

				<!-- kakao map end -->
				<!-- <button @click="displayMarker(markerPositions1)">marker set 1</button> -->
				<!-- <button @click="displayMarker(markerPositions2)">marker set 2</button>
				<button @click="displayMarker([])">marker set 3 (empty)</button> -->
				<!-- <button @click="displayInfoWindow">infowindow</button> -->
				
				<!-- <div class="row">
          <table class="table table-striped" style="display: none">
            <thead>
              <tr>
                <th>대표이미지</th>
                <th>관광지명</th>
                <th>주소</th>
                <th>위도</th>
                <th>경도</th>
              </tr>
            </thead>
            <tbody id="trip-list"></tbody>
          </table>
        </div>
        관광지 검색 end -->
			</div>
		</div>
	</div>
</template>

<script>
// import HeaderNav from "@/components/HeaderNav.vue";

export default {
	name: 'MapView',
	props: {
		markerItems: {
			type: Array,
		}
	}
		
		
	,
	data() {
		return {
			markerPositions1: [
				...this.markerItems
			],
			// markerPositions2: [
			// 	[37.499590490909185, 127.0263723554437],
			// 	[37.499427948430814, 127.02794423197847],
			// 	[37.498553760499505, 127.02882598822454],
			// 	[37.497625593121384, 127.02935713582038],
			// 	[37.49629291770947, 127.02587362608637],
			// 	[37.49754540521486, 127.02546694890695],
			// 	[37.49646391248451, 127.02675574250912],
			// ],
			
			markers: [this.markerItems],
			infowindow: null,
		};
	},

	mounted() {
		console.log('sdfsdfsd');
		console.log(this.markerItems);
		if (window.kakao && window.kakao.maps) {
			
			setTimeout(() => { this.initMap() }, 100)
			console.log('카카오 맵 초기화');
		} else {
			const script = document.createElement('script');
			/* global kakao */
			script.onload = () => kakao.maps.load(this.initMap);
			script.src =
				'//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=38eedb9483c38e015735b4a1e007979b&libraries=services,clusterer,drawing';
			document.head.appendChild(script);
		}
		
	},
	watch:{
		markerItems() {
			this.displayMarker();
		}
		
	},
	methods: {
		initMap() {
			const container = document.getElementById('map');
			const options = {
				center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
				level: 5,
			};

			//지도 객체를 등록합니다.
			//지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
			this.map = new kakao.maps.Map(container, options);
			this.displayMarker();
		},
		changeSize(size) {
			const container = document.getElementById('map');
			container.style.width = `${size}px`;
			container.style.height = `${size}px`;
			this.map.relayout();
		},
		displayMarker() {
			// if (this.markers.length > 0) {
			// 	this.markers.forEach((marker) => marker.setMap(null));
			// }

			const positions = this.markerItems.map((position) => new kakao.maps.LatLng(...position));

			if (positions.length > 0) {
				this.markers = positions.map(
					(position) =>
						new kakao.maps.Marker({
							map: this.map,
							position,
						})
				);

				const bounds = positions.reduce(
					(bounds, latlng) => bounds.extend(latlng),
					new kakao.maps.LatLngBounds()
				);

				this.map.setBounds(bounds);
			}
		},
		displayInfoWindow() {
			if (this.infowindow && this.infowindow.getMap()) {
				//이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
				this.map.setCenter(this.infowindow.getPosition());
				return;
			}

			var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
				iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
				iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

			this.infowindow = new kakao.maps.InfoWindow({
				map: this.map, // 인포윈도우가 표시될 지도
				position: iwPosition,
				content: iwContent,
				removable: iwRemoveable,
			});

			this.map.setCenter(iwPosition);
		},
	},
};
</script>
