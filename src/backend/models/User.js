const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    facebookId: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const User = model("User", UserSchema);

module.exports = User;