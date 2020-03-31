const SET_ID = 'SET_ID';
const SET_PARTNER_ID = 'SET_PARTNER_ID';

export default {
  namespaced: true,

  state: {
    id: null,
    partnerId: null,
  },

  getters: {
    id(state) {
      return state.id;
    },

    partnerId(state) {
      return state.partnerId;
    },
  },

  actions: {
    setId({ commit }, id) {
      commit(SET_ID, id);
    },

    setPartnerId({ commit }, partnerId) {
      commit(SET_PARTNER_ID, partnerId);
    },
  },

  mutations: {
    [SET_ID]: (state, id) => {
      state.id = id;
    },

    [SET_PARTNER_ID]: (state, partnerId) => {
      state.partnerId = partnerId;
    },
  },
};
