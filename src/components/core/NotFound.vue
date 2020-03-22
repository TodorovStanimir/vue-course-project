<template>
  <div class="container">
    <router-link to="/profile/login">
      <img class="not-found-image" src="../../assets/notFound.png" alt="404" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: -539px;
}
.not-found-image {
  margin-top: 100px;
  display: flex;
  border-radius: 5px;
  opacity: 0.5;
}
/* .opacity {
    opacity: 0.7;
    border-radius: 0.5rem;
    background: white;
    color: black;
} */
</style>