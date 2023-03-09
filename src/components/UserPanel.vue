<template>
  <div v-if="login.auth" class="painel-usuario" id="painel">
      <div id="user">Olá, {{ login.name }}!</div>
      <!-- <div id="email">email: {{ login.email }}</div> -->
      <div class="painel-usuario__painel-sair">
        <button @click="logout" id="clearStorage">Sair</button>
      </div>

      <Countdown></Countdown>
    </div>
</template>

<script>
  import Countdown from '@/components/Coundown';

  export default {
    name: 'UserPanel',

    methods: {
      logout() {
        this.$store.commit('initLogin')
      }
  },

  components: {
    Countdown
  },

  data() {
    return {
      loginStorage: JSON.parse(localStorage.getItem('login')),
      reservationsStorage: JSON.parse(localStorage.getItem('reservations'))
    }
  },

  computed: {
    login() {
      return this.$store.state.loginModule.login;
    }
  },

  // watch: {
  //   login: {
  //     handler() {
  //       Object.keys(dbProducts).forEach((key) => {
  //         dbProducts[key].map(item => this.total += item.price * item.qty);
  //       });
  //     },

  //     deep: true
  //   }
  // },

  mounted() {
    if (this.loginStorage) {
      this.login.user = this.loginStorage.user;
      this.login.email = this.loginStorage.email;
    };
  }
}
</script>

<style src="@/assets/scss/painel-usuario.scss" lang="scss" scoped />
