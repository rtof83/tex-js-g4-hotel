<template>
  <div class="content">
    <div class="panel">
      <h1>Lista Serviços</h1>
      <button @click="showModal({}, 'showService')">Adicionar Serviço</button>

      <hr />

      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Serviço</th>
            <th scope="col">Imagem</th>
            <th scope="col">Detalhes</th>
            <th scope="col">Preço</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in services" :key="item.id">
            <template v-if="!item.page">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.image }}</td>
              <td>{{ item.detail }}</td>
              <td>R$ {{ item.price }}</td>

              <td>
                <div class="actions">
                  <div
                    class="actions__item bi bi-pencil-fill"
                    @mouseover="(e) => hovering(e, 'bi-pencil')"
                    @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                    @click="showModal(item, 'showService')"
                  ></div>

                  <div
                    class="actions__item bi bi-trash3-fill"
                    @mouseover="(e) => hovering(e, 'bi-trash3')"
                    @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                    @click="deleteRecord(item.id)"
                  ></div>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ModalService :data="data" />
</template>

<script>
import ModalService from "@/components/ModalService.vue";

export default {
  name: "AdminServices",

  components: {
    ModalService
  },

  data() {
    return {
      data: {}
    };
  },

  computed: {
    services() {
      return this.$store.state.servicesModule.services;
    },

    modal() {
      return this.$store.state.modal;
    }
  },

  methods: {
    showModal(item, modal) {
      this.data = item;
      this.modal[modal] = "block";
    },

    hovering(e, action) {
      e.target.classList.remove(e.target.classList[2]);
      e.target.classList.add(action);
    },

    deleteRecord(id) {
      this.$store.dispatch("servicesModule/deleteService", id);
    },
  },

  mounted() {
    this.$store.dispatch("servicesModule/getServices");
  }
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.panel {
  width: 80%;
  text-align: center;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

h1 {
  text-shadow: 1px 1px 2px #838383cc;
  font-weight: 600;
}
</style>
