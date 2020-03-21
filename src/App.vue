<template>
  <div id="app">
    <login-user></login-user>
    <Footer></Footer>
  </div>
</template>

<script>
import LoginUser from "./components/core/LoginUser.vue";
import Footer from "./components/core/Footer.vue";

export default {
  name: "App",
  components: {
    LoginUser,
    Footer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  display: block;
  width: auto;
  height: initial;
  background-image: url("./assets/home.png");
  background-attachment: fixed;
  background-size: cover;
}
</style>
