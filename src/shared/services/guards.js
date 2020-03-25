export const requiresAuth = function (to, from, next) {
    if (!localStorage.getItem('username')) {
        next({ name: 'userLogin' })
    } else {
        next();
    }
}

export const requiresNotLogged = function (to, from, next) {
    if (localStorage.getItem('username')) {
        next({ name: 'books/all' })
    } else {
        next();
    }
}