<template>
  <HeaderComponent />

  <main class="container">
    <div>
      <div>
        <h2 class="container__subtitle">{{ accommodation.name }}</h2>
        <span class="container__detalhe"></span>
      </div>
      <div class="container__content">
        <div class="container__content__room">
          <div class="container__content__room__image">
            <img :src="accommodation.image" :alt="accommodation.name" />
          </div>
          <div class="container__content__room__text">
            <p>{{ accommodation.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="validate.id" class="form">
        <h3 class="form__subtitle">
          Faça um comentário sobre sua experiência:
        </h3>
        <form class="form__content">
          <!-- <label for="name">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            id="name"
            name="name"
            v-model="name"
            required
          /> -->

          <label for="message">Mensagem:</label>
          <textarea
            placeholder="Digite sua mensagem..."
            name="message"
            id="message"
            cols="30"
            rows="10"
            v-model="comment"
          ></textarea>
        </form>

        <vue3-star-ratings v-model="rating" />

        <button class="form__content__btn" @click="confirmComment">
          Confirmar
        </button>
      </div>
    </div>

    <div>
      <div v-if="reviews.length">
        <div
          class="comments"
          v-for="item in reviews"
          :key="item.accommodationId"
        >
          <div class="comments__user">
            <img src="../assets/images/avatar.jpg" alt="default avatar" />
            <p><span>Nome:</span> {{ item.user.name }}</p>
          </div>
          <div class="comments__rating">
            <p><span>Comentário:</span> {{ item.review.message }}</p>
            <p v-if="item.review.rating < 0.5"><span>Nota:</span> ☆ ☆ ☆ ☆ ☆</p>
            <p v-else-if="item.review.rating < 1.5"><span>Nota:</span> ★ ☆ ☆ ☆ ☆</p>
            <p v-else-if="item.review.rating < 2.5"><span>Nota:</span> ★ ★ ☆ ☆ ☆</p>
            <p v-else-if="item.review.rating < 3.5"><span>Nota:</span> ★ ★ ★ ☆ ☆</p>
            <p v-else-if="item.review.rating < 4.5"><span>Nota:</span> ★ ★ ★ ★ ☆</p>
            <p v-else><span>Nota:</span> ★ ★ ★ ★ ★</p>
          </div>
        </div>
      </div>
      <div class="no-comments" v-else>
        <div>
          <h3 class="no-comments__subtitle">
            Este quarto ainda não têm comentários. Faça um agora
            mesmo e seja o primeiro!
          </h3>
        </div>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import vue3StarRatings from "vue3-star-ratings";

export default {
  name: "AccommodationView",

  props: ["id"],

  data() {
    return {
      login: JSON.parse(localStorage.getItem("login")),
      name: "",
      comment: "",
      rating: 0,
      accommodationComments: [],
      accommodation: {}
    };
  },

  computed: {
    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    },

    reviews() {
      return this.$store.state.reviewsModule.reviews;
    },

    validate() {
      return this.$store.state.loginModule.validate;
    }
  },

  methods: {
    async confirmComment() {
      // checagem de usuário logado
      if (!this.validate.id) {
        return this.NotLoggedIn();
      }

      const review = {
        userId: this.validate.id,
        accommodationId: this.id,
        message: this.comment,
        rating: this.rating
      };

      await this.$store.dispatch('reviewsModule/addReview', review);

      this.notify();
    },

    notify() {
      toast("comentário adicionado!", {
        autoClose: 3000,
      });
    },

    NotLoggedIn() {
      toast("Não existe usuário logado!", {
        autoClose: 3000,
      });
    },
  },

  async mounted() {
    this.accommodation = this.accommodations.find(item => item.id == this.id);

    await this.$store.dispatch('reviewsModule/getReviewsByAccommodation', this.id);
  },

  components: {
    vue3StarRatings,
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/quarto-detalhes.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
