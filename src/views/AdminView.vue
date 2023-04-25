<template>
  <div class="admin-content">
    <div class="admin-content__side-nav">
      <a v-if="validate.permissionId === 1" @click="banners">Banners</a>
      <a v-if="validate.permissionId === 1" @click="accommodations">Acomodações</a>
      <a v-if="validate.permissionId === 1" @click="services">Serviços</a>
      <a v-if="validate.permissionId === 1" @click="contacts">Contatos</a>
      <a v-if="validate.permissionId === 1" @click="coupons">Cupons</a>
      <a v-if="validate.permissionId === 1" @click="users">Usuários</a>
      <a v-if="validate.permissionId === 1" @click="logout">Logout</a>
    </div>

    <div class="admin-content__main">
      <h1>Atlantic Hotel</h1>
      <h2>Tela Admin</h2>

      <component v-bind:is="component" />
    </div>
  </div>
</template>

<script>
  import AdminBanners from '@/components/AdminBanners.vue';
  import AdminAccommodations from '@/components/AdminAccommodations.vue';
  import AdminContacts from '@/components/AdminContacts.vue';
  import AdminCoupons from '@/components/AdminCoupons.vue';
  import AdminServices from '@/components/AdminServices.vue';
  import AdminUsers from '@/components/AdminUsers.vue';
  import LoginView from './LoginView.vue';

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
      AdminContacts,
      AdminCoupons,
      AdminServices,
      AdminUsers,
      LoginView
    },

    computed: {
      validate() {
        return this.$store.state.loginModule.validate;
      }
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
      },

      coupons() {
        this.component = AdminCoupons
      },

      services() {
        this.component = AdminServices
      },

      users() {
        this.component = AdminUsers
      },

      logout() {
        localStorage.removeItem('loginAdmin');
        this.validate.id = '';
        this.validate.permissionId = '';
        this.validate.name = '';
        this.validate.email = '';

        this.component = <LoginView permission="admin" />;
      },

      async checkValidate() {
        if (this.validate.permissionId !== 1) {
          const loginAdmin = JSON.parse(localStorage.getItem('loginAdmin'));

          if (loginAdmin && loginAdmin.token) {
            await this.$store.dispatch('loginModule/validate', loginAdmin.token);
            if (!this.validate) this.logout();
          } else {
            this.component = <LoginView permission="admin" />;
          };
        } else {
          this.component = '';
        };
      }
    },

    mounted() {
      this.checkValidate();
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/admin.scss";

  @import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css";
</style>
