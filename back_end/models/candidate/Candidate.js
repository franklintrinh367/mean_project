const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Candidate Schema
const CandidateSchema = new Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String, 
        required: true 
    }, 
    education: {
        type: String,
        required: true 
    }, 
    occupation: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    }, 
    dateOfBirth: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

module.exports = Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports.getCandidateById = function(id, callback) {
    Candidate.findById(id, callback);
}

module.exports.getCandidateByUsername = function(username, callback) {
    const query = {username: username};
    Candidate.findOne(query, callback);
}

module.exports.addCandidate = function(newCandidate, callback) {
    // to be coded here
}

module.exports.comparePassword = function(candidatePassword, password, callback) {
    // to be coded here
}