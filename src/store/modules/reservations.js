import api from '../api';

const reservationsModule = {
  namespaced: true,

  state: {
    reservations: []
  },

  getters: {
    reservations: state => state.reservations
  },

  mutations: {
    setReservations: (state, reservations) => state.reservations = reservations
  },

  actions: {
    // get
    async getReservations({ commit }) {   
      const { data } = await api.get(`reservations`);
      commit('setReservations', data);
    },

    // post
    async addReservation({ dispatch }, data) {
      await api.post('reservations', data)
        .then(() => {
          dispatch('getReservations')
        })
        .catch(error => console.log(error));
    },

    // delete
    
    // put
  }
}

export default reservationsModule;
