<template>
    <div class="container">
      <h3 class="title">내가 좋아요 누른 장소</h3>
  
      <swiper class="swiper full-screen" :options="swiperOption">
        <swiper-slide v-for="card in cards" :key="card.content_id">
          <b-card 
            :title="card.title" 
            :img-src="card.first_image"
            :img-alt="card.imgAlt"
            img-top
            tag="article"
            style="width: 20rem"
            class="mb-2 card"
            >
            <b-card-text>{{ card.addr1 }}</b-card-text>
              <div
                class="icon-container"
                :class="{ active: card.currentIcon === 'heart-fill' }"
                @click="toggleIcon(card)"
              >
                <b-icon
                  icon="heart-fill"
                  color="pink"
                  class="heart-fill-icon"
                ></b-icon>
                <b-icon
                  :icon="card.currentIcon"
                  :color="card.iconColor"
                  class="heart-icon"
                ></b-icon>
                
            </div>
            <b-button @click="openModal(card)" variant="primary" class="go-button">자세히 보기</b-button>
          </b-card>
        </swiper-slide>
  
        <!-- 이전(prev) 및 다음(next) 버튼 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
  
        <!-- 추가 설정 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  
      <h3 class="title">나의 여행 계획</h3>
      <ul class="travel-plans">
        <li v-for="plan in travelPlans" :key="plan.id" class="travel-plan">
          <!-- <h4>{{ plan.destination }}</h4> -->
          <swiper class="swiper travel-plan-swiper" :options="planSwiperOption">
            <swiper-slide v-for="place in plan.places" :key="place.content_id">
              <b-card 
                :title="place.title" 
                :img-src="place.first_image"
                :img-alt="place.imgAlt"
                img-top
                tag="article"
                style="width: 20rem"
                class="mb-2 card"
                >
                <b-card-text>{{ place.time }}</b-card-text>
                <b-card-text>{{ place.addr1 }}</b-card-text>
                <b-button @click="openModal(place)" variant="primary" class="go-button">자세히 보기</b-button>
              </b-card>
            </swiper-slide>
  
            <!-- 이전(prev) 및 다음(next) 버튼 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
  
            <!-- 추가 설정 -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </li>
      </ul>
      <b-modal v-model="modalOpen" @hidden="closeModal" size="lg" dialog-class="custom-modal">
        <template #modal-title>{{ selectedCard.title }}</template>
        <template #default>
          <img :src="selectedCard.first_image" :alt="selectedCard.imgAlt" style="max-width: 100%">
          <p>주소: {{ selectedCard.addr1 }}</p>
          <p>전화번호: {{ selectedCard.telname }}</p>
          <p>{{ selectedCard.overview }}</p>
          <KaKaoMap ref="kakaoMap" :marker-items="markers"/>
        </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css';
  import http from '@/api/httpDefault.js';
  import Vue from 'vue';
  import KaKaoMap from "@/components/KaKaoMap.vue";
  
  
  export default {
    data() {
      return {
        idx: 1,
        modalOpen: false,
        selectedCard: null,
        cards: [],
        travelPlans: [
        // {
        //   id: 1,
        //   destination: '여행 1',
        //   places: [
        //     {
        //       id: 1,
        //       name: "여행 1의 장소 1",
        //       description: "이곳은 여행 1의 장소 1입니다."
        //     },
        //     {
        //       id: 2,
        //       name: "여행 1의 장소 2",
        //       description: "이곳은 여행 1의 장소 2입니다."
        //     },
        //     {
        //       id: 3,
        //       name: "여행 1의 장소 3",
        //       description: "이곳은 여행 1의 장소 3입니다."
        //     },
        //   ]
        // },
        // {
        //   id: 2,
        //   destination: '여행 2',
        //   places: [
        //     {
        //       id: 4,
        //       name: "여행 2의 장소 1",
        //       description: "이곳은 여행 2의 장소 1입니다."
        //     },
        //     {
        //       id: 5,
        //       name: "여행 2의 장소 2",
        //       description: "이곳은 여행 2의 장소 2입니다."
        //     },
        //   ]
        // },
        // {
        //   id: 3,
        //   destination: '여행 3',
        //   places: [
        //     {
        //       id: 6,
        //       name: "여행 3의 장소 1",
        //       description: "이곳은 여행 3의 장소 1입니다."
        //     },
        //     {
        //       id: 7,
        //       name: "여행 3의 장소 2",
        //       description: "이곳은 여행 3의 장소 2입니다."
        //     },
        //     {
        //       id: 8,
        //       name: "여행 3의 장소 3",
        //       description: "이곳은 여행 3의 장소 3입니다."
        //     },
        //     {
        //       id: 9,
        //       name: "여행 3의 장소 4",
        //       description: "이곳은 여행 3의 장소 4입니다."
        //         },
        //         {
        //       id: 9,
        //       name: "여행 3의 장소 4",
        //       description: "이곳은 여행 3의 장소 4입니다."
        //         },
        //         {
        //       id: 9,
        //       name: "여행 3의 장소 4",
        //       description: "이곳은 여행 3의 장소 4입니다."
        //         },
        //         {
        //       id: 9,
        //       name: "여행 3의 장소 4",
        //       description: "이곳은 여행 3의 장소 4입니다."
        //     },
        //   ]
        // },
      ],
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        planSwiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      };
    },
    components: {
      Swiper,
      SwiperSlide,
      KaKaoMap,
    },
    created(){
      // 선택한 hot place
      http
      .post('/attraction/myhotplace', JSON.stringify({
            user_id: this.$store.state.memberStore.userInfo.userId,
          }))
      .then((response) =>{
        console.log(response.data);
        this.cards = response.data;
        
        this.cards.forEach(item => {
          if (item.first_image === ""){
            console.log("이미지 없음");
            item.first_image = require("../../assets/logo1.png");
          }
          item.imgAlt = require("../../assets/logo1.png");
          item.currentIcon = "heart-fill";
        });
        console.log(this.cards);
      })

      // 여행계획
      http
      .post('/attraction/myplans', JSON.stringify({
            userId: this.$store.state.memberStore.userInfo.userId,
          }))
      .then((response) =>{
        console.log(response.data);

        let currentPlan = null; // 현재 계획
        this.travelPlans = []; // travelPlans 초기화

        response.data.forEach((item) => {
          console.log(item.planId);
          const planId = item.planId;
          const placeInfo = item;
          if (item.first_image === ""){
            console.log("이미지 없음");
            item.first_image = require("../../assets/logo1.png");
          }
          if (currentPlan && currentPlan.id === planId) {
            // 현재 계획과 plan_id가 같은 경우 places에 정보 추가
            
            currentPlan.places.push(placeInfo);
          } else {
            if (currentPlan !== null) {
              console.log("inin");
              this.travelPlans.push(currentPlan);
            }
            currentPlan = {
              id: planId,
              places: [placeInfo],
            };
          }
        });

        if (currentPlan !== null) {
          this.travelPlans.push(currentPlan);
        }

        console.log(this.travelPlans);

            
      })
    },
    methods: {
      viewDetails(plan) {
        // 여행 계획 상세보기 동작
        console.log('View details:', plan);
        // 필요한 동작 수행
      },

      toggleIcon(card) {
        if (card.currentIcon === 'heart') {
          // 좋아요 등록
          http
            .post("/attraction/like", JSON.stringify({
              user_id: this.$store.state.memberStore.userInfo.userId,
              content_id: card.content_id,
            }))
            .then((response) => {
              console.log(response.data);

              // 서버 응답을 받은 후 cards 배열 업데이트
              const updatedCards = this.cards.map((c) => {
                if (c.content_id === card.content_id) {
                  // 선택한 카드의 상태 변경
                  return {
                    ...c,
                    currentIcon: 'heart-fill',
                    iconColor: 'pink',
                  };
                }
                return c;
              });

              this.cards = updatedCards;
            });
        } else {
          // 좋아요 해제
          http
            .post("/attraction/dislike", JSON.stringify({
              user_id: this.$store.state.memberStore.userInfo.userId,
              content_id: card.content_id,
            }))
            .then((response) => {
              console.log(response.data);

              // 서버 응답을 받은 후 cards 배열 업데이트
              const updatedCards = this.cards.map((c) => {
                if (c.content_id === card.content_id) {
                  // 선택한 카드의 상태 변경
                  return {
                    ...c,
                    currentIcon: 'heart',
                    iconColor: 'black',
                  };
                }
                return c;
              });

              this.cards = updatedCards;
            });
        }
      },
      openModal(card) {
      console.log(card);
      this.selectedCard = card;
      
      this.modalOpen = true;
      this.markers = [[card.latitude, card.longitude ]];
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
    
  }
  </script>
  
  <style>

  .title {
    margin-top: 4%;
  }
  .container {
    margin: 0 10%;
  }
  
  .full-screen {
    width: 80%;
    margin: 0 auto;
  }
  
  .travel-plan {
    margin-bottom: 30px;
    width: 100%;
    margin-right: 20px;
  }
  
  .travel-plan:last-child {
    margin-right: 0;
  }
  
  .swiper {
    width: 100%;
    height: 500px;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    padding: 10px;
  }
  
  .travel-plans {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  .card {
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .btn-primary {
    display: inline-block;
    margin-top: 10px;
  }
  </style>
  