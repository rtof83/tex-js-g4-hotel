<template>
  <div id="modalServices" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalServices"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h2>Serviços Adicionais</h2>
      </div>

      <div v-for="item in services" :key="item.id" id="services-content">
        <p>
          <input
            type="checkbox"
            :id="item.id"
            :checked="
              reservation.services.find((service) => service.id == item.id)
                ? true
                : false
            "
          />
          {{ item.name }}
          <img
            src="../../src/assets/images/arrow-right-alt1.png"
            class="escolha__modal__modal-content__arrow"
          />
          R$ {{ item.price }}
        </p>
      </div>

      <div class="escolha__modal__modal-content__div">
        <button
          @click="clearServices"
          id="clearServices"
          class="escolha__modal__modal-content__div__btn"
        >
          Limpar Seleção
        </button>
        <button
          @click="confirmServices"
          id="confirmServices"
          class="escolha__modal__modal-content__div__btn"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalServices",

  computed: {
    reservation() {
      return this.$store.state.reservation;
    },

    modal() {
      return this.$store.state.modal;
    },

    // dbServices() {
    //   return this.$store.getters.dbServices;
    // },

    services() {
      return this.$store.state.servicesModule.services;
    },

    checkServices() {
      return document.querySelectorAll('input[type="checkbox"]');
    }
  },

  mounted() {
    this.$store.dispatch('servicesModule/getServices');
    document.addEventListener("click", this.onClick);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    closeModal() {
      this.modal.showServices = "none";
    },

    clearServices() {
      this.checkServices.forEach((item) => (item.checked = false));
    },

    confirmServices() {
      this.reservation.services = [];

      this.checkServices.forEach((item) => {
        if (item.checked) {
          const service = this.services.find(service => service.id === +item.id);

          this.reservation.services.push({
            id: item.id,
            name: service.name,
            price: service.price
          });
        }
      });

      this.closeModal();
    },

    onClick(e) {
      const modal = document.getElementById("modalServices");

      if (e.target === modal) this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";
.escolha__modal {
  display: v-bind("modal.showServices");
}
</style>
