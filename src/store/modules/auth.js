import { authService } from '@/services'
import router from "@/router";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { loggedIn: true, access_token: user.access_token, error: null }
  : { loggedIn: false, access_token: null, error: null };


export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, { username, password }) {
      try {
        commit('loginRequest');
        const data = await authService.login({username, password})
        if (data.msg) {
          commit('loginFailure', data.msg)
          return data.msg
        } else {
          commit('loginSuccess', data);
        }
        await router.push('/');
      } catch (e) {
        commit('loginFailure', e.message)
      }


    },
    logout({ commit, dispatch } ) {
      authService.logout();
      dispatch('dashboard/clearDashboard', null, { root: true })
      dispatch('order/clearOrders', null, { root: true })
      commit('logout');
      router.push('/logout')
    }
  },
  mutations: {
    loginRequest(state) {
      state.loggedIn = false;
      state.error = false;
      state.access_token = null
    },
    loginSuccess(state, { access_token }) {
      state.loggedIn = true;
      state.access_token = access_token;
    },
    loginFailure(state, payload) {
      state.loggedIn = false;
      state.error = payload;
      state.access_token = null;
    },
    clearError(state) {
      state.error = null
    },
    logout(state) {
      state.loggedIn = false;
      state.access_token = null;
    }
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    error: state => state.error
  }
}
