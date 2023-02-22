<template>
  <HeaderComponent />

  <main class="container">
    <h1>Relatório de Consumo</h1>
    <div>
      <h2 class="container__subtitle">Itens do Frigobar</h2>
      <table class="container__content">
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
        <tr v-for="item in dbProducts.frigobar" :key="item.name">
          <td>
            {{ item.name }}
          </td>
          <td>
            <input v-model="item.qty" type="number" min="1">
          </td>
          <td>
            R$ {{ item.price.toFixed(2) }}
          </td>
          <td>R$ {{ (item.price * item.qty).toFixed(2) }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h2 class="container__subtitle">Itens da Cesta</h2>
      <table class="container__content">
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
        <tr v-for="item in dbProducts.cesta" :key="item">
          <td>
            {{ item.name }}
          </td>
          <td>
            <input v-model="item.qty" type="number" min="1">
          </td>
          <td>
            R$ {{ item.price.toFixed(2) }}
          </td>
          <td>R$ {{ (item.price * item.qty).toFixed(2) }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h2 class="container__subtitle">Itens do Bar</h2>
      <table class="container__content">
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
        <tr v-for="item in dbProducts.bar" :key="item">
          <td>
            {{ item.name }}
          </td>
          <td>
            <input v-model="item.qty" type="number" min="1">
          </td>
          <td>
            R$ {{ item.price.toFixed(2) }}
          </td>
          <td>R$ {{ (item.price * item.qty).toFixed(2) }}</td>
        </tr>
      </table>
    </div>

    <div class="save">
      <div class="total">Total: R$ {{ total.toFixed(2) }}</div>
      <button @click="save">Salvar</button>
    </div>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import dbProducts from "@/store/db/dbProducts";

export default {
  name: "ReportView",
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      dbProducts,
      total: 0
    };
  },

  watch: {
    dbProducts: {
      handler() {
        Object.keys(dbProducts).forEach((key) => {
          dbProducts[key].map(item => this.total += item.price * item.qty);
        });
      },

      deep: true
    }
  },

  methods: {
    save() {
      localStorage.setItem('report', JSON.stringify({ totalItems: this.total }));
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/relatorio-consumo.css";
@import "@/assets/css/header.css";
@import "@/assets/css/footer.css";

.save {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  margin-top: -3rem;
  gap: 1rem;
}

button {
  padding: .3rem 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
}

.total {
  font-weight: 600;
  font-size: 2rem;
}
</style>
