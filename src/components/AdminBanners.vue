<template>
  <div class="content">
    <div class="panel">
      <h1>Cadastrar Banner</h1>
      <input v-model="image" type="text" placeholder="imagem" required>
      <input v-model="slogan" type="text" placeholder="slogan" required>
      <button @click="add">Salvar</button>
    </div>
  </div>

  <div v-for="item in banners" :key="item.id">
    {{ ('000' + item.id).slice(-3) }} -> {{ item.image }} -> {{ item.slogan }}
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