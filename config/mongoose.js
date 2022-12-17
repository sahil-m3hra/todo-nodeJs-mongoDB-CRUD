// requiring mongoose
const mongoose = require('mongoose');
// specific the server address and collection name where we need to store and fetch data from
mongoose.connect('mongodb://localhost:27017/toDo_db');

// Connecting to DB and to specific collection
const db = mongoose.connection;

// if error happens
db.on('error', console.error.bind(console, 'error connecting to db...'));

// if successfully establishes a connection
db.once('open', () => {
    console.log("Successfully connected to the database...")
});
