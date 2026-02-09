// db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'instagram.db'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables with proper indexes and foreign keys
const createTables = () => {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT UNIQUE, 
            password TEXT, 
            email TEXT UNIQUE,  
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
        );`);
        db.run(`CREATE INDEX idx_users_username ON users(username);`);

        // Posts table
        db.run(`CREATE TABLE IF NOT EXISTS posts ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id INTEGER,  
            content TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_posts_user_id ON posts(user_id);`);

        // Comments table
        db.run(`CREATE TABLE IF NOT EXISTS comments ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            post_id INTEGER, 
            user_id INTEGER, 
            content TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_comments_post_id ON comments(post_id);`);

        // Stories table
        db.run(`CREATE TABLE IF NOT EXISTS stories ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id INTEGER, 
            content TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_stories_user_id ON stories(user_id);`);

        // Messages table
        db.run(`CREATE TABLE IF NOT EXISTS messages ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            sender_id INTEGER, 
            receiver_id INTEGER, 
            content TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE, 
            FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_messages_sender_id ON messages(sender_id);`);
        db.run(`CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);`);

        // Conversations table
        db.run(`CREATE TABLE IF NOT EXISTS conversations ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_one_id INTEGER, 
            user_two_id INTEGER, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (user_one_id) REFERENCES users(id) ON DELETE CASCADE, 
            FOREIGN KEY (user_two_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_conversations_user_one ON conversations(user_one_id);`);
        db.run(`CREATE INDEX idx_conversations_user_two ON conversations(user_two_id);`);

        // Notifications table
        db.run(`CREATE TABLE IF NOT EXISTS notifications ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id INTEGER, 
            type TEXT, 
            message TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
        );`);
        db.run(`CREATE INDEX idx_notifications_user_id ON notifications(user_id);`);

        // Hashtags table
        db.run(`CREATE TABLE IF NOT EXISTS hashtags ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            tag TEXT UNIQUE 
        );`);

        // Reports table
        db.run(`CREATE TABLE IF NOT EXISTS reports ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id INTEGER, 
            post_id INTEGER, 
            reason TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE 
        );`);

        console.log('All tables and indexes created successfully.');
    });
};

createTables();

// Close the database connection when done
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database ' + err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});