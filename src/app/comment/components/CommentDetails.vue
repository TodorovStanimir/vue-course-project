<template>
  <div>
    <article v-for="comment in getCommentsByIdBook(id)" :key="comment._id" class="comments">
      <div class="comment-container">
        <p>{{ comment.subject }}</p>
        <div class="author-comment">
          <p>{{ comment.author }}</p>
          <button
            class="btn btn-outline-secondary del-but"
            v-if="comment.author===username"
            @click="deleteComment(comment._id)"
          >
            <i class="fa fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteComment"])
  },
  computed: {
    ...mapGetters(["getCommentsByIdBook", "username"])
  }
};
</script>

<style scoped>
.comments p {
  font-style: italic;
}
.comment-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid white;
  background-color: rgb(240, 240, 240, 0);
  color: black;
}
.comment-container p {
  margin-left: 4px;
  margin-right: 6px;
  margin-bottom: 0px;
  text-align: justify;
}
.author-comment {
  display: flex;
  justify-content: space-between;
}
.author-comment button {
  margin-right: -1px;
  margin-bottom: -1px;
}
button {
  height: 30px;
  width: 80px;
  border: 1px solid white;
  padding: 0px;
  color: black;
}
</style>