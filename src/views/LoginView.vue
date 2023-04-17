<template>
  <div v-if="permission !== 'admin'">
    <HeaderComponent />
  </div>

  <main>
    <div class="main">
      <div>
        <h2 class="main__subtitle">Login</h2>
        <span class="main__detalhe"></span>
      </div>

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

          <router-link
            v-if="permission !== 'admin'"
            to="/signup"
            class="main__login__esqueceu-senha"
            >Não tem cadastro?</router-link
          >
          <div v-else><br /></div>

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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "LoginView",

  props: ["permission"],

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
    }
  },

  methods: {
    removeQuotesSpaces(str) {
      return str.replaceAll("'", "").replaceAll('"', "").trim();
    },

    ifBlank() {
      toast("Atenção! Os campos usuário e senha devem ser preenchidos.", {
        autoClose: 3000,
      });
    },

    wrongEmailRegex() {
      toast("Atenção! Formato de email inválido.", {
        autoClose: 3000,
      });
    },

    wrongPasswordRegex() {
      toast(
        "Atenção! Formato de senha inválido.",
        {
          autoClose: 3000,
        }
      );
    },

    wrongEmailAndPassword() {
      toast("Atenção! Email ou senha inválidos.", {
        autoClose: 3000,
      });
    },

    async confirm() {
      // check blank
      if (this.email === "" || this.password === "") {
        return this.ifBlank();
      }

      // validação do input email
      if (!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return this.wrongEmailRegex();
      }

      // validação do input password
      if (
        !this.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,15}$/
        )
      ) {
        return this.wrongPasswordRegex();
      }

      const filteredEmail = this.removeQuotesSpaces(this.email);

      // LOGIN
      await this.$store.dispatch("loginModule/login", {
        email: filteredEmail,
        password: this.password,
      });

      if (this.login === 401)
        return this.wrongEmailAndPassword();

      this.email = "";
      this.password = "";

      // redirect to my reservations
      if (this.login.user.permissionId === 2) router.push("/");

      // redirect to admin
      if (this.login.user.permissionId === 1) router.push("/admin");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
