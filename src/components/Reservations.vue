<template>
  <div class="container__user-reservations">
    <div>
      <h2>Suas Reservas:</h2>
    </div>

    <div v-if="loading" class="center">
      <pulse-loader
        :loading="loading"
        :color="color"
        :size="size"
      ></pulse-loader>
    </div>

    <div v-if="reservations.length && !loading">
      <div
        v-for="item in reservations"
        :id="item.id"
        :key="item.id"
        class="container__user-reservations__div"
      >
        <div class="container__user-reservations__div__image">
          <img :src="item.accommodation.image" :alt="item.accommodation.name" />
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
          <p v-if="item.coupon === null">Reserva feita sem uso de cupom</p>
          <p v-else>
            Cupom utilizado:
            <span>{{ `${item.coupon.code} (${item.coupon.discount}%)` }}</span>
          </p>
        </div>
        <div class="container__user-reservations__div__btn">
          <button @click="deleteReservation(item.id)">Cancelar</button>
        </div>
      </div>
    </div>

    <div
      v-if="!reservations.length && !loading"
      class="container__user-reservations__else"
    >
      <div>
        <h3>Parece que você ainda não tem reservas. Faça uma agora mesmo!</h3>
        <img src="../../src/assets/images/funny-dog.jpg" />
      </div>
      <div>
        <router-link to="/reservations">
          <button>Ir para reservas.</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Reservations",
  components: {
    PulseLoader,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    reservations() {
      return this.$store.state.reservationsModule.reservations;
    },

    validate() {
      return this.$store.state.loginModule.validate;
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    deleteReservation(id) {
      if (
        confirm(
          "Esta ação irá excluir a reserva selecionada. Deseja continuar?"
        )
      )
        this.$store.dispatch("reservationsModule/deleteReservation", {
          id: id,
          userId: this.validate.id,
        });
    },
  },

  mounted() {
    setTimeout(async () => {
      await this.$store.dispatch(
        "reservationsModule/getReservationsByUser",
        this.validate.id
      );
      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/myreservations.scss";

.center {
  display: flex;
  justify-content: center;
}

/* --------------  RESPONSIVIDADE ----------------  */
/* MOBILE PORTRAIT */
@media (max-width: 414px) and (orientation: portrait) {
  .container__user-reservations {
    // max-width: 400px;
    &__div {
      flex-direction: column;

      &__image {
        border-right: none;
        border-bottom: 4px dotted black;
        line-height: normal;

        & img {
          width: 100%;
          height: 100%;
        }
      }

      &__text {
        min-width: 0;
      }

      &__btn {
        justify-content: center;

        & button {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
