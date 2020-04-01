<template>
  <div class="grid-container">
    <div class="grid">
      <div class="grid-item opacity" v-for="book in allBooks" :key="book._id">
        <div class="grid-item-fr">
          <div class="grid-item-fr-fc">
            <img :src="book.imageUrl" />
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
                    <button @click="handleDeleteBook( book['_id'])" class="btn card-link">
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
import { toastedSuccess } from "../../shared/services/toasted";

export default {
  name: "BooksShowAll",
  created() {
    this.getBooks();
  },
  data: function() {
    return {};
  },
  methods: {
    ...mapActions([
      "loadAllBooks",
      "deleteBook",
      "loadAllComments",
      "changeLoading"
    ]),
    async getBooks() {
      this.changeLoading(true);
      try {
        await this.loadAllBooks();
        await this.loadAllComments();
        toastedSuccess("Successfully loaded all book!");
      } catch (error) {
        throw new Error(error);
      }
      this.changeLoading(false);
    },
    async handleDeleteBook(id) {
      this.changeLoading(true);
      try {
        await this.deleteBook(id);
        toastedSuccess("Successfully deleted book!");
      } catch (error) {
        throw error(error);
      }
      this.changeLoading(false);
    }
  },
  computed: {
    ...mapGetters(["username", "allBooks"])
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
  margin-bottom: -500px;
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
  margin-top: 20px;
  width: 28%;
  flex-direction: column;
  margin-bottom: 30px;
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
  opacity: 1;
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

.buttons-container {
  display: flex;
  justify-content: center;
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
  margin: 10px;
  text-align: justify;
}
li {
  /* margin-left: 3px;
  margin-right: 3px; */
  list-style-type: none;
}
button {
  height: 30px;
  width: 58px;
  margin-right: 5px;
  border: 1px solid grey;
}

@media only screen and (max-width: 1280px) {
  /* img {
    border-radius: 0.5rem;
    height: 90%;
    width: 100%;

  } */

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
    align-items: stretch;
  }

  .grid-item {
    justify-content: space-around;
    align-items: stretch;
    width: 47%;
  }
}
@media only screen and (max-width: 768px) {
  .opacity {
  opacity: 1;
  /* border-radius: 0.5rem;
  background: white;
  color: black; */
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
    justify-content: space-around;
    align-items: stretch;
    width: 95%;
  }
  button {
    height: 30px;
    width: 50px;
    margin-right: 5px;
    border: 1px solid grey;
  }
}
</style>