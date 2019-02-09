const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Client Schema 
const companySchema = new Schema({
    companyName: {
        type: String, 
        requried: true      
    },
    CRANumber: {
        type: Number, 
        required: true
    }, 
    compAddress: {
        type: String,
        required: true
    },
    compCity: {
        type: String,
        required: true
    },
    compCode: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    compProvince: {
        type: String,
        requried: true
    },
    compPhone: {
        type: Number, 
        required: true
    },
    compContact: {
        type: Number, 
        required: true
    }
})

const Client = module.exports = mongoose.model('company', companySchema);
