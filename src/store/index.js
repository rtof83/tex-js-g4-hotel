import { createStore } from 'vuex'
import dbAccommodations from './db/dbAccommodations';
import dbServices from './db/dbServices';
import dbLogin from './db/dbLogin';
import dbBanners from './db/dbBanner';
import dbProducts from './db/dbProducts';
import { addDays, getFromDate } from './getDate';

export default createStore({
  state: {
    reservation: {
      id: 0,
      accommodation: '',
      checkin: '',
      checkout: '',
      qty: 1,
      rates: 1,
      services: [],
      coupon: '',
      discount: 0,
      itemsBar: 0,
      total: 0,
    },

    login: {
      user: '',
      email: '',
      password: ''
    },

    modal: {
      showServices: 'none',
      showDetails: 'none'
    },

    sorteio: {
      image: '',
      slogan: ''
    },

    discount: {
      message: ''
    }
  },

  getters: {
    getStorage: () => storage => {
      return JSON.parse(localStorage.getItem(storage));
    },

    dbServices: () => {
      return dbServices
    },

    dbAccommodations: () => {
      return dbAccommodations
    },

    dbLogin: () => {
      return dbLogin
    },

    dbProducts: () => {
      return dbProducts
    },

    dbBanners: () => {
      return dbBanners
    }
  },

  mutations: {
    initReservation: (state) => {
      state.reservation.id = 0;

      const date = new Date();
      state.reservation.checkin = getFromDate(date, true);
      state.reservation.checkout = addDays(date, 1, true);

      state.reservation.qty = 1;
      state.reservation.services = [];
      state.reservation.itemsBar = 0;

      localStorage.removeItem('coupon');
      localStorage.removeItem('report');
    },

    initLogin: (state) => {
      localStorage.removeItem('login');
      state.login.user = '';
      state.login.email = '';
      state.login.password = '';
    }
  },

  actions: {

  },

  modules: {

  }
});
