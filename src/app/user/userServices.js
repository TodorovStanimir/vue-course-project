
const userProfileServices = {
    created() {
        this.loadAllComments();
        this.loadUserInfo(this.username);
        this.userBooks = this.getBooksByUserName(this.username);
        if (this.userBooks.length === 0) {
            this.loadAllBooks();
            this.userBooks = this.getBooksByUserName(this.username);
        }
    },
    methods: {
        handleEditUser() {
            this.editUser([
                {
                    email: this.editedUser.email,
                    phoneNumber: this.editedUser.phoneNumber,
                    occupation: this.editedUser.occupation,
                    imageUrl: this.editedUser.imageUrl
                },
                this.editedUser._id
            ]);
        },
        handleDeleteBook(id) {
            this.userBooks = this.userBooks.filter(book => book._id !== id);
            this.deleteBook(id);
        }

    }
}

const userRegisterServices = {
    methods: {
        handleRegister() {
            this.registerUser({
                username: this.username,
                email: this.email,
                phoneNumber: this.phoneNumber,
                occupation: this.occupation,
                password: this.password,
                imageUrl: this.imageUrl
            });
        }
    }
}

export { userProfileServices, userRegisterServices }