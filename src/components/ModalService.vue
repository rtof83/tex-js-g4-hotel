<template>
  <div id="modalService" class="escolha__modal">
    <!-- Modal content -->
    <div class="escolha__modal__modal-content">
      <img
        src="../../src/assets/images/close.png"
        @click="closeModal"
        id="closeModalService"
        class="escolha__modal__modal-content__close"
      />
      <div>
        <h2>Cadastrar Serviço</h2>
      </div>

      <div>
        <form>
          <label for="name">Serviço: </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Insira o nome do serviço"
            id="name"
            name="name"
          />

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

          <label for="detail">Detalhes:</label>
          <textarea
            v-model="formData.detail"
            type="text"
            placeholder="Detalhe o serviço"
            id="detail"
            name="detail"
            cols="30"
            rows="8">
          </textarea>

          <label for="image">Preço: </label>
          <input
            v-model="formData.price"
            type="number"
            step=".01"
            placeholder="Insira o preço"
            id="price"
            name="price"
          />
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
  name: "ModalService",

  props: ['data'],

  data() {
    return {
      formData: {
        id: 0,
        name: '',
        image: '',
        detail: '',
        price: 0
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
      this.formData.image = this.data.image;
      this.formData.detail = this.data.detail;
      this.formData.price = this.data.price;
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },

  methods: {
    save() {
      if (!this.formData.name ||
          !this.formData.image ||
          !this.formData.detail ||
          !this.formData.price) return this.notify();

      const method = this.formData.id ? "updateService" : "addService";
      this.$store.dispatch(`servicesModule/${method}`, this.formData);

      this.closeModal();
    },

    notify() {
      toast("Atenção! Todos os campos devem ser preenchidos.", {
        autoClose: 3000,
      });
    },

    closeModal() {
      this.modal.showService = "none";
    },

    onClick(e) {
      const modal = document.getElementById("modalService");
      if (e.target === modal) this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/modal.scss";

.escolha__modal {
  display: v-bind("modal.showService");

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
