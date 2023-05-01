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
    async deleteAccommodation({ dispatch }, id) {
      await api.delete(`accommodations/${id}`)
        .then(() => {
          dispatch('getAccommodations')
        })
        .catch(error => console.log(error));
    },
    
    // put
    async updateAccommodation({ dispatch }, data) {
      await api.put(`accommodations/${data.id}`, data)
        .then(() => {
          dispatch('getAccommodations')
        })
        .catch(error => console.log(error));
    },

    // post
    async addAccommodation({ dispatch }, data) {
      await api.post('accommodations', data)
        .then(() => {
          dispatch('getAccommodations')
        })
        .catch(error => console.log(error));
    },
  }
}

export default accommodationsModule;
