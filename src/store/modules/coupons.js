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
      console.log(data)
      await api.put(`coupons/${data.id}`, { discount: data.discount })
        .then(() => {
          dispatch('getCoupons')
        })
        .catch(error => console.log(error));
    }
  }
}

export default couponsModule;
