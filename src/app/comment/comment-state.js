import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';
// import router from '../router.js'

const initialState = {
  allComments: []
};


const getters = {
  allComments: state => state.allComments,
  allCommentsByIdBook: (state, getters) => (id) => { return getters.allComments.filter(comment => comment.bookId === id) }
};

const actions = {
  async getAllComments({ commit }) {
    try {
      const { data } = await http.get("comments");
      toastedSuccess("Successfully loaded comments!");
      commit('getAllCommentsSuccess', data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  getAllCommentsSuccess(state, payload) {
    Object.assign(state, { allComments: payload });
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};