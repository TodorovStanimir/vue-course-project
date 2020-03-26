import Vue from 'vue'
import Toasted from 'vue-toasted';
Vue.use(Toasted)

const errors = {
    Conflict: "This username is already taken. Please retry your request with a different username"
}

export const toastedSuccess = mesg => {
    return Vue.toasted.success(mesg, {
        icon: 'OK',
        action: {
            text: 'Hide',
            onClick: (e, toastObject) => {
                toastObject.goAway(0);
            }
        },
        position: 'top-center',
        duration: 3000,
        keepOnHover: true,
        theme: 'outline',
        className: 'toast'
    });
};


export const toastedError = mesg => {
    return Vue.toasted.error(errors[mesg] || mesg, {
        icon: 'ERR',
        action: {
            text: 'Hide',
            onClick: (e, toastObject) => {
                toastObject.goAway(0);
            }
        },
        position: 'top-center',
        duration: 3000,
        keepOnHover: true,
        theme: 'outline',
        className: 'toast'
    });
};