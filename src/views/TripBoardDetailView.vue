<template>
	<div>
		<header></header>
		<main id="main" class="pt-5">
			<div class="container">
				<div class="col justify-content-center">
					<div class="col"></div>
					<div class="col">
						<div class="row my-2 mx-4">
							<h2 class="text-secondary">{{ article.subject }}</h2>
						</div>
						<div class="col">
							<div class="col-md-8">
								<div class="row">
									<b-avatar
										class="me-2 float-md-start bg-light p-2"
										:src="avatarSrc"
										alt="Avatar"
									></b-avatar>
									<p class="userId fw-bold" id="article_userName">{{ article.userName }}</p>
									<br />
								</div>
							</div>
							<p class="right text-secondary fw-light">
								{{ article.registerTime }} 조회: {{ article.hit }}
							</p>
							<!--               <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
							<hr class="mb-3" />

							<!-- 카드 스와이퍼 -->
							<h4 style="text-align: left" v-if="plan.planName !== null">{{ plan.planName }}</h4>
							<swiper class="swiper travel-plan-swiper" :options="swiperOption">
								<swiper-slide v-for="place in plan.planInfo" :key="place.content_id">
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
								<div v-for="el in article.content.split('\n')" :key="el">{{ el }} <br /></div>
							</div>
							<div v-if="article.fileInfos" class="mt-3">
								<ul>
									<li
										class="row justify-content-start"
										v-for="file in article.fileInfos"
										:key="file.originalFile"
									>
										{{ file.originalFile }}
										<a :href="fileDownloadLink(file.saveFolder, file.originalFile, file.saveFile)"
											>[다운로드]</a
										>
									</li>
								</ul>
							</div>
							<hr class="mt-3 mb-3" />
							<div class="d-flex justify-content-end">
								<b-button @click="goToList" variant="outline-primary" class="mb-3">글목록</b-button>
								<template v-if="isCurrentUserArticleOwner">
									<b-button @click="goToModify" variant="outline-success" class="mb-3 ms-1"
										>글수정</b-button
									>
									<b-button @click="confirmDelete" variant="outline-danger" class="mb-3 ms-1"
										>글삭제</b-button
									>
								</template>
							</div>
						</div>
					</div>
				</div>
				<div class="comment-section">
					<div class="col">
						<div class="col">
							<b-list-group id="comment-list" flush>
								<!-- Render comments dynamically here -->
								<b-list-group-item
									class="comment-item"
									v-for="comment in displayedItems"
									:key="comment.id"
								>
									<p class="comment-author">
										<b-icon icon="person-circle"></b-icon> {{ comment.userName }}
									</p>
									<p class="comment-text">{{ comment.content }}</p>
									<p class="comment-date">{{ comment.registerTime }}</p>
								</b-list-group-item>
							</b-list-group>
							<b-pagination
								v-model="currentPage"
								:total-rows="comments.length"
								:per-page="perPage"
								aria-controls="comment-list"
								align="center"
							>
								<template #first-text><b-icon icon="chevron-double-left"></b-icon></template>
								<template #prev-text><b-icon icon="chevron-compact-left"></b-icon></template>
								<template #next-text><b-icon icon="chevron-compact-right"></b-icon></template>
								<template #last-text><b-icon icon="chevron-double-right"></b-icon></template>
							</b-pagination>
							<div class="my-4">
								<div class="comment-header">
									<h4>댓글 쓰기</h4>
								</div>
								<div class="comment-input">
									<b-form-textarea
										v-model="comment"
										rows="3"
										placeholder="댓글을 입력하세요"
									></b-form-textarea>
								</div>
								<div class="comment-button">
									<b-button @click="submitComment" variant="primary">댓글 등록</b-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

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
import { mapState } from 'vuex';
import 'swiper/css/swiper.css';
import http from '@/api/httpDefault.js';
import KaKaoMap from '@/components/KaKaoMap.vue';

const memberStore = 'memberStore';

export default {
	name: 'boardDeatil',
	components: {
		Swiper,
		SwiperSlide,
		KaKaoMap,
	},
	props: {
		detail: {
			type: Array,
		},
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
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			article: {
				// Replace with your article object
				articleNo: 1,
				subject: 'Sample Subject',
				userId: 'john123',
				userName: '',
				registerTime: '2023-05-18',
				hit: 10,
				content: 'Sample content',
				fileInfos: [
					{ originalFile: 'file1.pdf', saveFolder: 'folder1', saveFile: 'file1-123456789.pdf' },
					{ originalFile: 'file2.pdf', saveFolder: 'folder2', saveFile: 'file2-987654321.pdf' },
				],
			},
			comments: [], // Array to store comments
			comment: '', // Input field for new comment
			currentPage: 1,
			perPage: 7,
		};
	},
	created() {
		console.log(this.$store.articleNo);
		http
			.get('/board/view', {
				params: {
					articleNo: this.$store.state.articleNo,
				},
			})
			.then((response) => {
				console.log(response.data);
				this.article.articleNo = response.data.articleNo;
				this.article.subject = response.data.subject;
				this.article.userId = response.data.userId;
				this.article.userName = response.data.userName;
				this.article.registerTime = response.data.registerTime;
				this.article.hit = response.data.hit;
				this.article.content = response.data.content;
				this.article.fileInfos = response.data.fileInfos;
				if (JSON.parse(response.data.plan) !== null) {
					this.plan = JSON.parse(response.data.plan);
				}

				console.log(this.plan);
			})
			.then(() => {
				this.fetchCommentList();
			});
	},
	computed: {
		...mapState(memberStore, ['userInfo']),
		avatarSrc() {
			return 'https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg';
		},
		isCurrentUserArticleOwner() {
			return this.userInfo.userId === this.article.userId;
		},
		displayedItems() {
			const startIndex = (this.currentPage - 1) * this.perPage;
			const endIndex = startIndex + this.perPage;
			return [...this.comments].slice(startIndex, endIndex);
		},
	},
	methods: {
		fileDownloadLink(saveFolder, originalFile, saveFile) {
			return `${this.root}/file/download/${saveFolder}/${originalFile}/${saveFile}`;
		},
		goToList() {
			this.$router.push('/tripboard').catch(() => {});
		},
		goToModify() {
			this.$router.push('/tripboard/modify').catch(() => {});
		},
		confirmDelete() {
			if (confirm('정말 삭제하시겠습니까?')) {
				http
					.get('/board/delete', {
						params: {
							articleNo: this.article.articleNo,
						},
					})
					.then((response) => {
						console.log(response.data);
						this.$router.push('/tripboard').catch(() => {});
					});
			}
		},
		openModal(card) {
			console.log(card);
			this.selectedCard = card;

			this.modalOpen = true;
			this.markers = [[card.latitude, card.longitude, card.title, card.first_image, card.addr1]];
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
		submitComment() {
			// Create a new comment object
			const newComment = {
				// user_id
				// content
				// register_time

				articleNo: this.article.articleNo,
				userName: this.userInfo.userName,
				content: this.comment,
			};
			//back으로 푸시
			console.log(newComment);
			http.post(`/board/comment/write`, newComment).then(({ data }) => {
				console.log(data);
				this.comment = '';
				this.fetchCommentList();
			});
			// Clear the comment input field
		},
		fetchCommentList() {
			const articleNo = this.article.articleNo;
			http.get(`/board/comment/list/${articleNo}`).then(({ data }) => {
				console.log(data);
				this.comments = data;
			});
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
.comment-section {
	margin-top: 20px;
}

.comment-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
}

.comment-header h4 {
	margin: 0;
	font-size: 18px;
	font-weight: bold;
}

.comment-input {
	margin-bottom: 10px;
}

.comment-button {
	display: flex;
	justify-content: flex-end;
}

.comment-button .btn {
	margin-left: 10px;
}

.comment-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.comment-item {
	border-bottom: 1px solid #ccc;
	padding: 10px 0;
	text-align: start;
}

.comment-item .comment-text {
	margin: 0;
	font-size: 14px;
	color: #333;
}

.comment-item .comment-author {
	font-size: 14px;
	/* color: #888; */
	margin-bottom: 2px;
	color: #333;
	font-weight: bold;
}

.comment-item .comment-date {
	font-size: 10px;
	color: #888;
	margin-top: 5px;
}

#article_userName {
	margin-left: 10px;
	margin-bottom: 0px;
	place-self: center;
}
</style>
