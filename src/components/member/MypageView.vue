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
						<b-icon icon="heart-fill" color="pink" class="heart-fill-icon"></b-icon>
						<b-icon :icon="card.currentIcon" :color="card.iconColor" class="heart-icon"></b-icon>
					</div>
					<b-button @click="openModal(card)" variant="primary" class="go-button" id="btn_primary"
						>자세히 보기</b-button
					>
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
			<li v-for="(plan, index) in travelPlans" :key="index" class="travel-plan">
				<h4 style="text-align: start; padding-left: 20px">{{ plan.name }}</h4>
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
				<b-button
					@click="deletePlan(index)"
					variant="outline-danger"
					class="go-button share-button"
				>
					삭제하기
				</b-button>
				<b-button
					@click="sharePlan(index)"
					variant="primary"
					class="go-button share-button"
					id="btn_primary"
				>
					공유하기
				</b-button>
			</li>
		</ul>

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
							<div class="mx-4 mt-4" id="modal_cardContent">
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
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import http from '@/api/httpDefault.js';
import KaKaoMap from '@/components/KaKaoMap.vue';

export default {
	data() {
		return {
			idx: 1,
			modalOpen: false,
			selectedCard: null,
			cards: [],
			travelPlans: [],
			swiperOption: {
				slidesPerView: 3,
				spaceBetween: 15,
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
		KaKaoMap,
	},
	created() {
		// 선택한 hot place
		http
			.post(
				'/attraction/myhotplace',
				JSON.stringify({
					user_id: this.$store.state.memberStore.userInfo.userId,
				})
			)
			.then((response) => {
				console.log(response.data);
				this.cards = response.data;

				this.cards.forEach((item) => {
					if (item.first_image === '') {
						console.log('이미지 없음');
						item.first_image = require('../../assets/logo1.png');
					}
					item.imgAlt = require('../../assets/logo1.png');
					item.currentIcon = 'heart-fill';
				});
				console.log(this.cards);
			});

		// 여행계획
		http
			.post(
				'/attraction/myplans',
				JSON.stringify({
					userId: this.$store.state.memberStore.userInfo.userId,
				})
			)
			.then((response) => {
				console.log(response.data);

				let currentPlan = null; // 현재 계획
				this.travelPlans = []; // travelPlans 초기화

				response.data.forEach((item) => {
					console.log(item.planId);
					const planId = item.planId;
					const planName = item.planName;
					const placeInfo = item;

					if (item.first_image === '') {
						console.log('이미지 없음');
						item.first_image = require('../../assets/logo1.png');
					}
					if (currentPlan && currentPlan.id === planId) {
						// 현재 계획과 plan_id가 같은 경우 places에 정보 추가
						currentPlan.places.push(placeInfo);
					} else {
						if (currentPlan !== null) {
							console.log('inin');
							this.travelPlans.push(currentPlan);
						}
						currentPlan = {
							id: planId,
							name: planName,
							places: [placeInfo],
						};
					}
				});

				if (currentPlan !== null) {
					this.travelPlans.push(currentPlan);
				}

				console.log(this.travelPlans);
			});
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
					.post(
						'/attraction/like',
						JSON.stringify({
							user_id: this.$store.state.memberStore.userInfo.userId,
							content_id: card.content_id,
						})
					)
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
					.post(
						'/attraction/dislike',
						JSON.stringify({
							user_id: this.$store.state.memberStore.userInfo.userId,
							content_id: card.content_id,
						})
					)
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

		sharePlan(index) {
			console.log(index);
			console.log(this.travelPlans[index]);
			this.$router.push({ name: 'boardwrite', params: { plan: this.travelPlans[index] } });
		},
		deletePlan(index) {
			console.log(index);
			console.log(this.travelPlans[index].id);
			http
				.post(
					'/attraction/myplan/delete',
					JSON.stringify({
						userId: this.$store.state.memberStore.userInfo.userId,
						planId: this.travelPlans[index].id,
					})
				)
				.then((response) => {
					console.log(response.data);
					this.$router.go('/mypage');
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
.title {
	margin-top: 4%;
}
.container {
	margin: auto;
	text-align: center;
}

.full-screen {
	width: 80%;
	margin: 0 auto;
}

/* .travel-plan {
  margin-bottom: 30px;
  width: 100%;
  margin-right: 20px;
} */

.travel-plan:last-child {
	margin-right: 0;
}

.swiper {
	width: 100%;
	height: 470px;
}

.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	padding: 10px;
}

/* .travel-plans {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
} */

.travel-plans {
	list-style: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
}

.travel-plan {
	margin-bottom: 30px;
	width: 100%;
	margin-right: 20px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	padding: 20px;
	box-sizing: border-box;
}

.card {
	background: #f5f5f5;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.card-body {
	background-color: #fff;
	padding: 20px;
	display: flex;
	flex-direction: column;
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

/* 

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

*/

.go-button {
	display: inline-block;
	margin-top: 10px;
	margin: 1px;
}

/* #btn_primary {
  display: inline-block;
  margin-top: 10px;
} */
.share-button {
	float: right;
}

.swiper.full-screen {
	margin-bottom: 20px;
}
</style>
