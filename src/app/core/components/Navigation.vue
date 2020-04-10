<template>
  <div class="sticky">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mynav">
      <nav class="navbar navbar-light bg-light">
        <router-link class="navbar-brand" :to="{ path: isLoggedIn ? '/books/all' : '/'  }">
          <img src="../../../../public/images/logo.png" width="110" height="45" alt="BookStore" />
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
          <li class="isLogged language" @click="changeLanguage">{{currentLanguage}}</li>
          <li v-if="isLoggedIn" class="isLogged">
            <router-link
              class="nav-link"
              :to="{ name: 'userProfile' }"
              v-text="$ml.with(username).get('navHello')"
            ></router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item isLogged">
            <router-link class="nav-link" :to="{ name: 'userRegister' }" v-text="$ml.get('navReg')"></router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item isLogged">
            <router-link class="nav-link" :to="{ name: 'userLogin' }" v-text="$ml.get('navLogin')"></router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item isLogged logout">
            <a class="nav-link" @click="logoutUser()" v-text="$ml.get('navLogout')"></a>
          </li>
          <li v-if="isLoggedIn" class="nav-item isLogged">
            <router-link
              class="nav-link"
              :to="{ name: 'userProfile' }"
              v-text="$ml.get('navProfile')"
            ></router-link>
          </li>
          <li v-if="isLoggedIn" appDropdown class="nav-item dropdown isLogged">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-text="$ml.get('navMyStore')"
            ></a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link
                class="dropdown-item"
                :to="{ name: 'booksAll' }"
                v-text="$ml.get('navAllBooks')"
              ></router-link>
              <router-link
                class="dropdown-item"
                :to="{ name: 'booksUser' }"
                v-text="$ml.get('navMyBooks')"
              ></router-link>
              <router-link
                class="dropdown-item"
                :to="{ name: 'bookCreate'}"
                v-text="$ml.get('navCreate')"
              ></router-link>
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

export default {
  name: "Navigation",
  components: {
    Loader
  },
  data: function() {
    return {
      currentLanguage: "Бг"
    };
  },
  methods: {
    ...mapActions(["logoutUser"]),
    changeLanguage() {
      if (this.$ml.current === this.$ml.list[0]) {
        this.$ml.change(this.$ml.list[1]);
        return (this.currentLanguage = this.$ml.list[0]);
      } else {
        this.$ml.change(this.$ml.list[0]);
        return (this.currentLanguage = this.$ml.list[1]);
      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "username", "loading"])
  }
};
</script>

<style scoped>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  padding: 4px;
  border-radius: 5px;
}
.navbar {
  border-radius: 3px;
  padding: 0px;
  font-size: 20px;
  font: 1.1em sans-serif;
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
.logout {
  cursor: pointer;
}
.language {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  cursor: pointer;
  color: grey;
}
.navbar-brand {
  margin-right: 0px;
}
</style>