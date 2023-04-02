<template>
  <div v-if="permission !== 'admin'">
    <HeaderComponent />
  </div>

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
            @keydown.enter="confirm"
          />

          <label for="password">Senha:</label>
          <input
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            id="password"
            name="password"
            @keydown.enter="confirm"
          />

          <router-link v-if="permission !== 'admin'" to="/signup" class="main__login__esqueceu-senha"
            >Não tem cadastro?</router-link
          >
          <div v-else><br></div>

          <button @click="confirm" type="button" id="login">Confirmar</button>
        </form>
      </article>
    </div>
  </main>

  <div v-if="permission !== 'admin'">
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import router from "@/router";

export default {
  name: "LoginView",

  props: ['permission'],

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
    login() {
      return this.$store.state.loginModule.login;
    },
  },

  methods: {
    removeQuotesSpaces(str) {
      return str.replaceAll("'", "").replaceAll('"', "").trim();
    },

    async confirm() {
      // check blank
      if (this.email === "" || this.password === "")
        return alert(
          "Atenção! Os campos usuário e senha devem ser preenchidos."
        );

      const filteredEmail = this.removeQuotesSpaces(this.email);

      // removido item.password do método find abaixo
      // const result = this.users.find((item) => item.email === filteredEmail);

      // if (!result) return alert("Atenção! Email ou senha inválidos.");

      // LOGIN
      await this.$store.dispatch("loginModule/login", {
        email: filteredEmail,
        password: this.password,
      });

      if (this.login === 401)
        return alert("Atenção! Email ou senha inválidos.");

      this.email = '';
      this.password = '';

      // redirect to my reservations
      if (this.login.user.permissionId === 2)
        router.push('/my-reservations');
        // window.location.href = "/#/my-reservations";

      // redirect to admin
      if (this.login.user.permissionId === 1)
        router.push('/admin2');

      // redirect to my reservations
      // if (this.login[0].permissionId === 2) {
      //   window.location.href = "/#/my-reservations";
      // }

      // redirect to admin page
      // if (this.login.permission === "admin") {
      //   window.location.href = "/#/admin2";
      // }
    },
  },

  beforeMount() {
    // this.$store.dispatch("usersModule/getUsers");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
