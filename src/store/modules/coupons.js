import api from '../api';

const couponsModule = {
  namespaced: true,

  state: {
    coupons: []
  },

  getters: {
    coupons: state => state.coupons
  },

  mutations: {
    setCoupons: (state, coupons) => state.coupons = coupons
  },

  actions: {
    // get
    async getCoupons({ commit }) {   
      const { data } = await api.get(`coupons`);
      commit('setCoupons', data);
    },

    async checkCoupon({ commit }, code) {   
      await api.get(`coupons/${code}`)
        .then(({ data }) => {
          commit('setCoupons', data);
        })
        .catch((error) => {
          commit('setCoupons', error.response.status);
        });
    },

    // post
    async createCoupon({ dispatch }, data) {
      await api.post('coupons', { discount: data.discount })
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    },

    async activateCoupon({ dispatch }, data) {
      const status = !data.activate ? '?status=false' : '';
      await api.post(`coupons/activate${status}`, { id: data.id })
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    },

    // delete
    async deleteCoupon({ dispatch }, id) {
      await api.delete(`coupons/${id}`)
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    },
    
    // put
    async updateCoupon({ dispatch }, data) {
      await api.put(`coupons/${data.id}`, { discount: data.discount })
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    },

    async useCoupon({ dispatch }, id) {
      await api.put(`coupons/use/${id}`)
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    },
  }
}

export default couponsModule;
