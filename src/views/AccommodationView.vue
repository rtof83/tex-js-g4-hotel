<template>
  <HeaderComponent />

  <main class="container">
    <div>
      <h2 class="container__subtitle">{{ accommodation.accommodation }}</h2>

      <div class="container__content">
        <div class="container__content__room">
          <div class="container__content__room__image">
            <img
              :src="require(`../assets/images/${accommodation.image}.jpg`)"
              :alt="accommodation.accommodation"
            />
          </div>
          <div class="container__content__room__text">
            <p>{{ accommodation.description }}</p>
          </div>
        </div>
      </div>

      <div class="form">
        <h3 class="form__subtitle">
          Faça um comentário sobre sua experiência:
        </h3>
        <form class="form__content">
          <label for="name">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            id="name"
            name="name"
            required
          />

          <label for="message">Mensagem:</label>
          <textarea
            placeholder="Digite sua mensagem..."
            name="message"
            id="message"
            cols="30"
            rows="10"
            v-model="comment"
          ></textarea>

          <vue3-star-ratings v-model="rating" />

          <button class="form__content__btn" @click="confirmComment">
            Confirmar
          </button>
        </form>
      </div>
    </div>

    <div
      class="comments"
      v-for="item in accommodationComments"
      :key="item.accommodationId"
    >
      <div class="comments__user">
        <img src="../assets/images/avatar.jpg" alt="default avatar" />
        <p><span>Usuário:</span> {{ item.user }}</p>
      </div>
      <div class="comments__rating">
        <p><span>Comentário:</span> {{ item.comment }}</p>
        <p v-if="item.rating < 0.5"><span>Nota:</span> ☆ ☆ ☆ ☆ ☆</p>
        <p v-else-if="item.rating < 1.5"><span>Nota:</span> ★ ☆ ☆ ☆ ☆</p>
        <p v-else-if="item.rating < 2.5"><span>Nota:</span> ★ ★ ☆ ☆ ☆</p>
        <p v-else-if="item.rating < 3.5"><span>Nota:</span> ★ ★ ★ ☆ ☆</p>
        <p v-else-if="item.rating < 4.5"><span>Nota:</span> ★ ★ ★ ★ ☆</p>
        <p v-else><span>Nota:</span> ★ ★ ★ ★ ★</p>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import Comments from "@/components/Comments.js";
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
      comment: "",
      rating: 0,
      accommodationComments: [],
      comments: new Comments(),
    };
  },

  computed: {
    message() {
      const teste = new Teste();
      return teste.message("testando");
    },

    accommodation() {
      return this.$store.getters.dbAccommodations[this.id];
    },

    login() {
      return this.$store.state.login;
    },
  },

  methods: {
    confirmComment() {
      // class
      this.comments.checkLogin(this.login);

      const newComment = {
        accommodationId: this.accommodation.id,
        user: this.login.user,
        comment: this.comment,
        rating: this.rating,
      };

      this.comments.insertComment(newComment);

      this.comments.getComments(this.id);

      this.notify();
    },

    notify() {
      toast("comentário adicionado!", {
        autoClose: 3000,
      });
    },
  },

  mounted() {
    this.accommodationComments = this.comments.getComments(this.id);
  },

  components: {
    vue3StarRatings,
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
@import "@/assets/css/quarto-detalhes.css";
@import "@/assets/css/header.css";
@import "@/assets/css/footer.css";
</style>
