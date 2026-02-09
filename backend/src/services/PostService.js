// PostService.js

class PostService {
    constructor() {
        this.posts = [];
    }

    createPost(post) {
        post.id = this.posts.length + 1; // Simple ID assignment
        this.posts.push(post);
        return post;
    }

    editPost(id, updatedPost) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index === -1) return null; // Post not found
        this.posts[index] = {...this.posts[index], ...updatedPost};
        return this.posts[index];
    }

    deletePost(id) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index === -1) return null; // Post not found
        return this.posts.splice(index, 1);
    }

    likePost(id) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            post.likes = post.likes ? post.likes + 1 : 1;
            return post;
        }
        return null;
    }

    commentOnPost(id, comment) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            post.comments = post.comments || [];
            post.comments.push(comment);
            return post;
        }
        return null;
    }

    savePost(id) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            post.saved = true;
            return post;
        }
        return null;
    }

    listTrendingHashtags() {
        const hashtagMap = {};
        this.posts.forEach(post => {
            if (post.hashtags) {
                post.hashtags.forEach(hashtag => {
                    hashtagMap[hashtag] = (hashtagMap[hashtag] || 0) + 1;
                });
            }
        });
        const trendingHashtags = Object.keys(hashtagMap).sort((a,b) => hashtagMap[b] - hashtagMap[a]);
        return trendingHashtags;
    }
}

module.exports = new PostService();
