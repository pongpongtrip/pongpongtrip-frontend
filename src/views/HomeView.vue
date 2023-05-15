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
			<!-- Text slides with image -->
			<b-carousel-slide
				caption="First slide"
				text="Nulla vitae elit libero, a pharetra augue mollis interdum."
				img-src="https://picsum.photos/1024/480/?image=52"
			></b-carousel-slide>

			<!-- Slides with custom text -->
			<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
				<h1>Hello world!</h1>
			</b-carousel-slide>

			<!-- Slides with image only -->
			<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

			<!-- Slides with img slot -->
			<!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
			<b-carousel-slide>
				<template #img>
					<img
						class="d-block img-fluid w-100"
						width="1024"
						height="480"
						src="https://picsum.photos/1024/480/?image=55"
						alt="image slot"
					/>
				</template>
			</b-carousel-slide>

			<!-- Slide with blank fluid image to maintain slide aspect ratio -->
			<b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
					a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
				</p>
			</b-carousel-slide>
		</b-carousel>

		<p class="mt-4">
			Slide #: {{ slide }}<br />
			Sliding: {{ sliding }}
		</p>

		<b-container>
			<!--대한민국 관광지 start  -->
			<!-- animate__animated animate__fadeInDown" -->
			<div>
				<h2>대한민국 관광지</h2>
				<b-card-group columns>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
				</b-card-group>
			</div>
			<!--대한민국 관광지 end  -->

			<!--대한민국 축제 start  -->
			<!-- animate__animated animate__fadeInDown" -->
			<div>
				<h2>대한민국 축제</h2>
				<b-card-group columns>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
					<b-card
						img-src="https://picsum.photos/400/400/?image=43"
						img-alt="Image"
						overlay
					></b-card>
				</b-card-group>
			</div>
			<!--대한민국 축제 end  -->
		</b-container>
	</div>
</template>
<script>
export default {
	name: 'HomeView',
	data() {
		return {
			slide: 0,
			sliding: null,
			isHovered: false,
		};
	},
	methods: {
		onSlideStart() {
			this.sliding = true;
		},
		onSlideEnd() {
			this.sliding = false;
		},
	},
};
</script>

<style scoped></style>
