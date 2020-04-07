<template>
  <div class="container">
    <router-link :to="{ name: 'userLogin' }">
      <img class="not-found-image" src="../../../assets/notFound.png" alt="404" />
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
  margin-bottom: -548px;
}
.not-found-image {
  margin-top: 100px;
  display: flex;
  border-radius: 5px;
  opacity: 0.5;
}
</style>