<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100 ignore-aspect-ratio"
            src="@/assets/main_picture_1.jpg"
            alt="image slot"
          />
        </template>
        <div class="slide-overlay">
          <h1 class="slide-text mb-4">PONG PONG</h1>
        </div>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img class="d-block img-fluid w-100" src="@/assets/main_picture_2.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img class="d-block img-fluid w-100" src="@/assets/main_picture_3.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img class="d-block img-fluid w-100" src="@/assets/main_picture_4.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
    </b-carousel>

    <!-- 전국 베스트 숙소 start -->
    <div class="container">
      <div class="row mt-4 mb-4">
        <div class="mt-4">
          <h3 class="text-start">전국 베스트 숙소 <b-icon icon="house-fill"></b-icon></h3>
          <div class="room card-deck">
            <div
              v-for="(cards_hotel, index) in paginatedCards_hotel"
              :key="index"
              class="card mb-4 room-size"
            >
              <img :src="cards_hotel.image" class="card-img-top" :alt="cards_hotel.title" />
              <div class="room-body card-body">
                <h5 class="room-title card-title">{{ cards_hotel.title }}</h5>
                <p class="room-title card-text">{{ cards_hotel.description }}</p>
              </div>
            </div>
          </div>
          <nav aria-label="Card Pagination Best Hotel">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage_hotel === 1 }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="goToPage_Hotel(currentPage_hotel - 1)"
                >
                  <b-icon icon="chevron-compact-left"></b-icon>
                </a>
              </li>
              <!-- <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
            </li> -->
              <li class="page-item" :class="{ disabled: currentPage_hotel === totalPages_hotel }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="goToPage_Hotel(currentPage_hotel + 1)"
                >
                  <b-icon icon="chevron-compact-right"></b-icon>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="mt-4">
          <h3 class="text-start">전국 베스트 관광지 <b-icon icon="geo-fill"></b-icon></h3>
          <div class="tour card-deck">
            <div
              v-for="(cards_attraction, index) in paginatedCards_attraction"
              :key="index"
              class="card mb-4 size"
            >
              <img
                :src="cards_attraction.image"
                class="attraction-card-img-top"
                :alt="cards_attraction.title"
              />
              <div class="tour-body card-body">
                <h5 class="tour-title card-title">{{ cards_attraction.title }}</h5>
                <p class="tour-text card-text">{{ cards_attraction.description }}</p>
              </div>
            </div>
          </div>
          <nav aria-label="Card Pagination Best Attraction">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage_attraction === 1 }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="goToPage_Attraction(currentPage_attraction - 1)"
                >
                  <b-icon icon="chevron-compact-left"></b-icon>
                </a>
              </li>
              <!-- <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
            </li> -->
              <li
                class="page-item"
                :class="{ disabled: currentPage_attraction === totalPages_attraction }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="goToPage_Attraction(currentPage_attraction + 1)"
                >
                  <b-icon icon="chevron-compact-right"></b-icon>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      slide: 0,
      sliding: null,
      isHovered: false,
      show: true,
      cards_hotel: [
        // 카드 데이터를 알맞게 작성하세요
        { title: "Card 1", description: "Description 1", image: "https://picsum.photos/300/200" },
        { title: "Card 2", description: "Description 2", image: "https://picsum.photos/300/200" },
        { title: "Card 3", description: "Description 3", image: "https://picsum.photos/300/200" },
        { title: "Card 4", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 5", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 6", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 7", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 8", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 9", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 10", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 11", description: "Description 4", image: "https://picsum.photos/300/200" },
        { title: "Card 12", description: "Description 4", image: "https://picsum.photos/300/200" },
        // 더 많은 카드 데이터를 추가하세요
      ],
      currentPage_hotel: 1,
      cardsPerPage_hotel: 4,
      cards_attraction: [
        // 카드 데이터를 알맞게 작성하세요
        {
          title: "Att Card 1",
          description: "Description 1",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 2",
          description: "Description 2",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 3",
          description: "Description 3",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 4",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 5",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 6",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 7",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 8",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 9",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 10",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 11",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        {
          title: "Att Card 12",
          description: "Description 4",
          image: "https://picsum.photos/300/200",
        },
        // 더 많은 카드 데이터를 추가하세요
      ],
      currentPage_attraction: 1,
      cardsPerPage_attraction: 4,
    };
  },
  async created() {
    
      console.log("Created in??")
      const serviceKey = "T%2FAhyTaE0rj803LnvkkF61K45eKKUhlcmpHuGSwflWQGhTM%2BF9fvx%2By%2BlRXOf2b8VQQOPjConQOOrw%2F47eNkxg%3D%3D";
      // index page 로딩 후 전국의 시도 설정.
      let areaUrl =
        "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
        serviceKey +
        "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";


      let searchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;
      let areaCode = 1;
      let contentTypeId = 32;
      let search = ["호텔"];
      let keyword = search[0];
      // let keyword = search[Math.floor(Math.random() * 4)];

      if (parseInt(areaCode)) searchUrl += `&areaCode=${areaCode}`;
      if (parseInt(contentTypeId)) searchUrl += `&contentTypeId=${contentTypeId}`;
      searchUrl += `&keyword=${keyword}`;



      await fetch(searchUrl)
        .then((response) => {
          return response.json();
        })
        .then(({ response: { body: { items: { item } } } }) => {
          this.makeList(item)
        });
        
      let searchUrl2 = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;
      let areaCode2 = 0;
      let contentTypeId2 = 15;
      let search2 = ["축"];
      let keyword2 = search2[0];

      if (parseInt(areaCode2)) searchUrl2 += `&areaCode=${areaCode2}`;
      if (parseInt(contentTypeId2)) searchUrl2 += `&contentTypeId=${contentTypeId2}`;
      searchUrl2 += `&keyword=${keyword2}`;
        
      await fetch(searchUrl2)
          .then((response) => {
            // response.json(); 
            // console.log(response)
            return response.json();
          })
          .then(({ response: { body: { items: { item } } } }) => {
            this.makeList2(item)
          });
      

  },
  computed: {
    paginatedCards_hotel() {
      const startIndex_hotel = (this.currentPage_hotel - 1) * this.cardsPerPage_hotel;
      const endIndex_hotel = startIndex_hotel + this.cardsPerPage_hotel;
      return this.cards_hotel.slice(startIndex_hotel, endIndex_hotel);
    },
    paginatedCards_attraction() {
      const startIndex_attraction =
        (this.currentPage_attraction - 1) * this.cardsPerPage_attraction;
      const endIndex_attraction = startIndex_attraction + this.cardsPerPage_attraction;
      return this.cards_attraction.slice(startIndex_attraction, endIndex_attraction);
    },
    totalPages_hotel() {
      return Math.ceil(this.cards_hotel.length / this.cardsPerPage_hotel);
    },
    totalPages_attraction() {
      return Math.ceil(this.cards_attraction.length / this.cardsPerPage_attraction);
    },
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    goToPage_Hotel(page) {
      if (page >= 1 && page <= this.totalPages_hotel) {
        this.currentPage_hotel = page;
      }
    },
    goToPage_Attraction(page) {
      if (page >= 1 && page <= this.totalPages_attraction) {
        this.currentPage_attraction = page;
      }
    },

    // 화면의 card 이미지 삽입
    makeList: function (data) {
      let trips = data;
      
      console.log(data);
      let tripList = ``;
      let nameList = ``;
      let positions = [];
      let cnt = 0;

      for (var i = 0; i < 50; i++) {
        let area = trips[i];
        // console.log(area)
        if (area.firstimage === "") {
          continue;
        }
        
        this.cards_hotel[cnt].image = area.firstimage;
        this.cards_hotel[cnt].title = area.title;
        this.cards_hotel[cnt].description = area.addr1;
        cnt += 1;

        if (cnt === 12) {
          break;
        }
      }


    },

    makeList2: function (data) {
      console.log("들오니")
      let trips = data;
      console.log(trips);
      
      let tripList = ``;
      let nameList = ``;
      let positions = [];
      let cnt = 0;

    
      for (var i = 0; i < 50; i++) {
        var area = trips[i];
        console.log(area.firstimage);
        if (area.firstimage === "") {
          console.log("skip");
          continue;
        }
        
        this.cards_attraction[cnt].image = area.firstimage;
        this.cards_attraction[cnt].title = area.title;
        this.cards_attraction[cnt].description = area.addr1;
        cnt += 1;

        if (cnt === 12) {
          break;
        }
      }
    }
  }
}
  
</script>

<style scoped>
.d-block {
  opacity: 50%;
}

.slide-text {
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.text-start {
  text-align: start;
}

.card-img-top {
  width:100%;
  height: 60%;
  object-fit: contain;
}

.attraction-card-img-top {
  width: 100%;
  height: 80%;
  object-fit: contain;
}
.size {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.room-size {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>