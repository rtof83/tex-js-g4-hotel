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

    // get by user
    async getReservationsByUser({ commit }, user) { 
      const { data } = await api.get(`reservations/user/${user}`);
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
    async deleteReservation({ dispatch }, id) {
      await api
        .delete(`reservations/${id}`)
        .then(() => {
          dispatch("getReservations");
        })
        .catch((error) => console.log(error));
    },

    // put
  }
}

export default reservationsModule;
