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
        </form>

        <vue3-star-ratings v-model="rating" />

        <button class="form__content__btn" @click="confirmComment">
          Confirmar
        </button>
      </div>
    </div>

    <div>
      <div v-if="accommodationComments.length > 0">
        <div
          class="comments"
          v-for="item in accommodationComments"
          :key="item.accommodationId"
        >
          <div class="comments__user">
            <img src="../assets/images/avatar.jpg" alt="default avatar" />
            <p><span>Nome:</span> {{ item.user }}</p>
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

      accommodation: {}
    };
  },

  computed: {
    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    }
    

    // login() {
    //   // return this.$store.state.login;
    //   return this.$store.state.loginModule.login;
    // },
  },

  methods: {
    confirmComment() {
      // checagem de usuário logado
      if (!this.login) {
        return this.NotLoggedIn();
      }

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

    NotLoggedIn() {
      toast("Não existe usuário logado!", {
        autoClose: 3000,
      });
    },
  },

  beforeMount() {
    // this.$store.dispatch("accommodationsModule/getAccommodations");
  },

  mounted() {
    this.accommodationComments = this.comments.getComments(
      this.accommodation.id
    );

    this.accommodation = this.accommodations.find(item => item.id == this.id);
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
