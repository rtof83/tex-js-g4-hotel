import api from '../api';

const loginModule = {
  namespaced: true,

  state: {
    login: []
  },

  getters: {
    login: state => state.login
  },

  mutations: {
    setLogin: (state, login) => state.login = login
  },

  actions: {
    // post
    async login({ commit }, login) {
      await api.post('users/login', login)
        .then(({ data }) => {
          commit('setLogin', data);
        })
        .catch(error => console.log(error));
    }
  }
}

export default loginModule;
