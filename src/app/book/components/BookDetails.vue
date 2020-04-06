<template>
  <div class="grid-container">
    <div v-if="book">
      <div class="grid">
        <div class="grid-item">
          <div class="main-info">
            <p class="description">{{ book.description }}</p>
          </div>
        </div>
        <div class="grid-item">
          <div class="grid-item-fr">
            <div class="grid-item-fr-fc">
              <p>
                <img :src="book.imageUrl" />
              </p>
            </div>
            <div class="grid-item-fr-sc">
              <p class="title">{{ book.title | toUpper }}</p>
              <p class="author">{{ book.bookAuthor | toLower }}</p>
              <p class="genres">
                <span v-for="(genre, index) in book.genres" :key="index">{{ genre | toLower }}&nbsp;</span>
              </p>
              <p class="genres">year issue {{ book.year | toLower }}</p>
              <p class="genres">publisher {{ book.publisher | toLower }}</p>
              <p class="genres">price {{ book.price }} bgn</p>
            </div>
          </div>
          <div class="grid-item-sr">
            <div>
              <button
                :disabled="book.author === username"
                @click.once="rateBook(id, 'like')"
                class="btn btn-outline-primary grid-item-sr-b-l"
              >
                <b>{{ book.likes }}</b>&nbsp;&nbsp;
                <i class="fa fa-thumbs-up"></i>
              </button>
            </div>
            <div v-if="book.author === username">
              <button @click="handleDeleteBook( book['_id'])" class="btn card-link">
                <i class="fa fa-trash-alt"></i>
              </button>
            </div>
            <div v-if="book.author === username">
              <router-link :to="{ name: 'bookEdit', params: { id: book._id }}">
                <button class="btn card-link">
                  <i class="fa fa-edit"></i>
                </button>
              </router-link>
            </div>
            <div v-if="book.author !== username">
              <button class="btn btn-outline-dark" @click="toggleShowContact()">
                <i class="fa fa-user"></i>
              </button>
            </div>
            <div>
              <button
                :disabled="book.author===username"
                @click.once="rateBook(id, 'dislike')"
                class="btn btn-outline-danger grid-item-sr-b-d"
              >
                <b>{{ book.dislikes }}</b>&nbsp;
                <i class="fa fa-thumbs-down"></i>
              </button>
            </div>
          </div>
          <div v-if="!showInfoOwnerBook">
            <p class="owner-info">
              You can emailed owner of the book {{ book.author }} to email: {{ creatorBook.email }} or phonecall
              to phone: {{ creatorBook.phoneNumber }}.
            </p>
          </div>
        </div>
        <!-- Provide information about comments -->
        <div class="grid-item">
          <comment-create :id="this.id"></comment-create>
          <comment-details :id="this.id"></comment-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import { toastedSuccess } from "../../shared/services/toasted";
import CommentCreate from "../../comment/components/CommentCreate";
import CommentDetails from "../../comment/components/CommentDetails";

export default {
  name: "BookDetails",
  components: {
    CommentCreate,
    CommentDetails
  },
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
      showInfoOwnerBook: true,
      book: {}
    };
  },
  async created() {
    this.book = this.getBookById(this.id);
    if (!this.book) {
      await this.loadAllBooks();
      this.book = this.getBookById(this.id);
    }
    const author = this.book.author;
    await this.loadCreatorBook(author);
  },
  methods: {
    ...mapActions([
      "deleteBook",
      "editBook",
      "loadCreatorBook",
      "loadAllBooks"
    ]),
    async handleDeleteBook(id) {
      await this.deleteBook(id);
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
    ...mapGetters(["getBookById", "creatorBook", "username"])
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.grid-container {
  display: flex;
  justify-content: center;
  margin-bottom: -396px;
}
.grid {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
}
.grid-item {
  display: flex;
  margin-top: 10px;
  width: 32%;
  flex-direction: column;
  padding: 10px;
  /* border: 1px solid white;
  border-radius: 5px; */
}
.description {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: justify;
  font: italic small-caps 15px/16px Georgia, serif;
  color: black;
  /* color: #fdfff5;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}
.grid-item-fr {
  display: flex;
  justify-content: space-between;
}
.grid-item-fr-fc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 5px;
}
img {
  border-radius: 0.5rem;
  height: 180px;
  width: 150px;
}
.grid-item-fr-sc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  width: 100%;
  color: black;
  /* color: #fdfff5;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}
.title {
  font: italic small-caps bold 15px/18px Georgia, serif;
}
.author {
  font: italic small-caps bold 17px/18px Georgia, serif;
}
.genres {
  font: italic small-caps bold 17px/18px Georgia, serif;
}

/* CSS for Additional info */
.grid-item-sr {
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 8px;
  margin-left: 3px;
  margin-right: 3px;
  text-align: justify;
}
.grid-item-sr-b-l {
  width: 80px;
  height: 30px;
  text-align: center;
  color: blue;
}
.grid-item-sr-b-d {
  width: 80px;
  height: 30px;
  text-align: center;
  color: red;
}
button {
  height: 30px;
  width: 80px;
  border: 1px solid grey;
}
.owner-info {
  font: italic small-caps 18px/23px Georgia, serif;
  margin: 10px;
  text-align: justify;
  color: black;
  /* color: #fdfff5;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}

@media only screen and (max-width: 1280px) {
  .grid-container {
    display: flex;
    justify-content: center;
  }
  .grid {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: stretch;
  }
  .grid-item {
    width: 47%;
    margin-top: 0px;
  }
}

@media only screen and (max-width: 768px) {
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
    justify-content: space-around;
    align-items: stretch;
    width: 95%;
  }
}
</style>