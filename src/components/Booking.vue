<template>
  <aside class="escolha">
      <div>
          <h3>Resumo da Reserva</h3>
      </div>
      <div class="escolha__resumo">
          <p class="resumo__quarto" id="span-quarto"><span>Quarto: </span> {{ reservation.accommodation }}</p>
          <p class="resumo__checkin" id="span-checkin"><span>Check in: </span> {{ formatDate(reservation.checkin) }}</p>
          <p class="resumo__checkout" id="span-checkout"><span>Check out: </span> {{ formatDate(reservation.checkout) }}</p>
          <p class="resumo__qtd" id="span-qtd"><span>Hóspedes: </span> {{ reservation.qty }}</p>
          <p class="resumo__diaria" id="span-diaria"><span>Diárias: </span> {{ reservation.rates }}</p>
          <p class="resumo__total" id="span-total"><span>Total: R$ </span> {{ reservation.total.toFixed(2) }}</p>
      </div>

      <div class="escolha__resumo" id="servicos">
        <p v-if="!reservation.services.length"><span>Nenhum Serviço Adicional</span></p>
        <p v-else><span>Serviços Adicionais:</span></p>

        <div v-for="item in reservation.services" :key="item.id">
          <p><span>{{ item.name }}: </span>R$ {{ item.price }}</p>
        </div>
      </div>

      <div class="escolha__btn">
        <button @click="showModal('showServices')" id="showServices">Adicionar mais serviços</button>
      </div>

      <div class="escolha__btn">
        <button @click="initReservation" id="cleanBook">Limpar Seleção</button>
      </div>

      <div class="escolha__btn">
        <button @click="showModal('showDetails')" id="bookDetails">Ver Detalhes</button>
      </div>

      <ModalServices />
      <ModalDetails />
  </aside>
</template>

<script>
  import ModalServices from './ModalServices.vue';
  import ModalDetails from './ModalDetails.vue';
  import moment from 'moment';

  export default {
    name: 'Booking',
    components: {
      ModalServices,
      ModalDetails
    },

    data() {
      return {}
    },

    computed: {
      reservation() {
        return this.$store.state.reservation
      },
      
      modal() {
        return this.$store.state.modal
      },

      itemsBar() {
        return JSON.parse(localStorage.getItem('report'))
      }
    },
    
    methods: {
      showModal(modal) {
        this.modal[modal] = 'block'
      },

      initReservation() {
        this.$store.commit('initReservation');
      },

      formatDate(date) {
        return moment(date).format('DD/MM/YYYY');
      }
    },
  };
</script>

<style src="@/assets/scss/booking.scss" lang="scss" scoped />
