<template>
  <div class="center">
    {{ result }}
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Countdown",

  data() {
    return {
      countdownDate: "",
      result: "",
    };
  },

  computed: {
    validate() {
      return this.$store.state.loginModule.validate;
    },

    login() {
      return this.$store.state.loginModule.login;
    },
  },

  methods: {
    count() {
      setInterval(() => {
        const now = new Date().getTime();
        const distance = this.countdownDate - now;

        // hours
        // let hours = Math.floor((distance % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));

        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(this.count);
          this.result = "tempo esgotado";

          this.$store.commit("logout");
          router.push("/login");
        } else {
          // hours
          // this.result = hours + 'h ' + minutes + 'm ' + seconds + 's';

          this.result = minutes + "m " + seconds + "s";
        }
      }, 1000);
    },
  },

  mounted() {
    this.countdownDate = new Date(this.validate.exp * 1000).getTime();
    this.count();
  },
};
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
