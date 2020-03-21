<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mynav">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" :href="isLoggedIn ? '/books/all' : '' ">
          <img src="../../assets/logo.png" width="110" height="45" alt="BookStore" />
        </a>
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
          <li v-if="isLoggedIn">
            <a class="nav-link" href="/profile/profile">Hello, {{username}}</a>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" href="/profile/register">Register</a>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" href="/profile/login">Login</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
          <li class="nav-item">
            <a v-if="isLoggedIn" class="nav-link" href="/profile/profile">Profile</a>
          </li>
          <li v-if="isLoggedIn" appDropdown class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >My store</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/books/all">All books</a>
              <a class="dropdown-item" href="/books/user">My books</a>
              <a class="dropdown-item" href="/books/create">Create new book</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: function() {
    return {
      username: "Stanimir Todorov",
      isLoggedIn: true,
    };
  },
  methods: {
    logout() {
        console.log('Yes');
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