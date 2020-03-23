<template>
  <div>
    <h1>This is Book Detail Component</h1>
    <h2>Book ID is: {{id}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>