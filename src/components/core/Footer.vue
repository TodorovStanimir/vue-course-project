<template>
  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center">
        <b>Book Store @ All rights reserved &copy; {{ currentDate | formatDate }}</b>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function() {
    return {
      currentDate: new Date()
    };
  }
};
</script>

<style scoped>
.footer {
  display: block;
  /* position: absolute; */
  /* bottom: 0; */
  margin-top: 95vh;
  font-size: 20px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding: 10px;
}
</style>