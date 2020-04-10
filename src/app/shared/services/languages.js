import Vue from 'vue';
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage';

Vue.use(MLInstaller);

export default new MLCreate({
    initial: 'En',
    save: process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('En').create({
            navReg: 'Register',
            navLogin: 'Login',
            navHello: 'Hello, {0}',
            navLogout: 'Logout',
            navProfile: 'Profile',
            navMyStore: 'My store',
            navAllBooks: 'All books',
            navMyBooks: 'My books',
            navCreate: 'Create Book',
            username: 'Name and Surname',
            userEmail: 'Email Address',
            userPassword: 'Password',
            userPhone: 'Phone number',
            userOccupation: 'Occupation',
            userCreatePassword: 'Create password',
            userRepeatPassword: 'Repeat password',
            userImageUrl: 'image Url',
            userLoginInAccount: 'Login in Your account',
            userHaveNotAnAccount: 'Have not an account? Register here',
            userCreateAccount: 'Create Account',
            userHaveAccount: 'Have an account? Log In',
            userRequiredField: 'This field is required!',
            userNameField: 'Shoud be in format Xxxxx Xxxxx',
            userPasswordField: 'Password shoud consists between 3 and 16 symbols: letters and digits!',
            userEmailField: 'Email shoud be a valid email address, like example@example.extension!',
            userPhoneField: 'Phone number should consists country code and at least 7 digits!',
            userOccupationField: 'Occupation field should consists only letters!',
            userRepeatPasswordField: 'Passwords do not match!',
            userImageUrlField: 'Image URL must start with http:// or https://!',
            userProfileReport: 'You have {0} books and {1} comments',
            userChangeProfile: 'Change your profile',
            bookTitle: 'Book title',
            bookAuthor: 'Book\'s author',
            bookDescription: 'Description',
            bookGenres: 'Genres',
            bookYear: 'Year issue',
            bookPublisher: 'Publisher',
            bookPrice: 'Price',
            bookImageUrl: 'Image Url',
            bookRequiredField: 'This field is required!',
            bookTitleField: 'Title shoud contain at least {0} signs',
            bookAuthorField: 'Name should contain at least {0} signs',
            bookDescriptionField: 'Description should contain at least {0} signs',
            bookGenresField: 'Genres should contain genres of book separeted by space!',
            bookYearField: 'Year should contain exactly 4 digits!',
            bookYearMinAmountField: 'Year can not be less then 1500 year!',
            bookYearMaxAmountField: 'Year can not be bigger then current year!',
            bookPublisherField: 'Publishers should contain at least {0} signs',
            bookPriceField:'Price should be at least 0.01',
            bookImageUrlField: 'Image Url should start wth http:// or https://',
            bookCreateButton: 'Create your book!',
            bookEditButton: 'Edit your book!',
            commentSubject: 'Your comment...',
            commentThereIsNot1: 'There is not comments for this book.',
            commentThereIsNot2: 'You can write the first one.',
            loadAllBooks: 'Successfully loaded all book!'

        }),

        new MLanguage('Бг').create({
            navReg: 'Регистрация',
            navLogin: 'Вход',
            navHello: 'Здравей, {0}',
            navLogout: 'Изход',
            navProfile: 'Профил',
            navMyStore: 'Моят магазин',
            navAllBooks: 'Всички книги',
            navMyBooks: 'Моите книги',
            navCreate: 'Създай книга',
            username: 'Име и фамилия',
            userEmail: 'Имейл адрес',
            userPassword: 'Парола',
            userPhone: 'Телефонен номер',
            userOccupation: 'Професия',
            userCreatePassword: 'Задайте парола',
            userRepeatPassword: 'Повторете парола',
            userImageUrl: 'Линк към снимка',
            userLoginInAccount: 'Влезте във Вашия акаунт',
            userHaveNotAnAccount: 'Нямате акаунт? Регистрирайте се тук',
            userCreateAccount: 'Създайте акаунт',
            userHaveAccount: 'Имате акаунт? Влезте в него',
            userRequiredField: 'Това поле е задължително!',
            userNameField: 'Името трябва да е във формат Xxxxx Xxxxx',
            userPasswordField: 'Паролата трябва да съдържа между 3 и 16 знака: букви или цифри!',
            userEmailField: 'Имейла трябва да бъде валиден имейл адрес, примерно xxxxx@gmail.com!',
            userPhoneField: 'Телефонния номер трябва да съдържа кода на държавата и най-малко 7 цифри!',
            userOccupationField: 'Професията трябва да съдържа само букви!',
            userRepeatPasswordField: 'Повторно въведената парола не съвпада с първоначалната!',
            userImageUrlField: 'URL адресът на изображението трябва да започва с http:// или https://!',
            userProfileReport: 'Вие имате {0} книги и {1} коментарa',
            userChangeProfile: 'Променете вашия профил',
            bookTitle: 'Заглавие',
            bookAuthor: 'Автор',
            bookDescription: 'Описание',
            bookGenres: 'Жанрове',
            bookYear: 'Година на издаване',
            bookPublisher: 'Издателство',
            bookPrice: 'Цена',
            bookImageUrl: 'Линк към снимка',
            bookRequiredField: 'Това поле е задължително!',
            bookTitleField: 'Заглавието трябва да съдържа минимум {0} знака!',
            bookAuthorField: 'Името трябва да съдържа минимум {0} знака!',
            bookDescriptionField: 'Описанието трябва да съдържа минимум {0} знака!',
            bookGenresField: 'Жанровете трябва да са разделение с интервал!',
            bookYearField: 'Годината трябва да съдържа минимум 4 цифри!',
            bookYearMinAmountField: 'Годината не може да е по-малка от 1500!',
            bookYearMaxAmountField: 'Годината не може да е по-голяма от текущата!',
            bookPublisherField: 'Издателя трябва да съдържа минимум {0} знака',
            bookPriceField:'Цената трябва да бъде не по-малка от 0.01',
            bookImageUrlField: 'URL адресът на изображението трябва да започва с http:// или https://!',
            bookCreateButton: 'Създайте вашата книга!',
            bookEditButton: 'Променете вашата книга!',
            commentSubject: 'Вашия коментар...',
            commentThereIsNot1: 'Няма коментари за тази книга.',
            commentThereIsNot2: 'Вие може да напишете първия.',
            loadAllBooks: 'Успешно изтеглихте всички книги!'

        })
    ]
})