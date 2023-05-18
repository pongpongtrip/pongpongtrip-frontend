<template>
  <div class="hotplace">
    <h2 class="mt-4">핫 플레이스</h2>
    <b-container>
      <div class="card-row">
        <b-card
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :img-src="card.imgSrc"
          :img-alt="card.imgAlt"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>{{ card.content }}</b-card-text>
          <div @click="toggleIcon(card)">
            <transition name="icon-fade" mode="out-in">
              <b-icon :icon="card.currentIcon" :key="card.currentIcon"></b-icon>
            </transition>
          </div>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Card Title 1",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 2",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 3",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 4",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 5",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 6",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 7",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        {
          title: "Card Title 8",
          imgSrc: "https://picsum.photos/600/300/?image=25",
          imgAlt: "Image",
          content:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          currentIcon: "heart",
        },
        // Add more card objects as needed
      ],
    };
  },
  mounted() {
    this.arrangeCards();
    window.addEventListener("resize", this.arrangeCards);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.arrangeCards);
  },
  methods: {
    arrangeCards() {
      const cardRow = document.querySelector(".card-row");
      if (cardRow) {
        const cards = Array.from(cardRow.querySelectorAll(".card"));
        cards.forEach((card, index) => {
          const rowIndex = Math.floor(index / 3);
          card.style.order = rowIndex;
        });
      }
    },
    toggleIcon(card) {
      card.currentIcon = card.currentIcon === "heart" ? "heart-fill" : "heart";
    },
  },
};
</script>

<style>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.5s;
}

.icon-fade-enter,
.icon-fade-leave-to {
  opacity: 0;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex-basis: calc(33.33% - 1rem);
  margin: 0.5rem;
}
</style>
