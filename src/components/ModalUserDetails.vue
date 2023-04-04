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
        <h2>Atualizar dados cadastrais</h2>
      </div>

      <div>
        <form>
          <label for="name">Nome: </label>
          <input
            v-model="login.user.name"
            type="text"
            placeholder="Digite seu nome"
            id="name"
            name="name"
          />
        </form>
        <div class="escolha__modal__modal-content__div">
          <button
            class="escolha__modal__modal-content__div__btn"
            @click="updateUser(login.user.id, login.user.name)"
          >
            Salvar mudanças
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

    notify() {
      toast("Nome alterado com sucesso!", {
        autoClose: 3000,
      });
    },

    onClick(e) {
      const modal = document.getElementById("modalUserDetails");
      if (e.target === modal) this.closeModal();
    },

    updateUser(id, name) {
      this.$store.dispatch("usersModule/updateUser", { id, name });
      this.closeModal();
      this.notify();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showUserDetails");

  &__modal-content {
    & h1 {
      text-align: center;
    }

    & form {
      font-weight: bold;
      font-size: 1.2rem;

      & input {
        padding-left: 0.5rem;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }

    &__div {
      text-align: center;
      
      &__btn {
        font-size: 1rem;
      }
    }
  }
}
</style>
