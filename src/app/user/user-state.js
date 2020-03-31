import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';

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
  },
  async logoutUser({ commit }) {
    await http.post("_logout");
    toastedSuccess('Successful logged out!');
    commit('logoutSuccess');
    localStorage.clear();
  },
  async registerUser({ commit }, payload) {
    await http.post('', payload);
    toastedSuccess('Successfully Registered!');
    commit('registerSuccess');
  },
  async loadCreatorBook({ commit }, payload) {
    const { data } = await http.get(`/?query={"username":"${payload}"}`);
    commit('loadCreatorBookSuccess', data);
  },
  async getUserInfo({ commit }, payload) {
    const { data } = await http.get(`/?query={"username":"${payload}"}`);
    commit('getUserInfoSuccess', data);
  },
  async editUser({ commit }, payload) {
    const [editedUser, id] = payload
    const { data } = await http.put(`user/${id}`, editedUser);
    commit('editUserSuccess', data);
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
  getUserInfoSuccess(state, payload) {
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