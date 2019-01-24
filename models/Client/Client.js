const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Client Schema 
const ClientSchema = new Schema({
    companyName: {
        type: String, 
        requried: true      
    },
    CRANumber: {
        type: Number, 
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    userName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true  
    },
    address: {
        type: String, 
        required: false
    },
    province: {
        type: String,
        requried: true
    },
    phoneNumber: {
        type: Number, 
        required: true
    }
})

const Client = module.exports = mongoose.model('Client', ClientSchema);

module.exports.getClientById = function(id, callback) {
    Client.findById(id, callback);
}

module.exports.getClientByUsername = function(username, callback) {
    const query = {username: username};
    Client.findOne(query, callback);
}

module.exports.addClient = function(newClient, callback) {
    // to be coded here
}

module.exports.comparePassword = function(clientPassword, password, callback) {
    // to be coded here
}