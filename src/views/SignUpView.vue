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

          <label for="cep">CEP:</label>
          <input
            type="text"
            placeholder="Digite seu CEP"
            id="cep"
            name="cep"
            @keypress="mascaraCEP"
            @blur="viaCEP"
            v-model="cep"
          />

          <label></label>
          <input
            type="text"
            placeholder="Logradouro"
            id="logradouro"
            name="logradouro"
            :value="logradouro('logradouro')"
          />

          <label></label>
          <input
            v-model="user.address.streetNumber"
            type="number"
            placeholder="Número"
            id="numero"
            name="numero"
          />

          <label></label>
          <input
            type="text"
            placeholder="Bairro"
            id="bairro"
            name="bairro"
            :value="logradouro('bairro')"
          />

          <label></label>
          <input
            type="text"
            placeholder="Cidade"
            id="cidade"
            name="cidade"
            :value="logradouro('localidade')"
          />

          <label></label>
          <input
            type="text"
            placeholder="UF"
            id="uf"
            name="uf"
            :value="logradouro('uf')"
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
import axios from "axios";

export default {
  name: "SignUpView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      infoCep: "",
      cep: "",
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

    logradouro(item) {
      return this.infoCep[item];
    },

    mascaraCEP() {
      const mascara = "#####-###";
      let qtdCEP = this.cep.length;
      let outPut = mascara.substring(1, 0);
      let info = mascara.substring(qtdCEP);
      if (info.substring(0, 1) != outPut) {
        this.cep += info.substring(0, 1);
      }
    },

    limpaCEP(inputCep) {
      return inputCep.replace(/^\s|\s+$/g, "");
    },

    verificaCEP() {
      let lerCep = /^[0-9]{5}-[0-9]{3}$/;
      this.cep = this.limpaCEP(this.cep);
      if (this.cep.length > 0) {
        if (lerCep.test(this.cep)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    cepValido() {
      let retornaCep = this.verificaCEP();
      !retornaCep ? alert("CEP inválido!") : null;
      return retornaCep;
    },

    viaCEP() {
      this.cepValido();
      if (this.cepValido()) {
        try {
          axios
            .get(`https://viacep.com.br/ws/${this.cep}/json/`)
            .then((response) => {
              this.infoCep = response.data;
            });
        } catch (error) {
          console.log(error);
        }
      }
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

      this.user.address.streetName = this.infoCep.logradouro;
      this.user.address.neighborhood = this.infoCep.bairro;
      this.user.address.postCode = this.infoCep.cep;
      this.user.address.state = this.infoCep.uf;
      this.user.address.city = this.infoCep.localidade;

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

.main {
  height: 1300px;
}
</style>
