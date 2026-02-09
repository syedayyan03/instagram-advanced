class NotificationService {
    constructor() {
        this.notifications = [];
    }

    // Create a new notification
    createNotification(message) {
        const notification = {
            id: this.notifications.length + 1,
            message: message,
            isRead: false,
            createdAt: new Date()
        };
        this.notifications.push(notification);
        return notification;
    }

    // Mark a notification as read
    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.isRead = true;
        }
        return notification;
    }

    // Retrieve all notifications
    getNotifications() {
        return this.notifications;
    }

    // Retrieve unread notifications
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.isRead);
    }
}

module.exports = NotificationService;