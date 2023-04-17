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
          <img :src="reservation.accommodationImage" id="detailsImage" />
        </div>

        <h3 id="detailsAccommodation">{{ reservation.accommodation }}</h3>
        <p id="detailsDescription">
          {{ reservation.accommodationDesc }}
        </p>

        <p id="detailsCheckin">
          <span>Data de Check-in:</span> {{ formatDate(reservation.checkin) }}
        </p>
        <p id="detailsCheckout">
          <span>Data de Check-out:</span> {{ formatDate(reservation.checkout) }}
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
            <p>-> {{ item.name }}</p>
          </div>
        </div>
      </div>

      <div id="detailsSummary" class="escolha__modal__modal-content__resume">
        <h2>Resumo do seu pedido</h2>
        <p>
          {{ reservation.accommodation }}: R$
          {{ reservation.accommodationTotal }}
        </p>
        <p>Hóspedes: {{ reservation.qty }}</p>
        <p>Diárias: {{ reservation.rates }}</p>

        <div v-for="item in reservation.services" :key="item.id">
          <p>{{ item.name }}: R$ {{ item.price }}</p>
        </div>

        <div v-if="reservation.itemsBar">
          <p>Consumo -> R$ {{ reservation.itemsBar.toFixed(2) }}</p>
        </div>

        <hr>

        <Cupom />

        <hr>

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
import moment from "moment";
import router from "@/router";

export default {
  name: "ModalDetails",

  components: {
    Cupom,
  },

  data() {
    return {
      accommodation: {
        image: '',
        description: '',
        total: 0
      },
    };
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    },
    reservation() {
      return this.$store.state.reservation;
    },
    services() {
      return this.$store.state.servicesModule.services;
    },
    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    },
    login() {
      return this.$store.state.loginModule.login;
    },
    validate() {
      return this.$store.state.loginModule.validate;
    },
    applyCoupon() {
      return this.$store.state.applyCoupon;
    }
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
    async insertReservation() {
      const reservation = JSON.parse(localStorage.getItem("booking"));

      const sendReservation = {
        checkin: reservation.checkin,
        checkout: reservation.checkout,
        qty: reservation.qty,
        subTotal: reservation.total,
        total: reservation.total,
        accommodationId: reservation.accommodationId,
        couponId: this.applyCoupon.id ? this.applyCoupon.id : null,
        userId: this.validate.id,
        services: reservation.services,
      };

      if (this.applyCoupon.id)
        await this.$store.dispatch("couponsModule/useCoupon", this.applyCoupon.id);
      
      await this.$store.dispatch("reservationsModule/addReservation", sendReservation);

      this.$store.commit("initReservation");
    },
    confirmBook() {
      if (this.validate.permissionId !== 2) {
        if (
          window.confirm(
            "Atenção! Para confirmar a reserva, é necessário estar logado.\nDeseja ser redirecionado para a tela de login?"
          )
        )
          router.push("/login");
      } else {
        this.insertReservation();
        this.closeModal();
        router.push("/my-reservations");
      }
    },

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },

    async mounted() {
      document.addEventListener("click", this.onClick);
    }
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
/* --------------  RESPONSIVIDADE ----------------  */
/* MOBILE PORTRAIT */
@media (max-width: 414px) and (orientation: portrait) {
  .escolha__modal {
    &__modal-content {
      width: 90%;
      &__room {
        &__image {
          text-align: center;
        }
        & img {
          width: 100%;
        }
      }
    }
  }
}
</style>
