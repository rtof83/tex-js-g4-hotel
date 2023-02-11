<template>
  <!-- <HeaderComponent /> -->

  {{ rating }}

  <main>
    <div class="main">
      <h1>{{ accommodation.accommodation }}</h1>

      <img :src="accommodation.image" :alt="accommodation.accommodation">
      <br>
      <span>{{ accommodation.description }}</span>

      <br>

      <article class="main__login">
        <!-- <form action="/public" method="get"> -->
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
            placeholder="Digite sua mensagem"
            name="message"
            id="message"
            cols="30"
            rows="10"
            v-model="comment"
          ></textarea>

          <button @click="confirmComment">Confirmar</button>
        <!-- </form> -->
      </article>
    </div>
  </main>

  
  <vue3-star-ratings v-model="rating" />
</template>

<script>
  import Teste from '@/components/Test.js';
  import HeaderComponent from '@/components/HeaderComponent.vue';

  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import vue3StarRatings from "vue3-star-ratings";

  export default {
    name: 'AccommodationView',

    props: ['id'],

    data() {
      return {
        // message: Teste.message
        comment: '',
        rating: 0
      }
    },

    computed: {
      message() {
        const teste = new Teste;
        return teste.message('testando')
      },

      accommodation() {
        return this.$store.getters.dbAccommodations[this.id];
      },

      login() {
        return this.$store.state.login;
      }
    },

    methods: {
      getAccommodation() {
        // console.log(this.dbAccommodations.find(item => item.id === this.id));
        console.log('object');
        // return accommodations.find(item => item.id === this.id)
      },

      confirmComment() {
        const accommodation = { accommodationId: this.accommodation.id,
                                user: this.login.user,
                                comment: this.comment,
                                rating: this.rating
                              }

        localStorage.setItem('accommodation', JSON.stringify(accommodation));

        this.notify();
      },

      notify() {
        toast('comentário adicionado!', {
          autoClose: 3000,
        }); // ToastOptions
      }
    },

    mounted() {
      
    },

    components: {
    vue3StarRatings,
    HeaderComponent
    },
  }
</script>

<style>
  img {
    width: 50%;
  }
</style>