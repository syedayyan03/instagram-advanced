class CommentService {
    constructor() {
        this.comments = []; // Array to store comments
    }

    // Add a new comment
    addComment(userId, postId, content, parentId = null) {
        const comment = {
            id: this.comments.length + 1,
            userId,
            postId,
            content,
            parentId,
            likes: 0,
            createdAt: new Date(),
            replies: [] // For threaded comments
        };

        this.comments.push(comment);
        if (parentId) {
            const parentComment = this.comments.find(c => c.id === parentId);
            if (parentComment) {
                parentComment.replies.push(comment); // Add to replies of parent
            }
        }
        return comment;
    }

    // Like a comment
    likeComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            return comment;
        }
        return null;
    }

    // Delete a comment
    deleteComment(commentId) {
        const index = this.comments.findIndex(c => c.id === commentId);
        if (index !== -1) {
            this.comments.splice(index, 1);
            return true;
        }
        return false;
    }

    // Get all comments for a post
    getCommentsByPost(postId) {
        return this.comments.filter(c => c.postId === postId);
    }

    // Get comment thread
    getCommentThread(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        return comment ? comment.replies : [];
    }
}

// Export instance
const commentService = new CommentService();
export default commentService;