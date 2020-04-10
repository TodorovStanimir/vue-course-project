import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './user/userStore.js';
import bookStore from './book/bookStore.js'
import commentStore from './comment/commentStore.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    loading(state) {
      return state.loading
    }
  },
  actions: {
    changeLoading({ commit }, payload) {
      if (payload) {
        commit('changeLoadingSuccess', payload);
        setTimeout(() => commit('changeLoadingSuccess', false), 2000);
      }    
    }
  },
  mutations: {
    changeLoadingSuccess(state, payload) {
      Object.assign(state, { loading: payload });
    }
  },
  modules: {
    userStore,
    bookStore,
    commentStore
  }
});

export default store