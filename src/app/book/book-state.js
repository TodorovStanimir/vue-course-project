import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';

const initialState = {
  allBooks: []
};


const getters = {
  allBooks: state => state.allBooks,
};

const actions = {
  async getAllBooks({ commit }) {
    const { data } = await http.get("books");
    toastedSuccess("Successfully loaded all book!");
    commit('getAllBooksSuccess', data);
  },
  async deleteBook({ commit }, id) {
    await http.delete(`books/${id}`);
    toastedSuccess("Successful deleted book!");
    commit('deleteBookSuccess', id);
  }
};

const mutations = {
  getAllBooksSuccess(state, payload) {
    Object.assign(state, { allBooks: payload });
    console.log(state.allBooks);
  },
  deleteBookSuccess(state, payload) {
    const listBooks = state.allBooks.filter(book => book._id !== payload);
    Object.assign(state, { allBooks: listBooks });
    console.log(state.allBook);
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};