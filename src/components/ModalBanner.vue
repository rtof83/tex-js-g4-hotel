<template>
  <div id="modalBanner" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalBanner"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h2>Cadastrar Banner</h2>
      </div>

      <div>
        <form>
          <label for="image">Imagem: </label>
          <textarea
            v-model="formData.image"
            type="text"
            placeholder="Insira o link da imagem"
            id="image"
            name="image"
            col="30"
            rows="3"
          >
          </textarea>

          <label for="slogan">Slogan:</label>
          <textarea
            v-model="formData.slogan"
            type="text"
            placeholder="Digite o slogan"
            id="slogan"
            name="slogan"
            cols="30"
            rows="5">
          </textarea>
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
  name: "ModalBanner",

  props: ['data'],

  data() {
    return {
      formData: {
        id: 0,
        image: '',
        slogan: ''
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
      this.formData.image = this.data.image;
      this.formData.slogan = this.data.slogan;
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    save() {
      if (!this.formData.image || !this.formData.slogan) return this.notify();

      const method = this.formData.id ? "updateBanner" : "addBanner";
      this.$store.dispatch(`bannersModule/${method}`, this.formData);

      this.closeModal();
    },

    notify() {
      toast("Atenção! Todos os campos devem ser preenchidos.", {
        autoClose: 3000,
      });
    },

    closeModal() {
      this.modal.showBanner = "none";
    },

    onClick(e) {
      const modal = document.getElementById("modalBanner");
      if (e.target === modal) this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showBanner");

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

      & input, textarea {
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
