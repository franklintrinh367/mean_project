const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Client Schema 

const jobSchema = new Schema({
    jobId:{
        type: Number, 
        required: true
    },
    compID :{
        type: Number, 
        required: true
    },

    jobStatus: {
        type: String, 
        required: true
    }, 

    jobPostDate: {
        type: Date,
        required: true
    },

    jobEndDate: {
        type: Date,
        required: true
    },

    jobPosition: {
        type: Number,
        required: true
    },
    jobDescritpion: {
        type: String, 
        required: true
    }, 

    jobActivate: {
        type: Boolean,
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
