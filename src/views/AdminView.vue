<template>
  <!-- <HeaderComponent></HeaderComponent> -->

  <div class="admin-content">
    <div class="admin-content__side-nav">
      <a @click="banners">Banners</a>
      <a @click="accommodations">Acomodações</a>
      <a>Clients</a>
      <a>Contact</a>
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

  export default {
    name: 'AdminView',

    data() {
      return {
        component: '',
      }
    },

    components: {
      AdminBanners,
      AdminAccommodations
    },

    methods: {
      banners() {
        this.component = AdminBanners
      },

      accommodations() {
        this.component = AdminAccommodations
      }
    }
  }
</script>

<style src="@/assets/scss/admin.scss" lang="scss" />
