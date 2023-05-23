<template>
    <div>
      <header></header>
      <main id="main" class="pt-5">
        <div class="container">
          <div class="col justify-content-center">
            <div class="col pt-3 text-center text-decoration-underline">
              <h4>상세보기</h4>
            </div>
            <div class="col">
              <div class="row my-2">
                <h2 class="text-secondary px-5">{{ article.articleNo }}. {{ article.subject }}</h2>
              </div>
              <div class="col">
                <div class="col-md-8">
                  <div class="row">
                    <b-avatar
                      class="me-2 float-md-start bg-light p-2"
                      :src="avatarSrc"
                      alt="Avatar"
                    ></b-avatar>
                    
                    <p class="userId fw-bold">{{ article.userId }}</p> <br />
                    
                  </div>
                </div>
                <p class="right text-secondary fw-light">{{ article.registerTime }} 조회: {{ article.hit }}</p>
  <!--               <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
                <hr class="mb-3" />

                <!-- 카드 스와이퍼 -->
                <h4 style="text-align:left;">공유할 계획</h4>
                <swiper class="swiper travel-plan-swiper" :options="swiperOption">
                  <swiper-slide v-for="place in plan" :key="place.content_id">
                    <b-card
                      :title="place.title"
                      :img-src="place.first_image"
                      :img-alt="place.imgAlt"
                      img-top
                      tag="article"
                      style="width: 18rem"
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


                <div class="content text-secondary">
                  <!-- 줄 바꿈 적용 코드 -->
                  <div v-for="el in article.content.split('\n')" :key="el"> {{ el }} <br /></div>
                </div>
                <div v-if="article.fileInfos" class="mt-3">
                  <ul>
                    <li class="row justify-content-start" v-for="file in article.fileInfos" :key="file.originalFile">
                      {{ file.originalFile }} <a :href="fileDownloadLink(file.saveFolder, file.originalFile, file.saveFile)">[다운로드]</a>
                    </li>
                  </ul>
                </div>
                <hr class="mt-3 mb-3" />
                <div class="d-flex justify-content-end">
                  <b-button @click="goToList" variant="outline-primary" class="mb-3">글목록</b-button>
                  <template v-if="isCurrentUserArticleOwner">
                    <b-button @click="goToModify" variant="outline-success" class="mb-3 ms-1">글수정</b-button>
                    <b-button @click="confirmDelete" variant="outline-danger" class="mb-3 ms-1">글삭제</b-button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    name: "boardDeatil",
    components: {
      Swiper,
      SwiperSlide,
      KaKaoMap,
    },
    props: {
          detail: {
            type: Array,
        }
    },
    data() {
      return {
        plan: [],
        modalOpen: false,
        selectedCard: null,
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
        article: {  // Replace with your article object
          articleNo: 1,
          subject: 'Sample Subject',
          userId: 'john123',
          registerTime: '2023-05-18',
          hit: 10,
          content: 'Sample content',
          fileInfos: [
            { originalFile: 'file1.pdf', saveFolder: 'folder1', saveFile: 'file1-123456789.pdf' },
            { originalFile: 'file2.pdf', saveFolder: 'folder2', saveFile: 'file2-987654321.pdf' },
          ],
        },
        userinfo: {  // Replace with your user info object
          userId: 'john123',
        },
      };
    },
    created() {
        console.log(this.$store.articleNo);
        http
              .get("/board/view", {params: {
					articleNo:this.$store.state.articleNo,
				}})
              .then((response) => {
                  console.log(response.data);
                  this.article.articleNo = response.data.articleNo;
                  this.article.subject = response.data.subject;
                  this.article.userId = response.data.userId;
                  this.article.registerTime = response.data.registerTime;
                  this.article.hit = response.data.hit;
                  this.article.content = response.data.content;
                  this.article.fileInfos = response.data.fileInfos;

                  this.userinfo.userId = response.data.userId;
                  this.plan = JSON.parse(response.data.plan);

                  console.log(this.plan);
              });
    },
    computed: {
      avatarSrc() {
        return 'https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg';
      },
      isCurrentUserArticleOwner() {
        return this.userinfo.userId === this.article.userId;
      },
    },
    methods: {
      fileDownloadLink(saveFolder, originalFile, saveFile) {
        return `${this.root}/file/download/${saveFolder}/${originalFile}/${saveFile}`;
      },
      goToList() {
            this.$router.push("/tripboard").catch(() => { });
      },
      goToModify() {
        this.$router.push("/tripboard/modify").catch(() => { });
      },
      confirmDelete() {
        if (confirm('정말 삭제하시겠습니까?')) {
            http
                .get("/board/delete", {
                    params: {
                        articleNo:this.article.articleNo,
                    }
                })
                .then((response) => { 
                    console.log(response.data);
                    this.$router.push('/tripboard').catch(() => { });
                });
        }
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
  .userId {
    text-align: left;
  }
  .content {
    text-align: left;
  }

  .right {
    text-align: right;
  }

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