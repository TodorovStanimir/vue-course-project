import { toastedSuccess } from "../shared/services/toasted";
import router from '../router';

const bookCreateServices = {
    async created() {
        if (this.id !== undefined) {
            this.isEditingBook = true;
            let editingBook = this.getBookById(this.id);
            if (!editingBook) {
                await this.loadAllBooks();
                editingBook = this.getBookById(this.id);
            }
            Object.keys(this.book).map(key => {
                if (Array.isArray(editingBook[key])) {
                    this.book[key] = editingBook[key].join(" ");
                } else {
                    this.book[key] = editingBook[key];
                }
            });
        }
    },
    methods: {
        handlerCreateBook(book) {
            const newBook = Object.assign({ ...book });
            newBook.genres = newBook.genres.split(" ");
            newBook.author = this.username;
            this.createBook(newBook);
        },
        handleEditBook() {
            const editBook = Object.assign({ ...this.book });
            editBook.genres = editBook.genres.split(" ");
            editBook.author = this.username;
            this.editBook([editBook, this.id]);
        }
    }
}

const bookDetailsServices = {
    created() {
        this.book = this.getBookById(this.id);
        if (!this.book) {
            this.loadAllBooks();
            this.book = this.getBookById(this.id);
        }
        const author = this.book.author;
        this.loadCreatorBook(author);
    },
    methods: {
        handleDeleteBook(id) {
            this.deleteBook(id);
        },
        rateBook(id, rate) {
            rate === "like" ? (this.book.likes += 1) : (this.book.dislikes += 1);
            this.editBook([
                {
                    title: this.book.title,
                    bookAuthor: this.book.bookAuthor,
                    description: this.book.description,
                    genres: this.book.genres,
                    year: this.book.year,
                    publisher: this.book.publisher,
                    price: this.book.price,
                    imageUrl: this.book.imageUrl,
                    likes: this.book.likes,
                    dislikes: this.book.dislikes,
                    author: this.book.author
                },
                id
            ]);
            toastedSuccess("Successfully voted for the book!");
        },
        toggleShowContact() {
            this.showInfoOwnerBook = !this.showInfoOwnerBook;
        }
    }
}

const booksShowAllServices = {
    created() {
        this.loadAllBooks();
        this.loadAllComments();
    },
    computed: {
        books: function () {
            return router.currentRoute.name === "booksAll"
                ? this.allBooks
                : this.allBooks.filter(book => book.author === this.username);
        }
    }
}

export { bookCreateServices, bookDetailsServices, booksShowAllServices }