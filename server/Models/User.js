const mongoose = require('mongoose');

// Define the User schema with an array field for registration details
const UserSchema = {
    name: String,
    role: String,
    email: String,
    password: String,
    tasks: { type: [String], default: [] },  // Array to store registration details
};

// Create the user schema
const userSchema = new mongoose.Schema(UserSchema);

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
