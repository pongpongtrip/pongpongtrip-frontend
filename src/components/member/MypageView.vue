<template>
    <div class="container">
      <h3 class="title">내가 좋아요 누른 장소</h3>
  
      <swiper class="swiper full-screen" :options="swiperOption">
        <swiper-slide v-for="place in hotPlaces" :key="place.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ place.name }}</h5>
              <p class="card-text">{{ place.description }}</p>
              <a href="#" class="btn btn-primary">자세히 보기</a>
            </div>
          </div>
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
          <h4>{{ plan.destination }}</h4>
          <swiper class="swiper travel-plan-swiper" :options="planSwiperOption">
            <swiper-slide v-for="place in plan.places" :key="place.id">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ place.name }}</h5>
                  <p class="card-text">{{ place.description }}</p>
                  <a href="#" class="btn btn-primary">자세히 보기</a>
                </div>
              </div>
            </swiper-slide>
  
            <!-- 이전(prev) 및 다음(next) 버튼 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
  
            <!-- 추가 설정 -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css';
  
  export default {
    data() {
      return {
        hotPlaces: [
            {
                id: 1,
                name: "핫플레이스 1",
                description: "이곳은 핫플레이스 1의 설명입니다."
            },
            {
                id: 2,
                name: "핫플레이스 2",
                description: "이곳은 핫플레이스 2의 설명입니다."
            },
            {
                id: 3,
                name: "핫플레이스 3",
                description: "이곳은 핫플레이스 3의 설명입니다."
            },
            {
                id: 4,
                name: "핫플레이스 4",
                description: "이곳은 핫플레이스 4의 설명입니다."
            },
            {
                id: 5,
                name: "핫플레이스 5",
                description: "이곳은 핫플레이스 5의 설명입니다."
            },
            {
                id: 5,
                name: "핫플레이스 6",
                description: "이곳은 핫플레이스 5의 설명입니다."
            },
            {
                id: 5,
                name: "핫플레이스 7",
                description: "이곳은 핫플레이스 5의 설명입니다."
            },
        ],
        travelPlans: [
        {
          id: 1,
          destination: '여행 1',
          places: [
            {
              id: 1,
              name: "여행 1의 장소 1",
              description: "이곳은 여행 1의 장소 1입니다."
            },
            {
              id: 2,
              name: "여행 1의 장소 2",
              description: "이곳은 여행 1의 장소 2입니다."
            },
            {
              id: 3,
              name: "여행 1의 장소 3",
              description: "이곳은 여행 1의 장소 3입니다."
            },
          ]
        },
        {
          id: 2,
          destination: '여행 2',
          places: [
            {
              id: 4,
              name: "여행 2의 장소 1",
              description: "이곳은 여행 2의 장소 1입니다."
            },
            {
              id: 5,
              name: "여행 2의 장소 2",
              description: "이곳은 여행 2의 장소 2입니다."
            },
          ]
        },
        {
          id: 3,
          destination: '여행 3',
          places: [
            {
              id: 6,
              name: "여행 3의 장소 1",
              description: "이곳은 여행 3의 장소 1입니다."
            },
            {
              id: 7,
              name: "여행 3의 장소 2",
              description: "이곳은 여행 3의 장소 2입니다."
            },
            {
              id: 8,
              name: "여행 3의 장소 3",
              description: "이곳은 여행 3의 장소 3입니다."
            },
            {
              id: 9,
              name: "여행 3의 장소 4",
              description: "이곳은 여행 3의 장소 4입니다."
                },
                {
              id: 9,
              name: "여행 3의 장소 4",
              description: "이곳은 여행 3의 장소 4입니다."
                },
                {
              id: 9,
              name: "여행 3의 장소 4",
              description: "이곳은 여행 3의 장소 4입니다."
                },
                {
              id: 9,
              name: "여행 3의 장소 4",
              description: "이곳은 여행 3의 장소 4입니다."
            },
          ]
        },
      ],
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 1500,
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
    },
    methods: {
      viewDetails(plan) {
        // 여행 계획 상세보기 동작
        console.log('View details:', plan);
        // 필요한 동작 수행
      },
    },
  };
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
    height: 200px;
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
  