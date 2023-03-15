<template>
  <HeaderComponent />

  <main>
    <div class="main">
      <h1>Login</h1>

      <article class="main__login">
        <form>
          <label for="email">Email:</label>
          <input
            v-model="email"
            type="text"
            placeholder="Digite seu email"
            id="email"
            name="email"
          />

          <label for="password">Senha:</label>
          <input
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            id="password"
            name="password"
          />

          <router-link to="/signup" class="main__login__esqueceu-senha"
            >Esqueceu sua senha?</router-link
          >
          <button @click="confirm" type="button" id="login">Confirmar</button>
        </form>
      </article>
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "LoginView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    // dbLogin() {
    //   return this.$store.getters.dbLogin;
    // },

    users() {
      return this.$store.state.usersModule.users;
    },

    login() {
      return this.$store.state.loginModule.login;
    },
  },

  methods: {
    removeQuotesSpaces(str) {
      return str.replaceAll("'", "").replaceAll('"', "").trim();
    },

    confirm() {
      // check blank
      if (this.email === "" || this.password === "")
        return alert(
          "Atenção! Os campos usuário e senha devem ser preenchidos."
        );

      const filteredEmail = this.removeQuotesSpaces(this.email);

      // removido item.password do método find abaixo
      const result = this.users.find((item) => item.email === filteredEmail);

      if (!result) return alert("Atenção! Email ou senha inválidos.");

      // LOGIN
      this.$store.dispatch("loginModule/login", {
        email: filteredEmail,
        password: this.password,
      });

      // redirect to my reservations
        window.location.href = "/#/my-reservations";

      // ----------------------------->>>>>>>>>>>>>
      // api.defaults.headers.common = {'authorization': `Bearer ${userStorage.token}`};

      // redirect to home
      // if (this.login.permission === "user") {
      //   window.location.href = "/#/my-reservations";
      // }

      // redirect to admin page
      // if (this.login.permission === "admin") {
      //   window.location.href = "/#/admin2";
      // }
    },
  },

  beforeMount() {
    this.$store.dispatch("usersModule/getUsers");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
