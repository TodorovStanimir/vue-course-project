<template>
  <div class="grid-container">
    <div class="grid">
      <div class="grid-item opacity" v-for="book in allBooks" :key="book._id">
        <p>
          <img :src="book.imageUrl" />
        </p>
        <h4>{{book.title}}</h4>
        <h5>{{book.bookAuthor}}</h5>
        <h6>{{book.description}}</h6>
        <p>
          Genres:
          <span v-for="(genre, index) in book.genres" :key="index">{{genre}}&nbsp;</span>
        </p>
        <div class="buttons-container">
          <div class="buttons">
            <li>
              <router-link :to="{ name: 'bookDetails', params: { id: book._id }}">
                <button class="btn card-link">details</button>
              </router-link>
              {{ $route.params.id }}
            </li>
            <template v-if="book.author === username">
              <li>
                <button @click="handleDeleteBook( book['_id'])" class="btn card-link">delete</button>
              </li>
              <li>
                <router-link :to="{ name: 'bookEdit', params: { id: book._id } }">
                  <button class="btn card-link">edit</button>
                </router-link>
              </li>
            </template>
          </div>
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
    ...mapActions(["getAllBooks", "deleteBook", "getAllComments"]),
    async getBooks() {
      try {
        await this.getAllBooks();
        await this.getAllComments()
        toastedSuccess("Successfully loaded all book!");
      } catch (error) {
        throw new Error(error);
      }
    },
    async handleDeleteBook(id) {
      try {
        await this.deleteBook(id);
        toastedSuccess("Successfully deleted book!");
      } catch (error) {
        throw error(error);
      }
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
  margin: 5px;
  width: 30%;
  flex-direction: column;
}

.buttons-container {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: max-content;
}

img {
  border-radius: 0.5rem;
  height: 220px;
  width: 180px;
  margin-top: 20px;
  opacity: 1;
}

p,
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
  margin: 3px;
  border-radius: 0.5rem;
  list-style-type: none;
}
span {
  font-style: italic;
}

button {
  border-radius: 0.5rem;
  width: 1.9cm;
  background-color: black;
  color: whitesmoke;
  text-align: center;
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
</style>