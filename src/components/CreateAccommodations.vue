<template>
  <article class="cards">
    <div>
      <h3>Escolha o quarto:</h3>
      <span class="cards__detalhe"></span>
    </div>

    <div
      v-for="item in selectedAccommodations"
      :key="item.id"
      class="cards__images"
      id="cards"
    >
      <div class="cards__images__card">
        <img
          class="image"
          :src="item.image"
          :alt="item.name"
          :title="item.name"
        />

        <div class="cards__images__card__info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>R$ {{ item.price }}</p>

          <div>
            <input
              v-model="reservation.accommodationId"
              :id="item.id"
              type="radio"
              name="quarto"
              :value="item.id"
              :checked="item.checked"
            />
            <label :for="item.id">Selecionar {{ item.name }}</label>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "CreateAccommodations",
  props: ["id"],

  data() {
    return {
      selectedAccommodations: [],
    };
  },

  computed: {
    reservation() {
      return this.$store.state.reservation;
    },

    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    },
  },

  watch: {
    accommodations() {
      let limit = 3;

      if (this.id) {
        this.selectedAccommodations.push(
          this.accommodations.find((item) => item.id == this.id)
        );
        this.selectedAccommodations[0].checked = true;
        limit--;
      }

      for (let i = 0; i < limit; i++) {
        if (this.id != i) {
          this.selectedAccommodations.push(this.accommodations[i]);
        }
      }
    },
  },

  methods: {},

  beforeMount() {
    this.$store.dispatch("accommodationsModule/getAccommodations");
  },

  mounted() {
    const bookingStorage = JSON.parse(localStorage.getItem("booking"));

    if (bookingStorage) {
      this.reservation.accommodationId = bookingStorage.accommodationId;
      this.reservation.accommodation = bookingStorage.accommodation;
      this.reservation.checkin = bookingStorage.checkin;
      this.reservation.checkout = bookingStorage.checkout;
      this.reservation.qty = bookingStorage.qty;
      this.reservation.services = bookingStorage.services;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/create-accomodations.scss";
</style>
