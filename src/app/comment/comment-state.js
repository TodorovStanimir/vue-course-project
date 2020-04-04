import { http } from '../shared/services/httpClient.js';
import { toastedSuccess, toastedError } from '../shared/services/toasted'

const initialState = {
  allComments: []
};


const getters = {
  allComments: state => state.allComments,
  getCommentsByIdBook: (state) => (id) => { return state.allComments.filter(comment => comment.bookId === id) },
  counterBookComments: (state) => (id) => { return state.allComments.filter(comment => comment.bookId === id).length },
  countUserComments: (state) => (username) => state.allComments.filter(comment => comment.author === username).length
};

const actions = {
  async loadAllComments({ commit }) {
    this.state.loading = true;
    try {
      const { data } = await http.get("comments");
      commit('loadAllCommentsSuccess', data);
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    this.state.loading = false;
  },
  async createComment({ commit }, comment) {
    this.state.loading = true;
    try {
      const { data } = await http.post("/comments", comment);
      commit('createCommentSuccess', { comment: data });
      toastedSuccess("Successfully created comment!");
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  },
  async deleteComment({ commit }, id) {
    this.state.loading = true;
    try {
      await http.delete(`comments/${id}`);
      commit('deleteCommentSuccess', id);
      toastedSuccess("Successfully deleted comment!");
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  }
};

const mutations = {
  loadAllCommentsSuccess(state, payload) {
    Object.assign(state, { allComments: payload });
  },
  createCommentSuccess(state, payload) {
    const { comment } = payload;
    const listComments = state.allComments.concat(comment);
    Object.assign(state, { allComments: listComments });
  },
  deleteCommentSuccess(state, payload) {
    const listComments = state.allComments.filter(comment => comment._id !== payload);
    Object.assign(state, { allComments: listComments });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};