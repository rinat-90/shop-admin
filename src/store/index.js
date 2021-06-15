import { createStore } from 'vuex'
import { createLogger } from 'vuex'

import { auth } from './modules/auth'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  },
  plugins: [createLogger()]
})
