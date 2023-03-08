<template>
  <article class="cards">
    <div>
      <h3>Escolha o quarto:</h3>
      <span class="cards__detalhe"></span>
    </div>

    <div
      v-for="item in selectedAccommodations()"
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
              v-model="reservation.id"
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
      quartos: [],
      // dbAccommodations
    };
  },

  computed: {
    reservation() {
      return this.$store.state.reservation;
    },

    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    },

    // dbAccommodations() {
    //   return this.$store.getters.dbAccommodations;
    // },
  },

  methods: {
    selectedAccommodations() {
      const quartos = [];
      let limit = 3;

      if (this.id) {
        quartos.push(
          this.accommodations.find((item) => item.id == this.id)
        );
        quartos[0].checked = true;
        limit--;
      }

      for (let i = 0; i < limit; i++) {
        if (this.id != i) {
          quartos.push(this.accommodations[i]);
        }
      }
      return quartos;
    },
  },

  mounted() {
    this.$store.dispatch("accommodationsModule/getAccommodations");
    this.selectedAccommodations();
    // console.log(this.selectedAccommodations())
  },
};
</script>

<style scoped>
.image {
  width: 400px;
  height: 280px;
}
</style>
