import Message from '@/models/Message';

const ADD_MESSAGE = 'ADD_MESSAGE';

export default {
  namespaced: true,

  state: {
    messages: [],
  },

  getters: {
    messages({ messages }, getters, rootState, rootGetters) {
      const peerId = rootGetters['peer/id'];

      return messages.map((message) => {
        if (message instanceof Message) {
          return {
            type: 'bubble',
            self: message.sender === peerId,
            content: message.content,
          };
        }

        return {};
      });
    },
  },

  actions: {
    addMessage({ commit }, message) {
      commit(ADD_MESSAGE, message);
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
