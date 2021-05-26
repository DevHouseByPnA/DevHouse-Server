const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        unique: true,
    },
    authId: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    profilePicURL: {
        type: String,
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
    }
}, { timestamps: true });

UserSchema.index({
    email: 'text',
    name: 'text',
    about: 'text',
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};