<template>
  <HeaderComponent />

  <h1>Minhas Reservas</h1>

  <div>
    <h3>Usuário: {{ login.name }}</h3>
    <p>{{ nameInput.name }}</p>
    <form>
      <label for="name">Nome:</label>
      <input id="name" type="text" v-model="nameInput.name" />
    </form>
    <button @click="updateUser(login.id, nameInput)">Editar dados</button>
    <button @click="deleteUser(login.id)">Deletar usuário</button>
  </div>

  <div v-if="reservations">
    <div
      v-for="item in reservations"
      :id="item.idReservation"
      :key="item.id"
      class="my-reservations"
    >
      <p>ID Reserva: {{ item.idReservation }}</p>
      <p>Quarto: {{ item.accommodation }}</p>
      <p>Check in: {{ item.checkin }}</p>
      <p>Check out: {{ item.checkout }}</p>

      <div v-if="item.services.length">
        <br />
        <ul>
          Serviços adicionais:
          <li v-for="service in item.services" :key="service.id">
            {{ service.service }}
          </li>
        </ul>
        <br />
      </div>

      <p v-if="item.coupon">Cupom: {{ item.coupon }}</p>
      <p>Descontos aplicados: R$ {{ item.discount.toFixed(2) }}</p>
      <p>Total: R$ {{ item.total.toFixed(2) }}</p>
    </div>
  </div>
  <div v-else><h3>Usuário sem reservas.</h3></div>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "MyReservationsView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      login: JSON.parse(localStorage.getItem("login")),
      reservations: JSON.parse(localStorage.getItem("reservations")),
      nameInput: {
        name: "",
      },
    };
  },

  methods: {
    updateUser(id, data) {
      this.$store.dispatch("usersModule/updateUser", { id, data });
      alert("Nome alterado com sucesso!");
    },

    deleteUser(id) {
      this.$store.dispatch("usersModule/deleteUser", id);
      localStorage.removeItem("login");
      window.location.href = "/#/login";
    },
  },

  computed: {
    // myReservations() {
    //   const login = JSON.parse(localStorage.getItem("login"));
    //   const reservations = JSON.parse(localStorage.getItem("reservations"));
    //   if (reservations) {
    //     const myReservations = reservations.filter(
    //       (item) => item.email === login.email
    //     );
    //     return myReservations;
    //   } else {
    //     return false;
    //   }
    // },
  },
};
</script>

<style>
.my-reservations {
  margin: 0 2rem 2rem;
}
</style>
