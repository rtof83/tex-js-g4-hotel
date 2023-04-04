import api from "../api";

const usersModule = {
  namespaced: true,

  state: {
    users: [],
  },

  getters: {
    users: (state) => state.users,
  },

  mutations: {
    setUsers: (state, users) => (state.users = users),
  },

  actions: {
    // get all
    async getUsers({ commit }) {
      const { data } = await api.get(`users`);
      commit("setUsers", data);
    },

    // get by id
    async getUserById({ commit }, id) {
      const { data } = await api.get(`users/${id}`);
      commit("setUsers", data);
    },

    // post
    async addUser({ dispatch }, data) {
      await api
        .post("users", data)
        .then(() => {
          dispatch("getUsers");
        })
        .catch((error) => console.log(error));
    },

    // delete
    async deleteUser({ dispatch }, id) {
      await api
        .delete(`users/${id}`)
        .then(() => {
          dispatch("getUsers");
        })
        .catch((error) => console.log(error));
    },

    // put
    async updateUser({ dispatch }, data ) {
      await api
        .put(`users/${data.id}`, data)
        .then(() => {
          dispatch("getUsers");
        })
        .catch((error) => console.log(error));
    },
  },
};

export default usersModule;
