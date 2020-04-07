import { toastedSuccess, toastedError } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient';
import router from '../router';


const initialState = {
  allBooks: []
};

const getters = {
  allBooks: state => state.allBooks,
  getBookById: (state) => (id) => state.allBooks.find(book => book._id === id),
  getBooksByUserName: (state) => (username) => state.allBooks.filter(book => book.author === username).sort((a, b) => b.likes - a.likes)
};

const actions = {
  async loadAllBooks({ commit }) {
    this.state.loading = true;
    try {
      const { data } = await http.get("books");
      commit('loadAllBooksSuccess', data);
      toastedSuccess("Successfully loaded all book!");
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  },
  async deleteBook({ commit }, id) {
    this.state.loading = true;
    try {
      await http.delete(`books/${id}`);
      commit('deleteBookSuccess', id);
      toastedSuccess("Successfully deleted book!");
      if (router.currentRoute.name.includes("bookDetails")) {
        router.go(-1);
      }
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  },
  async createBook({ commit }, book) {
    this.state.loading = true;
    try {
      const { data } = await http.post("/books", book);
      commit('createBookSuccess', { book: data })
      toastedSuccess("Successfully created book!");
      router.push("/books/all");
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  },
  async editBook({ commit }, payload) {
    this.state.loading = true;
    try {
      const [editedBook, id] = payload;
      const { data } = await http.put(`/books/${id}`, editedBook);
      commit('editBookSuccess', { book: data });
      if (router.currentRoute.name === "bookEdit") {
        toastedSuccess("Successfully edited book!");
        router.go(-1);
      }
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
    setTimeout(() => this.state.loading = false, 1500);
  }
};

const mutations = {
  loadAllBooksSuccess(state, payload) {
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