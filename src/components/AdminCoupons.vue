<template>
  <div class="content">
    <div class="panel">
      <h1>Cupons</h1>

      <input ref="discount" v-model="discount" type="number" step=".01" placeholder="desconto">
      <button v-if="update" @click="cancelUpdate">cancelar</button>
      <button @click="add">{{ update ? 'salvar' : 'Gerar Cupom' }}</button>
      
      <hr>

      <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Criado em</th>
              <th scope="col">Expirado</th>
              <th scope="col">Desconto</th>
              <th scope="col">Status</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>

          <tr v-for="item in coupons" :key="item.id">

            <template v-if="!item.page">

            <td>{{ item.code }}</td>
            <td>{{ formatDate(item.createdAt) }}</td>
            <td>{{ item.expired ? 'Sim' : 'Não' }}</td>
            <td>{{ item.discount }}%</td>
            <td>{{ item.deletedAt === null ? 'Ativo' : 'Inativo' }}</td>
            
            <td>
              <div class="actions">
                <div class="actions__item bi bi-pencil-fill"
                     @mouseover="(e) => hovering(e, 'bi-pencil')"
                     @mouseout="(e) => hovering(e, 'bi-pencil-fill')"
                     @click="updateRecord(item.id, item.discount)">
                </div>

                <div class="actions__item bi bi-trash3-fill"
                     @mouseover="(e) => hovering(e, 'bi-trash3')"
                     @mouseout="(e) => hovering(e, 'bi-trash3-fill')"
                     @click="deleteRecord(item.id)">
                </div>

                <div class="actions__item bi"
                     :class="item.deletedAt === null ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-up-fill'"
                     @mouseover="(e) => hovering(e, item.deletedAt === null ? 'bi-hand-thumbs-down' : 'bi-hand-thumbs-up')"
                     @mouseout="(e) => hovering(e, item.deletedAt === null ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-up-fill')"
                     @click="activateRecord(item.id, item.deletedAt)">
                </div>
              </div>
            </td>

            </template>

          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'AdminCoupons',

    data() {
      return {
        discount: '',
        update: 0
      }
    },

    computed: {
      coupons() {
        return this.$store.state.couponsModule.coupons;
      }
    },

    methods: {
      add() {
        if (!this.discount)
          return alert('Atenção! Todos os campos devem ser preenchidos.');

        const data = { discount: this.discount }
        let method = 'createCoupon';

        if (this.update) {
          data.id = this.update;
          method = 'updateCoupon';
          this.update = 0;
        };

        this.$store.dispatch(`couponsModule/${method}`, data);
        this.discount = '';
      },

      hovering(e, action) {
        e.target.classList.remove(e.target.classList[2]);
        e.target.classList.add(action);
      },

      activateRecord(id, deletedAt) {
        this.$store.dispatch('couponsModule/activateCoupon',
          { id: id, activate: deletedAt ? true : false });
      },

      updateRecord(id, discount) {
        this.update = id;
        this.discount = discount;
        this.$refs.discount.focus();
      },

      deleteRecord(id) {
        if (window.confirm('Tem certeza que deseja excluir este registro?'))
          this.$store.dispatch('couponsModule/deleteCoupon', id);
      },

      cancelUpdate() {
        this.update = 0;
        this.discount = '';
      },

      formatDate(date) {
        return moment(date).format('DD/MM/YYYY');
      }
    },

    mounted() {
      this.$store.dispatch('couponsModule/getCoupons');
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/scss/admin-component.scss";

  input {
    padding: .5rem;
    border-radius: 0.3rem;
    margin-right: 1rem;
    font-weight: bold;
  }
</style>
