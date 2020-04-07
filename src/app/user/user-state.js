import { toastedSuccess, toastedError } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';
import router from '../router'

const initialState = {
  isLoggedIn: localStorage.getItem('token') !== null,
  token: localStorage.getItem('token'),
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  creatorBook: {},
  editedUser: {}
};

const getters = {
  token: state => state.token,
  isLoggedIn: state => state.isLoggedIn,
  username: state => state.userInfo.username,
  creatorBook: state => state.creatorBook,
  editedUser: state => state.editedUser
};

const actions = {
  async loginUser({ commit }, payload) {
    this.dispatch('changeLoading', true);
    try {
      const { username, password } = payload;
      const { data } = await http.post('login', { username, password });
      localStorage.setItem('token', data._kmd.authtoken);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toastedSuccess('Successfully logged in!');
      commit('loginSuccess', {
        userInfo: data,
        token: data._kmd.authtoken,
        isLoggedIn: true
      });
      router.push({ name: "booksAll" });
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
  },
  async logoutUser({ commit }) {
    this.dispatch('changeLoading', true);
    await http.post("_logout");
    toastedSuccess('Successful logged out!');
    commit('logoutSuccess');
    localStorage.clear();
    router.push({ name: "userLogin" });
  },
  async registerUser({ commit }, payload) {
    this.dispatch('changeLoading', true);
    try {
      await http.post('', payload);
      toastedSuccess('Successfully Registered!');
      commit('registerSuccess');
      router.push({ name: "userLogin" });
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
  },
  async loadCreatorBook({ commit }, payload) {
    const { data } = await http.get(`/?query={"username":"${payload}"}`);
    commit('loadCreatorBookSuccess', data);
  },
  async loadUserInfo({ commit }, payload) {
    this.dispatch('changeLoading', true);
    try {
      const { data } = await http.get(`/?query={"username":"${payload}"}`);
      toastedSuccess("Successfully loaded user's data!");
      commit('loadUserInfoSuccess', data);
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
  },
  async editUser({ commit }, payload) {
    this.dispatch('changeLoading', true);
    try {
      const [editedUser, id] = payload
      const { data } = await http.put(`user/${id}`, editedUser);
      toastedSuccess("Successfully edit Your profile!");
      commit('editUserSuccess', data);
    } catch (error) {
      if (!error.response) { toastedError(error) }
    }
  }
};

const mutations = {
  loginSuccess(state, payload) {
    Object.assign(state, payload);
  },
  logoutSuccess(state) {
    Object.assign(state, { isLoggedIn: false, token: null });
  },
  registerSuccess(state) {
    Object.assign(state);
  },
  loadCreatorBookSuccess(state, payload) {
    Object.assign(state, { creatorBook: payload[0] });
  },
  loadUserInfoSuccess(state, payload) {
    Object.assign(state, { editedUser: payload[0] })
  },
  editUserSuccess(state, payload) {
    Object.assign(state, { editUser: payload[0] })
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};