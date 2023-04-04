<template>
  <HeaderComponent />

  <main>
    <div class="main">
      <div>
        <h2 class="main__subtitle">Contato</h2>
        <span class="main__detalhe"></span>
      </div>

      <article class="main__login">
        <form action="/public" method="get">
          <label for="name">Nome:</label>
          <input
            v-model="contact.name"
            type="text"
            placeholder="Digite seu nome completo"
            id="name"
            name="name"
            required
          />

          <label for="email">Email:</label>
          <input
            v-model="contact.email"
            type="email"
            placeholder="Digite seu melhor email"
            id="email"
            name="email"
            required
          />

          <label for="phone">Telefone:</label>
          <input
            v-model="contact.phone"
            type="tel"
            placeholder="Digite seu telefone"
            id="phone"
            name="phone"
            required
          />

          <label for="subject">Assunto:</label>
          <select v-model="contact.subject" name="subject" id="subject">
            <option value="CancelamentoDeReserva">
              Cancelamento de Reserva
            </option>
            <option value="Ouvidoria">Ouvidoria</option>
            <option value="DepartamentoFinanceiro">
              Departamento Financeiro
            </option>
          </select>

          <label for="message">Mensagem:</label>
          <textarea
            v-model="contact.message"
            placeholder="Digite sua mensagem"
            name="message"
            id="message"
            cols="30"
            rows="10"
          ></textarea>

          <button @click="confirm" type="button">Confirmar</button>
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
  name: "ContactView",
  components: {
    HeaderComponent,
    FooterComponent,
  },

  computed: {
    contact() {
      return this.$store.state.contact;
    },
  },

  methods: {
    confirm() {
      // check blank
      if (
        this.contact.name === "" ||
        this.contact.email === "" ||
        this.contact.phone === "" ||
        this.contact.subject === "" ||
        this.contact.message === ""
      )
        return alert(
          "Atenção! Os campos usuário e senha devem ser preenchidos."
        );

      // POST
      this.$store.dispatch("contactsModule/addContact", this.contact);
      alert("Mensagem enviada com sucesso!");
    },
  },

  // beforeMount() {
  //   this.$store.dispatch("contactsModule/getContacts");
  // },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/contato.scss";
@import "@/assets/scss/header.scss";
@import "@/assets/scss/footer.scss";
</style>
