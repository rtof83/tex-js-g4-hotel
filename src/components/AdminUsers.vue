<template>
  <div class="content">
    <div class="panel">
      <h1>Lista Usuários</h1>
      <button @click="showModal({}, 'showUser')">Adicionar Usuário</button>

      <hr />

      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Usuário</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo Permissão</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.id">
            <template v-if="!item.page">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.permissionId === 1 ? 'Admin' : 'User' }}</td>

              <td>
                <div class="actions">
                  <div
                    class="actions__item bi bi-pencil-fill"
                    @mouseover="(e) => hovering(e, 'bi-pencil')"
                    @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                    @click="showModal(item, 'showUser')"
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

  <ModalUser :data="data" />
</template>

<script>
import ModalUser from "@/components/ModalUser.vue";

export default {
  name: "AdminUsers",

  components: {
    ModalUser
  },

  data() {
    return {
      data: {}
    };
  },

  computed: {
    users() {
      return this.$store.state.usersModule.users;
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
      if (window.confirm('Tem certeza que deseja excluir este registro?'))
        this.$store.dispatch("usersModule/deleteUser", id);
    },
  },

  mounted() {
    this.$store.dispatch("usersModule/getUsers");
  }
};
</script>

<style scoped lang="scss">
  @import "@/assets/scss/admin-component.scss";
</style>
