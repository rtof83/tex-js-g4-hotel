import api from '../api';

const contactsModule = {
  namespaced: true,

  state: {
    contacts: []
  },

  getters: {
    contacts: state => state.contacts
  },

  mutations: {
    setContacts: (state, contacts) => state.contacts = contacts
  },

  actions: {
    // get
    async getContacts({ commit }) {   
      const { data } = await api.get(`contacts`);
      commit('setContacts', data);
    },

    // post
    async addContact({ dispatch }, data) {
      await api.post('contacts', data)
        .then(() => {
          dispatch('getContacts')
        })
        .catch(error => console.log(error));
    },

    // delete
    async deleteContact({ dispatch }, id) {
      await api.delete(`contacts/${id}`)
        .then(() => {
          dispatch('getContacts')
        })
        .catch(error => console.log(error));
    },
    
    // put
  }
}

export default contactsModule;
