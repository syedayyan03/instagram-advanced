class MessageService {
    constructor() {
        this.conversations = {};
    }

    // Start a new conversation between two users
    startConversation(user1, user2) {
        const conversationId = `${user1}-${user2}`;
        this.conversations[conversationId] = {
            messages: [],
            participants: [user1, user2],
        };
        return conversationId;
    }

    // Send a message in a conversation
    sendMessage(conversationId, sender, messageContent) {
        const message = {
            sender: sender,
            content: messageContent,
            timestamp: new Date().toISOString(),
            read: false,
        };
        if (this.conversations[conversationId]) {
            this.conversations[conversationId].messages.push(message);
        } else {
            throw new Error("Conversation not found");
        }
    }

    // Read messages in a conversation
    readMessages(conversationId) {
        if (this.conversations[conversationId]) {
            this.conversations[conversationId].messages.forEach(message => {
                message.read = true;
            });
            return this.conversations[conversationId].messages;
        } else {
            throw new Error("Conversation not found");
        }
    }

    // Search messages by content in a conversation
    searchMessages(conversationId, searchTerm) {
        if (this.conversations[conversationId]) {
            return this.conversations[conversationId].messages.filter(message =>
                message.content.includes(searchTerm)
            );
        } else {
            throw new Error("Conversation not found");
        }
    }
}

export default MessageService;