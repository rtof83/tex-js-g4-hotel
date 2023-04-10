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

          <label for="email">Email:</label>
          <input
            v-model="login.user.email"
            type="text"
            placeholder="Digite seu email"
            id="email"
            name="email"
          />

          <label for="password">Senha:</label>
          <input
            v-model="login.user.password"
            type="password"
            placeholder="Digite sua senha..."
            id="password"
            name="password"
          />
        </form>
        <div class="escolha__modal__modal-content__div">
          <button
            class="escolha__modal__modal-content__div__btn"
            @click="updateUser(login.user)"
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
      login: JSON.parse(localStorage.getItem("loginUser")),
    };
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    },

    allUsers() {
      return this.$store.state.usersModule.users;
    },
  },

  mounted() {
    document.addEventListener("click", this.onClick);
    this.$store.dispatch("usersModule/getUsers");
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    closeModal() {
      this.modal.showUserDetails = "none";
    },

    removeQuotesSpaces(str) {
      return str.replaceAll("'", "").replaceAll('"', "").trim();
    },

    notify() {
      toast("Dados alterados com sucesso!", {
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

    ifEmailAlreadyExists() {
      toast("Atenção! Email ou senha inválidos.", {
        autoClose: 3000,
      });
    },

    onClick(e) {
      const modal = document.getElementById("modalUserDetails");
      if (e.target === modal) this.closeModal();
    },

    updateUser(data) {
      // validação do input email
      if (
        !this.login.user.email.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ) {
        return this.wrongEmailRegex();
      }

      // validação do input password
      if (
        !this.login.user.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,15}$/
        )
      ) {
        return this.wrongPasswordRegex();
      }

      // checagem se o e-mail que quer cadastrar já existe no banco de dados
      const filteredEmail = this.removeQuotesSpaces(this.login.user.email);
      const result = this.allUsers.find((item) => item.email === filteredEmail);

      // caso o e-mail já exista
      if (result) return this.ifEmailAlreadyExists();

      // atualização do usuário
      this.$store.dispatch("usersModule/updateUser", data);
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
      font-size: 1.2rem;
      display: grid;
      place-items: center;

      & label {
        width: 50%;
        text-align: left;
        font-weight: bold;
      }

      & input {
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
