const ADD_MESSAGE = 'ADD_MESSAGE';

export default {
  namespaced: true,

  state: {
    messages: [],
  },

  getters: {
    messages(state) {
      return state.messages;
    },
  },

  actions: {
    send({ commit }, content) {
      commit(ADD_MESSAGE, {
        type: 'bubble',
        self: true,
        content,
      });
    },

    announce({ commit }, content) {
      commit(ADD_MESSAGE, {
        type: 'announcement',
        content,
      });
    },
  },

  mutations: {
    [ADD_MESSAGE]: (state, message) => {
      state.messages.push(message);
    },
  },
};
