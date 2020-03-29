import Vue from 'vue';
import Vuex from 'vuex';
import userState from './user/user-state.js';
import bookState from './book/book-state.js'
import commentState from './comment/comment-state.js'

Vue.use(Vuex);

const store =  new Vuex.Store({
  modules: {
   userState,
   bookState,
   commentState
  }
});

export default store