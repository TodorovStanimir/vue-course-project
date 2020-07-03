import axios from 'axios';
import { toastedError } from './toasted';
import store from '../../user/userStore'

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_Hy_F58h0I';
const appSecret = '338c03d068aa4234966f97aa3a5f10dd';

const config = {
    baseURL: baseUrl,
    headers: {},
};

const http = axios.create(config);

const authInterceptor = function (config) {
    if (
        (config.url === 'login' || config.url === '') &&
        config.method === 'post'
    ) {
        config.baseURL = `${baseUrl}/user/${appKey}`;
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`)
        };
    } else {
        const token = store.state.token;

        if (config.url === '_logout' || config.url.includes('username')) {
            config.baseURL = `${baseUrl}/user/${appKey}`;

        } else if (config.url.startsWith('user/')) {
            config.url = config.url.split('/')[1];
            config.baseURL = `${baseUrl}/user/${appKey}`;

        } else {
            config.baseURL = `${baseUrl}/appdata/${appKey}`;

        }

        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: 'Kinvey ' + token
        };
    }
    return config;
};

const loggerInterceptor = config => {
    return config;
};

http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

const errorInterceptor = function (error) {
    if (error.response && error.response.status === 401) {
        toastedError(`${error.response.statusText}: ${error.response.data.description}`);

    } else if (error.response && error.response.status === 500) {
        toastedError(`${error.response.statusText}: Server Error`);

    } else if (error.response) {
        toastedError(`${error.response.statusText}`);
    }

    return Promise.reject(error);
};

const responseInterceptor = function (response) {
    return response;
};

http.interceptors.response.use(responseInterceptor, errorInterceptor);

export { http };