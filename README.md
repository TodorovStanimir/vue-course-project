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

It was generated with Vue CLI version 4.2.3, using a Vuex state management and all input forms are with validation of the entered information, using Vuelidate.

## Application structure.

The application have public part and private part.

### Public part

The public part is visible without authetntication and consists: 

#### register form:  
![Register form](/images/userRegister.png)

#### login form:
![Login form](/images/userLogin.png)

### Private part

The private part is visible for all successful login users.

It holds managment functionality for the users's profiles:

#### user profile
![User profile](/images/userProfile.png)

- user can change his information: email, phone, occupation, profile picture;
- user getting information for all his books, count of likes, unlikes, comments can navigate to each his book, can navigate to edit the book, can navigate to details infomation for the book, or delete the book.

The rest of the private part consists:
#### all books listing.
![All books listing](/images/allBooks.png)

- page showing all books in application - if You are on the route /books/all or 
- showing only books listed by the user - if You are on the route /books/user. 

In this two pages each user can navigate to edit the book, can navigate to details information for each book or delete the book. 

#### details information for book.
![book details if user is owner of the book](https://github.com/TodorovStanimir/vue-course-project/blob/master/images/bookDetails%20if%20user%20is%20owner%20book.png)

![book details if user is not owner of the book](https://github.com/TodorovStanimir/vue-course-project/blob/master/images/bookDetails%20if%20user%20is%20not%20owner%20book.png)

Here user can comment books or delete his comments, can navigate to edit the book /if is owner of the book/, can delete book, can rate /like or unlike/ books of other users, but not rate owned by him books, can see contact information for owner of each book - email and phone number. The part for comment of the books looks different if there are comments or not.

#### comments for the book.
![comments](/images/bookComments.png)

#### create a new book
![create a new book](/images/bookCreate.png)

- page for creating a new book. Here user can add a new book.

#### edit an existing book
![edit the book](/images/bookEdit.png)

- page for editing an existing book.

Appication is separated in:

- book module. It consists three components, book routing file, book store file;
- comment module. It consists two components, comment store;
- core module. It consists for components - Footer, Navigation, Loader, NotFound;
- shared module. It consists services - filters, guards, httpClient - using axios, interceptors, toaster.
- user module. It consists three components - login, register and profile, user routing file, user store file;
