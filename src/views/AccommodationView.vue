<template>
  <HeaderComponent />

  <main class="container">
    <div>
      <h2 class="container__subtitle">{{ accommodation.name }}</h2>

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
            v-model="name"
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
      login: JSON.parse(localStorage.getItem("login")),
      name: "",
      comment: "",
      rating: 0,
      accommodationComments: [],
      comments: new Comments(),
    };
  },

  computed: {
    // message() {
    //   const teste = new Teste();
    //   return teste.message("testando");
    // },

    accommodation() {
      return this.$store.state.accommodationsModule.accommodations[this.id];
    },

    // login() {
    //   // return this.$store.state.login;
    //   return this.$store.state.loginModule.login;
    // },
  },

  methods: {
    confirmComment(e) {
      e.preventDefault();
      // checagem se usuário esta logado
      if (!this.login) return alert("não existe usuário logado");

      // class
      // this.comments.checkLogin(this.login);

      const newComment = {
        accommodationId: this.accommodation.id,
        user: this.name,
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
    this.accommodationComments = this.comments.getComments(
      this.accommodation.id
    );
    this.$store.dispatch("accommodationsModule/getAccommodations");
  },

  components: {
    vue3StarRatings,
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/quarto-detalhes.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
