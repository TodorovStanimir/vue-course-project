<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-4">
        <form @submit.prevent="handleEditUser()">
          <div class="form-group input-group">
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
          <div class="form-group input-group">
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
          >Phone number should consists country code and at least 10 digits!</div>
          <div v-else-if="$v.editedUser.phoneNumber.$error">
            <div
              class="req-field"
              v-if="!$v.editedUser.phoneNumber.$required"
            >This field is required!</div>
          </div>
          <div class="form-group input-group">
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
          <div class="form-group input-group">
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
      <div class="col-lg-2"></div>
      <div class="col-lg-4">
        <div class="form-group">
          <div class="input-group-prepend-block">
            <span class="input-group-text">
              <div>You have {{ userBooks.length }} books and {{ countUserComments(editedUser.username) }} comments</div>
            </span>
          </div>
        </div>
        <div class="form-group">
          <router-link
            v-for="book in userBooks"
            :key="book._id"
            class="nav-link"
            :to="{ name: 'bookDetails', params: { id: book._id }}"
          >
            <button class="btn btn-success btn-block">
              <div class="book-info">
                <div class="inside-book-info">{{book.title | toUpper }}</div>
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
            </button>
          </router-link>
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
      "loadAllBooks"
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
.opacity {
  opacity: 0.7;
  border-radius: 0.5rem;
  background: white;
  color: black;
}

input.valid {
  border-left: 2px solid #42a948; /* green */
}

input.invalid-touched {
  border-left: 2px solid #a94442; /* red */
}
.req-field {
  background-color: #a94442;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: 180px;
}
.info-field {
  background-color: #a94442;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
.nav-link {
  margin-top: -10px;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: 10px;
}
i {
  width: 12px;
  color: #42a948;
}
span.input-group-text {
  border-left: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
input.form-control {
  border-right: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
.container {
  margin-top: 50px;
  margin-bottom: -595px;
  width: 100%;
}
li {
  margin: 4px;
  border-radius: 2px;
  list-style-type: none;
}

.btn {
  text-align: left;
}

button {
  border: 2px solid grey;
  background-color: #42a948;
}
.fa-thumbs-up {
  color: white;
}

.fa-thumbs-down {
  color: white;
}
.fa-comments {
  color: white;
}

img {
  border-radius: 10px;
  border: 2px solid grey;
  opacity: 0.9;
}
.book-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
  align-content: flex-start;
}
.inside-book-info {
  margin-right: 13px;
}
</style>