import axios from 'axios';

import { toastedError } from './toasted.js';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_rkkcYykB8';
const appSecret = '0c2b672fdd294ba4967f0a1bb36dbd2c';

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
        const token = localStorage.getItem('token');
        config.baseURL = config.url === '_logout' ? `${baseUrl}/user/${appKey}` : `${baseUrl}/appdata/${appKey}`;
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
    if (error.response.status === 401) {
        toastedError(
            `${error.response.statusText}: ${error.response.data.description}`
        );
    } else if (error.response.status === 500) {
        toastedError(`${error.response.statusText}: Server Error`);

    } else {
        toastedError(`${error.response.statusText}`);

    }

    return Promise.reject(error);
};

const responseInterceptor = function (response) {
    return response;
};

http.interceptors.response.use(responseInterceptor, errorInterceptor);

export { http };