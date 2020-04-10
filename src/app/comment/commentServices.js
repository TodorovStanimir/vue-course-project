const commentCreateService = {
    methods: {
        handleCreateComment() {
            const newComment = {
                subject: this.subjectNewComment,
                bookId: this.id,
                author: this.username
            };
            this.createComment(newComment);
            this.subjectNewComment = "";
        }
    }
}

export { commentCreateService }