<template>
  <div class="grid-container">
    <div class="grid">
      <div class="grid-item" v-for="book in books" :key="book._id">
        <div class="grid-item-fr">
          <div class="grid-item-fr-fc">
            <img :src="book.imageUrl" alt="Missing book photo" />
          </div>
          <div class="grid-item-fr-sc">
            <p class="title">{{book.title | toUpper}}</p>
            <p class="author">{{book.bookAuthor | toLower}}</p>
            <p class="genres">
              <span v-for="(genre, index) in book.genres" :key="index">{{genre | toLower}}&nbsp;</span>
            </p>
            <div class="buttons-container">
              <div class="buttons">
                <li>
                  <router-link :to="{ name: 'bookDetails', params: { id: book._id }}">
                    <button class="btn card-link">
                      <i class="fa fa-info-circle"></i>
                    </button>
                  </router-link>
                  {{ $route.params.id }}
                </li>
                <template v-if="book.author === username">
                  <li>
                    <button @click="deleteBook( book['_id'])" class="btn card-link">
                      <i class="fa fa-trash-alt"></i>
                    </button>
                  </li>
                  <li>
                    <router-link :to="{ name: 'bookEdit', params: { id: book._id } }">
                      <button class="btn card-link">
                        <i class="fa fa-edit"></i>
                      </button>
                    </router-link>
                  </li>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item-sr">
          <p>{{book.description | substr(500)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "../../router";

export default {
  name: "BooksShowAll",
  created() {
    this.loadAllBooks();
    this.loadAllComments();
  },
  methods: {
    ...mapActions(["loadAllBooks", "deleteBook", "loadAllComments"])
  },
  computed: {
    ...mapGetters(["username", "allBooks"]),
    books: function() {
      return router.currentRoute.name === "booksAll"
        ? this.allBooks
        : this.allBooks.filter(book => book.author === this.username);
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
.grid-container {
  display: flex;
  justify-content: center;
  margin-bottom: -577px;
}
.grid {
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
}
.grid-item {
  display: flex;
  padding: 15px;
  width: 30%;
  flex-direction: column;
  justify-content: stretch;
  margin-bottom: 30px;
  background-color: rgb(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid white;
}
.grid-item-fr {
  display: flex;
  justify-content: space-between;
}
.grid-item-fr-fc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  border-radius: 5px;
  height: 180px;
  width: 150px;
}
.grid-item-fr-sc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8px;
  width: 100%;
  border-radius: 5px;
  padding: 5px;
}
.title {
  font: italic small-caps bold 15px/18px Georgia, serif;
  color: black;
}
.author {
  font: italic small-caps bold 17px/18px Georgia, serif;
  color: black;
}
.genres {
  font: italic small-caps bold 17px/18px Georgia, serif;
  color: black;
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
.grid-item-sr {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  text-align: justify;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  color: black;
  margin-top: 1px;
}
li {
  list-style-type: none;
}
button {
  height: 30px;
  width: 58px;
  border: 1px solid black;
  color: black;
  margin: 2px;
  margin-bottom: 0px;
}

@media only screen and (max-width: 1280px) {
  .grid-container {
    display: flex;
    justify-content: center;
  }
  .grid {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: stretch;
    width: 100%;
  }
  .grid-item {
    justify-content: space-around;
    align-items: stretch;
    width: 40%;
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
    width: 93%;
  }
  button {
    height: 30px;
    width: 40px;
    margin-right: 5px;
    border: 1px solid grey;
  }
}
</style>