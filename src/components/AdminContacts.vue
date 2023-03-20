<template>
  <div class="content">
    <div class="panel">
      <h1>Contatos</h1>

      <hr>

      <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col">Assunto</th>
              <th scope="col">Mensagem</th>
            </tr>
          </thead>
          <tbody>

          <tr v-for="item in contacts" :key="item.id">

            <template v-if="!item.page">

            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.subject }}</td>
            <td>{{ item.message }}</td>
            
            <td>
              <div class="actions">
                <div class="actions__item bi bi-pencil-fill"
                     @mouseover="(e) => hovering(e, 'bi-pencil')"
                     @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                     @click="updateTaskName(item.id, item.name)">
                </div>

                <div class="actions__item bi bi-trash3-fill"
                     @mouseover="(e) => hovering(e, 'bi-trash3')"
                     @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                     @click="deleteTask(item.id)">
                </div>
              </div>
            </td>

            </template>

          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminContacts',

    data() {
      return {
      }
    },

    computed: {
      contacts() {
        return this.$store.state.contactsModule.contacts;
      }
    },

    methods: {
      hovering(e, action) {
        e.target.classList.remove(e.target.classList[2]);
        e.target.classList.add(action);
      }
    },

    mounted() {
      this.$store.dispatch('contactsModule/getContacts');
    }
  }
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
    border-radius: .5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  h1 {
    text-shadow: 1px 1px 2px #838383cc;
    font-weight: 600;
  }
</style>