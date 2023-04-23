import api from '../api';

const servicesModule = {
  namespaced: true,

  state: {
    services: []
  },

  getters: {
    services: state => state.services
  },

  mutations: {
    setServices: (state, services) => state.services = services
  },

  actions: {
    // get
    async getServices({ commit }) {   
      const { data } = await api.get(`/services`);
      commit('setServices', data);
    },

    // post
    async addService({ dispatch }, data) {
      await api.post('services', data)
        .then(() => {
          dispatch('getServices')
        })
        .catch(error => console.log(error));
    },

    // delete
    async deleteService({ dispatch }, id) {
      await api.delete(`services/${id}`)
        .then(() => {
          dispatch('getServices')
        })
        .catch(error => console.log(error));
    },
    
    // put
    async updateService({ dispatch }, data) {
      await api.put(`services/${data.id}`, data)
        .then(() => {
          dispatch('getServices')
        })
        .catch(error => console.log(error));
    }
  }
}

export default servicesModule;
