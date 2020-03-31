// import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';
// import router from '../router.js'

const initialState = {
  allComments: []
};


const getters = {
  allComments: state => state.allComments,
  getCommentsByIdBook: (state) => (id) => { return state.allComments.filter(comment => comment.bookId === id) },
  counterBookComments: (state) => (id) =>{ return state.allComments.filter(comment => comment.bookId === id).length },
  countUserComments: (state) => (username) => state.allComments.filter(comment => comment.author === username).length
};

const actions = {
  async getAllComments({ commit }) {
    try {
      const { data } = await http.get("comments");
      commit('getAllCommentsSuccess', data);
    } catch (error) {
      console.log(error);
    }
  },
  async createComment({ commit }, comment) {
    const { data } = await http.post("/comments", comment);
    commit('createCommentSuccess', { comment: data })
  },
  async deleteComment({ commit }, id) {
    await http.delete(`comments/${id}`);
    commit('deleteCommentSuccess', id);
  }
};

const mutations = {
  getAllCommentsSuccess(state, payload) {
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