<template>
  <div id="modalUserDetails" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalUserDetails"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h1>Atualizar dados cadastrais</h1>
      </div>

      <div>
        <form>
          <label for="name">Nome: </label>
          <input
            v-model="login.name"
            type="text"
            placeholder="Digite seu nome"
            id="name"
            name="name"
          />
        </form>
        <div class="escolha__modal__modal-content__div">
          <button
            class="escolha__modal__modal-content__div__btn"
            @click="updateUser(login.id, login.name)"
          >
            Salvar mudanças
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalUserDetails",

  data() {
    return {
      login: JSON.parse(localStorage.getItem("login")),
    };
  },

  computed: {
    modal() {
      return this.$store.state.modal;
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
      this.modal.showUserDetails = "none";
    },

    onClick(e) {
      const modal = document.getElementById("modalUserDetails");
      if (e.target === modal) this.closeModal();
    },

    updateUser(id, data) {
      this.$store.dispatch("usersModule/updateUser", { id, data });
      this.closeModal();
      alert("Nome alterado com sucesso!");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showUserDetails");

  &__modal-content__div {
    text-align: center;
  }
}
</style>
