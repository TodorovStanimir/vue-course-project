<template>
  <div class="grid-container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <div v-if="book && comments">
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
              <span v-for="genre of book.genres" :key="genre">{{genre}}&nbsp;</span>
            </p>
            <div class="buttons-container">
              <div v-if="isAuthor(book)" class="buttons">
                <li>
                  <button @click="deleteBook( book['_id'])" class="card-link">delete</button>
                </li>
                <li>
                  <router-link :to="{ name: 'bookEdit', params: { id: book._id } }">
                    <button class="card-link">edit</button>
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
            <div class="additional-info">
              <button :disabled="isAuthor(book)" @click="showContact(book.author)">
                <b>
                  Posted by:
                  {{book.author}}
                </b>
              </button>
            </div>
            <div class="additional-info">
              <p>Year Issue: {{book.year}}</p>
            </div>
            <div class="additional-info">
              <p>Publisher: {{book.publisher}}</p>
            </div>
            <div class="additional-info">
              <p>Selling price: {{book.price.toFixed(2)}} BGN</p>
            </div>
            <div class="additional-info-footer">
              <div>
                <button
                  :disabled="isAuthor(book)"
                  @click="rateBook( book._id, 'like')"
                  class="additional-info-footer-b-l"
                >
                  <b>{{book.likes}}</b>&nbsp;&nbsp;
                  <i class="fa fa-thumbs-up"></i>
                </button>
              </div>
              <div>
                <button
                  :disabled="isAuthor(book)"
                  @click="rateBook(book._id, 'dislike')"
                  class="additional-info-footer-b-d"
                >
                  <b>{{book.dislikes}}</b>&nbsp;&nbsp;
                  <i class="fa fa-thumbs-down"></i>
                </button>
              </div>
            </div>
            <div v-if="emailOwnerBook && !showInfoOwnerBook" class="additional-info-footer">
              <p>
                You can emailed author of the book "{{book.title}}" to email: {{emailOwnerBook}} or call him
                to phone: {{phoneOwnerBook}}.
              </p>
            </div>
            <!-- <div class="additional-info-footer"></div> -->
          </div>
        </div>
        <!-- Provide information about comments -->
        <div class="grid-item">
          <div class="opacity">
            <h5>Comments</h5>
            <!-- <app-comment-create
              [bookId]="book._id"
              [comments]="comments"
              (createCommentEmitter)="postComment($event)"
            ></app-comment-create>-->
            <template v-if="!comments.length">
              <div class="comment-header">
                <p>There is not comments for this book. You can write the first one.</p>
              </div>
            </template>
            <div class="comment-body">
              <h6>Add Comment</h6>
              <form @submit.prevent="postComment()">
                <div class="comment-body-items">
                  <textarea type="text" placeholder="Your comment..." v-model="newComment"></textarea>
                </div>
                <button :disabled="$v.$invalid">add comment</button>
              </form>
            </div>
            <div class="comment-body">
              <article v-for="(comment, index) in comments" :key="index" class="comments">
                <p>
                  {{comment.subject}}
                  <br />
                  {{comment.author}}
                </p>
                <button
                  class="del-but"
                  v-if="isAuthor(comment)"
                  @click="delComment(comment._id)"
                >delete</button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import books from "../../store.js";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "BookDetails",
  mixins: [validationMixin],
  created() {
    console.log(this.book);
    console.log(this.comments);
  },
  validations: {
    newComment: {
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
      commentId: 1,
      newComment: "",
      showInfoOwnerBook: true,
      emailOwnerBook: null,
      phoneOwnerBook: null,
      book: books.books.find(book => book._id === this.id),
      comments: books.comments.filter(comment => comment.bookId === this.id),
      users: books.users
    };
  },
  methods: {
    isAuthor(book) {
      return book.author === localStorage.getItem("username");
    },
    rateBook(id, rate) {
      rate === "like" ? (this.book.likes += 1) : (this.book.dislikes += 1);
    },
    showContact(bookAuthor) {
      const user = this.users.find(user => user.username === bookAuthor);
      this.emailOwnerBook = user.email;
      this.phoneOwnerBook = user.phoneNumber;
      this.showInfoOwnerBook = !this.showInfoOwnerBook;
      console.log(bookAuthor);
    },
    postComment() {
      const comment = Object.assign(
        {},
        {
          _id: this.commentId,
          subject: this.newComment,
          bookId: this.book._id,
          author: localStorage.getItem("username")
        }
      );
      this.comments.push(comment);
      this.newComment = "";
      this.commentId += 1;
      console.log(this.comments);
    }
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
  width: auto;
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

.additional-info button {
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
  margin-bottom: 6px;
  height: 5em;
  resize: none;
  border-radius: 0.5rem;
  background-color: whitesmoke;
  color: black;
}

.comment-body button {
  margin-left: 0.4cm;
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
.comments button {
  /* margin-bottom: -3px;
   margin-top: -4px; */
  margin-left: -5.9cm;
  font-style: italic;
  /* white-space: pre; */
}
</style>