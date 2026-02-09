class StoryService {
    constructor() {
        this.stories = new Map(); // Store stories with their IDs
    }

    createStory(userId, content) {
        const storyId = `${userId}-${Date.now()}`;
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // Expiration time set to 24 hours
        this.stories.set(storyId, { 
            userId,
            content,
            expirationTime
        });
        return storyId;
    }

    viewStory(storyId) {
        const story = this.stories.get(storyId);
        if (!story) return null;
        if (Date.now() > story.expirationTime) {
            this.stories.delete(storyId); // Remove expired story
            return null;
        }
        return story;
    }

    deleteStory(storyId) {
        return this.stories.delete(storyId);
    }

    getAllStories() {
        const activeStories = Array.from(this.stories.values()).filter(story => Date.now() <= story.expirationTime);
        return activeStories;
    }
}

module.exports = new StoryService();
