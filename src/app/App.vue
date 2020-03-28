<template>
  <div id="app">
    <navigation></navigation>
    <router-view :key="$route.fullPath"></router-view>>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from "./core/components/Navigation.vue";
import Footer from "./core/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Footer
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  display: block;
  width: auto;
  height: auto;
  background-image: url("../assets/home.png");
  background-attachment: fixed;
  background-size: cover;
}
</style>
