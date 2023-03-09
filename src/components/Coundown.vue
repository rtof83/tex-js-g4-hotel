<template>
  {{ result }}
</template>

<script>
  export default {
    name: 'Countdown',

    data() {
      return {
        countdownDate: '',
        result: ''
      }
    },

    computed: {
      login() {
        return this.$store.state.loginModule.login;
      }
    },

    methods: {
      count() {
        setInterval(() => {
          const now = new Date().getTime();
          const distance = this.countdownDate - now;

          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          if (distance < 0) {
            clearInterval(this.count);
            this.result = 'tempo esgotado';
            
            // setUser([]);
            // localStorage.clear();
            // navigate('/');
            this.login.auth = false;
          } else {
            this.result = minutes + "m " + seconds + "s";
          }
        }, 1000);
      }
    },

    mounted() {
      this.$store.dispatch("loginModule/login");
      this.countdownDate = new Date(this.login.exp * 1000).getTime();
      this.count();
    }
  }
</script>
