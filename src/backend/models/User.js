const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    facebookId: String,
    githubId: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    date: {
        type: Date,
        default: Date.now
    },
    splits: [
        {
            splitName: String,
            exercises: [
                {
                    name: String,
                    muscleGroup: String,
                    // sets: Int32,
                    // reps: Int32
                }
            ]
        }
    ]
});

const User = model("User", UserSchema);

module.exports = User;