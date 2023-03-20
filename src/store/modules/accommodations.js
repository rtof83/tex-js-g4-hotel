import api from '../api';

const accommodationsModule = {
  namespaced: true,

  state: {
    accommodations: []
  },

  getters: {
    accommodations: state => state.accommodations
  },

  mutations: {
    setAccommodations: (state, accommodations) => state.accommodations = accommodations
  },

  actions: {
    // get
    async getAccommodations({ commit }) {   
      const { data } = await api.get(`accommodations`);
      commit('setAccommodations', data);
    },

    // delete
    
    // put

    // post
  }
}

export default accommodationsModule;
