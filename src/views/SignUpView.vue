<template>
  <HeaderComponent />

  <main>
    <div class="main">
      <h1>Cadastre-se!</h1>

      <article class="main__login">
        <form>
          <label for="name">Nome:</label>
          <input
            v-model="user.name"
            type="text"
            placeholder="Digite seu nome"
            id="name"
            name="name"
          />

          <label for="email">Email:</label>
          <input
            v-model="user.email"
            type="text"
            placeholder="Digite seu email"
            id="email"
            name="email"
          />

          <label for="password">Senha:</label>
          <input
            v-model="user.password"
            type="password"
            placeholder="Digite sua senha"
            id="password"
            name="password"
          />

          <button @click="confirm" type="button" id="signup">Cadastrar</button>
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
  name: "SignUpView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      //
    };
  },

  computed: {
    allUsers() {
      return this.$store.state.usersModule.users;
    },

    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    removeQuotesSpaces(str) {
      return str.replaceAll("'", "").replaceAll('"', "").trim();
    },

    confirm() {
      // check blank
      if (
        this.user.name === "" ||
        this.user.email === "" ||
        this.user.password === ""
      )
        return alert(
          "Atenção! Os campos usuário e senha devem ser preenchidos."
        );

      const filteredEmail = this.removeQuotesSpaces(this.user.email);
      // removido item.password do método find abaixo
      const result = this.allUsers.find((item) => item.email === filteredEmail);

      if (result) return alert("Atenção! Email ou senha inválidos.");

      // POST
      this.$store.dispatch("usersModule/addUser", this.user);

      // redirect to login page
      window.location.href = "/#/login";
      
      // if (this.user.permissionId === 2) {
      //   window.location.href = "/#/login";
      // }

      // redirect to admin page
      // if (this.user.permissionId === 1) {
      //   window.location.href = "/#/admin";
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

#signup {
  margin-top: 2rem;
}
</style>
