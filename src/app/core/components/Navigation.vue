<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mynav">
      <nav class="navbar navbar-light bg-light">
        <router-link class="navbar-brand" :to="{ path: isLoggedIn === true ? '/books/all' : '/'  }">
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
          <li v-if="isLoggedIn === true">
            <router-link class="nav-link" to="/profile/profile">Hello, {{username}}</router-link>
          </li>
          <li v-if="isLoggedIn === false" class="nav-item">
            <router-link class="nav-link" to="/profile/register">Register</router-link>
          </li>
          <li v-if="isLoggedIn === false" class="nav-item">
            <router-link class="nav-link" to="/profile/login">Login</router-link>
          </li>
          <li v-if="isLoggedIn === true" class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
          <li class="nav-item">
            <router-link v-if="isLoggedIn === true" class="nav-link" to="/profile/profile">Profile</router-link>
          </li>
          <li v-if="isLoggedIn === true" appDropdown class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >My store</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/books/all">All books</router-link>
              <router-link class="dropdown-item" to="/books/user">My books</router-link>
              <router-link class="dropdown-item" to="/books/create">Create new book</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { http } from "../../shared/services/httpClient.js";
import { toastedSuccess } from "../../shared/services/toasted.js";
export default {
  name: "Navigation",
  created() {
    this.$bus.$on("logged", () => {
      this.isLoggedIn = this.checkIfIsLogged();
    });
  },
  destroyed() {
    this.$bus.$off("logged");
  },
  data: function() {
    return {
      username: localStorage.getItem("username"),
      isLoggedIn: this.checkIfIsLogged()
    };
  },
  methods: {
    async logout() {
      await http.post('_logout')
      toastedSuccess("Successful logged out!")
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.isLoggedIn = this.checkIfIsLogged();
      this.$router.push("/profile/login");
    },
    checkIfIsLogged() {
      let token = localStorage.getItem("token");
      if (token) {
        this.username = localStorage.getItem("username");
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  padding: 0px;
  font-size: 20px;
  font: 1.1em sans-serif;
}
</style>