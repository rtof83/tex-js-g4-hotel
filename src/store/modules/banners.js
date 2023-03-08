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
    
    // put
  }
}

export default bannersModule;
