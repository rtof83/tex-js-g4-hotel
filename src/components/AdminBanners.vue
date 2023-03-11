<template>
  <div class="content">
    <div class="panel">
      <h1>Cadastrar Banner</h1>
      <input v-model="image" type="text" placeholder="imagem" required>
      <input v-model="slogan" type="text" placeholder="slogan" required>
      <button @click="add">Salvar</button>

      <hr>

      <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Imagem</th>
              <th scope="col">Slogan</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>

          <tr v-for="item in banners" :key="item.id">

            <template v-if="!item.page">

            <th scope="row">{{ item.id }}</th>
            <td>{{ item.image }}</td>
            <td>{{ item.slogan }}</td>
            
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
    name: 'AdminBanners',

    data() {
      return {
        image: '',
        slogan: ''
      }
    },

    computed: {
      banners() {
        return this.$store.state.bannersModule.banners;
      }
    },

    methods: {
      add() {
        if (!this.image || !this.slogan)
          return alert('Atenção! Todos os campos devem ser preenchidos.');
          
        this.$store.dispatch('bannersModule/addBanner', { userId: 1, image: this.image, slogan: this.slogan });
        this.image = '';
        this.slogan = '';
      },

      hovering(e, action) {
        e.target.classList.remove(e.target.classList[2]);
        e.target.classList.add(action);
      }
    },

    mounted() {
      this.$store.dispatch('bannersModule/getBanners');
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