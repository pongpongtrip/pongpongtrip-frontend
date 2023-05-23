<template>
  <div class="myplan">
    <b-sidebar id="sidebar-1" title="1day Trip Plan" shadow v-model="showSidebar">
      <div class="px-3 py-2">
        <b-list-group>
          <b-form @submit="checkPlanZero">
            <b-form-input
              v-model="planName"
              placeholder="계획 제목"
              class="mb-2"
              required
            ></b-form-input>
            <b-list-group-item v-for="(item, index) in myPlanItems" :key="index">
              <!-- 내용 출력 -->
              <b-form-group>
                <b-form-timepicker
                  v-model="timeValues[index]"
                  size="sm"
                  locale="en"
                  placeholder="Select time"
                  required
                ></b-form-timepicker>
              </b-form-group>
              <div class="m-2">
                {{ item.title }}
              </div>
              <div style="text-align: end">
                <b-button size="sm" variant="outline-danger" @click="removeMyPlan(item)"
                  >삭제</b-button
                >
              </div>
            </b-list-group-item>
            <b-button class="m-2" type="submit" variant="primary" block>일정 등록</b-button>
          </b-form>
        </b-list-group>
      </div>
    </b-sidebar>
    <b-container>
      <b-modal v-model="showModalSuccess" title="🚄Trip Plan" @ok="resetMyplan" ok-only>
        <p class="my-4">
          계획 등록 성공!😉<br /><br />
          마이페이지에서 확인하세요!
        </p>
      </b-modal>
      <b-modal v-model="showModalFail" title="🚄Trip Plan" @ok="dismissFailModal" ok-only>
        <p class="my-4">
          계획 등록 실패!😥 <br /><br />
          {{ ModalFailMessage }}
        </p>
      </b-modal>
      <h2 class="mt-4">나만의 여행 계획</h2>
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
        <b-button type="submit" variant="primary" class="mb-2 mr-sm-2 mb-sm-0">검색</b-button>
        <b-button variant="secondary" v-b-toggle.sidebar-1>일정</b-button>
      </b-form>
      <!--form  end-->

      <div class="row w-100 mt-4">
        <!-- kakao map start -->
        <div style="width: 700px; height: 700px">
          <KaKaoMap :markerItems="this.markers" />
        </div>
        <!-- kakao map end -->
        <div class="col">
          <h2>관광지 목록</h2>
          <plan-items :plan-items="planItems"></plan-items>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/httpDefault.js";
import PlanItems from "@/components/PlanItems.vue";
import KaKaoMap from "@/components/KaKaoMap.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MyPlanView",
  components: {
    PlanItems,
    KaKaoMap,
  },
  data() {
    return {
      planItems: [],
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
      timeValues: [],
      showSidebar: false,
      dataSuccess: null,
      showModalSuccess: false,
      showModalFail: false,
      ModalFailMessage: null,
      maxIndex: 0,
      planName: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    myPlanItems() {
      this.openSidebar();
      return this.$store.state.MY_PLAN;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      http.post(`/attraction/search`, JSON.stringify(this.form)).then((response) => {
        // 받아온 데이터를 가공하여 tripItems에 할당
        this.tripItems = response.data;
        let marks = [];

        for (let i = 0; i < response.data.length; i++) {
          let a = response.data[i].latitude;
          let b = response.data[i].longitude;
          this.markers.push([a, b]);
        }

        // 받아온 데이터를 가공하여 tripItems에 할당
        this.planItems = response.data;
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.sido_code = 0;
      this.form.content_type_id = 0;
      this.form.search_keyword = "";
    },
    removeMyPlan(item) {
      const index = this.$store.state.MY_PLAN.indexOf(item);
      this.$store.commit("removeMyPlan", index);
    },
    checkPlanZero(event) {
      event.preventDefault();
      console.log(this.$store.state.MY_PLAN.length);
      if (this.$store.state.MY_PLAN.length != 0) {
        this.checkMaxIndex();
      }
      if (this.$store.state.MY_PLAN.length === 0) {
        this.ModalFailMessage = "일정을 추가해 주세요!";
        this.showModalFail = true;
      }
    },
    checkMaxIndex() {
      //몇 번째 plan이 마지막인지 -> index를 증가시키려고
      http
        .get(`/attraction/myplan/maxindex`)
        .then(({ data }) => {
          this.onSubmitMyPlan(data + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSubmitMyPlan(index) {
      const promises = [];
      for (let current = 0; current < this.$store.state.MY_PLAN.length; current++) {
        const myPlanData = {
          planId: index,
          planName: this.planName,
          contentId: this.$store.state.MY_PLAN[current].content_id,
          title: this.$store.state.MY_PLAN[current].title,
          time: this.timeValues[current],
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
        };

        console.log(myPlanData);

        const promise = http
          .post(`/attraction/myplan/write`, JSON.stringify(myPlanData))
          .then(({ data }) => {
            return data;
          });
        promises.push(promise);
        if (this.dataSuccess === "success") {
          //모달창 띄우고, store에 마이플랜값 삭제
          this.showModalSuccess = true;
        }
        if (this.dataSuccess === "fail") {
          this.showModalFail = true;
        }
      }
      Promise.all(promises)
        .then((results) => {
          const allSuccess = results.every((result) => result === "success");

          if (allSuccess) {
            this.showModalSuccess = true;
          } else {
            this.showModalFail = true;
          }
        })
        .catch((error) => {
          console.error(error);
          this.ModalFailMessage = "다시 작성해 주세요!";
          this.showModalFail = true;
        });
    },
    openSidebar() {
      this.showSidebar = true;
    },
    resetMyplan() {
      //state에 있는 계획 전부 삭제
      const length = this.$store.state.MY_PLAN.length;
      for (let index = 0; index < length; index++) {
        this.$store.commit("removeMyPlan", 0);
      }
      //timepicker 값 전부 삭제
      this.timeValues = [];
      //planName 값 삭제
      this.planName = null;
    },
    dismissFailModal() {
      this.dismissFailModal = false;
    },
  },
};
</script>
<style></style>
