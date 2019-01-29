const mongoose = require('mongoose');
const Schema = mongoose.Schema

var UserSchema = new Schema({
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
    
    role: {
        type: String,
        require: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);