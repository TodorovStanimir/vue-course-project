<template>
  <div class="container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <div class="row">
      <div class="col-lg-2 text-left">
        <img :src="editedUser.imageUrl" width="120" height="160" />
      </div>

      <div class="col-lg-4">
        <form @submit.prevent="hadleEditUser()">
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
              :class="{ 'invalid-touched': $v.editedUser.email.$anyError, valid: !$v.editedUser.email.invalid && $v.editedUser.email.$dirty}"
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
              :class="{ 'invalid-touched': $v.editedUser.phoneNumber.$anyError, valid: !$v.editedUser.phoneNumber.invalid && $v.editedUser.phoneNumber.$dirty}"
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
              :class="{ 'invalid-touched': $v.editedUser.occupation.$anyError, valid: !$v.editedUser.occupation.invalid && $v.editedUser.occupation.$dirty }"
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
              :class="{ 'invalid-touched': $v.editedUser.imageUrl.$anyError, valid: !$v.editedUser.imageUrl.invalid && $v.editedUser.imageUrl.$dirty }"
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
            <button
              type="submit"
              class="btn btn-success btn-block text-center"
              :disabled="$v.$invalid"
            >Change your profile</button>
          </div>
        </form>
      </div>
      <div class="col-lg-4">
        <div class="form-group">
          <div class="input-group-prepend-block">
            <span class="input-group-text">
              <div>You have {{userBooks.length}} books and {{userComments.length}} comments</div>
            </span>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block" v-for="book in userBooks" :key="book._id">
            <router-link class="nav-link" :to="{ name: 'bookDetails', params: { id: book._id }}"></router-link>
            {{book.title}}&nbsp;&nbsp;{{book.likes}}&nbsp;
            <i class="fa fa-thumbs-up"></i>
            &nbsp;&nbsp;
            {{book.dislikes}}&nbsp;
            <i class="fa fa-thumbs-down"></i>&nbsp;&nbsp;
            <span *ngIf="booksComments.length>0">
              {{ booksComments }}&nbsp;
              <i class="fa fa-comments"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, alpha, url, helpers } from "vuelidate/lib/validators";

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
      editedUser: {
        imageUrl:
          "https://scontent.fsof1-1.fna.fbcdn.net/v/t1.0-9/p720x720/32543883_1947120508653392_2522933359550660608_o.jpg?_nc_cat=107&_nc_sid=8024bb&_nc_ohc=u4JCsrK3aKIAX9ddm9j&_nc_ht=scontent.fsof1-1.fna&_nc_tp=6&oh=c031b7878e0803a0acf958f8fa7cd628&oe=5E93E96B",
        email: "todorov.stanimir0803@gmail.com",
        phoneNumber: "+359878244488",
        occupation: "Student"
      },
      userBooks: [],
      userComments: []
    };
  },
  async created() {
    await this.getUserInfo();
    // toastedSuccess("Successfully loaded comments!");
    this.book = this.getBookById(this.id);
    const user = this.book.author;
    await this.getUserBook(user);
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
  margin-bottom: -411px;
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
  opacity: 0.7;
}
</style>