<template>
  <div v-if="validate.id" class="painel-usuario" id="painel">
      <div id="user">Olá, {{ validate.name }}!</div>
      <div id="email">email: {{ validate.email }}</div>
      <div class="painel-usuario__painel-sair">
      <button @click="logout" id="clearStorage">Sair</button>
      </div>

      <Countdown></Countdown>
    </div>
</template>

<script>
  import Countdown from '@/components/Countdown';
  import router from '@/router';

  export default {
    name: 'UserPanel',

    components: {
      Countdown
    },

    computed: {
      validate() {
        return this.$store.state.loginModule.validate;
      }
    },

    methods: {
      logout() {
        this.$store.commit('logout');
        router.push('/');
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
}
</script>

<style src="@/assets/scss/painel-usuario.scss" lang="scss" scoped />
