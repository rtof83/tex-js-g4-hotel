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
              Editar nome
            </button>
            <button @click="deleteUser(validate.id)">Deletar conta</button>
          </div>
        </div>
      </article>

      <article>
        <div class="container__user-reservations">
          <div v-if="!reservations">
            <div
              v-for="item in reservations"
              :id="item.idReservation"
              :key="item.id"
              class="my-reservations"
            >
              <p>ID Reserva: {{ item.idReservation }}</p>
              <p>Quarto: {{ item.accommodation }}</p>
              <p>Check in: {{ item.checkin }}</p>
              <p>Check out: {{ item.checkout }}</p>

              <!-- <div v-if="item.services.length">
        <br />
        <ul>
          Serviços adicionais:
          <li v-for="service in item.services" :key="service.id">
            {{ service.service }}
          </li>
        </ul>
        <br />
      </div> -->

              <!-- <p v-if="item.coupon">Cupom: {{ item.coupon }}</p>
      <p>Descontos aplicados: R$ {{ item.discount.toFixed(2) }}</p>
      <p>Total: R$ {{ item.total.toFixed(2) }}</p> -->
            </div>
          </div>
          <div class="container__user-reservations__else" v-else>
            <div>
              <h3>
                Parece que você ainda não tem reservas. Faça uma agora mesmo!
              </h3>
              <img src="../../src/assets/images/funny-dog.jpg" />
            </div>
            <div>
              <router-link to="/reservations">
                <button>Ir para reservas.</button>
              </router-link>
            </div>
          </div>
        </div>
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
import router from "@/router";

export default {
  name: "MyReservationsView",

  components: {
    HeaderComponent,
    FooterComponent,
    ModalUserDetails,
  },

  data() {
    return {
      // login: JSON.parse(localStorage.getItem("login")),
      // reservations: JSON.parse(localStorage.getItem("reservations")),
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

    reservations() {
      return this.$store.state.reservationsModule.reservations;
    },

    // myReservations() {
    //   const login = JSON.parse(localStorage.getItem("login"));
    //   const reservations = JSON.parse(localStorage.getItem("reservations"));
    //   if (reservations) {
    //     const myReservations = reservations.filter(
    //       (item) => item.email === login.email
    //     );
    //     return myReservations;
    //   } else {
    //     return false;
    //   }
    // },
  },

  methods: {
    showModal(modal) {
      this.modal[modal] = "block";
    },

    deleteUser(id) {
      this.$store.dispatch("usersModule/deleteUser", id);
      localStorage.removeItem("login");
      router.push("/login");
    },
  },

  beforeMount() {
    this.$store.dispatch("usersModule/getUserById", this.validate.id);
  },

  // mounted() {
  //   this.$store.dispatch(
  //     "reservationsModule/getReservationsByUser",
  //     this.login.id
  //   );
  // },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/myreservations.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
