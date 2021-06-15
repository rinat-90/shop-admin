import { createStore } from 'vuex'
import { createLogger } from 'vuex'

import { auth } from './modules/auth'
import { order } from './modules/order'
import { dashboard } from './modules/dashboard'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    order,
    dashboard
  },
  plugins: [createLogger()]
})
