const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    googleId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = model("User", UserSchema);

module.exports = User;