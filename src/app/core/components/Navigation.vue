<template>
  <div class="sticky">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mynav">
      <nav class="navbar navbar-light bg-light">
        <router-link class="navbar-brand" :to="{ path: isLoggedIn ? '/books/all' : '/'  }">
          <img src="../../../assets/logo.png" width="110" height="45" alt="BookStore" />
        </router-link>
      </nav>
      <button
        appCollapse
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li v-if="isLoggedIn" class="isLogged">
            <router-link class="nav-link" :to="{ name: 'userProfile' }">Hello, {{ username }}</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item isLogged">
            <router-link class="nav-link" :to="{ name: 'userRegister' }">Register</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item isLogged">
            <router-link class="nav-link" :to="{ name: 'userLogin' }">Login</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item isLogged">
            <a class="nav-link" @click="handlerLogout">Logout</a>
          </li>
          <li class="nav-item" :class="{ isLogged: isLoggedIn }">
            <router-link v-if="isLoggedIn" class="nav-link" :to="{ name: 'userProfile' }">Profile</router-link>
          </li>
          <li v-if="isLoggedIn" appDropdown class="nav-item dropdown isLogged">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >My store</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{ name: 'booksAll' }">All books</router-link>
              <router-link class="dropdown-item" :to="{ name: 'booksUser' }">My books</router-link>
              <router-link class="dropdown-item" :to="{ name: 'bookCreate'} ">Create new book</router-link>
            </div>
          </li>
        </ul>
      </div>
      <loader v-if="loading"></loader>
    </nav>
  </div>
</template>

<script>
import Loader from "../../core/components/Loader";
import { mapGetters, mapActions } from "vuex";
import router from "../../router";

export default {
  name: "Navigation",
  components: {
    Loader
  },
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(["logoutUser"]),
    async handlerLogout() {
      await this.logoutUser();
      router.push({ name: "userLogin" });
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "username", "loading"])
  }
};
</script>

<style scoped>
div.sticky {
  /* position: -webkit-sticky;
  position: sticky; */
  top: 0px;
  padding: 4px;
  border-radius: 5px;
}
.navbar {
  border-radius: 3px;
  padding: 0px;
  font-size: 20px;
  font: 1.1em sans-serif;
  /* position: absolute; */
  /* left: 0px;
  top: 0px; */
}
img {
  border-radius: 5px;
  border: 1px solid grey;
  margin-left: 10px;
}

li.isLogged {
  border-radius: 5px;
  border: 1px solid grey;
  margin-left: 10px;
  padding: 3px;
}
</style>