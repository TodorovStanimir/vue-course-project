<template>
  <div id="app">
    <navigation></navigation>
    <transition name="slide" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
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
  text-align: center;
  display: block;
  width: auto;
  height: auto;
  background-image: url("../assets/home.png");
  background-attachment: fixed;
  background-size: cover;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}
.moveUp-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  0% {
    opacity: 1;
  }
}
.moveUp-leave-active {
  animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
