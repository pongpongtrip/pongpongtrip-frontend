<template>
  <div class="hotplace">
    <h2 class="mt-4">핫 플레이스</h2>
    <b-container>
      <b-form inline class="justify-content-md-center" @submit="onSubmit">
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
      <div class="card-row">
        <b-card
          v-for="(card, index) in visibleCards"
          :key="index"
          :title="card.title"
          :img-src="card.first_image"
          :img-alt="card.imgAlt"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2 card"
        >
          <b-card-text>{{ card.addr1 }}</b-card-text>
          <div
            class="icon-container"
            :class="{ active: card.currentIcon === 'heart-fill' }"
            @click="toggleIcon(card)"
          >
            <b-icon :icon="card.currentIcon" :color="card.iconColor" class="heart-icon"></b-icon>
            <b-icon icon="heart-fill" color="pink" class="heart-fill-icon"></b-icon>
          </div>
          <b-button @click="openModal(card, index)" variant="primary" class="go-button"
            >자세히 보기</b-button
          >
        </b-card>
      </div>
      <b-modal
        v-model="modalOpen"
        @hidden="closeModal"
        size="xl"
        dialog-class="hotplace_custom-modal"
      >
        <template #modal-title>
          <h5 class="hotplace_modal-title mb-0" id="hotplace_modal_title">
            {{ selectedCard.title }}
          </h5></template
        >
        <template #default>
          <div class="hotplace_card">
            <b-row>
              <b-col sm="7">
                <b-img
                  thumbnail
                  fluid
                  :src="selectedCard.first_image"
                  :alt="selectedCard.imgAlt"
                  id="hotplace_img"
                ></b-img>
              </b-col>
              <b-col sm="5" id="hotplace_card_right">
                <div style="height: 300px">
                  <KaKaoMap ref="kakaoMap" :marker-items="markers" />
                </div>
                <div class="ml-4 mt-4" id="modal_cardContent">
                  <div class="col-md-1"></div>
                  <div id="hotplace_card_title">{{ selectedCard.title }}</div>
                  <div class="mt-2">주소 : {{ selectedCard.addr1 }}</div>
                </div>
              </b-col>
            </b-row>
            <div class="mt-4">
              <div id="hotplace_card_content">정보</div>
              <b-form-textarea
                v-model="selectedCard.overview"
                debounce="500"
                rows="3"
                max-rows="8"
                class="mt-2"
              ></b-form-textarea>
            </div>
          </div>
        </template>
      </b-modal>
    </b-container>
    <div class="spinner-container" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import http from "@/api/httpDefault.js";
import Vue from "vue";
import KaKaoMap from "@/components/KaKaoMap.vue";

export default {
  components: {
    KaKaoMap,
  },
  data() {
    return {
      loading: true,

      visibleCount: 9,
      visibleCards: [],

      modalOpen: false,
      selectedCard: null,
      // markers: [],
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
      cards: [
        // {
        //   title: "Card Title 1",
        //   imgSrc: "https://picsum.photos/600/300/?image=25",
        //   imgAlt: "Image",
        //   content:
        //     "123",
        //   currentIcon: "heart",
        // },
      ],
    };
  },
  created() {
    http.post("/attraction/hotplace").then((response) => {
      this.cards = response.data;

      this.cards.forEach((item) => {
        if (item.first_image === "") {
          console.log("이미지 없음");
          item.first_image = require("../assets/logo1.png");
        }
        item.imgAlt = require("../assets/logo1.png");
        item.currentIcon = "heart";
      });

      this.updateVisibleCards();
      this.loading = false;
    });
  },

  mounted() {
    // this.arrangeCards();
    // window.addEventListener("resize", this.arrangeCards);
    window.addEventListener("scroll", this.loadMoreCards);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.arrangeCards);
    window.removeEventListener("scroll", this.loadMoreCards);
  },
  methods: {
    arrangeCards() {
      const cardRow = document.querySelector(".card-row");
      if (cardRow) {
        const cards = Array.from(cardRow.querySelectorAll(".card"));
        cards.forEach((card, index) => {
          const rowIndex = Math.floor(index / 3);
          card.style.order = rowIndex;
        });
      }
    },
    updateVisibleCards() {
      this.visibleCards = this.cards.slice(0, this.visibleCount);
      console.log(this.visibleCards);
    },
    loadMoreCards() {
      console.log("scroll");
      console.log(this.visibleCards.length);
      const windowScrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 스크롤이 페이지 맨 아래 또는 가까이에 도달했을 때
      if (windowScrollY + windowHeight + 130 >= documentHeight) {
        // 더 많은 카드를 보여줄 수 있는지 확인
        if (this.visibleCount + 3 <= this.cards.length) {
          this.visibleCount += 3;
          this.updateVisibleCards();
        } else {
          // 모든 카드를 보여줌
          this.visibleCount = this.cards.length;
          this.updateVisibleCards();
        }
      }
    },
    toggleIcon(card) {
      // card.currentIcon = card.currentIcon === 'heart' ? 'heart-fill' : 'heart';
      // card.iconColor = card.currentIcon === 'heart-fill' ? 'pink' : 'black';
      // this.$forceUpdate();
      if (card.currentIcon === "heart") {
        Vue.set(card, "currentIcon", "heart-fill");
        Vue.set(card, "iconColor", "pink");
        console.log(this.$store.state.memberStore.userInfo.userId);
        console.log(card.content_id);
        console.log("좋아요 등록");
        http
          .post(
            "/attraction/like",
            JSON.stringify({
              user_id: this.$store.state.memberStore.userInfo.userId,
              content_id: card.content_id,
            })
          )
          .then((response) => {
            console.log(response.data);
          });
      } else {
        Vue.set(card, "currentIcon", "heart");
        Vue.set(card, "iconColor", "black");
        console.log(card);
        console.log("좋아요 해제");

        http
          .post(
            "/attraction/dislike",
            JSON.stringify({
              user_id: this.$store.state.memberStore.userInfo.userId,
              content_id: card.content_id,
            })
          )
          .then((response) => {
            console.log(response.data);
          });
      }
    },

    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      http.post(`/attraction/hotplace/search`, JSON.stringify(this.form)).then((response) => {
        console.log(response.data);

        // 받아온 데이터를 가공하여 tripItems에 할당
        this.hotItems = response.data;

        this.cards = response.data;

        this.cards.forEach((item) => {
          if (item.first_image === "") {
            console.log("이미지 없음");
            item.first_image = require("../assets/logo1.png");
          }
          item.imgAlt = require("../assets/logo1.png");
          item.currentIcon = "heart";
        });

        this.updateVisibleCards();
      });
    },

    openModal(card, index) {
      console.log(card);
      this.selectedCard = card;

      this.modalOpen = true;
      this.markers = [[card.latitude, card.longitude]];
      console.log(this.markers);

      console.log("선택한 카드 인덱스:", index);
    },

    closeModal() {
      this.modalOpen = false;
      this.markers = [];
      this.selectedCard = null;
      const kakaoMapComponent = this.$refs.kakaoMap;
      if (kakaoMapComponent) {
        // kakaoMapComponent을 사용하여 초기화 작업 수행
        kakaoMapComponent.init();
      }
    },
  },
};
</script>

<style>
.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex-basis: calc(33.33% - 1rem);
  margin: 0.5rem;
}

.card img {
  width: 100%;
  height: 200px; /* Adjust the desired height */
  object-fit: cover; /* Maintain aspect ratio and cover the container */
}

.card-body {
  display: flex;
  flex-direction: column;
  /* height: 220px; */
}

.card-title {
  font-size: 14pt;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body .time {
  margin-top: auto !important;
}

.card .card-text {
  font-size: 14px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
}

.icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.icon-container .heart-icon {
  font-size: 22px;
  transition: color 0.3s ease-out;
}

.icon-container .heart-fill-icon {
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 30px;
  transform: scale(0);
  transition: transform 0.3s ease-out;
}

.icon-container.active .heart-icon {
  color: transparent;
}

.icon-container.active .heart-fill-icon {
  transform: scale(1);
}

.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 10px;
}

.card-text {
  margin-bottom: 1rem;
}

.go-button {
  z-index: 1;
}
.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#modal_cardContent {
  padding-left: 15px;
}

@font-face {
  font-family: "NanumSquareNeo-Variable";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

.hotplace_card,
.hotplace_modal-title {
  font-family: "NanumSquareNeo-Variable";
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#hotplace_card_title,
#hotplace_modal_title,
#hotplace_card_content {
  font-weight: bold;
}

#hotplace_img {
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
#hotplace_card_right {
  padding: 10px;
}
</style>
