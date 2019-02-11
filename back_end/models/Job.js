const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  companyID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  jobStatus: {
    type: Boolean,
    required: true,
  },
  jobPostDate: {
    type: Date,
    required: true,
  },
  jobEndDate: {
    type: Date,
    required: true,
  },
  jobPosition: {
    type: Number,
    required: true,
  },
  jobDescritpion: {
    type: String,
    required: true,
  },
  jobActivate: {
    type: Boolean,
    requried: true,
  },
  candidatesMatch: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

module.exports = Job = mongoose.model('Job', JobSchema)
