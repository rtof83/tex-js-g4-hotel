<template>
  <HeaderComponent />

  <main>
    <section class="container">
      <article>
        <div>
          <h2 class="container__subtitle">Minhas Reservas</h2>
          <span class="container__detalhe"></span>
        </div>
        <div class="container__user-info">
          <h3>
            Bem vindo,
            <span> {{ validate.name }} </span>! O que deseja fazer?
          </h3>
          <div class="container__user-info__buttons">
            <button @click="showModal('showUserDetails')" id="UserDetails">
              Editar dados
            </button>
            <button @click="deleteUser(validate.id)">Deletar conta</button>
          </div>
        </div>
      </article>

      <article>
        <component v-bind:is="component" />
      </article>

      <ModalUserDetails />
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ModalUserDetails from "../components/ModalUserDetails.vue";
import Reservations from "@/components/Reservations.vue";
import { shallowRef } from "vue";
import router from "@/router";

export default {
  name: "MyReservationsView",

  components: {
    HeaderComponent,
    FooterComponent,
    ModalUserDetails,
    Reservations,
  },

  data() {
    return {
      component: shallowRef(Reservations),
    };
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    },

    validate() {
      return this.$store.state.loginModule.validate;
    },

    // user() {
    //   return this.$store.state.usersModule.users;
    // },
  },

  methods: {
    // reservations() {
    //   this.component = Reservations;
    // },

    showModal(modal) {
      this.modal[modal] = "block";
    },

    deleteUser(id) {
      this.$store.dispatch("usersModule/deleteUser", id);
      localStorage.removeItem("login");
      router.push("/login");
    },
  },

  // async mounted() {
  //   await this.$store.dispatch(
  //     "reservationsModule/getReservationsByUser",
  //     this.validate.id
  //   );
  // },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/myreservations.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
