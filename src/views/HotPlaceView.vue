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
          class="mb-2 card"
        >
        
          <b-card-text>{{ card.content }}</b-card-text>
          <div
            class="icon-container"
            :class="{ active: card.currentIcon === 'heart-fill' }"
            @click="toggleIcon(card)"
          >
            <b-icon
              :icon="card.currentIcon"
              :color="card.iconColor"
              class="heart-icon"
            ></b-icon>
            <b-icon
              icon="heart-fill"
              color="pink"
              class="heart-fill-icon"
            ></b-icon>
          </div>
          <b-button href="#" variant="primary" class="go-button">Go somewhere</b-button>
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
            "123",
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
      card.currentIcon = card.currentIcon === 'heart' ? 'heart-fill' : 'heart';
      card.iconColor = card.currentIcon === 'heart-fill' ? 'pink' : 'black';
    },
    // toggleIcon(card) {
    //   card.currentIcon = card.currentIcon === "heart" ? "heart-fill" : "heart";
    //   card.iconColor = card.currentIcon === "heart-fill" ? "red" : "";
    // },

  },
};
</script>

<style>
.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex-basis: calc(33.33% - 1rem);
  margin: 0.5rem;
}
.card .card-text {
  font-size: 14px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
}

.icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.icon-container .heart-icon {
  font-size: 22px;
  transition: color 0.3s ease-out;
}

.icon-container .heart-fill-icon {
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 30px;
  transform: scale(0);
  transition: transform 0.3s ease-out;
}

.icon-container.active .heart-icon {
  color: transparent;
}

.icon-container.active .heart-fill-icon {
  transform: scale(1);
}

.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 10px;
}

.card-text {
  margin-bottom: 1rem;
}

.go-button {
  z-index: 1;
}
</style>
