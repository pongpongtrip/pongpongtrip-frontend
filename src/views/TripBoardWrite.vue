<template>
  <div>
    <!-- ======= Header ======= -->
    <header>
      <div><!-- Include your header content here --></div>
    </header>

    <main id="main" class="pt-5">
      <b-container>
        <div class="col justify-content-center">
          <div class="col pt-3 text-center text-decoration-underline">
            <h4>글쓰기</h4>
          </div>

          <div class="row justify-content-center">
            <b-form @submit.prevent="submitForm" id="form-register" enctype="multipart/form-data">
              <!-- <input type="hidden" name="pgno" v-model="pgno" />
                <input type="hidden" name="key" v-model="key" />
                <input type="hidden" name="word" v-model="word" /> -->
              <b-form-group id="subjectGroup" label="제목 : " label-for="subject">
                <b-form-input
                  id="subject"
                  v-model="form.subject"
                  placeholder="제목..."
                ></b-form-input>
              </b-form-group>

              <!-- 카드 스와이퍼 -->
              <h4 style="text-align: left" v-if="plan.length > 0">공유할 계획</h4>
              <swiper class="swiper travel-plan-swiper" :options="swiperOption">
                <swiper-slide v-for="place in plan" :key="place.content_id">
                  <b-card
                    :title="place.title"
                    :img-src="place.first_image"
                    :img-alt="place.imgAlt"
                    img-top
                    tag="article"
                    style="width: 12rem"
                    class="mb-2 card"
                  >
                    <b-card-text class="writeText time">{{ place.time }}</b-card-text>
                    <b-card-text class="writeText">{{ place.addr1 }}</b-card-text>
                    <b-button
                      @click="openModal(place)"
                      variant="primary"
                      class="go-button"
                      id="btn_primary"
                      >자세히 보기</b-button
                    >
                  </b-card>
                </swiper-slide>

                <!-- 이전(prev) 및 다음(next) 버튼 -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>

              <b-form-group id="contentGroup" label="내용 : " label-for="content">
                <b-form-textarea id="content" v-model="form.content" rows="7"></b-form-textarea>
              </b-form-group>

              <b-form-group id="fileGroup" label="파일 : " label-for="file">
                <b-form-file id="upfile" v-model="form.upfile" multiple></b-form-file>
              </b-form-group>
              <div class="col-auto text-center">
                <b-button type="submit" variant="outline-primary" class="mb-3"> 글쓰기 </b-button>
                <b-button variant="outline-danger" class="mb-3" @click="goToList">
                  목록으로 이동...
                </b-button>
              </div>
            </b-form>
          </div>
        </div>
        <!-- <form id="form-param" method="get" action="">
            <input type="hidden" id="pgno" name="pgno" v-model="pgno" />
            <input type="hidden" id="key" name="key" v-model="key" />
            <input type="hidden" id="word" name="word" v-model="word" />
          </form> -->
      </b-container>
    </main>

    <b-modal v-model="modalOpen" @hidden="closeModal" size="lg" dialog-class="custom-modal">
      <template #modal-title>{{ selectedCard.title }}</template>
      <template #default>
        <img :src="selectedCard.first_image" :alt="selectedCard.imgAlt" style="max-width: 100%" />
        <p>주소: {{ selectedCard.addr1 }}</p>
        <p>전화번호: {{ selectedCard.telname }}</p>
        <p>{{ selectedCard.overview }}</p>
        <KaKaoMap ref="kakaoMap" :marker-items="markers" />
      </template>
    </b-modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import http from "@/api/httpDefault.js";
import KaKaoMap from "@/components/KaKaoMap.vue";

export default {
  name: "boardWrite",
  components: {
    Swiper,
    SwiperSlide,
    KaKaoMap,
  },
  data() {
    return {
      title: "",
      plan: [],

      modalOpen: false,
      selectedCard: null,

      form: {
        userId: null,
        subject: "",
        content: "",
        plan: null,
        upfile: "",
      },
      message: "",
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  created() {
    if (this.$route.params.length > 0) {
      this.title = this.$route.params.plan.name;
      this.plan = this.$route.params.plan.places;
    }

    console.log(this.title);

    this.form.content = "";
    const plan2 = {
      planName: this.title,
      planInfo: this.plan,
    };
    this.form.plan = JSON.stringify(plan2);

    this.plan.forEach((item) => {
      console.log(item.time + " " + item.title + "\n");
      this.form.content += item.time + " " + item.title + "\n";
    });
  },
  mounted() {},
  methods: {
    submitForm: function (event) {
      event.preventDefault();
      console.log(this.form.subject);
      console.log(this.form.content);
      console.log(this.form.upfile);

      this.form.userId = this.$store.state.memberStore.userInfo.userId;

      console.log(this.form);
      http.post(`/board/write`, JSON.stringify(this.form)).then((response) => {
        console.log(response.data);
        this.$router.push("/tripboard").catch(() => {
          console.log("화면 이동 에러");
        });
      });
    },
    goToList: function () {
      this.$router.push("/tripboard").catch(() => {
        console.log("화면 이동 에러");
      });
    },
    openModal(card) {
      console.log(card);
      this.selectedCard = card;

      this.modalOpen = true;
      this.markers = [[card.latitude, card.longitude]];
      console.log(this.markers);

      // console.log("선택한 카드 인덱스:", index);
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

<style scoped>
.swiper {
  width: 100%;
  max-height: 600px; /* Set the maximum height of the swiper container */
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  padding: 10px;
  max-width: 20rem; /* Set the maximum width of each card */
  margin: 0 auto; /* Center the cards horizontally */
  box-sizing: border-box; /* Include padding and border in the width */
}

.card-body {
  display: flex;
  flex-direction: column;
  height: 220px;
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

.writeText {
  font-size: 10px; /* Set the desired font size for the card content */
}
#form-register {
  width: 60%;
}
button {
  margin: 2px;
}
</style>
