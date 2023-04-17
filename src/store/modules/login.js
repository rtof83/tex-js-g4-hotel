import api from '../api';

const loginModule = {
  namespaced: true,

  state: {
    login: [],
    validate: []
  },

  getters: {
    login: state => state.login,
    validate: state => state.validate
  },

  mutations: {
    setLogin: (state, login) => state.login = login,
    setValidate: (state, validate) => state.validate = validate
  },

  actions: {
    // post
    async login({ commit, dispatch }, login) {
      await api.post('users/login', login)
        .then(({ data }) => {
          commit('setLogin', data);

          let itemName = ''; 
          if (data.user.permissionId === 1)
            itemName = 'loginAdmin';
          else if (data.user.permissionId === 2)
            itemName = 'loginUser';

          localStorage.setItem(itemName, JSON.stringify(data));

          dispatch('validate', data.token);
        })
        .catch(error => {
          commit('setLogin', error.response.status);
          console.log(error);
        });
    },

    async validate({ commit }, token) {
      api.defaults.headers.common = {'authorization': `Bearer ${token}`};
      await api.post('users/validate')
        .then(({ data }) => {
          commit('setValidate', data);
        })
        .catch(error => {
          commit('setValidate', error);
          console.log(error);
        });
    }
  }
}

export default loginModule;
