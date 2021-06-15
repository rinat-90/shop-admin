import { dashboardService } from '@/services'

export const dashboard = {
  namespaced: true,
  state: {
    dashboard: null,
    loading: false,
    error: null
  },
  actions: {
    async fetch({ commit }) {
      try {
        commit('dashboardRequest');
        const { dashboard, msg } = await dashboardService.getDashboard()

        if (!msg) {
          commit('dashboardSuccess', dashboard);
        } else {
          commit('dashboardFailure', msg)
        }

      } catch (e) {
        commit('dashboardFailure', e.message)
        console.log(e)
      }

    },
    clearDashboard({ commit }){
      commit('resetDashboard')
    }

  },
  mutations: {
    dashboardRequest(state) {
      state.loading = true;
      state.dashboard = null
      state.error = null
    },
    dashboardSuccess(state, payload ) {
      state.loading = false;
      state.dashboard = payload
      state.error = null
    },
    dashboardFailure(state, payload) {
      state.loading = false;
      state.dashboard = null
      state.error = payload
    },
    resetDashboard(state) {
      state.dashboard = null
      state.loading = false
      state.error = null
    }
  },
  getters: {
    bestSellers(state) {
      if (state.dashboard){
        return state.dashboard.bestsellers
      }
    },
    todaySale(state) {
      if (state.dashboard){
        return [state.dashboard.sales_over_time_week][0][1]
      }
    },
    lastWeekSale(state) {
      if (state.dashboard){
        return Object.values(state.dashboard.sales_over_time_week).reduce((acc, curr) => {
          acc.total = acc.total + curr.total
          acc.orders = acc.orders + curr.orders
          return acc
        }, {
          total: 0,
          orders: 0
        })
      }
    },
    lastMonthSale(state) {
      if (state.dashboard){
        return [state.dashboard.sales_over_time_year][0][1]
      }
    },
    sales: (state) => (type) => {
      if (!type) return
      if (state.dashboard) {
        return type === 'week'
          ? state.dashboard.sales_over_time_week
          : state.dashboard.sales_over_time_year
      }
    },
    loading: state => state.loading,
    error: state => state.error,
  }
}
