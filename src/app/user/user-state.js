import { toastedSuccess } from '../shared/services/toasted.js';
import { http } from '../shared/services/httpClient.js';

const initialState = {
  isLoggedIn: localStorage.getItem('token') !== null,
  token: localStorage.getItem('token'),
  userInfo: localStorage.getItem('userInfo'),
  creatorBook: {}
};

const getters = {
  token: state => { return state.token },
  isLoggedIn: state => { return state.isLoggedIn },
  username: state => { return state.userInfo.username },
  creatorBook: state => { return state.creatorBook }
};

const actions = {
  async loginUser({ commit }, payload) {
    const { username, password } = payload;
    const { data } = await http.post('login', { username, password });
    localStorage.setItem('token', data._kmd.authtoken);
    localStorage.setItem('userInfo', data.username);
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
  async getUserInfo({ commit }, payload) {
    const { data } = await http.get(`/?query={"username":"${payload}"}`);
    commit('getUserInfoSuccess', data);
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
  getUserInfoSuccess(state, payload) {
    Object.assign(state, { creatorBook: payload[0] });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};