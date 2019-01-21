const mongoose = require('mongoose');
const Schema = mongoose.Schema

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
    }
});

module.exports = User = mongoose.model('users', UserSchema);