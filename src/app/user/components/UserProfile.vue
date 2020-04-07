<template>
  <div class="grid-container">
    <div class="grid">
      <div class="user-info">
        <form @submit.prevent="handleEditUser()">
          <div class="user-info-form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
              v-model="editedUser.email"
              @blur="$v.editedUser.email.$touch()"
              :class="{ 'invalid-touched': $v.editedUser.email.$anyError, valid: !$v.editedUser.email.invalid && $v.editedUser.email.$dirty || true }"
            />
          </div>
          <div v-if="$v.editedUser.email.$error">
            <div class="req-field" v-if="!$v.editedUser.email.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.editedUser.email.email"
            >Email shoud be a valid email address, like example@example.extension!</div>
          </div>
          <div class="user-info-form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-phone"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Phone number"
              name="phoneNumber"
              v-model="editedUser.phoneNumber"
              @blur="$v.editedUser.phoneNumber.$touch()"
              :class="{ 'invalid-touched': $v.editedUser.phoneNumber.$anyError, valid: !$v.editedUser.phoneNumber.invalid && $v.editedUser.phoneNumber.$dirty  || true }"
            />
          </div>
          <div
            class="info-field"
            v-if="!$v.editedUser.phoneNumber.phoneNumberValidator"
          >Phone number should consists country code and at least 7 digits!</div>
          <div v-else-if="$v.editedUser.phoneNumber.$error">
            <div
              class="req-field"
              v-if="!$v.editedUser.phoneNumber.$required"
            >This field is required!</div>
          </div>
          <div class="user-info-form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-building"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Occupation"
              v-model="editedUser.occupation"
              @blur="$v.editedUser.occupation.$touch()"
              :class="{ 'invalid-touched': $v.editedUser.occupation.$anyError, valid: !$v.editedUser.occupation.invalid && $v.editedUser.occupation.$dirty  || true }"
            />
          </div>
          <div v-if="$v.editedUser.occupation.$error">
            <div class="req-field" v-if="!$v.editedUser.occupation.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.editedUser.occupation.occupation"
            >Occupation field should consists only letters!</div>
          </div>
          <div class="user-info-form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-image"></i>
              </span>
            </div>
            <input
              type="url"
              class="form-control"
              placeholder="image url"
              v-model="editedUser.imageUrl"
              @blur="$v.editedUser.imageUrl.$touch()"
              :class="{ 'invalid-touched': $v.editedUser.imageUrl.$anyError, valid: !$v.editedUser.imageUrl.invalid && $v.editedUser.imageUrl.$dirty  || true }"
            />
          </div>
          <div v-if="$v.editedUser.imageUrl.$error">
            <div class="req-field" v-if="!$v.editedUser.imageUrl.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.editedUser.imageUrl.url"
            >Image URL must start with http or https!</div>
          </div>

          <div class="form-group">
            <img :src="editedUser.imageUrl" width="120" height="160" />
          </div>
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-success text-center"
              :disabled="$v.$invalid"
            >Change your profile</button>
          </div>
        </form>
      </div>
      <div class="book-info">
        <div class="book-summary">
          <p>
            <b>You have {{ userBooks.length }} books and {{ countUserComments(editedUser.username) }} comments</b>
          </p>
        </div>
        <div v-for="book in userBooks" :key="book._id" class="book-row">
          <div class="book-title">
            <div class="inside-book-info">{{book.title | toUpper }}</div>
          </div>
          <div class="book-likes-buttons">
            <div class="book-likes">
              <div class="inside-book-info">{{book.likes}}</div>
              <div class="inside-book-info">
                <i class="fa fa-thumbs-up book"></i>
              </div>
              <div class="inside-book-info">{{book.dislikes}}</div>
              <div class="inside-book-info">
                <i class="fa fa-thumbs-down book"></i>
              </div>
              <div class="inside-book-info">{{ counterBookComments(book._id) || 0 }}</div>
              <div class="inside-book-info">
                <i class="fa fa-comments book"></i>
              </div>
            </div>
            <div class="buttons-container">
              <div class="buttons">
                <router-link :to="{ name: 'bookDetails', params: { id: book._id }}">
                  <button class="btn">
                    <i class="fa fa-info-circle"></i>
                  </button>
                </router-link>
                {{ $route.params.id }}
                <!-- <template> -->
                <button @click="handleDeleteBook( book._id )" class="btn">
                  <i class="fa fa-trash-alt"></i>
                </button>
                <router-link :to="{ name: 'bookEdit', params: { id: book._id } }">
                  <button class="btn">
                    <i class="fa fa-edit"></i>
                  </button>
                </router-link>
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, alpha, url, helpers } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

const phoneNumberValidator = helpers.regex("alpha", /^[+]{1}\d{10,}$/);

export default {
  name: "UserProfile",
  mixins: [validationMixin],
  validations: {
    editedUser: {
      email: {
        required,
        email
      },
      phoneNumber: {
        required,
        phoneNumberValidator
      },
      occupation: {
        required,
        alpha
      },
      imageUrl: {
        required,
        url
      }
    }
  },
  data: function() {
    return {
      userBooks: []
    };
  },
  async created() {
    await this.loadAllComments();
    await this.loadUserInfo(this.username);
    this.userBooks = this.getBooksByUserName(this.username);
    if (this.userBooks.length === 0) {
      await this.loadAllBooks();
      this.userBooks = this.getBooksByUserName(this.username);
    }
  },
  methods: {
    ...mapActions([
      "loadUserInfo",
      "editUser",
      "loadAllComments",
      "loadAllBooks",
      "deleteBook"
    ]),
    async handleEditUser() {
      await this.editUser([
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
  },
  computed: {
    ...mapGetters([
      "editedUser",
      "getBooksByUserName",
      "countUserComments",
      "counterBookComments",
      "username"
    ])
  }
};
</script>

<style scoped>
.grid-container {
  display: flex;
  justify-content: center;
  margin-bottom: -595px;
  margin-right: 0px;
  margin-left: 0px;
}
.grid {
  margin-top: 20px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
.user-info {
  display: flex;
  padding: 15px;
  width: 30%;
  flex-direction: column;
  background-color: rgb(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid white;
}
input.valid {
  border: 2px solid #42a948; /* green */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
input.invalid-touched {
  border: 2px solid #a94442; /* red */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.req-field {
  background-color: #ffffff;
  color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
.info-field {
  background-color: #ffffff;
  color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
i {
  color: #42a948;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
span.input-group-text {
  border-left: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
input.form-control {
  border-right: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
}
img {
  border-radius: 10px;
  border: 2px solid grey;
}
.user-info-form-group {
  display: flex;
  margin-bottom: 1rem;
}
.book-info {
  display: flex;
  padding: 15px;
  width: 65%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  background-color: rgb(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid white;
}
.book-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid green;
  border-radius: 4px;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
}
.book-summary {
  font: italic small-caps bold 17px/18px Georgia, serif;
  /* color: black; */
  color: #fdfff5;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.book-title {
  display: flex;
  flex-direction: row;
  margin-right: 0px;
}
.book-likes-buttons {
  display: flex;
  flex-direction: row;
}
.book-likes {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
.buttons-container {
  display: flex;
  justify-content: space-evenly;
}
.buttons {
  display: flex;
  justify-content: center;
  width: max-content;
}
.buttons button {
  height: 30px;
  width: 58px;
  border: 1px solid black;
  color: black;
  margin: 2px;
  margin-bottom: 0px;
  padding: 0px;
}
.buttons i {
  color: black;
}
.inside-book-info {
  margin-right: 13px;
  text-align: left;
}
.fa-thumbs-up {
  color: blue;
}
.fa-thumbs-down {
  color: red;
}
.fa-comments {
  color: green;
}
@media only screen and (max-width: 1280px) {
  .grid {
    width: 100%;
  }
}
@media only screen and (max-width: 768px) {
  .grid {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 95%;
  }
  .user-info {
    width: 100%;
    margin-bottom: 10px;
  }
  .book-info {
    width: 100%;
  }
}
@media only screen and (max-width: 560px) {
  .book-row {
    flex-direction: column;
  }
  .buttons button {
    width: 45px;
  }
  .inside-book-info {
    margin-right: 10px;
  }
}
</style>