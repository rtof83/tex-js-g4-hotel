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
        <div class="container__user-reservations">
          <div>
            <h2>Suas Reservas:</h2>
          </div>
          <div v-if="reservations.length">
            <div
              v-for="item in reservations"
              :id="item.id"
              :key="item.id"
              class="container__user-reservations__div"
            >
              <div class="container__user-reservations__div__image">
                <img
                  :src="item.accommodation.image"
                  :alt="item.accommodation.name"
                />
              </div>
              <div class="container__user-reservations__div__text">
                <p>{{ item.accommodation.name }}</p>
                <ul>
                  <li>📅 Check-in: {{ formatDate(item.checkin) }}</li>
                  <li>📅 Check-out: {{ formatDate(item.checkout) }}</li>
                </ul>
                <p>Número de Hóspedes: {{ item.qty }}</p>
                <p>
                  Valor Total: <span>R$ {{ item.total }}</span>
                </p>
                <p v-if="item.coupon === null">
                  Reserva feita sem uso de cupom
                </p>
                <p v-else>
                  Cupom utilizado: <span>{{ item.coupon }}</span>
                </p>
              </div>
              <div class="container__user-reservations__div__btn">
                <button>Cancelar</button>
              </div>
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
import moment from "moment";

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
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    showModal(modal) {
      this.modal[modal] = "block";
    },

    deleteUser(id) {
      this.$store.dispatch("usersModule/deleteUser", id);
      localStorage.removeItem("login");
      router.push("/login");
    },
  },

  // beforeMount() {
  //   this.$store.dispatch("usersModule/getUserById", this.validate.id);
  // },

  async mounted() {
    await this.$store.dispatch(
      "reservationsModule/getReservationsByUser",
      this.validate.id
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/myreservations.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
