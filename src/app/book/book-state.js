import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';
import router from '../router.js'

const initialState = {
  allBooks: []
};


const getters = {
  allBooks: state => state.allBooks,
  getBookById: (state) => (id) => state.allBooks.find(book => book._id === id)
};

const actions = {
  async getAllBooks({ commit }) {
    try {
      const { data } = await http.get("books");
      toastedSuccess("Successfully loaded all book!");
      commit('getAllBooksSuccess', data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteBook({ commit }, id) {
    try {
      await http.delete(`books/${id}`);
      toastedSuccess("Successful deleted book!");
      commit('deleteBookSuccess', id);
    } catch (error) {
      console.log(error);
    }
  },
  async createBook({ commit }, book) {
    try {
      const newBook = Object.assign({ ...book });
      newBook.genres = newBook.genres.split(" ");
      const { data } = await http.post("/books", newBook);
      toastedSuccess("Successfully created book!");
      commit('createBookSuccess', { book: data })
      router.push("/books/all");
    } catch (error) {
      this.$refs.createBookForm.reset();
      console.log(error)
    }
  },
  async editBook({ commit }, payload) {
    try {
      const [book, id] = payload;
      const editBook = Object.assign({ ...book });
      editBook.genres = editBook.genres.split(" ");
      const { data } = await http.put(`/books/${id}`, editBook);
      toastedSuccess("Successfully edited book!");
      commit('editBookSuccess', { book: data })
      router.push("/books/all");
    } catch (error) {
      this.$refs.createBookForm.reset();
      console.log(error);
    }
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