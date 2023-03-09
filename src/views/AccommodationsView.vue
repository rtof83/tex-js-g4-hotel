<template>
  <HeaderComponent />

  <main>
    <section class="container">
      <article>
        <div>
          <h2 class="container__subtitle">Nossas Acomodações</h2>
          <span class="container__detalhe"></span>
        </div>
        <div class="container__text">
          <p>
            Nós do Atlantic Hotel oferecemos quartos confortáveis e elegantes
            que são perfeitos para qualquer tipo de viajante. Os nossos quartos
            estão equipados com todas as comodidades de que necessita para uma
            estadia relaxante e agradável, incluindo uma cama confortável,
            acesso Wi-Fi de alta velocidade, uma televisão com todos os canais,
            um mini-frigorífico e uma suíte privativa. A seguir apresentamos
            nosso catálogo de quartos, escolha o que mais te agrada e reserve
            já!
          </p>
        </div>
      </article>
      <article class="products-container">
        <div
          v-for="item in accommodations"
          :key="item.id"
          class="products-container__card"
        >
          <router-link :to="`/accommodation/${item.id}`">
            <img
              class="products-container__card__product-image"
              :src="item.image"
              :alt="item.name"
            />
          </router-link>

          <h3>{{ item.name }}</h3>
          <router-link
            class="products-container__card__btn"
            :to="`/reservations/${item.id}`"
            >Reservar</router-link
          >
        </div>
      </article>
      <article v-if="accommodations.length > 0">
        <div>
          <h2 class="container__subtitle">Queridinho dos hóspedes</h2>
          <span class="container__detalhe"></span>
        </div>
        <div class="container__content">
          <div class="container__content__text">
            <p>
              {{ accommodations[2].description }}
            </p>
          </div>
          <div class="container__content__image">
            <img
              :src="accommodations[8].image"
              :alt="accommodations[8].name"
              :title="accommodations[8].name"
              width="600"
            />
          </div>
        </div>
      </article>
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
// import dbAccommodations from "@/store/db/dbAccommodations";

export default {
  name: "AccommodationsView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      // dbAccommodations,
    };
  },

  computed: {
    accommodations() {
      return this.$store.state.accommodationsModule.accommodations;
    },
  },

  mounted() {
    this.$store.dispatch("accommodationsModule/getAccommodations");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/quartos.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
