const mongoose = require('mongoose');
const Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // type: {
    //     type: String,
    //     // required: true
    // },
    password: {
        type: String,
        require: true,
    },
    // activate: {
    //     type: Boolean,
    //     // required: true
    // }
});

module.exports = User = mongoose.model('users', UserSchema);