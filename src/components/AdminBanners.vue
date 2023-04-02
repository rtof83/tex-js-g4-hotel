<template>
  <div class="content">
    <div class="panel">
      <h1>Cadastrar Banner</h1>
      <input ref="image" v-model="image" type="text" placeholder="imagem" required>
      <input v-model="slogan" type="text" placeholder="slogan" required>
      <button v-if="update" @click="cancelUpdate">cancelar</button>
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
                     @click="updateRecord(item.id, item.image, item.slogan)">
                </div>

                <div class="actions__item bi bi-trash3-fill"
                     @mouseover="(e) => hovering(e, 'bi-trash3')"
                     @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                     @click="deleteRecord(item.id)">
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
        slogan: '',
        update: 0
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

        const data = { image: this.image, slogan: this.slogan }
        let method = 'addBanner';

        if (this.update) {
          data.id = this.update;
          method = 'updateBanner';
          this.update = 0;
        };

        this.$store.dispatch(`bannersModule/${method}`, data);
        this.image = '';
        this.slogan = '';
      },

      hovering(e, action) {
        e.target.classList.remove(e.target.classList[2]);
        e.target.classList.add(action);
      },

      updateRecord(id, image, slogan) {
        this.update = id;
        this.image = image;
        this.slogan = slogan;
        this.$refs.image.focus();
      },

      cancelUpdate() {
        this.update = 0;
        this.image = '';
        this.slogan = '';
      },

      deleteRecord(id) {
        this.$store.dispatch('bannersModule/deleteBanner', id);
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