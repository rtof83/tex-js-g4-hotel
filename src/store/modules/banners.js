import api from '../api';

const bannersModule = {
  namespaced: true,

  state: {
    banners: []
  },

  getters: {
    banners: state => state.banners
  },

  mutations: {
    setBanners: (state, banners) => state.banners = banners
  },

  actions: {
    // get
    async getBanners({ commit }) {   
      const { data } = await api.get(`banners`);
      commit('setBanners', data);
    },

    // post
    async addBanner({ dispatch }, data) {
      await api.post('banners', data)
        .then(() => {
          dispatch('getBanners')
        })
        .catch(error => console.log(error));
    },

    // delete
    async deleteBanner({ dispatch }, id) {
      await api.delete(`banners/${id}`)
        .then(() => {
          dispatch('getBanners')
        })
        .catch(error => console.log(error));
    },
    
    // put
    async updateBanner({ dispatch }, data) {
      await api.put(`banners/${data.id}`, data)
        .then(() => {
          dispatch('getBanners')
        })
        .catch(error => console.log(error));
    }
  }
}

export default bannersModule;
