import api from '../api';

const reviewsModule = {
  namespaced: true,

  state: {
    reviews: []
  },

  getters: {
    reviews: state => state.reviews
  },

  mutations: {
    setReviews: (state, reviews) => state.reviews = reviews
  },

  actions: {
    // get
    async getReviewsByAccommodation({ commit }, accommodationId) {
      const { data } = await api.get(`reviews/accommodation/${accommodationId}`);
      commit('setReviews', data);
    },

    // post
    async addReview({ dispatch }, data) {
      await api.post('reviews', data)
        .then(() => {
          dispatch('getReviewsByAccommodation', data.accommodationId)
        })
        .catch(error => console.log(error));
    },

    // delete
   
    
    // put
  }
}

export default reviewsModule;
