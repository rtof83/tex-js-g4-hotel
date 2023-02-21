<template>
  <HeaderComponent />

  <main class="container">
    <h1>Relatório de consumo</h1>
    <div>
      <h2 class="container__subtitle">Itens do Frigobar</h2>
      <table class="container__content">
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
        <tr v-for="item in dbProducts.frigobar" :key="item">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.qty }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>0</td>
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
            {{ item.qty }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>0</td>
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
            {{ item.qty }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>0</td>
        </tr>
      </table>
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
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/relatorio-consumo.css";
@import "@/assets/css/header.css";
@import "@/assets/css/footer.css";
</style>
