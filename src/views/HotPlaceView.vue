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
            <b-icon
              :icon="card.currentIcon"
              :color="card.iconColor"
              class="heart-icon"
            ></b-icon>
            <b-icon
              icon="heart-fill"
              color="pink"
              class="heart-fill-icon"
            ></b-icon>
          </div>
          <b-button @click="openModal" variant="primary" class="go-button">자세히 보기</b-button>
          <div :class="{'custom-overlay': modalVisible}">
            <ModalComponent :modalVisible="modalVisible" @close-modal="closeModal" />
          </div>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/httpDefault.js";
import Vue from 'vue';
import ModalComponent from '@/components/AttractionModal.vue'

export default {
  components: {
    ModalComponent,
  },
  data() {
    return {
      visibleCount: 9,
      visibleCards: [],
      modalVisible: false,
      form: {
				sido_code: 0,
				content_type_id: 0,
        search_keyword: '',
			},
			sido_codes: [
				{ text: '검색 할 지역 선택', value: 0 },
				{ text: '서울', value: 1 },
				{ text: '인천', value: 2 },
				{ text: '대전', value: 3 },
				{ text: '대구', value: 4 },
				{ text: '광주', value: 5 },
				{ text: '부산', value: 6 },
				{ text: '울산', value: 7 },
				{ text: '세종특별자치시', value: 8 },
				{ text: '경기도', value: 31 },
				{ text: '강원도', value: 32 },
				{ text: '충청북도', value: 33 },
				{ text: '충청남도', value: 34 },
				{ text: '경상북도', value: 35 },
				{ text: '경상남도', value: 36 },
				{ text: '전라북도', value: 37 },
				{ text: '전라남도', value: 38 },
				{ text: '제주도', value: 39 },
			],
			content_type_ids: [
				{ text: '관광지 유형', value: 0 },
				{ text: '관광지', value: 12 },
				{ text: '문화시설', value: 14 },
				{ text: '축제공연행사', value: 15 },
				{ text: '여행코스', value: 25 },
				{ text: '레포츠', value: 28 },
				{ text: '숙박', value: 32 },
				{ text: '쇼핑', value: 38 },
				{ text: '음식점', value: 39 },
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
    http
      .post("/attraction/hotplace")
      .then((response) => {
        this.cards = response.data;
        
        this.cards.forEach(item => {
          if (item.first_image === ""){
            console.log("이미지 없음");
            item.first_image = "https://picsum.photos/600/300/?image=25";
          }
          item.imgAlt = "https://picsum.photos/600/300/?image=25";
          item.currentIcon = "heart";
        });


        this.updateVisibleCards();
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
      console.log(this.visibleCards.length  )
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
      if (card.currentIcon === 'heart') {
        Vue.set(card, 'currentIcon', 'heart-fill');
        Vue.set(card, 'iconColor', 'pink');
      } else {
        Vue.set(card, 'currentIcon', 'heart');
        Vue.set(card, 'iconColor', 'black');
      }
    },

    onSubmit(event) {
			event.preventDefault();
			alert(JSON.stringify(this.form));
			http
				.post(`/attraction/hotplace/search`, JSON.stringify(this.form))
				.then((response) => {
					console.log(response.data);

					// 받아온 데이터를 가공하여 tripItems에 할당
					this.hotItems = response.data;
					
          this.cards = response.data;
        
          this.cards.forEach(item => {
            if (item.first_image === ""){
              console.log("이미지 없음");
              item.first_image = "https://picsum.photos/600/300/?image=25";
            }
            item.imgAlt = "https://picsum.photos/600/300/?image=25";
            item.currentIcon = "heart";
          });


          this.updateVisibleCards();
				});
		},
    openModal() {
      this.modalVisible = true;
      document.body.classList.add("modal-open"); // 흐림 효과를 위한 클래스 추가
    },
    closeModal() {
      this.modalVisible = false;
      document.body.classList.remove("modal-open"); // 흐림 효과를 위한 클래스 제거
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

.modal-open {
  /* 흐림 효과 스타일 설정 */
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
