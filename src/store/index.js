import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        dispatch('refreshIdToken', refreshToken);
      } else {
        const expiredInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiredInMs);
        commit('updateIdToken', idToken);
      }
      commit('updateIdToken', idToken);
    },
    login({ dispatch }, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyA8PIk5QNMeEveVOS-S8eQa8Ztg9bgrfHk'
        , {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/');
      });
    },
    refreshIdToken({ dispatch }, refreshToken) {
      axiosRefresh
        .post('/token?key=AIzaSyA8PIk5QNMeEveVOS-S8eQa8Ztg9bgrfHk',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then(response => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
        });
    },
    register({ dispatch }, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyA8PIk5QNMeEveVOS-S8eQa8Ztg9bgrfHk'
        , {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/');
      });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.data.expiresIn * 1000;
      commit('updateIdToken', authData.data.idToken);
      localStorage.setItem('idToken', authData.data.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshToken', authData.data.refreshToken);
      setTimeout(() => {
        dispatch('refreshIdToken', authData.data.refreshToken);
      }, authData.data.expiresIn * 1000);
    }
  }
});