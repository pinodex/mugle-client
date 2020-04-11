import Announcement from '@/models/Announcement';
import Message from '@/models/Message';

const ADD_MESSAGE = 'ADD_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const messageTypeMap = {
  [Announcement]: 'announcement',
  [Message]: 'bubble',
};

export default {
  namespaced: true,

  state: {
    messages: [],
  },

  getters: {
    messages({ messages }, getters, rootState, rootGetters) {
      const peerId = rootGetters['peer/id'];

      return messages.map((message) => {
        const type = messageTypeMap[message.constructor];

        if (!type) {
          return {};
        }

        return {
          type,
          self: message.sender === peerId,
          content: message.content,
        };
      });
    },
  },

  actions: {
    addMessage({ commit }, message) {
      commit(ADD_MESSAGE, message);
    },

    addChatAnnouncement({ commit }, content) {
      commit(ADD_MESSAGE, new Announcement(content));
    },

    clearMessages({ commit }) {
      commit(CLEAR_MESSAGES);
    },
  },

  mutations: {
    [ADD_MESSAGE]: (state, message) => {
      state.messages.push(message);
    },

    [CLEAR_MESSAGES]: (state) => {
      while (state.messages.length > 0) {
        state.messages.pop();
      }
    },
  },
};
