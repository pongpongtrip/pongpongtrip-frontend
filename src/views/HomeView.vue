<template>
  <div>
    <div class="bg-video">
      <video  ref="videoRef" class="bg-video__content" autoplay muted loop>
        <source :src="videoSource" type="video/mp4">
      </video>
    </div>
    <!-- <b-carousel
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
          <img class="d-block img-fluid w-100" src="@/assets/main_pic1.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img class="d-block img-fluid w-100" src="@/assets/main_pic2.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img class="d-block img-fluid w-100" src="@/assets/main_pic3.jpg" alt="image slot" />
        </template>
      </b-carousel-slide>
    </b-carousel> -->
    <div class="pongpong">
      <h1 id="main_title">YOUR TRIP OF JOY</h1>
      <h5 id="main_content">퐁퐁트립과 함께 세상의 모든 즐거움을 찾아보세요</h5>
      <button class="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="둘러보기"><span>둘러보기</span></button>
      <!-- <b-button id="main_button" variant="primary" to="/hotplace">둘러보기</b-button> -->
    </div>

    <!-- 전국 베스트 숙소 start -->
    <!-- <div class="container">
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
    </div> -->
  </div>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      videoUrls: ["/city.mp4", "/clouds.mp4", "/island.mp4", "/ocean.mp4"],
      
      videoSource: null,
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
    console.log("Created in??");
    // var jbRandom = Math.random();
    // this.videoSource= this.videoSources[Math.random(Math.floor( Math.random() * 4 ))];
    const serviceKey =
      "T%2FAhyTaE0rj803LnvkkF61K45eKKUhlcmpHuGSwflWQGhTM%2BF9fvx%2By%2BlRXOf2b8VQQOPjConQOOrw%2F47eNkxg%3D%3D";
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
      .then(
        ({
          response: {
            body: {
              items: { item },
            },
          },
        }) => {
          this.makeList(item);
        }
      );

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
      .then(
        ({
          response: {
            body: {
              items: { item },
            },
          },
        }) => {
          this.makeList2(item);
        }
      );
  },
  mounted() {
    const randomIndex = Math.floor(Math.random() * this.videoUrls.length);
    this.videoSource = this.videoUrls[randomIndex];

    // 비디오 재생
    this.$refs.videoRef.play();
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
      console.log("들오니");
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
    },
  },
};
</script>

<style scoped>
/* .d-block {
  opacity: 50%;
} */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.9;
}

.bg-video__content {
  height: 100%;
  width: 100%;
  object-fit: cover; 
  
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
  width: 100%;
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

.pongpong {
  z-index: 100;
  /* position: absolute;
  bottom: 30em;
  
  margin: 0 20%;
  text-align: start; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#main_title {
  font-weight: bold;
  color: white;
}

#main_content {
  color: white;
}

#main_button {
}

.button {
  float: left;
  min-width: 150px;
  max-width: 250px;
  display: block;
  margin: 1em;
  padding: 1em 2em;
  border: none;
  background: none;
  color: inherit;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
}
.button:focus {
  outline: none;
}
.button > span {
  vertical-align: middle;
}

/* Text color adjustments (we could stick to the "inherit" but that does not work well in Safari) */
.button {
  color: #fff;
  border-color: #fff;
}
.bg-2 .button {
  color: #ECEFF1;
  border-color: #ECEFF1;
}
.bg-3 .button {
  color: #fff;
  border-color: #fff;
}

/* Sizes */
.button--size-s {
  font-size: 14px;
}
.button--size-m {
  font-size: 16px;
}
.button--size-l {
  font-size: 18px;
}

/* Typography and Roundedness */
.button--text-upper {
  letter-spacing: 2px;
  text-transform: uppercase;
}
.button--text-thin {
  font-weight: 300;
}
.button--text-medium {
  font-weight: 500;
}
.button--text-thick {
  font-weight: 600;
}
.button--round-s {
  border-radius: 5px;
}
.button--round-m {
  border-radius: 15px;
}
.button--round-l {
  border-radius: 40px;
}

/* Borders */
.button--border-thin {
  border: 1px solid;
}
.button--border-medium {
  border: 2px solid;
}
.button--border-thick {
  border: 3px solid;
}



.button--winona {
  overflow: hidden;
  padding: 0;
  -webkit-transition: border-color 0.3s, background-color 0.3s;
  transition: border-color 0.3s, background-color 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--winona::after {
  content: attr(data-text);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  color: #3f51b5;
  -webkit-transform: translate3d(0, 25%, 0);
  transform: translate3d(0, 25%, 0);
}
.button--winona > span {
  display: block;
}
.button--winona.button--inverted {
  color: #7986cb;
}
.button--winona.button--inverted:after {
  color: #fff;
}
.button--winona::after,
.button--winona > span {
  padding: 1em 2em;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--winona:hover {
  border-color: #3f51b5;
  background-color: rgba(63, 81, 181, 0.1);
}
.button--winona.button--inverted:hover {
  border-color: #21333C;
  background-color: #21333C;
}
.button--winona:hover::after {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.button--winona:hover > span {
  opacity: 0;
  -webkit-transform: translate3d(0, -25%, 0);
  transform: translate3d(0, -25%, 0);
}


</style>
