const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]  // e.g., 'admin' or 'user'
    },
    attendingEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"  // Reference to the Event model
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
