<template>
  <div id="modalUser" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalUser"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h2>Cadastrar Usuário</h2>
      </div>

      <div>
        <form>
          <label for="name">Usuário: </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Insira o nome do usuário"
            id="name"
            name="name"
          />

          <label for="email">Email: </label>
          <input
            v-model="formData.email"
            type="text"
            placeholder="Insira o email"
            id="email"
            name="email"
          />

          <label for="password">Senha:</label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Insira a senha"
            id="password"
            name="password"
          />

          <label for="image">Tipo Permissão: </label>
          <select v-model="formData.permissionId">
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
        </form>
        <div class="escolha__modal__modal-content__div">
          <button
            class="escolha__modal__modal-content__div__btn"
            @click="save"
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
  name: "ModalUser",

  props: ['data'],

  data() {
    return {
      formData: {
        id: 0,
        name: '',
        email: '',
        password: '',
        permissionId: 0
      }
    };
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    }
  },

  mounted() {
    document.addEventListener("click", this.onClick);
  },

  watch: {
    data() {
      this.formData.id = this.data.id;
      this.formData.name = this.data.name;
      this.formData.email = this.data.email;
      this.formData.password = this.data.password;
      this.formData.permissionId = this.data.permissionId;
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    save() {
      if (!this.formData.name ||
          !this.formData.email ||
          !this.formData.password ||
          !this.formData.permissionId) return this.notify();

      if (!this.formData.email.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return this.wrongEmailRegex();
      };

      if (!this.formData.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,15}$/)) {
        return this.wrongPasswordRegex();
      };

      const method = this.formData.id ? "updateUser" : "addUser";
      this.$store.dispatch(`usersModule/${method}`, this.formData);

      this.closeModal();
    },

    notify() {
      toast("Atenção! Todos os campos devem ser preenchidos.", {
        autoClose: 3000,
      });
    },

    wrongEmailRegex() {
      toast("Atenção! Formato de email inválido.", {
        autoClose: 3000,
      });
    },

    wrongPasswordRegex() {
      toast(
        "A senha deve ter entre 8 a 15 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.",
        {
          autoClose: 3000,
        }
      );
    },

    closeModal() {
      this.modal.showUser = "none";
    },

    onClick(e) {
      const modal = document.getElementById("modalUser");
      if (e.target === modal) this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showUser");

  &__modal-content {
    & h1 {
      text-align: center;
    }

    & form {
      font-size: 1.2rem;
      display: grid;
      place-items: center;

      & label {
        width: 50%;
        text-align: left;
        font-weight: bold;
      }

      & input, select {
        font-weight: bold;
        font-size: 1.2rem;
        width: 50%;
        padding: 0.5rem;
        border-radius: 0.3rem;
        border: 1px solid black;
        margin-bottom: 1rem;

        &::placeholder {
          font-style: italic;
        }
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

/* --------------  RESPONSIVIDADE ----------------  */
/* MOBILE PORTRAIT */
@media (max-width: 414px) and (orientation: portrait) {
  .escolha__modal {
    &__modal-content {
      width: 90%;

      & form {
        & label {
          width: 80%;
        }

        & input {
          width: 80%;
        }
      }
    }
  }
}
</style>
