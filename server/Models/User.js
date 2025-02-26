const mongoose = require("mongoose");

// Task Schema (Embedded inside UserSchema)
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },  // e.g., "work", "personal"
    description: { type: String },
    addedOn: { type: Date, default: Date.now }, // Automatically stores the task creation date
    completedOn: { type: Date, default: null }, // Stores the completion date (null by default)
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
}, { _id: true });
// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: { type: [TaskSchema], default: [] },  // Embedding TaskSchema inside UserSchema
});

// Creating User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
