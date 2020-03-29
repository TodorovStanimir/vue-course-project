import { http } from '../shared/services/httpClient.js';

const initialState = {
  allBooks: []
};


const getters = {
  allBooks: state => state.allBooks,
  getBookById: (state) => (id) => state.allBooks.find(book => book._id === id)
};

const actions = {
  async getAllBooks({ commit }) {
    const { data } = await http.get("books");
    commit('getAllBooksSuccess', data);
  },
  async deleteBook({ commit }, id) {
    await http.delete(`books/${id}`);
    commit('deleteBookSuccess', id)
  },
  async createBook({ commit }, book) {
    const { data } = await http.post("/books", book);
    commit('createBookSuccess', { book: data })
  },
  async editBook({ commit }, payload) {
    const [editBook, id] = payload;
    const { data } = await http.put(`/books/${id}`, editBook);
    commit('editBookSuccess', { book: data })
  }
};

const mutations = {
  getAllBooksSuccess(state, payload) {
    Object.assign(state, { allBooks: payload });
  },
  deleteBookSuccess(state, payload) {
    const listBooks = state.allBooks.filter(book => book._id !== payload);
    Object.assign(state, { allBooks: listBooks });
  },
  createBookSuccess(state, payload) {
    const { book } = payload;
    const listBooks = state.allBooks.concat(book);
    Object.assign(state, { allBooks: listBooks });
  },
  editBookSuccess(state, payload) {
    const { book } = payload;
    const listBooks = state.allBooks.map(b => { return b._id === book._id ? book : b });
    Object.assign(state, { allBooks: listBooks });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};