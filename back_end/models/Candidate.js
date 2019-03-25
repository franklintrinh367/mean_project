const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Candidate Schema
const CandidateSchema = new Schema({
  canAvatar: {
    type: String,
  },
  canId: {
    type: String,
    required: false,
  },
  canFirstName: {
    type: String,
    required: true,
  },
  canLastName: {
    type: String,
    required: true,
  },
  canEducation: {
    type: String,
    required: true,
  },
  canActualJob: {
    type: String,
    required: true,
  },
  canPhone: {
    type: Number,
    required: true,
  },
  canLinkedIn: {
    type: String,
    required: false,
  },
  canResume: {
    type: String,
    data: Buffer,
  },
  canAddress: {
    type: String,
    required: true,
  },
  canCity: {
    type: String,
    required: true,
  },
  canProvince: {
    type: String,
    required: true,
  },
  canPostalCode: {
    type: String,
    required: true,
  },
  canAllocateStatus: {
    type: Boolean,
    //required: true,
  },
  appliedJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
})

module.exports = Candidate = mongoose.model('Candidate', CandidateSchema)
