<template>
  <div class="grid-container">
    <div class="grid">
      <div class="grid-item">
        <form ref="createBookForm">
          <div class="firstr">
            <div class="firstr-firstc">
              <div class="user-info-form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-book"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Book title"
                  v-model="book.title"
                  @blur="$v.book.title.$touch()"
                  :class="{ 'invalid-touched': $v.book.title.$anyError, valid: !$v.book.title.invalid && $v.book.title.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.title.$error">
                <div class="req-field" v-if="!$v.book.title.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.title.minLength"
                >Title shoud contain at least {{$v.book.title.$params.minLength.min}} signs</div>
              </div>
            </div>
            <div class="firstr-secondc">
              <div class="user-info-form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user-tie"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Names of book's author"
                  v-model="book.bookAuthor"
                  @blur="$v.book.bookAuthor.$touch()"
                  :class="{ 'invalid-touched': $v.book.bookAuthor.$anyError, valid: !$v.book.bookAuthor.invalid && $v.book.bookAuthor.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.bookAuthor.$error">
                <div class="req-field" v-if="!$v.book.bookAuthor.required">This field is required!</div>
                <div
                  class="info-field"
                  v-if="!$v.book.bookAuthor.minLength"
                >Name should contain at least {{$v.book.bookAuthor.$params.minLength.min}} signs</div>
              </div>
            </div>
          </div>
          <div class="secondr">
            <div class="secondr-firstc">
              <div class="user-info-form-group">
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
                  v-model="book.description"
                  @blur="$v.book.description.$touch()"
                  :class="{ 'invalid-touched': $v.book.description.$anyError, valid: !$v.book.description.invalid && $v.book.description.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.description.$error">
                <div class="req-field" v-if="!$v.book.description.required">This field is required!</div>
                <div
                  class="info-field"
                  v-if="!$v.book.description.minLength"
                >Description should contain at least {{$v.book.description.$params.minLength.min}} signs</div>
              </div>
            </div>
          </div>
          <div class="thirdr">
            <div class="thirdr-firstc">
              <div class="user-info-form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-folder"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Genres"
                  v-model="book.genres"
                  @blur="$v.book.genres.$touch()"
                  :class="{ 'invalid-touched': $v.book.genres.$anyError, valid: !$v.book.genres.invalid && $v.book.genres.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.genres.$error">
                <div class="req-field" v-if="!$v.book.genres.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.genres.$params.genresValidator.alpha"
                >Genres should contain genres of book separeted by space!</div>
              </div>
            </div>
            <div class="thirdr-secondc">
              <div class="user-info-form-group">
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
                  v-model.number="book.year"
                  @blur="$v.book.year.$touch()"
                  :class="{ 'invalid-touched': $v.book.year.$anyError, valid: !$v.book.year.invalid && $v.book.year.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.year.$error">
                <div class="req-field" v-if="!$v.book.year.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.year.minLength"
                >Year should contain exactly 4 digits!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.year.minValue"
                >Year can not be less then 1500 year!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.year.maxValue"
                >Year can not be bigger then current year!</div>
              </div>
            </div>
          </div>
          <div class="fourthr">
            <div class="fourthr-firstc">
              <div class="user-info-form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user-tie"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Publisher"
                  v-model="book.publisher"
                  @blur="$v.book.publisher.$touch()"
                  :class="{ 'invalid-touched': $v.book.publisher.$anyError, valid: !$v.book.publisher.invalid && $v.book.publisher.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.publisher.$error">
                <div class="req-field" v-if="!$v.book.publisher.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.publisher.minLength"
                >Publishers should contain at least {{$v.book.publisher.$params.minLength.min}} signs</div>
              </div>
            </div>
            <div class="fourthr-secondc">
              <div class="user-info-form-group">
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
                  v-model.number="book.price"
                  @blur="$v.book.price.$touch()"
                  :class="{ 'invalid-touched': $v.book.price.$anyError, valid: !$v.book.price.invalid && $v.book.price.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.price.$error">
                <div class="req-field" v-if="!$v.book.price.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.price.minValue"
                >Price should be at least 0.01</div>
              </div>
            </div>
          </div>
          <div class="fifthr">
            <div class="fifthr-firstc">
              <div class="user-info-form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-image"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Image Url"
                  v-model="book.imageUrl"
                  @blur="$v.book.imageUrl.$touch()"
                  :class="{ 'invalid-touched': $v.book.imageUrl.$anyError, valid: !$v.book.imageUrl.invalid && $v.book.imageUrl.$dirty || isEditingBook }"
                />
              </div>
              <div v-if="$v.book.imageUrl.$error">
                <div class="req-field" v-if="!$v.book.imageUrl.required">This field is required!</div>
                <div
                  class="info-field"
                  v-else-if="!$v.book.imageUrl.url"
                >Image Url should start wth http:// or https://</div>
              </div>
            </div>
            <div class="fifthr-secondc">
              <div class="form-group">
                <button
                  v-if="!isEditingBook"
                  type="submit"
                  class="btn btn-success btn-block"
                  :disabled="$v.$invalid"
                  @click.prevent="handlerCreateBook(book)"
                >Create your book!</button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-success btn-block"
                  :disabled="$v.$invalid"
                  @click.prevent="handleEditBook()"
                >Edit your book!</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxValue, minValue, decimal, url } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

const genresValidator = helpers.regex("alpha", /^[A-Za-z -]+$/);

export default {
  name: "BookCreate",
  mixins: [validationMixin],
  validations: {
    book: {
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
    }
  },
  data: function() {
    return {
      isEditingBook: false,
      id: this.$route.params.id,
      book: {
        title: "",
        bookAuthor: "",
        description: "",
        genres: "",
        year: null,
        publisher: "",
        price: null,
        imageUrl: "",
        likes: 0,
        dislikes: 0
      }
    };
  },
  created() {
    if (this.id !== undefined) {
      this.isEditingBook = true;
      let editingBook = this.getBookById(this.id);
      if (!editingBook) {
        this.loadAllBooks();
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
    ...mapActions(["createBook", "editBook", "loadAllBooks"]),
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
  },
  computed: {
    ...mapGetters(["getBookById", "username"])
  }
};
</script>

<style scoped>
.grid-container {
  margin-top: 60px;
  margin-bottom: -509px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 60%;
  padding: 25px;
  padding-bottom: 5px;
  background-color: rgb(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid white;
}
.grid-item {
  display: flex;
  flex-direction: column;
}
.user-info-form-group {
  display: flex;
  margin-bottom: 1rem;
}
.firstr {
  display: flex;
  flex-direction: row;
}
.firstr-firstc {
  width: 50%;
  margin-right: 20px;
}
.firstr-secondc {
  width: 50%;
}
.thirdr {
  display: flex;
  flex-direction: row;
}
.thirdr-firstc {
  width: 70%;
  margin-right: 20px;
}
.thirdr-secondc {
  width: 30%;
}
.fourthr {
  display: flex;
  flex-direction: row;
}
.fourthr-firstc {
  width: 70%;
  margin-right: 20px;
}
.fourthr-secondc {
  width: 30%;
}
.fifthr {
  display: flex;
  flex-direction: row;
}
.fifthr-firstc {
  width: 70%;
  margin-right: 20px;
}
.fifthr-secondc {
  width: 30%;
}
.valid {
  border: 2px solid #42a948; /* green */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.invalid-touched {
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
  width: 12px;
  color: #42a948;
}
span {
  border-left: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
input {
  border-right: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
textarea {
  border-right: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
}
@media only screen and (max-width: 768px) {
  .grid-container {
    margin-top: 10px;
    margin-bottom: -605px;
  }
  .grid {
    width: 90%;
    padding: 5px;
    padding-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: stretch; */
  }
  .grid-item {
    width: 100%;
  }
  .firstr {
    flex-direction: column;
  }
  .firstr-firstc {
    width: 100%;
  }
  .firstr-secondc {
    width: 100%;
  }
  .thirdr {
    display: flex;
    flex-direction: column;
  }
  .thirdr-firstc {
    width: 100%;
  }
  .thirdr-secondc {
    width: 100%;
  }
  .fourthr {
    display: flex;
    flex-direction: column;
  }
  .fourthr-firstc {
    width: 100%;
  }
  .fourthr-secondc {
    width: 100%;
  }
  .fifthr {
    display: flex;
    flex-direction: column;
  }
  .fifthr-firstc {
    width: 100%;
    margin-right: 20px;
  }
  .fifthr-secondc {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>