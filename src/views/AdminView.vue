<template>
  <!-- <HeaderComponent></HeaderComponent> -->

  <div class="admin-content">
    <div class="admin-content__side-nav">
      <a @click="banners">Banners</a>
      <a @click="accommodations">Acomodações</a>
      <a @click="contacts">Contatos</a>
    </div>

    <div class="admin-content__main">
      <h1>Atlantic Hotel</h1>
      <h2>Tela Admin</h2>

      <component v-bind:is="component" />
    </div>
  </div>

  <!-- <FooterComponent></FooterComponent> -->
</template>

<script>
  import AdminBanners from '@/components/AdminBanners.vue';
  import AdminAccommodations from '@/components/AdminAccommodations.vue';
  import AdminContacts from '@/components/AdminContacts.vue';

  export default {
    name: 'AdminView',

    data() {
      return {
        component: '',
      }
    },

    components: {
      AdminBanners,
      AdminAccommodations,
      AdminContacts
    },

    methods: {
      banners() {
        this.component = AdminBanners
      },

      accommodations() {
        this.component = AdminAccommodations
      },

      contacts() {
        this.component = AdminContacts
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/admin.scss";

  @import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css";
</style>
