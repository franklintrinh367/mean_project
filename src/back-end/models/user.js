const mongoose = require('mongoose');

const fs = require('fs');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);