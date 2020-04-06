# vue-course-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Vue course project

Book store is SPA for advertising the books.

It was generated with Vue CLI version 4.2.3.
It use Vuex state management.

Application structure
The application have public part and private part.

The public part is visible without authetntication.

It consists: register form; login form.

The private part is visible for all successful login users.

It holds managment functionality for the users's profiles:

- user can change his information: email, phone, occupation, profile picture;
- user getting information for all his books, count of likes, unlikes, comments can navigate to each his book, can edit the book or delete it.

The rest of the private part consists:

- page showing all books in application.
- page showing only books of the current user. In this two pages each user can edit or delete his books, can read detail information for each book. Here user can comment books or delete his comments, can rate /like or unlike/ books of other users, but not rate owned by him books, can see contact information for owner of each book - email and phone number.
- page for creating a new book, or editing an existing book. Here user can add a new book. All input forms are with validation of entered information, using Vuelidate.

Appication is separated in:

- book module. It consists three components, book routing file, book state file;
- comment module. It consists two components, comment state;
- core module. It consists for components - Footer, Navigation, Loader, NotFound;
- shared module. It consists services - filters, guards, httpClient - using axios, interceptors, toaster.
- user module. It consists three components - login, register and profile, user routing file, user state file;
