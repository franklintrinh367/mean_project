const mongoose = require('mongoose');
const Schema = mongoose.Schema

const JobSchema = new Schema({
    companyID:{
        type: Number, 
        required: true
    },
    jobStatus: {
        type: Boolean, 
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
    },
    match: []
})

module.exports = Job = mongoose.model('jobs', JobSchema);
