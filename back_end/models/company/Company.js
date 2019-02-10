const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Client Schema 
const CompanySchema = new Schema({
    compName: {
        type: String, 
        requried: true      
    },
    compCRANumber: {
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

module.exports = Company = mongoose.model('Company', CompanySchema)
