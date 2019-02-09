const mongoose = require('mongoose');

var Admin = mongoose.model('Admin', {
    adminFirstName: { type: String, require: true },
    adminLastName: { type: String, require: true}
});

module.exports = { Admin };