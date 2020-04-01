<template>
  <div class="grid-container">
    <div v-if="book">
      <div class="grid">
        <div class="grid-item">
          <div class="opacity">
            <div class="main-info">
              <p>
                <img :src="book.imageUrl" />
              </p>
              <h4>{{book.title}}</h4>
              <h5>{{book.bookAuthor}}</h5>
            </div>
            <h6>{{book.description}}</h6>
            <p class="genres">
              Genres:
              <span v-for="(genre, index) of book.genres" :key="index">{{genre}}&nbsp;</span>
            </p>
            <div class="buttons-container">
              <div v-if="book.author===username" class="buttons">
                <li>
                  <button @click="handleDeleteBook( id )" class="btn card-link">delete</button>
                </li>
                <li>
                  <router-link :to="{ name: 'bookEdit', params: { id: id } }">
                    <button class="btn card-link">edit</button>
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
        <!-- Provide additional information about book -->
        <div class="grid-item">
          <div class="opacity">
            <h5>Additional information</h5>
            <div class="additional-info-button">
              <button
                class="btn btn-outline-dark"
                :disabled="book.author===username"
                @click="toggleShowContact()"
              >
                <b>
                  Posted by:
                  {{book.author}}
                </b>
              </button>
            </div>
            <div class="additional-info">
              <p>
                Year issue:
                <b>{{book.year}}</b>
              </p>
            </div>
            <div class="additional-info">
              <p>
                Publisher:
                <b>{{book.publisher}}</b>
              </p>
            </div>
            <div class="additional-info">
              <p>
                Selling price:
                <b>{{book.price}} BGN</b>
              </p>
            </div>
            <div class="additional-info-footer">
              <div>
                <button
                  :disabled="book.author===username"
                  @click="rateBook( id, 'like')"
                  class="btn btn-outline-primary additional-info-footer-b-l"
                >
                  <b>{{book.likes}}</b>&nbsp;&nbsp;
                  <i class="fa fa-thumbs-up"></i>
                </button>
              </div>
              <div>
                <button
                  :disabled="book.author===username"
                  @click="rateBook( id, 'dislike')"
                  class="btn btn-outline-danger additional-info-footer-b-d"
                >
                  <b>{{book.dislikes}}</b>&nbsp;&nbsp;
                  <i class="fa fa-thumbs-down"></i>
                </button>
              </div>
            </div>
            <div v-if="!showInfoOwnerBook" class="additional-info-footer">
              <p>
                <b>
                  You can emailed author of the book "{{book.title}}" to email: {{ creatorBook.email }} or call him
                  to phone: {{ creatorBook.phoneNumber }}.
                </b>
              </p>
            </div>
            <!-- <div class="additional-info-footer"></div> -->
          </div>
        </div>
        <!-- Provide information about comments -->
        <div class="grid-item">
          <div class="opacity">
            <h5>Comments</h5>
            <template v-if="!getCommentsByIdBook(id).length">
              <div class="comment-header">
                <p>There is not comments for this book. You can write the first one.</p>
              </div>
            </template>
            <div class="comment-body">
              <h6>Add Comment</h6>
              <form @submit.prevent="handleCreateComment()">
                <div class="comment-body-items">
                  <textarea type="text" placeholder="Your comment..." v-model="subjectNewComment"></textarea>
                </div>
                <button class="btn btn-outline-secondary" :disabled="$v.$invalid">add comment</button>
              </form>
            </div>
            <div class="comment-body">
              <article
                v-for="comment in getCommentsByIdBook(id)"
                :key="comment._id"
                class="comments"
              >
                <br />
                <div class="comment-container">
                  <p>
                    <b>{{comment.subject}}</b>
                  </p>
                  <p>
                    <b>{{comment.author}}</b>
                  </p>
                  <button
                    class="btn btn-outline-secondary del-but"
                    v-if="comment.author===username"
                    @click="handledeleteComment(comment._id)"
                  >delete</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import { toastedSuccess, toastedError } from "../../shared/services/toasted";
import router from "../../router";

export default {
  name: "BookDetails",
  mixins: [validationMixin],
  validations: {
    subjectNewComment: {
      required,
      minLength: minLength(4)
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      subjectNewComment: "",
      showInfoOwnerBook: true,
      book: {}
    };
  },
  async created() {
    this.changeLoading(true);
    try {
      this.book = this.getBookById(this.id);
      const author = this.book.author;
      await this.loadCreatorBook(author);
    } catch {
      toastedError(
        "You refreshed the page and were automatically redirected to AllBooksPage!"
      );
      router.push({ name: "booksAll" });
    }
    this.changeLoading(false);
  },
  methods: {
    ...mapActions([
      "deleteBook",
      "createComment",
      "deleteComment",
      "editBook",
      "loadCreatorBook",
      "changeLoading"
    ]),
    async handleDeleteBook(id) {
      await this.deleteBook(id);
      toastedSuccess("Successfully deleted book!");
      router.push({ name: "booksAll" });
    },
    async handleCreateComment() {
      this.changeLoading(true);
      const newComment = {
        subject: this.subjectNewComment,
        bookId: this.book._id,
        author: this.username
      };
      await this.createComment(newComment);
      toastedSuccess("Successfully created comment!");
      this.subjectNewComment = "";
      this.changeLoading(false);
    },
    async handledeleteComment(id) {
      this.changeLoading(true);
      await this.deleteComment(id);
      toastedSuccess("Successfully deleted comment!");
      this.changeLoading(false);
    },
    async rateBook(id, rate) {
      rate === "like" ? (this.book.likes += 1) : (this.book.dislikes += 1);
      await this.editBook([
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
  },
  computed: {
    ...mapGetters([
      "getBookById",
      "getCommentsByIdBook",
      "creatorBook",
      "username"
    ])
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.opacity {
  opacity: 0.7;
  border-radius: 0.5rem;
  background: white;
  color: black;
}
.grid-container {
  display: flex;
  justify-content: center;
}

.grid {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}

.grid-item {
  display: flex;
  margin: 5px;
  width: 30%;
  flex-direction: column;
}
.buttons-container {
  padding: 10px;
  align-items: flex-end;
  display: flex;
  justify-content: center;
}
li button {
  border-radius: 0.5rem;
  width: 2.5cm;
  color: whitesmoke;
  background-color: black;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

img {
  border-radius: 0.5rem;
  height: 220px;
  width: 180px;
  margin: 10px;
  opacity: 1;
}

.genres {
  margin-left: 15px;
}

.main-info p,
h4,
h5 {
  margin: 7px;
  text-align: center;
}

.additional-info p,
h4,
h5 {
  margin: 7px;
  text-align: center;
}

h6 {
  margin: 15px;
  text-align: justify;
}

li {
  margin: 4px;
  border-radius: 0.5rem;
  list-style-type: none;
}
span {
  font-style: italic;
}

button {
  border-radius: 0.5rem;
  text-align: center;
}

p.genres {
  text-align: left;
}

/* CSS for Additional info */

.additional-info {
  display: flex;
  margin-left: 0.2cm;
  align-content: flex-start;
}

.additional-info-button {
  display: flex;
  margin-left: 0.2cm;
  justify-content: center;
}

.additional-info-button button {
  display: flex;
  height: 30px;
  width: 8cm;
  margin-left: 0.2cm;
  margin-right: 0.2cm;
  justify-content: center;
}

.additional-info-footer {
  display: flex;
  margin: 0.5cm;
  align-content: flex-start;
  justify-content: space-around;
}

.additional-info-footer p {
  text-align: justify;
}

.additional-info-footer-b-l {
  width: 60px;
  height: 30px;
  text-align: center;
  width: 2.5cm;
  color: blue;
}

.additional-info-footer-b-d {
  width: 60px;
  height: 30px;
  text-align: center;
  width: 2.5cm;
  color: red;
}

@media only screen and (max-width: 768px) {
  img {
    border-radius: 0.5rem;
    height: 92%;
    width: 75%;
    margin-top: 20px;
  }

  .grid-container {
    display: flex;
    justify-content: center;
  }

  .grid {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }

  .grid-item {
    margin: 1em;
    justify-content: space-around;
    align-items: stretch;
    width: 90%;
  }

  button {
    border-radius: 0.5rem;
    width: 2.5cm;
    background-color: black;
    color: whitesmoke;
  }
}
/* CSS for Create Comment */
h6 {
  margin: 15px;
  text-align: justify;
}
button {
  /* background: transparent; */
  border-radius: 0.5rem;
}
.comment-header {
  display: flex;
  justify-content: left;
}

.comment-header p {
  margin: 0.3cm;
  margin-bottom: 0.4cm;
  text-align: left;
}

.comment-body p {
  display: flex;
  margin-left: 0.4cm;
  text-align: left;
}

.comment-body-items {
  display: flex;
  flex-direction: column;
  margin-left: 0.2cm;
  resize: none;
  border-radius: 0.5rem;
}

.comment-body textarea {
  margin-left: 0.2cm;
  margin-right: 0.4cm;
  margin-bottom: 4px;
  height: 5em;
  resize: none;
  border-radius: 0.5rem;
  background-color: whitesmoke;
  color: black;
}

.comment-body button {
  margin-left: 0.4cm;
  margin-top: 0.3cm;
  margin-bottom: 0.4cm;
  resize: none;
  align-items: center;
  width: 4cm;
  color: whitesmoke;
  background-color: black;
}

.comments span {
  margin-left: 0.4cm;
}

.comment p {
  margin-bottom: -2px;
  margin-top: -8px;
  font-style: italic;
}
li button {
  /* background: transparent; */
  border-radius: 0.5rem;
  width: 2.5cm;
  color: whitesmoke;
  background-color: black;
}
/* CSS for details comment */
.comment-body p {
  display: flex;
  margin-left: 0.4cm;
  text-align: left;
}
.comment-body-items {
  display: flex;
  flex-direction: column;
  margin-left: 0.2cm;
  resize: none;
  border-radius: 0.5rem;
}
.comment-body button {
  margin-left: 0.4cm;
  margin-bottom: 0.4cm;
  resize: none;
  align-items: center;
  width: 4cm;
  color: whitesmoke;
  background-color: black;
  border-radius: 0.5rem;
}
.comments span {
  margin-left: 0.4cm;
  margin-top: 2px;
}
.comments p {
  /* margin-bottom: -3px;
   margin-top: -4px; */
  font-style: italic;
  /* white-space: pre; */
}
.comment-container {
  margin-left: 0.4cm;
  margin-right: 0.4cm;
  margin-bottom: 0.4cm;
  /* resize: none; */
  border-radius: 0.5rem;
  border: 1px solid grey;
  background-color: rgb(240, 240, 240);
  color: black;
}
</style>