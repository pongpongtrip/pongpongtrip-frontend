<template>
	<div>
		<div class="bg-video">
			<video ref="videoRef" class="bg-video__content" autoplay muted loop>
				<source :src="videoSource" type="video/mp4" />
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
			<!-- <button
				class="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick"
				data-text="둘러보기"
			>
				<span>둘러보기</span>
			</button> -->
			<button
				class="button button--nanuk button--round-l button--text-thick button--inverted"
				@click="LinkToHotplace"
			>
				<span>둘</span><span>러</span><span>보</span><span>기</span>
			</button>
			<!-- <b-button id="main_button" variant="primary" to="/hotplace">둘러보기</b-button> -->
		</div>
	</div>
</template>
<script>
export default {
	name: 'HomeView',
	data() {
		return {
			videoUrls: ['/city.mp4', '/clouds.mp4', '/island.mp4', '/ocean.mp4'],

			videoSource: null,
			slide: 0,
			sliding: null,
			isHovered: false,
			show: true,
			cards_hotel: [
				// 카드 데이터를 알맞게 작성하세요
				{ title: 'Card 1', description: 'Description 1', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 2', description: 'Description 2', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 3', description: 'Description 3', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 4', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 5', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 6', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 7', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 8', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 9', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 10', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 11', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				{ title: 'Card 12', description: 'Description 4', image: 'https://picsum.photos/300/200' },
				// 더 많은 카드 데이터를 추가하세요
			],
			currentPage_hotel: 1,
			cardsPerPage_hotel: 4,
			cards_attraction: [
				// 카드 데이터를 알맞게 작성하세요
				{
					title: 'Att Card 1',
					description: 'Description 1',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 2',
					description: 'Description 2',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 3',
					description: 'Description 3',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 4',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 5',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 6',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 7',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 8',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 9',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 10',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 11',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				{
					title: 'Att Card 12',
					description: 'Description 4',
					image: 'https://picsum.photos/300/200',
				},
				// 더 많은 카드 데이터를 추가하세요
			],
			currentPage_attraction: 1,
			cardsPerPage_attraction: 4,
		};
	},
	async created() {
		console.log('Created in??');
		// var jbRandom = Math.random();
		// this.videoSource= this.videoSources[Math.random(Math.floor( Math.random() * 4 ))];
		const serviceKey =
			'T%2FAhyTaE0rj803LnvkkF61K45eKKUhlcmpHuGSwflWQGhTM%2BF9fvx%2By%2BlRXOf2b8VQQOPjConQOOrw%2F47eNkxg%3D%3D';
		// index page 로딩 후 전국의 시도 설정.
		let areaUrl =
			'https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=' +
			serviceKey +
			'&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json';

		let searchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;
		let areaCode = 1;
		let contentTypeId = 32;
		let search = ['호텔'];
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
		let search2 = ['축'];
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
		LinkToHotplace() {
			console.log('이동');
			this.$router.push('/hotplace');
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
				if (area.firstimage === '') {
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
			console.log('들오니');
			let trips = data;
			console.log(trips);

			let tripList = ``;
			let nameList = ``;
			let positions = [];
			let cnt = 0;

			for (var i = 0; i < 50; i++) {
				var area = trips[i];
				console.log(area.firstimage);
				if (area.firstimage === '') {
					console.log('skip');
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
	margin-bottom: 25px;
}

#main_button {
}

/* Common button styles */
.button {
	float: center;
	min-width: 100px;
	max-width: 250px;
	display: block;
	margin: 1em;
	padding: 1em 2em;
	border: 2px solid #eceff1;
	border-radius: 10px;
	background: none;
	color: inherit;
	vertical-align: middle;
	position: relative;
	z-index: 1;
	-webkit-backface-visibility: hidden;
	-moz-osx-font-smoothing: grayscale;
	margin: 0px auto;
}
.button:focus {
	outline: none;
}
.button > span {
	vertical-align: middle;
}

.button {
	color: #eceff1;
	border-color: #eceff1;
}

/* Nanuk */
.button--nanuk {
	padding: 0 2em;
	overflow: hidden;
	-webkit-transition: background-color 0.3s;
	transition: background-color 0.3s;
}
.button--nanuk.button--inverted {
	color: #eceff1;
}
.button--nanuk > span {
	display: inline-block;
	padding: 15px 0;
}

.button--nanuk:hover > span:nth-child(odd) {
	-webkit-animation: anim-nanuk-1 0.5s forwards;
	animation: anim-nanuk-1 0.5s forwards;
}
.button--nanuk:hover > span:nth-child(even) {
	-webkit-animation: anim-nanuk-2 0.5s forwards;
	animation: anim-nanuk-2 0.5s forwards;
}
.button--nanuk:hover > span:nth-child(odd),
.button--nanuk:hover > span:nth-child(even) {
	-webkit-animation-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
	transition-animation-function: cubic-bezier(0.75, 0, 0.125, 1);
}

@-webkit-keyframes anim-nanuk-1 {
	0%,
	100% {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
	49% {
		opacity: 1;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
	50% {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
		color: inherit;
	}
	51% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
		color: #fff;
	}
	100% {
		color: #fff;
	}
}
@keyframes anim-nanuk-1 {
	0%,
	100% {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
	49% {
		opacity: 1;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
	50% {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
		color: inherit;
	}
	51% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
		color: #fff;
	}
	100% {
		color: #fff;
	}
}

@-webkit-keyframes anim-nanuk-2 {
	0%,
	100% {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
	49% {
		opacity: 1;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}
	50% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
		color: inherit;
	}
	51% {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
		color: #fff;
	}
	100% {
		color: #fff;
	}
}
@keyframes anim-nanuk-2 {
	0%,
	100% {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
	49% {
		opacity: 1;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}
	50% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
		color: inherit;
	}
	51% {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
		color: #fff;
	}
	100% {
		color: #fff;
	}
}
.button--nanuk:hover > span:nth-child(1) {
	-webkit-animation-delay: 0s;
	animation-delay: 0s;
}
.button--nanuk:hover > span:nth-child(2) {
	-webkit-animation-delay: 0.05s;
	animation-delay: 0.05s;
}
.button--nanuk:hover > span:nth-child(3) {
	-webkit-animation-delay: 0.1s;
	animation-delay: 0.1s;
}
.button--nanuk:hover > span:nth-child(4) {
	-webkit-animation-delay: 0.15s;
	animation-delay: 0.15s;
}
.button--nanuk:hover > span:nth-child(5) {
	-webkit-animation-delay: 0.2s;
	animation-delay: 0.2s;
}
.button--nanuk:hover > span:nth-child(6) {
	-webkit-animation-delay: 0.25s;
	animation-delay: 0.25s;
}
.button--nanuk:hover > span:nth-child(7) {
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}
.button--nanuk:hover > span:nth-child(8) {
	-webkit-animation-delay: 0.35s;
	animation-delay: 0.35s;
}
.button--nanuk:hover > span:nth-child(9) {
	-webkit-animation-delay: 0.4s;
	animation-delay: 0.4s;
}
.button--nanuk:hover > span:nth-child(10) {
	-webkit-animation-delay: 0.45s;
	animation-delay: 0.45s;
}
.button--nanuk:hover > span:nth-child(11) {
	-webkit-animation-delay: 0.5s;
	animation-delay: 0.5s;
}
</style>
