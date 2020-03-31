import Vue from 'vue';
import Vuex from 'vuex';

import peer from './modules/peer';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,

  modules: {
    peer,
  },
});
