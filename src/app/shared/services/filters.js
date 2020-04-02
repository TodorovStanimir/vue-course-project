import Vue from 'vue';

export function toUpper(value) {
    return String(value).toUpperCase();
}

export function toLower(value) {
    return String(value).toLowerCase();
}

export function substr(value, count) {
    const ind = value.substr(count).indexOf(' ');
    return value.substr(0, count + ind)+'....'
}

const filters = { toUpper, toLower, substr }

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export default {
    plugins: ['~/plugins/filters.js']
}