import { createStore } from 'vuex'
import { createLogger } from 'vuex'

import { auth } from './modules/auth'
import { order } from './modules/order'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    order
  },
  plugins: [createLogger()]
})
