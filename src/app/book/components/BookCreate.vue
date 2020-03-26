<template>
  <div class="container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-10">
        <form @submit.prevent="hadleCreateBook($data)" ref="createBookForm">
          <div class="row">
            <div class="col-lg-5">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-book"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Book title"
                  v-model="title"
                  @blur="$v.title.$touch()"
                  :class="{ 'invalid-touched': $v.title.$anyError, valid: !$v.title.invalid && $v.title.$dirty }"
                />
              </div>
              <div v-if="$v.title.$error">
                <div class="req-field" v-if="!$v.title.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.title.minLength"
                >Title shoud contain at least {{$v.title.$params.minLength.min}} signs</div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user-tie"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Names of book's author"
                  v-model="bookAuthor"
                  @blur="$v.bookAuthor.$touch()"
                  :class="{ 'invalid-touched': $v.bookAuthor.$anyError, valid: !$v.bookAuthor.invalid && $v.bookAuthor.$dirty }"
                />
              </div>
              <div v-if="$v.bookAuthor.$error">
                <div class="req-field" v-if="!$v.bookAuthor.required">This field is required!</div>
                <div
                  class="info-field"
                  v-if="!$v.bookAuthor.minLength"
                >Name should contain at least {{$v.bookAuthor.$params.minLength.min}} signs</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-10">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-edit"></i>
                  </span>
                </div>
                <textarea
                  type="text"
                  rows="3"
                  class="form-control"
                  placeholder="Description"
                  v-model="description"
                  @blur="$v.description.$touch()"
                  :class="{ 'invalid-touched': $v.description.$anyError, valid: !$v.description.invalid && $v.description.$dirty }"
                />
              </div>
              <div v-if="$v.description.$error">
                <div class="req-field" v-if="!$v.description.required">This field is required!</div>
                <div
                  class="info-field"
                  v-if="!$v.description.minLength"
                >Description should contain at least {{$v.description.$params.minLength.min}} signs</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-folder"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Genres"
                  v-model="genres"
                  @blur="$v.genres.$touch()"
                  :class="{ 'invalid-touched': $v.genres.$anyError, valid: !$v.genres.invalid && $v.genres.$dirty }"
                />
              </div>
              <div v-if="$v.genres.$error">
                <div class="req-field" v-if="!$v.genres.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.genres.$params.genresValidator.alpha"
                >Genres should contain genres of book separeted by space!</div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Year issue"
                  min="1500"
                  v-model.number="year"
                  @blur="$v.year.$touch()"
                  :class="{ 'invalid-touched': $v.year.$anyError, valid: !$v.year.invalid && $v.year.$dirty }"
                />
              </div>
              <div v-if="$v.year.$error">
                <div class="req-field" v-if="!$v.year.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.year.minLength"
                >Year should contain exactly 4 digits!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.year.minValue"
                >Year can not be less then 1500 year!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.year.maxValue"
                >Year can not be bigger then current year!</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user-tie"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Publisher"
                  v-model="publisher"
                  @blur="$v.publisher.$touch()"
                  :class="{ 'invalid-touched': $v.publisher.$anyError, valid: !$v.publisher.invalid && $v.publisher.$dirty }"
                />
              </div>
              <div v-if="$v.publisher.$error">
                <div class="req-field" v-if="!$v.publisher.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.publisher.minLength"
                >Publishers should contain at least {{$v.publisher.$params.minLength.min}} signs</div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-dollar-sign"></i>
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  class="form-control"
                  placeholder="Price"
                  v-model.number="price"
                  @blur="$v.price.$touch()"
                  :class="{ 'invalid-touched': $v.price.$anyError, valid: !$v.price.invalid && $v.price.$dirty }"
                />
              </div>
              <div v-if="$v.price.$error">
                <div class="req-field" v-if="!$v.price.required">This field is required!</div>
                <div class="info-field" v-else-if="!$v.price.minValue">Price should be at least 0.01</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-image"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Image Url"
                  v-model="imageUrl"
                  @blur="$v.imageUrl.$touch()"
                  :class="{ 'invalid-touched': $v.imageUrl.$anyError, valid: !$v.imageUrl.invalid && $v.imageUrl.$dirty }"
                />
              </div>
              <div v-if="$v.imageUrl.$error">
                <div class="req-field" v-if="!$v.imageUrl.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.imageUrl.url"
                >Image Url should start wth http:// or https://</div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-success btn-block"
                  :disabled="$v.$invalid"
                >Create your book!</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxValue,
  minValue,
  decimal,
  url
} from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import books from "../../../store.js";
import { http } from "../../shared/services/httpClient.js";
import { toastedSuccess } from "../../shared/services/toasted";

const genresValidator = helpers.regex("alpha", /^[A-Za-z -]+$/);
export default {
  name: "BookCreate",
  created() {
    if (this.$route.params.id) {
      const book = books.books.find(book => book._id === this.$route.params.id);

      Object.keys(book).map(key => {
        if (Array.isArray(book[key])) {
          console.log(typeof book[key]);
          this.$data[key] = book[key].join(" ");
        } else {
          this.$data[key] = book[key];
        }
      });
    }
  },
  mixins: [validationMixin],
  data: function() {
    return {
      title: "",
      bookAuthor: "",
      description: "",
      genres: "",
      year: null,
      publisher: "",
      price: null,
      imageUrl: "",
      likes: 0,
      dislikes: 0,
      author: localStorage.getItem("username"),
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(2)
    },
    bookAuthor: {
      required,
      minLength: minLength(5)
    },
    description: {
      required,
      minLength: minLength(40)
    },
    genres: {
      required,
      genresValidator
    },
    year: {
      required,
      maxValue: maxValue(Number(new Date().toISOString().slice(0, 4))),
      minLength: minLength(4),
      minValue: minValue(1500)
    },
    publisher: {
      required,
      minLength: minLength(6)
    },
    price: {
      required,
      minValue: minValue(0.01),
      decimal
    },
    imageUrl: {
      required,
      url
    }
  },
  methods: {
    async hadleCreateBook(data) {
      try {
        const newBook = Object.assign(
          {},
          { ...data, author: localStorage.getItem("username") }
        );
        newBook.genres = data.genres.split(" ");
        await http.post("/books", newBook);
        toastedSuccess("Successfully created book!");
        this.$router.push("/books/all");
      } catch (error) {
        this.$refs.createBookForm.reset();
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
  margin-bottom: -487px;
}
.valid {
  border-left: 2px solid #42a948; /* green */
}
.invalid-touched {
  border-left: 2px solid #a94442; /* red */
}
.req-field {
  background-color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: 180px;
}
.info-field {
  background-color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
i {
  width: 12px;
  color: #42a948;
}
span {
  border-left: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
input {
  border-right: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
textarea {
  border-right: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
</style>