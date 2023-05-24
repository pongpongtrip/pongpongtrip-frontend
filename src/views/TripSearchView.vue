<template>
  <div class="tripsearch">
    <b-container>
      <h2 class="mt-4">전국 관광지 정보</h2>
      <!--form  start-->
      <b-form inline class="justify-content-md-center" @submit="onSubmit" @reset="onReset">
        <b-form-group id="search-area" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="search-area"
            v-model="form.sido_code"
            :options="sido_codes"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="search-content-id" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="search-content-id"
            v-model="form.content_type_id"
            :options="content_type_ids"
            required
          ></b-form-select>
        </b-form-group>
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
      </b-form>
      <!--form  end-->

      <!-- kakao map start -->
      <div style="height: 700px; justify-content: center" class="mt-3">
        <KaKaoMap :markerItems="this.markers" />
      </div>
      <!-- kakao map end -->

      <h2 class="mt-4">관광지 목록</h2>
      <trip-items :trip-items="tripItems"></trip-items>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/httpDefault.js";
import TripItems from "@/components/TripItems.vue";
import KaKaoMap from "@/components/KaKaoMap.vue";

export default {
  name: "TripSearchView",
  components: {
    TripItems,
    KaKaoMap,
  },
  data() {
    return {
      tripItems: [],
      markers: [],
      form: {
        sido_code: 0,
        content_type_id: 0,
        search_keyword: "",
      },
      sido_codes: [
        { text: "검색 할 지역 선택", value: 0 },
        { text: "서울", value: 1 },
        { text: "인천", value: 2 },
        { text: "대전", value: 3 },
        { text: "대구", value: 4 },
        { text: "광주", value: 5 },
        { text: "부산", value: 6 },
        { text: "울산", value: 7 },
        { text: "세종특별자치시", value: 8 },
        { text: "경기도", value: 31 },
        { text: "강원도", value: 32 },
        { text: "충청북도", value: 33 },
        { text: "충청남도", value: 34 },
        { text: "경상북도", value: 35 },
        { text: "경상남도", value: 36 },
        { text: "전라북도", value: 37 },
        { text: "전라남도", value: 38 },
        { text: "제주도", value: 39 },
      ],
      content_type_ids: [
        { text: "관광지 유형", value: 0 },
        { text: "관광지", value: 12 },
        { text: "문화시설", value: 14 },
        { text: "축제공연행사", value: 15 },
        { text: "여행코스", value: 25 },
        { text: "레포츠", value: 28 },
        { text: "숙박", value: 32 },
        { text: "쇼핑", value: 38 },
        { text: "음식점", value: 39 },
      ],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      http.post(`/attraction/search`, JSON.stringify(this.form)).then((response) => {
        console.log(response.data);

        // 받아온 데이터를 가공하여 tripItems에 할당
        this.tripItems = response.data;

        this.tripItems.forEach((item) => {
          if (item.first_image === "") {
            item.first_image = require("../assets/logo2.png");
          }
        });

        for (let i = 0; i < response.data.length; i++) {
          let a = response.data[i].latitude;
          let b = response.data[i].longitude;
          let c = response.data[i].title;
          let d = response.data[i].first_image;
          let e = response.data[i].addr1;
          this.markers.push([a, b, c, d, e]);
        }
        // this.markers = marks;
        console.log(this.tripItems);
        console.log(this.markers);
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.sido_code = 0;
      this.form.content_type_id = 0;
      this.form.search_keyword = "";
    },
  },
};
</script>
