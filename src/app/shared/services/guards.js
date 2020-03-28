import  store  from '../../store.js'
export const requiresAuth = function (to, from, next) {
    if (!store.getters.isLoggedIn) {
        next({ name: 'userLogin' })
    } else {
        next();
    }
}

export const requiresNotLogged = function (to, from, next) {
    if (store.getters.isLoggedIn) {
        next({ name: 'books/all' })
    } else {
        next();
    }
}