<template>
  <div>
    <div class="comment-header" v-if="!getCommentsByIdBook(id).length">
      <p>There is not comments for this book.</p>
      <p>You can write the first one.</p>
    </div>
    <div class="add-comment">
      <form @submit.prevent="handleCreateComment()">
        <div class="comment-body-items">
          <textarea type="text" placeholder="Your comment..." v-model="subjectNewComment"></textarea>
        </div>
        <button class="btn btn-outline-dark" :disabled="$v.$invalid">
          <i class="fa fa-save"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommentCreate",
  mixins: [validationMixin],
  validations: {
    subjectNewComment: {
      required,
      minLength: minLength(4)
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      subjectNewComment: ""
    };
  },
  methods: {
    ...mapActions(["createComment"]),
    async handleCreateComment() {
      const newComment = {
        subject: this.subjectNewComment,
        bookId: this.id,
        author: this.username
      };
      await this.createComment(newComment);
      this.subjectNewComment = "";
    }
  },
  computed: {
    ...mapGetters(["getCommentsByIdBook", "username"])
  }
};
</script>

<style scoped>
/* CSS for Create Comment */
button {
  height: 30px;
  width: 80px;
  border: 1px solid grey;
}
.comment-header {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 15px;
}
.comment-header p {
  text-align: left;
  color: rgb(61, 6, 6);
  font: italic small-caps bold 15px/18px Georgia, serif;
  margin-bottom: 0px;
}
.add-comment {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 4px;
  padding-right: 12px;
}
.comment-body-items {
  display: flex;
  flex-direction: column;
  margin-left: 0.2cm;
  resize: none;
  border-radius: 0.5rem;
}
.add-comment textarea {
  margin-bottom: 10px;
  padding-left: 6px;
  height: 5em;
  resize: none;
  border-radius: 4px;
  background-color: whitesmoke;
  color: black;
}
</style>