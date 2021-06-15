import { orderService } from '@/services'

export const order = {
  namespaced: true,
  state: {
    total: 0,
    orders: [],
    loading: false,
    error: null
  },
  actions: {
    async fetch({ commit }, { page, term }) {
      try {
        commit('ordersRequest');
        const data = await orderService.getOrders(page, term)
        if (!data.msg){
          commit('ordersSuccess', data);
        } else {
          commit('ordersFailure', data.msg)
        }

      } catch (e) {
        commit('ordersFailure', e.message)
        console.log(e)
      }

    },

    clearOrders({ commit }) {
      commit('resetOrders')
    }

  },
  mutations: {
    ordersRequest(state) {
      state.loading = true;
      state.orders = []
      state.total = 0
      state.error = null
    },
    ordersSuccess(state, { orders, total } ) {
      state.loading = false;
      state.orders = orders
      state.total = total
      state.error = null
    },
    ordersFailure(state, payload) {
      state.loading = false;
      state.total = 0
      state.error = payload
    },
    resetOrders(state) {
      state.loading = false;
      state.total = 0
      state.orders =[]
      state.error = null
    },
  },
  getters: {
    orders: state => state.orders,
    loading: state => state.loading,
    error: state => state.error,
    total: state => state.total
  }
}
