import { createStore } from "vuex";
import { addDays, getFromDate } from "./getDate";

import accommodationsModule from "./modules/accommodations";
import bannersModule from "./modules/banners";
import usersModule from "./modules/users";
import loginModule from "./modules/login";
import reservationsModule from "./modules/reservations";
import contactsModule from "./modules/contacts";
import couponsModule from "./modules/coupons";
import servicesModule from "./modules/services";
import reviewsModule from "./modules/reviews";

export default createStore({
  state: {
    reservation: {
      id: 0,
      accommodationId: 0,
      accommodationTotal: 0,
      accommodationDesc: "",
      accommodationImage: "",
      accommodation: "",
      checkin: "",
      checkout: "",
      qty: 1,
      rates: 1,
      services: [],
      discount: 0,
      itemsBar: 0,
      total: 0,
    },

    login: {
      email: "",
      password: "",
    },

    user: {
      name: "",
      email: "",
      password: "",
      status: true,
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
      showBanner: "none",
      showAccommodation: "none",
      showService: "none",
      showUser: "none"
    },

    sorteio: {
      image: "",
      slogan: "",
    },

    applyCoupon: {
      id: '',
      discount: 0
    }
  },

  getters: {},

  mutations: {
    initReservation: (state) => {
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
      localStorage.removeItem('loginUser');
      loginModule.state.validate.id = '';
      loginModule.state.validate.name = '';
      loginModule.state.validate.email = '';
    }
  },

  actions: {},

  modules: {
    accommodationsModule,
    bannersModule,
    usersModule,
    loginModule,
    reservationsModule,
    contactsModule,
    couponsModule,
    servicesModule,
    reviewsModule
  }
});
