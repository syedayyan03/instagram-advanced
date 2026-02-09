class UserService {
    constructor() {
        this.users = []; // Array to store users
    }

    register(username, password) {
        const user = { username, password, profile: {}, followers: [], following: [], blocked: [], recommendations: [] };
        this.users.push(user);
        return user;
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) return user;
        throw new Error('Invalid credentials');
    }

    getProfile(username) {
        const user = this.users.find(u => u.username === username);
        if (user) return user.profile;
        throw new Error('User not found');
    }

    updateProfile(username, profileData) {
        const user = this.users.find(u => u.username === username);
        if (user) {
            user.profile = { ...user.profile, ...profileData };
            return user.profile;
        }
        throw new Error('User not found');
    }

    follow(username, followUsername) {
        const user = this.users.find(u => u.username === username);
        const userToFollow = this.users.find(u => u.username === followUsername);
        if (user && userToFollow && !user.following.includes(followUsername)) {
            user.following.push(followUsername);
            userToFollow.followers.push(username);
            return user;
        }
        throw new Error('User not found or already following');
    }

    unfollow(username, unfollowUsername) {
        const user = this.users.find(u => u.username === username);
        const userToUnfollow = this.users.find(u => u.username === unfollowUsername);
        if (user && userToUnfollow) {
            user.following = user.following.filter(f => f !== unfollowUsername);
            userToUnfollow.followers = userToUnfollow.followers.filter(f => f !== username);
            return user;
        }
        throw new Error('User not found');
    }

    block(username, blockUsername) {
        const user = this.users.find(u => u.username === username);
        if (user && !user.blocked.includes(blockUsername)) {
            user.blocked.push(blockUsername);
            this.unfollow(username, blockUsername); // Unfollow if already following
            return user;
        }
        throw new Error('User not found or already blocked');
    }

    unblock(username, unblockUsername) {
        const user = this.users.find(u => u.username === username);
        if (user) {
            user.blocked = user.blocked.filter(b => b !== unblockUsername);
            return user;
        }
        throw new Error('User not found');
    }

    getRecommendations(username) {
        const user = this.users.find(u => u.username === username);
        if (!user) throw new Error('User not found');

        // Simple recommendation logic
        const recommendations = this.users
            .filter(u => u.username !== username && !user.following.includes(u.username) && !user.blocked.includes(u.username))
            .slice(0, 5) // Just return top 5 recommendations
            .map(u => u.username);
        user.recommendations = recommendations;
        return recommendations;
    }
}

module.exports = UserService;