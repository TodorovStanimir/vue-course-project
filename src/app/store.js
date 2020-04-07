import Vue from 'vue';
import Vuex from 'vuex';
import userState from './user/user-state.js';
import bookState from './book/book-state.js'
import commentState from './comment/comment-state.js'

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
    userState,
    bookState,
    commentState
  }
});

export default store