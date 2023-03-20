<template>
  <div id="modalDetails" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalDetails"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h2>Detalhes da Reserva</h2>
      </div>

      <div class="escolha__modal__modal-content__room">
        <div class="escolha__modal__modal-content__room__image">
          <img
            :src="
              require(`../assets/images/${
                dbAccommodations[reservation.id].image
              }.jpg`)
            "
            id="detailsImage"
          />
        </div>
        <h3 id="detailsAccommodation">{{ reservation.accommodation }}</h3>
        <p id="detailsDescription">
          {{ dbAccommodations[reservation.id].description }}
        </p>

        <p id="detailsCheckin">
          <span>Data de Check-in:</span> {{ reservation.checkin }}
        </p>
        <p id="detailsCheckout">
          <span>Data de Check-out:</span> {{ reservation.checkout }}
        </p>
        <p id="detailsQty"><span>Hóspedes:</span> {{ reservation.qty }}</p>

        <div v-if="!reservation.services.length">
          <h3>Nenhum serviço adicional</h3>
        </div>
        <div v-else>
          <h3>Serviços adicionais</h3>
          <div
            v-for="item in reservation.services"
            :key="item.id"
            id="detailsServices"
          >
            <p>{{ item.service }}</p>
          </div>
        </div>
        <!-- Consumo na tela de reservas ? -->
        <!-- <div v-if="!reservation.itemsBar">
          <h3>Nenhum consumo</h3>
        </div> -->
      </div>

      <div id="detailsSummary" class="escolha__modal__modal-content__resume">
        <h2>Resumo do seu pedido</h2>
        <p>
          {{ reservation.accommodation }}: R$
          {{ reservation.total.toFixed(2) }}
        </p>
        <p>Hóspedes: {{ reservation.qty }}</p>
        <p>Diárias: {{ reservation.rates }}</p>

        <div v-for="item in reservation.services" :key="item.id">
          <p>{{ item.service }}: R$ {{ item.price.toFixed(2) }}</p>
        </div>

        <div v-if="reservation.itemsBar">
          <p>Consumo -> R$ {{ reservation.itemsBar.toFixed(2) }}</p>
        </div>

        <Cupom />
        <!-- validar se o cupom já foi utilizado (localstorage) -->

        <p>TOTAL: R$ {{ reservation.total.toFixed(2) }}</p>
        <button
          class="escolha__modal__modal-content__div__btn"
          @click="confirmBook"
          id="confirmBook"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cupom from "@/components/Coupon.vue";
export default {
  name: "ModalDetails",

  components: {
    Cupom,
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    },

    reservation() {
      return this.$store.state.reservation;
    },

    dbServices() {
      return this.$store.getters.dbServices;
    },

    dbAccommodations() {
      return this.$store.getters.dbAccommodations;
    },

    login() {
      return this.$store.state.loginModule.login;
    },
  },

  mounted() {
    document.addEventListener("click", this.onClick);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    closeModal() {
      this.modal.showDetails = "none";
    },

    onClick(e) {
      const modal = document.getElementById("modalDetails");

      if (e.target === modal) this.closeModal();
    },

    init() {
      this.$store.commit("initReservation");
    },

    insertReservation(email) {
      const reservations = JSON.parse(localStorage.getItem("reservations"));
      const newReservation = reservations ? [...reservations] : [];

      const myReservation = this.reservation;
      myReservation.idReservation = new Date().getTime();
      myReservation.email = email;

      const coupon = JSON.parse(localStorage.getItem("coupon"));
      if (myReservation.discount)
        myReservation.coupon = coupon.coupon.toUpperCase();

      newReservation.push(myReservation);
      localStorage.setItem("reservations", JSON.stringify(newReservation));

      this.$store.dispatch("reservationsModule/addReservation", myReservation);
    },

    confirmBook() {
      const login = JSON.parse(localStorage.getItem("login"));

      if (!login) {
        if (
          window.confirm(
            "Atenção! Para confirmar a reserva, é necessário autenticação.\nDeseja ser redirecionado para a tela de login?"
          )
        )
          window.location.href = "/#/login";
      } else {
        this.insertReservation(login.email);
        this.init();
        this.closeModal();
        window.location.href = "/#/my-reservations";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showDetails");

  &__modal-content {
    &__room {
      &__image {
        text-align: center;
      }
      & img {
        width: 70%;
      }

      & h3 {
        text-align: center;
        font-size: 2rem;
      }
      & p {
        text-align: justify;
      }

      & span {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
}
</style>
