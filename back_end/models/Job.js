const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  jobStatus: {
    type: String,
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
  jobDescription: {
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
