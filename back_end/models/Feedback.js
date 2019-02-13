const mongoose = require('mongoose')
const Schema = mongoose.Schema

var FeedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  preferedMode: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

module.exports = Feedback = mongoose.model('Feedback', FeedbackSchema)
