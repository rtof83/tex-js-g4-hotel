import { createStore } from "vuex";
import dbAccommodations from "./db/dbAccommodations";
import dbServices from "./db/dbServices";
import dbLogin from "./db/dbLogin";
import dbBanners from "./db/dbBanner";
import dbProducts from "./db/dbProducts";
import { addDays, getFromDate } from "./getDate";

import accommodationsModule from "./modules/accommodations";
import bannersModule from "./modules/banners";
import usersModule from "./modules/users";
import loginModule from "./modules/login";
import reservationsModule from "./modules/reservations";
import contactsModule from "./modules/contacts";

export default createStore({
  state: {
    reservation: {
      id: 0,
      accommodationId: 0,
      accommodation: "",
      checkin: "",
      checkout: "",
      qty: 1,
      rates: 1,
      services: [],
      coupon: "",
      discount: 0,
      itemsBar: 0,
      total: 0,
    },

    login: {
      // user: "",
      email: "",
      password: "",
    },

    user: {
      name: "",
      email: "",
      password: "",
      status: true,
      // lastLogin: "",
      permissionId: 2,
      address: {
        streetName: "",
        streetNumber: "",
        neighborhood: "",
        city: "",
        state: "",
        postCode: "",
      },
    },

    contact: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },

    modal: {
      showServices: "none",
      showDetails: "none",
      showUserDetails: "none",
    },

    sorteio: {
      image: "",
      slogan: "",
    },

    discount: {
      message: "",
    },
  },

  getters: {
    getStorage: () => (storage) => {
      return JSON.parse(localStorage.getItem(storage));
    },

    dbServices: () => {
      return dbServices;
    },

    dbAccommodations: () => {
      return dbAccommodations;
    },

    dbLogin: () => {
      return dbLogin;
    },

    dbProducts: () => {
      return dbProducts;
    },

    dbBanners: () => {
      return dbBanners;
    },
  },

  mutations: {
    initReservation: (state) => {
      // state.reservation.accommodationId = accommodationId;

      const date = new Date();
      state.reservation.checkin = getFromDate(date, true);
      state.reservation.checkout = addDays(date, 1, true);

      state.reservation.qty = 1;
      state.reservation.services = [];
      state.reservation.itemsBar = 0;

      localStorage.removeItem("coupon");
      localStorage.removeItem("report");
    },

    logout: () => {
      localStorage.removeItem('login');
      loginModule.state.validate.id = '';
      loginModule.state.validate.name = '';
      loginModule.state.validate.email = '';
    }
  },

  actions: {
  },

  modules: {
    accommodationsModule,
    bannersModule,
    usersModule,
    loginModule,
    reservationsModule,
    contactsModule,
  },
});
